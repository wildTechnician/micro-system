import { onScopeDispose, unref, shallowRef, effectScope, watch } from 'vue';
import { parseTypes } from '../utils';

export function useScrollbar(context: unknown, callback?: () => any) {
  if (!context) {
    return { x: 0, y: 0 };
  }

  const x = shallowRef<number>(0);
  const y = shallowRef<number>(0);

  const register = (el: any, event: string, listener: any, options?: any) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const scope = effectScope();
  let clean: any;

  if (parseTypes(context, 'window')) {
    clean = register(
      context,
      'scroll',
      () => {
        x.value = (context as Window).scrollX;
        y.value = (context as Window).scrollY;
        if (typeof callback === 'function') {
          callback();
        }
      },
      {
        capture: false,
        passive: true,
      }
    );
  }

  scope.run(() => {
    if (!parseTypes(context, 'window')) {
      watch(
        () => [unref(context)],
        ([el]) => {
          clean = register(
            el,
            'scroll',
            () => {
              x.value = (el as HTMLElement).scrollLeft;
              y.value = (el as HTMLElement).scrollTop;
              if (typeof callback === 'function') {
                callback();
              }
            },
            {
              capture: false,
              passive: true,
            }
          );
        }
      );
    }

    // clean
    onScopeDispose(() => {
      clean();
    });
  });

  return {
    x,
    y,
  };
}
