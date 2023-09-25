import { defineComponent, h } from 'vue';
import { ElTooltip, ElIcon } from 'element-plus';
import { QuestionFilled } from '@packages/utils-icon/src/elementPlus';

import type { VNode } from 'vue';

export const Title = defineComponent({
  setup(props, { attrs }) {
    const tem: VNode[] = [
      h('span', { style: { display: 'inline-block', height: '15px', width: '2px', backgroundColor: 'var(--el-color-primary)', verticalAlign: 'middle', marginRight: '5px' } }),
      h('span', {}, attrs.text as string),
    ];

    if (attrs?.tooltip) {
      tem.push(h(ElTooltip, { content: attrs.tooltip as string }, { default: () => h(ElIcon, { style: { verticalAlign: 'text-top' } }, { default: () => h(QuestionFilled) }) }));
    }
    return () => h('p', { style: { fontSize: '14px', fontWeight: 600 } }, tem);
  },
});
