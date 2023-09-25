import { defineComponent, h, VNode, Teleport } from 'vue';
import { VcCompass, VcZoomControl } from 'vue-cesium';
import layerSelect from './layerSelect.vue';

import '../../styles/navigation.scss';

export default defineComponent({
  name: 'NavigationIndex',

  setup() {
    const componentNavigation: VNode[] = [];

    componentNavigation.push(h(VcCompass, { customClass: 'noneTrans-compassPosition', teleportToViewer: false, outerOptions: { size: '70px' } }));
    componentNavigation.push(h(VcZoomControl, { customClass: 'noneTrans-zoomControlPosition', enableResetButton: false, teleportToViewer: false }));
    componentNavigation.push(h(layerSelect));

    return () => componentNavigation;
  },
});
