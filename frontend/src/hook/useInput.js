import { useCallback, useState } from 'react';

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const onChange = useCallback(event => {
    setValue(event.target.value);
  }, []);

  return [value, onChange];
}

export default useInput;
