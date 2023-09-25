export function rotateAnimate(viewer: Cesium.Viewer, callback?: (...any: any[]) => any) {
  //每次旋转的弧度 越小越慢
  var angle = Cesium.Math.toRadians(Math.PI * 0.15);
  // 旋转次数 用来控制停止
  var rotate_num = 0;

  viewer.clock.shouldAnimate = true;

  const onTickCallback = () => {
    viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, angle);
    //以下用来控制 停止
    rotate_num++;
    // 110 次旋转一周
    if (rotate_num === 800) {
      //结束旋转
      viewer.clock.onTick.removeEventListener(onTickCallback);
      //可以再接定位动画
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(106.351399, 35.48339, 10000),
        orientation: {
          pitch: Cesium.Math.toRadians(-30), // 俯视角，默认-90，垂直向下
        },
        complete: callback ? callback() : () => {},
      });
    }
  };

  viewer.clock.onTick.addEventListener(onTickCallback);
}
