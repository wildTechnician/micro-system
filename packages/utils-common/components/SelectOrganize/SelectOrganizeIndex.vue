<template>
  <el-alert v-show="error" :title="(error as string)" type="error"></el-alert>
  <div v-loading="loading" class="container">
    <section class="container-left">
      <el-row class="top-height">
        <el-col>
          <el-autocomplete v-model="inputVal" placeholder="请输入名称" :clearable="true" style="width: 100%">
            <template #append>
              <el-select v-model="typeVal" style="width: 100px">
                <el-option v-for="searchTypeListItem in searchTypeList" :key="searchTypeListItem.val" :label="searchTypeListItem.label" :value="searchTypeListItem.val" />
              </el-select>
            </template>
          </el-autocomplete>
        </el-col>
      </el-row>
      <el-row class="top-height">
        <el-col>
          <el-scrollbar>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item
                v-for="(selectBreadcrumbDataItem, selectBreadcrumbDataIndex) in selectBreadcrumbData"
                :key="`selectBreadcrumbData${selectBreadcrumbDataIndex}`"
                @click.stop="selectBreadcrumbDataIndex == selectBreadcrumbData.length - 1 ? '' : changeDeptLevel(selectBreadcrumbDataItem, selectBreadcrumbDataIndex)"
                ><el-text
                  size="small"
                  :class="['breadcrumbWidth', selectBreadcrumbDataIndex == selectBreadcrumbData.length - 1 ? '' : 'allowBreadcrumbStyle']"
                  truncated
                  :type="selectBreadcrumbDataIndex == selectBreadcrumbData.length - 1 ? 'info' : ''"
                  >{{ selectBreadcrumbDataItem.name }}</el-text
                ></el-breadcrumb-item
              >
            </el-breadcrumb>
          </el-scrollbar>
        </el-col>
      </el-row>
      <el-empty v-if="error" />
      <el-scrollbar v-else style="max-height: calc(100% - var(--el-search-height) * 3)">
        <OrganizeItem
          v-for="(organizeItem, organizeIndex) in dataList?.depts"
          :key="organizeItem.id"
          :item="organizeItem"
          :is-select="Object.keys(selectData).includes(organizeItem.id) ? true : false"
          type="group"
          @next-level="showNextLevel"
          @node-click="
            (item, visible, type) => {
              nodeSelect(item, visible, organizeIndex, type);
            }
          "
        ></OrganizeItem>
        <OrganizeItem
          v-for="(userItem, userIndex) in dataList?.users"
          :key="userItem.id"
          :item="userItem"
          :is-select="Object.keys(selectData).includes(userItem.id) ? true : false"
          type="user"
          @node-click="
            (item, visible, type) => {
              nodeSelect(item, visible, userIndex, type);
            }
          "
        ></OrganizeItem>
      </el-scrollbar>
      <el-row class="top-height">
        <el-checkbox v-model="selectedAll" :disabled="dataList?.users && dataList?.users.length <= 0" :indeterminate="isIndeterminate">选中全部人员</el-checkbox>
      </el-row>
    </section>
    <section>
      <el-row class="top-height" align="middle" justify="space-between">
        <el-col :span="19"
          ><el-text>已选：{{ Object.keys(selectData).length }} 项</el-text></el-col
        >
        <el-col :span="4"><el-button link type="primary" @click.stop="resetCheckbox">清空所有</el-button></el-col>
      </el-row>
      <el-scrollbar style="max-height: calc(100% - var(--el-search-height))">
        <el-row v-for="selectDataItem in selectData" :key="`selectData${selectDataItem.id}`" align="middle" class="itemPadding">
          <el-col :span="23">
            <el-avatar :size="30" :style="{ backgroundColor: selectDataItem.type == 'user' ? 'var(--el-text-color-disabled)' : 'var(--el-color-primary-light-5)', marginRight: '10px' }">
              <el-icon v-if="selectDataItem.type == 'group'">
                <component :is="treeListIcon"></component>
              </el-icon>
              <span v-else>{{ selectDataItem.name.charAt(selectDataItem.name.length - 1) }}</span>
            </el-avatar>
            <el-text>{{ selectDataItem.name }}</el-text>
          </el-col>
          <el-col :span="1">
            <el-button link :icon="Close" @click.stop.prevent="setCheckbox(selectDataItem, false)"></el-button>
          </el-col>
        </el-row>
      </el-scrollbar>
    </section>
  </div>
</template>

<script setup name="SelectOrganizeIndex" lang="ts">
import { watch, shallowRef, ref, toRefs, reactive, computed } from 'vue';
import { OrganizeItem } from './components';
import { useAsync, useIcon } from '../../hook';
import { get, put, post, del } from '../../service';
import { Close } from '@packages/utils-icon/src/elementPlus';

type IProps = {
  url?: string;
  query?: { parentId: string } & Record<string, any>;
  method?: 'post' | 'get' | 'delete' | 'put';
  props?: {
    key: string;
    label: string;
  };
};

type IItemType = {
  name: string;
  id: string;
  children: IItemType[];
};
type ISearchType = 'group' | 'user';
type ISelectType = { type: ISearchType } & IItemType;

const props = withDefaults(defineProps<IProps>(), {
  url: '/admin/user/findOrg',
  query: () => ({
    parentId: '0',
  }),
  method: 'post',
  props: () => ({
    key: 'id',
    label: 'name',
  }),
});

const inputVal = shallowRef();
const typeVal = shallowRef('1');
const dataList = ref<{ depts: IItemType[]; users: IItemType[] }>();
const selectedAll = shallowRef<boolean>(false);
const selectData = reactive<Record<string, ISelectType>>({});
const selectBreadcrumbData = ref<IItemType[]>([{ name: '组织架构', id: '0', children: [] }]);
const searchTypeList = [
  { label: '搜索成员', val: '1' },
  { label: '搜索部门', val: '2' },
];

const { query } = toRefs(props);
const [treeListIcon] = useIcon(['tree-list']);

const { state, error, loading, execute } = useAsync(() => {
  const { method } = toRefs(props);
  switch (method.value) {
    case 'post':
      return post(props.url, query.value);
    case 'get':
      return get(props.url, query.value);
    case 'put':
      return put(props.url, query.value);
    case 'delete':
      return del(props.url, query.value);
    default:
      return post(props.url, query.value);
  }
});

const isIndeterminate = computed(() => {
  if (dataList.value?.depts && dataList.value?.users) {
    return Object.keys(selectData).length != [...dataList.value.depts, ...dataList.value.users].length && Object.keys(selectData).length > 0;
  } else {
    return false;
  }
});

const getData = async () => {
  await execute();
  dataList.value = state.value;
};

const nodeSelect = (data: IItemType, visible: boolean, index: number, type: ISearchType) => {
  setCheckbox({ ...data, type }, visible);
};

const changeDeptLevel = async (data: IItemType, index: number) => {
  query.value.parentId = data.id;
  await getData();
  selectBreadcrumbData.value.splice(index + 1);
};

const showNextLevel = async (itemList: IItemType[], parent: IItemType) => {
  query.value.parentId = parent.id;
  await getData();
  selectBreadcrumbData.value.push(parent);
};

const setCheckbox = (data: ISelectType, selected: boolean) => {
  const allData = dataList.value?.depts && dataList.value?.users ? [...(dataList.value?.depts ?? []), ...(dataList.value?.users ?? [])] : [];

  if (selected) {
    selectData[data.id] = data;
  } else {
    delete selectData[data.id];
  }

  // 改变checkbox的展示状态
  if (Object.keys(selectData).length == allData.length) {
    selectedAll.value = true;
  } else if (Object.keys(selectData).length == 0) {
    selectedAll.value = false;
  }
};

const resetCheckbox = () => {
  for (let i in selectData) {
    setCheckbox(selectData[i], false);
  }
};

watch(selectedAll, (val) => {
  const allData = dataList.value?.depts && dataList.value?.users ? [...(dataList.value?.depts ?? []), ...(dataList.value?.users ?? [])] : [];
  allData.map((item) => {
    setCheckbox({ ...item, type: 'children' in item ? 'group' : 'user' }, val);
  });
});

const getSelectData = () => selectData;

getData();
defineExpose({ getSelectData, resetCheckbox });
</script>

<style lang="scss" scoped>
.container {
  --el-padding: 20px;
  --el-search-height: 45px;
  --el-breadcrumb-max-width: 100px;

  border: var(--el-border);
  height: 100%;
  border-radius: var(--el-border-radius-base);
  display: flex;
  & > section {
    width: 50%;
    height: 100%;
    padding: var(--el-padding);
  }
}
.container-left {
  border-right: var(--el-border);
}

.breadcrumbWidth {
  max-width: var(--el-breadcrumb-max-width);
  line-height: var(--el-search-height);
}
.allowBreadcrumbStyle {
  cursor: pointer;
  &:hover {
    color: var(--el-color-primary);
  }
}
.itemPadding {
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
}
.top-height {
  height: var(--el-search-height);
}
</style>
