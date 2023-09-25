import KDBush from 'kdbush';

function getX(point) {
  return point.coord.x;
}

function getY(point) {
  return point.coord.y;
}

function expandBoundingBox(bbox, pixelRange) {
  bbox.x -= pixelRange;
  bbox.y -= pixelRange;
  bbox.width += pixelRange * 2.0;
  bbox.height += pixelRange * 2.0;
}

export function cluster(Cesium, viewer, option) {
  if (!viewer) return;

  let entityCluster = {
    _enabled: false,
    _billboardCollection: option.billboards,
    _labelCollection: option.labels,

    _clusterBillboardCollection: undefined, //所有显示在视口内的billboard 包括target和聚合簇的billboard
    _clusterLabelCollection: undefined, //所有显示在视口内的label

    _pixelRange: option.pixelRange || 80,
    _minimumClusterSize: option.minimumClusterSize || 10,
    _previousClusters: null,
    _previousHeight: undefined,

    _collectionIndicesByEntity: {},

    _clusterEvent: new Cesium.Event(),

    _labelShow: true,
  };
  const { scene } = viewer;
  const pointBoundinRectangleScratch = new Cesium.BoundingRectangle();
  const labelBoundingBoxScratch = new Cesium.BoundingRectangle();

  const setEnabled = (value) => {
    let eventListener = null;
    if (entityCluster._enabled !== value) {
      entityCluster._enabled = value;
      if (entityCluster._enabled && !eventListener) {
        eventListener = scene.camera.changed.addEventListener(createDeclutterCallback);
        createDeclutterCallback();
      } else {
        scene.camera.changed.removeEventListener(createDeclutterCallback);
        eventListener = null;
      }
    }
  };

  const createDeclutterCallback = (amount) => {
    if (Cesium.defined(amount) && amount < 0.05) {
      return;
    }

    let pixelRange = entityCluster._pixelRange;
    let minimumClusterSize = entityCluster._minimumClusterSize;

    // 清空
    if (Cesium.defined(entityCluster._clusterLabelCollection)) {
      entityCluster._clusterLabelCollection.removeAll();
    } else {
      entityCluster._clusterLabelCollection = scene.primitives.add(new Cesium.LabelCollection({ scene: scene }));
    }

    if (Cesium.defined(entityCluster._clusterBillboardCollection)) {
      entityCluster._clusterBillboardCollection.removeAll();
    } else {
      entityCluster._clusterBillboardCollection = scene.primitives.add(new Cesium.BillboardCollection({ scene: scene }));
    }

    let ellipsoid = scene.mapProjection.ellipsoid;
    let cameraPosition = scene.camera.positionWC;
    let occluder = new Cesium.EllipsoidalOccluder(ellipsoid, cameraPosition); //椭球坐标投影到平面坐标相关的函数
    let points = []; //points当前视口内显示的所有点以及他们在屏幕上的坐标  (label 和 billboard)

    // 被过滤了
    getScreenSpacePositions(entityCluster._labelCollection, points, scene, occluder);

    getScreenSpacePositions(entityCluster._billboardCollection, points, scene, occluder);

    let i;
    let j;
    let length;
    let bbox;
    let neighbors;
    let neighborLength;
    let neighborIndex;
    let neighborPoint;
    let ids;
    let numPoints;

    let collection;
    let collectionIndex;

    let index = new KDBush(points, getX, getY, 64, Int32Array);

    for (i = 0; i < points.length; ++i) {
      let point = points[i];
      if (point.clustered) {
        continue;
      }
      point.clustered = true;

      collection = point.collection;
      collectionIndex = point.index;

      let item = collection.get(collectionIndex);

      bbox = getBoundingBox(item, point.coord, pixelRange, entityCluster, pointBoundinRectangleScratch);

      // 时间很短
      neighbors = index.range(bbox.x, bbox.y, bbox.x + bbox.width, bbox.y + bbox.height);

      neighborLength = neighbors.length;

      let clusterPosition = Cesium.Cartesian3.clone(item.position);
      numPoints = 1;
      ids = [item.id];

      numPoints = neighborLength;

      if (numPoints >= minimumClusterSize) {
        // 生成聚合
        for (j = 0; j < neighborLength; ++j) {
          neighborIndex = neighbors[j];
          neighborPoint = points[neighborIndex];
          if (!neighborPoint.clustered) {
            neighborPoint.clustered = true;
            let neighborItem = neighborPoint.collection.get(neighborPoint.index);
            Cesium.Cartesian3.add(neighborItem.position, clusterPosition, clusterPosition);
            ids.push(neighborItem.id);
          }
        }

        let position = Cesium.Cartesian3.multiplyByScalar(clusterPosition, 1.0 / numPoints, clusterPosition);

        addCluster(position, numPoints, ids, entityCluster);
      } else {
        // console.debug(item);
        // 生成原本的样子
        // addNonClusteredItem(item, point, entityCluster)
      }
    }
  };

  /**
   * 找出所有视口区域内的点，放进points数组里
   * @param {*} collection
   * @param {*} points
   * @param {*} scene
   * @param {*} occluder
   * @returns
   */
  const getScreenSpacePositions = (collection, points, scene, occluder) => {
    if (!Cesium.defined(collection)) {
      return;
    }
    let length = collection.length; //所有点

    for (let i = 0; i < length; ++i) {
      let item = collection.get(i);
      if (!item.show || (scene.mode === Cesium.SceneMode.SCENE3D && !occluder.isPointVisible(item.position))) {
        continue;
      }
      if (scene.mode === Cesium.SceneMode.SCENE2D) {
        //2D模式下，根据经纬度判断目标是否在屏幕内

        //3D坐标转2D坐标
        let itemPosition = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, item.position);

        let canvas = viewer.scene.canvas;
        let upperLeft = new Cesium.Cartesian2(0, 0); //canvas左上角坐标转2d坐标
        let lowerRight = new Cesium.Cartesian2(canvas.clientWidth, canvas.clientHeight); //canvas右下角坐标转2d坐标

        if (!(itemPosition.x > upperLeft.x && itemPosition.x < lowerRight.x && itemPosition.y > upperLeft.y && itemPosition.y < lowerRight.y)) {
          continue;
        }
      }

      //过滤掉label的   只留下billboard的
      if (Cesium.defined(item._text)) {
        continue;
      }

      let coord = item.computeScreenSpacePosition(scene);
      if (!Cesium.defined(coord)) {
        continue;
      }

      points.push({
        index: i,
        collection: collection,
        clustered: false,
        coord: coord,
      });
    }
  };

  const getBoundingBox = (item, coord, pixelRange, entityCluster, result) => {
    if (Cesium.defined(item._labelCollection) && entityCluster._clusterLabels) {
      result = Cesium.Label.getScreenSpaceBoundingBox(item, coord, result);
    } else if (Cesium.defined(item._billboardCollection) && entityCluster._clusterBillboards) {
      result = Cesium.Billboard.getScreenSpaceBoundingBox(item, coord, result);
    } else if (Cesium.defined(item._pointPrimitiveCollection) && entityCluster._clusterPoints) {
      result = Cesium.PointPrimitive.getScreenSpaceBoundingBox(item, coord, result);
    }

    expandBoundingBox(result, pixelRange);

    if (entityCluster._clusterLabels && !Cesium.defined(item._labelCollection) && Cesium.defined(item.id) && hasLabelIndex(entityCluster, item.id.id) && Cesium.defined(item.id._label)) {
      const labelIndex = entityCluster._collectionIndicesByEntity[item.id.id].labelIndex;
      const label = entityCluster._labelCollection.get(labelIndex);
      const labelBBox = Cesium.Label.getScreenSpaceBoundingBox(label, coord, labelBoundingBoxScratch);
      expandBoundingBox(labelBBox, pixelRange);
      result = Cesium.BoundingRectangle.union(result, labelBBox, result);
    }

    return result;
  };

  const hasLabelIndex = (entityCluster, entityId) => {
    return Cesium.defined(entityCluster) && Cesium.defined(entityCluster._collectionIndicesByEntity[entityId]) && Cesium.defined(entityCluster._collectionIndicesByEntity[entityId].labelIndex);
  };

  function addCluster(position, numPoints, ids, entityCluster) {
    const cluster = {
      billboard: entityCluster._clusterBillboardCollection.add(),
      // label: entityCluster._clusterLabelCollection.add(),
      // point: entityCluster._clusterPointCollection.add(),
    };

    // cluster.billboard.show = false;
    // cluster.point.show = false;
    // cluster.label.show = true;
    // cluster.label.text = numPoints.toLocaleString();
    // cluster.label.id = ids;
    cluster.billboard.position = position;

    entityCluster._clusterEvent.raiseEvent(ids, cluster);
  }

  function addNonClusteredItem(item, entityCluster) {
    item.clusterShow = true;

    if (!Cesium.defined(item._labelCollection) && Cesium.defined(item.id) && hasLabelIndex(entityCluster, item.id.id) && Cesium.defined(item.id._label)) {
      const labelIndex = entityCluster._collectionIndicesByEntity[item.id.id].labelIndex;
      const label = entityCluster._labelCollection.get(labelIndex);
      label.clusterShow = true;
    }
  }

  setEnabled(true);

  return entityCluster._clusterEvent;
}
