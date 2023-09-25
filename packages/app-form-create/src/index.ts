import { App } from 'vue';
import DesignForm from './core/element/DesignForm.vue';
import GenerateForm from './core/element/GenerateForm.vue';
import './styles/index.styl';

DesignForm.install = (app: App) => {
  app.component(DesignForm.name, DesignForm);
};

GenerateForm.install = (app: App) => {
  app.component(GenerateForm.name, GenerateForm);
};

const components = [DesignForm, GenerateForm];

const install = (app: App) => {
  components.forEach((component) => app.component(component.name, component));
};

export { install, DesignForm, GenerateForm };

export default {
  install,
  DesignForm,
  GenerateForm,
};
