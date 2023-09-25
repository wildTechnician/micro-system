import Cookies from 'js-cookie';
import 'pinia';

type C<S> = {
  key?: string;
  enable: boolean;
  keepName?: S;
  storage: Storage | Cookies;
};

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S> {
    cache?: C<Array<keyof S>>;
  }
}
