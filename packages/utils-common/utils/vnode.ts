import { Fragment, Comment, isVNode } from 'vue';
import type { VNode } from 'vue';

export function isFragment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Fragment;
}

export function isValidElementNode(node: unknown): node is VNode {
  return isVNode(node) && !isFragment(node) && !isComment(node);
}

export function isComment(node: unknown): node is VNode {
  return isVNode(node) && node.type === Comment;
}

const TEMPLATE = 'template';
export function isTemplate(node: unknown): node is VNode {
  return isVNode(node) && node.type === TEMPLATE;
}
