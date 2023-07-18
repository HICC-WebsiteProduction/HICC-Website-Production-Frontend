import { useCallback, useState } from 'react';

function useSelect(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  return [value, onChange];
}

export default useSelect;
