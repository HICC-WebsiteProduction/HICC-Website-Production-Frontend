import { Navigate } from 'react-router';
import useAlert from './../hook/useAlert';
import { rolePriority } from './../constants/MemberRole';
import ConfirmMessage from './../constants/ConfirmMessage';

// 회장만 들어갈 수 있다.
function PresidentRoute({ authenticated, permission, component: Component }) {
  const alert = useAlert();
  return authenticated && rolePriority[permission] === 1 ? (
    Component
  ) : authenticated && rolePriority[permission] > 1 ? (
    <Navigate to="/" {...alert(true, ConfirmMessage.noPermission)} />
  ) : (
    <Navigate to="/" {...alert(true, '로그인 후 이용해주세요.')} />
  );
}

export default PresidentRoute;
