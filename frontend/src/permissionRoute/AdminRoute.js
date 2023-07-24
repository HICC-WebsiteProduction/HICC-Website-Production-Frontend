import { Navigate } from 'react-router';
import useAlert from './../hook/useAlert';
import { rolePriority } from './../constants/MemberRole';

// 재학생만 (회장, 운영진, 일반) 들어갈 수 있다.
function UndergraduateRoute({
  authenticated,
  permission,
  component: Component,
}) {
  const alert = useAlert();
  return authenticated && rolePriority[permission] <= 3 ? (
    Component
  ) : authenticated && rolePriority[permission] > 3 ? (
    <Navigate to="/" {...alert(true, '재학생만 이용할 수 있습니다.')} />
  ) : (
    <Navigate to="/" {...alert(true, '로그인 후 이용해주세요.')} />
  );
}

export default UndergraduateRoute;
