import { usePopperContainerId } from 'element-plus';
/**
 * #TODO:解决表格筛选列表的popper报错
 * 弹框内下拉框的popper因为是懒加载，所有暂时没办法解决
 * 思路地址：https://github.com/Tencent/wujie/issues/325
 */
export const fixElementPlusTeleportCrash = () => {
  const { id, selector } = usePopperContainerId();
  if (!document.body.querySelector(selector.value)) {
    let container = createContainer(id.value);
    return () => {
      container.remove();
    };
  }
  return () => {};
};

const createContainer = (id: string) => {
  const container = document.createElement('div');
  container.id = id;
  document.body.appendChild(container);
  return container;
};
