import { useBoolean } from './useBoolean';

export function useLoading(init: boolean = true) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean(init);

  return {
    loading,
    startLoading,
    endLoading,
  };
}
