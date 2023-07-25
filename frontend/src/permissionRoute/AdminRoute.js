import { Navigate } from 'react-router';
import useAlert from '../hook/useAlert';
import { rolePriority } from '../constants/MemberRole';
import ConfirmMessage from '../constants/ConfirmMessage';

// 회장과 운영진만 들어갈 수 있다.
function AdminRoute({ authenticated, permission, component: Component }) {
  const alert = useAlert();
  return authenticated && rolePriority[permission] <= 2 ? (
    Component
  ) : authenticated && rolePriority[permission] > 2 ? (
    <Navigate to="/" {...alert(true, ConfirmMessage.noPermission)} />
  ) : (
    <Navigate to="/" {...alert(true, '로그인 후 이용해주세요.')} />
  );
}

export default AdminRoute;
