import navigation from '../navigation';
import { VcViewer, VcStatusBar, VcConfigProvider } from 'vue-cesium';
import { ref, defineComponent, h } from 'vue';

import type { VNode } from 'vue';
import type { VcSkeletonProps } from 'vue-cesium';

type CESIUM = typeof Cesium;

export default defineComponent({
  name: 'ViewerIndex',
  setup(props, { slots }) {
    const layerBase = ref<any>();

    const setImageLayer = (Cesium: CESIUM) => {
      layerBase.value = new Cesium.UrlTemplateImageryProvider({
        url: '/map/resources/gdyxt/{z}/{x}/{y}.png',
      });
    };

    const containerLoad = ({ viewer }: { viewer: Cesium.Viewer }) => {
      const scene = viewer.scene;
      const globe = scene.globe;
      // 开启地形深度检测，让地形后面的东西消失
      // globe.depthTestAgainstTerrain = true;
      globe.showSkirts = false;
      globe.backFaceCulling = false;
      // globe.baseColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
      scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);

      /**
       * 显示画面模糊,锯齿明显问题
       */
      (viewer as any)._cesiumWidget._supportsImageRenderingPixelated = (Cesium.FeatureDetection as any).supportsImageRenderingPixelated();
      (viewer as any)._cesiumWidget._forceResize = true;
      if ((Cesium.FeatureDetection as any).supportsImageRenderingPixelated()) {
        let vtxf_dpr = window.devicePixelRatio;
        // 适度降低分辨率
        while (vtxf_dpr >= 2.0) {
          vtxf_dpr /= 2.0;
        }
        viewer.resolutionScale = vtxf_dpr;
      }

      scene.screenSpaceCameraController.inertiaZoom = 0.35;
      scene.screenSpaceCameraController.inertiaSpin = 0.35;
      // scene.screenSpaceCameraController.inertiaTranslate = 1;

      viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(106.351399, 35.48339, 5900000),
        orientation: {
          pitch: Cesium.Math.toRadians(-90),
        },
      });
    };

    const geoLoad = (obj: any) => {
      const { cesiumObject } = obj;
      let entities = cesiumObject?.entities.values;

      for (let i = 0; i < entities.length; i++) {
        let entity = entities[i];
        entity.polygon.material = Cesium.Color.fromRandom({
          alpha: 0.3,
        });
      }
    };

    return () => {
      const children: Array<VNode[] | VNode> = [];
      children.push(h(VcStatusBar));
      children.push(h(navigation));

      slots.default && children.push(slots.default());

      return h(
        VcConfigProvider,
        { cesiumPath: '/map/resources/static/Cesium/Cesium.js' },
        {
          default: () =>
            h(
              VcViewer,
              {
                skyBox: false,
                contextOptions: { webgl: { alpha: true } },
                requestRenderMode: true,
                infoBox: false,
                skyAtmosphere: false,
                showCredit: false,
                skeleton: false as any,
                orderIndependentTranslucency: false,
                style: { position: 'relative', height: '100%' },
                imageryProvider: layerBase.value,
                onReady: containerLoad,
                onCesiumReady: setImageLayer,
              },
              { default: () => children }
            ),
        }
      );
    };
  },
});
