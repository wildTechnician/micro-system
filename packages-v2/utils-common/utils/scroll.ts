import { parseTypes } from './function';

export type ScrollContainer = HTMLElement | Window | Document;

export function scrollTo(y: number, el: ScrollContainer, callback?: () => any) {
  if (parseTypes(el, 'window')) {
    (el as Window).scrollTo({
      top: y,
      behavior: 'smooth',
    });
  } else if (el instanceof Document || el.constructor.name === 'HTMLDocument') {
    (el as Document).documentElement.scrollTop = y;
  } else {
    (el as HTMLElement).scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }
  if (typeof callback === 'function') {
    callback();
  }
}

export function getScroll(target: ScrollContainer, top: boolean): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (parseTypes(target, 'window')) {
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }
  if (target && !parseTypes(target, 'window') && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement?.[method];
  }
  return result;
}
