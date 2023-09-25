<script lang="ts">
import { bus, startApp as rawStartApp, destroyApp, setupApp, preloadApp } from 'wujie';
import { defineComponent, h } from 'vue';

const WujieVue = defineComponent({
  name: 'WujieVue',
  props: {
    name: { type: String, default: '' },
    loading: { type: HTMLElement, default: undefined },
    url: { type: String, default: '' },
    sync: { type: Boolean, default: undefined },
    prefix: { type: Object, default: undefined },
    alive: { type: Boolean, default: undefined },
    props: { type: Object, default: undefined },
    attrs: { type: Object, default: undefined },
    replace: { type: Function, default: undefined },
    fetch: { type: Function, default: undefined },
    fiber: { type: Boolean, default: undefined },
    degrade: { type: Boolean, default: undefined },
    plugins: { type: Array, default: null },
    beforeLoad: { type: Function, default: null },
    beforeMount: { type: Function, default: null },
    afterMount: { type: Function, default: null },
    beforeUnmount: { type: Function, default: null },
    afterUnmount: { type: Function, default: null },
    activated: { type: Function, default: null },
    deactivated: { type: Function, default: null },
    loadError: { type: Function, default: null },
  },
  data() {
    return {
      startAppQueue: Promise.resolve(),
    };
  },
  mounted() {
    bus.$onAll(this.handleEmit);
    this.execStartApp();
    this.$watch(
      () => this.name + this.url,
      () => this.execStartApp()
    );
  },
  beforeUnmount() {
    bus.$offAll(this.handleEmit);
  },
  methods: {
    handleEmit(event: any, ...args: any) {
      this.$emit(event, ...args);
    },
    async startApp() {
      try {
        await rawStartApp({
          name: this.name as any,
          url: this.url as any,
          el: this.$refs.wujie as any,
          loading: this.loading as any,
          alive: this.alive as any,
          fetch: this.fetch as any,
          props: this.props as any,
          attrs: this.attrs as any,
          replace: this.replace as any,
          sync: this.sync as any,
          prefix: this.prefix as any,
          fiber: this.fiber as any,
          degrade: this.degrade as any,
          plugins: this.plugins as any,
          beforeLoad: this.beforeLoad as any,
          beforeMount: this.beforeMount as any,
          afterMount: this.afterMount as any,
          beforeUnmount: this.beforeUnmount as any,
          afterUnmount: this.afterUnmount as any,
          activated: this.activated as any,
          deactivated: this.deactivated as any,
          loadError: this.loadError as any,
        });
      } catch (error) {
        this.handleEmit('loadError', error);
      }
    },
    execStartApp() {
      this.startAppQueue = this.startAppQueue.then(this.startApp);
    },
    destroy() {
      destroyApp(this.name);
    },
  },
  render() {
    return h('div', {
      ref: 'wujie',
    });
  },
});

WujieVue.setupApp = setupApp;
WujieVue.preloadApp = preloadApp;
WujieVue.bus = bus;
WujieVue.destroyApp = destroyApp;
export default WujieVue;
</script>
