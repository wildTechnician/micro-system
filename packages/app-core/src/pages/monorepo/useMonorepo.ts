import { props } from '@packages/utils-common/enter';
import { useRouter, useRoute } from 'vue-router';
import { isEmpty } from '@packages/utils-common/utils';
import userPermissionStore from '@/store/permission/index';
import useProfileStore from '@/store/profile/index';

export const useMonorepo = (handle: any) => {
  const router = useRouter();
  const route = useRoute();
  const usePermission = userPermissionStore();
  const useProfile = useProfileStore();
  const currentApp = shallowReactive({
    name: '',
    path: '',
  });

  watch(
    () => route.params.path,
    (val) => {
      jump(val as string);
    }
  );

  const jump = (path: string) => {
    if (isEmpty(usePermission.getDefaultRouter)) return;
    if (currentApp.name == usePermission.getDefaultRouter.name) {
      handle.bus.$emit('router-change', path);
    } else {
      currentApp.name = usePermission.getDefaultRouter.name;
      currentApp.path = usePermission.getDefaultRouter.path;
    }
  };

  const propsData = computed<typeof props>(() => {
    return {
      jumpTo: (path: string) => {
        router.push({ name: `wujieVue`, params: { path: path || '/' } });
      },
      currentRouter: usePermission.childrenRouters,
      user: useProfile.userInfo,
      Auth: useProfile.Auth,
    };
  });

  jump(route.params.path as string);

  return { propsData, currentApp };
};
