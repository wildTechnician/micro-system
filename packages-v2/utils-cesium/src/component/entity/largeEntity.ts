import { defineComponent, h, onMounted } from 'vue';
import { useVueCesium } from 'vue-cesium';
import { cluster } from './cluster';

import type { VcViewerProvider } from 'vue-cesium/es/utils/types';

export default defineComponent({
  name: 'LargeEntity',

  setup() {
    const $vc: VcViewerProvider = useVueCesium();

    if (!$vc) return;

    onMounted(async () => {
      const { Cesium, viewer } = await $vc.creatingPromise;

      const createCanvas = (text: string) => {
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = 100;
        canvas.height = 100;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = '#FFF';
        ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        return canvas.toDataURL('image/png');
      };

      const billboards = new Cesium.BillboardCollection();
      const labels = new Cesium.BillboardCollection();
      const collection = new Cesium.PrimitiveCollection();

      for (let i = 0; i < 10; i++) {
        let lat = Math.random() * 40 + 85,
          log = Math.random() * 30 + 21;
        billboards.add({
          id: 'image' + i,
          position: Cesium.Cartesian3.fromDegrees(lat, log, 30000),
          image: '/map/resources/static/2222.png',
          width: 30,
          height: 30,
        });

        labels.add({
          id: 'label' + i,
          position: Cesium.Cartesian3.fromDegrees(lat, log, 30000),
          image: createCanvas('image' + i),
          pixelOffset: new Cesium.Cartesian2(0, 30),
        });
      }

      collection.add(billboards);
      collection.add(labels);

      viewer.scene.primitives.add(collection);

      const clusterEvent = cluster(Cesium, viewer, { billboards });

      const pinBuilder = new Cesium.PinBuilder();
      const pin50 = pinBuilder.fromText('50+', Cesium.Color.RED, 48).toDataURL();
      const pin40 = pinBuilder.fromText('40+', Cesium.Color.ORANGE, 48).toDataURL();
      const pin30 = pinBuilder.fromText('30+', Cesium.Color.YELLOW, 48).toDataURL();
      const pin20 = pinBuilder.fromText('20+', Cesium.Color.GREEN, 48).toDataURL();
      const pin10 = pinBuilder.fromText('10+', Cesium.Color.BLUE, 48).toDataURL();

      const singleDigitPins = new Array(8);
      for (let i = 0; i < singleDigitPins.length; ++i) {
        singleDigitPins[i] = pinBuilder.fromText(`${i + 2}`, Cesium.Color.VIOLET, 48).toDataURL();
      }

      clusterEvent.addEventListener(function (clusteredEntities: any, cluster: any) {
        if (clusteredEntities.length >= 50) {
          cluster.billboard.image = pin50;
        } else if (clusteredEntities.length >= 40) {
          cluster.billboard.image = pin40;
        } else if (clusteredEntities.length >= 30) {
          cluster.billboard.image = pin30;
        } else if (clusteredEntities.length >= 20) {
          cluster.billboard.image = pin20;
        } else if (clusteredEntities.length >= 10) {
          cluster.billboard.image = pin10;
        } else {
          cluster.billboard.image = singleDigitPins[clusteredEntities.length - 2];
        }
      });
    });

    return () => h('i', { style: { display: 'none' } });
  },
});
