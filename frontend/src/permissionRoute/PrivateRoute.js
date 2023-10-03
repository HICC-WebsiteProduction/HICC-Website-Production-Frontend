import { Navigate } from 'react-router-dom';
import useAlert from './../hook/useAlert';
import { rolePriority } from './../constants/MemberRole';
import ConfirmMessage from '../constants/ConfirmMessage';

// 승인대기자와 비로그인 시 접근할 수 없음
function PrivateRoute({ authenticated, permission, component: Component }) {
  const alert = useAlert();
  return authenticated && rolePriority[permission] <= 4 ? (
    Component
  ) : authenticated && rolePriority[permission] > 4 ? (
    <Navigate to="/login" {...alert(true, ConfirmMessage.noPermission)} />
  ) : (
    <Navigate to="/" {...alert(true, '로그인 후 이용해주세요.')} />
  );
}

export default PrivateRoute;
