import { inject, provide, computed } from 'vue';

import type { InjectionKey } from 'vue';
import type { AnchorContext } from '../index';

export const AnchorContextKey: InjectionKey<AnchorContext> = Symbol('anchorContextKey');

export const useInject = () => {
  return inject(AnchorContextKey, {
    handleClick: (...any: any[]) => {},
    activeIndex: computed(() => ''),
  } as AnchorContext);
};

export const useProvide = (init: AnchorContext) => {
  return provide(AnchorContextKey, init);
};
