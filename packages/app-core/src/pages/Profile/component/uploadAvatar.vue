<template>
  <el-dialog v-model="modalState" width="700px" :close-on-press-escape="false" :close-on-click-modal="false" title="修改头像">
    <div style="height: 400px">
      <VueCropper ref="cropper" :img="imageUrl" :fixed="true" auto-crop-width="120px" auto-crop-height="120px" :auto-crop="true" :can-move="false" :center-box="true"></VueCropper>
    </div>
    <el-text type="info" size="small">上传成功后，若头像未改变请尝试刷新页面或退出后重新登陆</el-text>

    <p style="text-align: right">
      <el-button type="primary">提交</el-button>
      <el-button>取消</el-button>
    </p>
  </el-dialog>
</template>

<script setup name="uploadAvatar" lang="ts">
import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';

interface IProps {
  visible: boolean;
  imageUrl?: string;
}

const props = defineProps<IProps>();
const emits = defineEmits(['update:visible']);
const cropper = ref();

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emits('update:visible', visible);
  },
});
</script>

<style lang="scss" scoped></style>
