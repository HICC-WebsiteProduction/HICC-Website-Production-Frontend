import { useCallback, useState } from 'react';

// select 코드를 단축하기 위한 커스텀 훅
function useSelect(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  return [value, onChange];
}

export default useSelect;
