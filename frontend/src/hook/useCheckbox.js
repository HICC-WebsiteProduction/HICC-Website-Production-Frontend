import { useEffect, useState } from 'react';

// 체크박스를 관리하는 커스텀 훅
// initialList는 아이디와 체크여부의 객체 배열임
function useCheckbox(initialList) {
  const [checkboxList, setCheckboxList] = useState(initialList);
  const [checkAll, setCheckAll] = useState(false); // 전체 체크 여부

  // 전체 선택 기능
  const checkAllHandler = checked => {
    setCheckboxList(
      checkboxList.map(checkbox => ({ ...checkbox, isChecked: checked })),
    );
    setCheckAll(checked);
  };

  // 체크를 했을 때 실행되는 함수
  const checkHandler = (id, checked) => {
    const updatedList = checkboxList.map(item =>
      item.id === id ? { ...item, isChecked: checked } : item,
    );
    setCheckboxList(updatedList);
    checkSelectAll(updatedList);
  };

  // 전체 선택 체크 여부 확인
  const checkSelectAll = list => {
    const allChecked = list.every(item => item.isChecked);
    setCheckAll(allChecked);
  };

  useEffect(() => {
    checkSelectAll(checkboxList);
  }, [checkboxList]);

  return {
    checkboxList,
    setCheckboxList,
    checkAll,
    checkAllHandler,
    checkHandler,
  };
}

export default useCheckbox;
