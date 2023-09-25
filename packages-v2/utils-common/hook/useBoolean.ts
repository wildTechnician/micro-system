/**
 * boolean
 * @param defaultData
 * @returns
 */
import { ref } from 'vue';
export function useBoolean(defaultData: boolean = false) {
  const bool = ref<boolean>(defaultData);

  const setBool = (value: boolean) => {
    bool.value = value;
  };

  const setTrue = () => {
    bool.value = true;
  };

  const setFalse = () => {
    bool.value = false;
  };

  const toggle = () => {
    setBool(!bool.value);
  };

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  };
}
