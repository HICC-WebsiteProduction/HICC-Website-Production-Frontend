import CabinetRentWindow from '../components/manage/CabinetRentWindow';
import MemberAuthorizeWindow from '../components/manage/MemberAuthorizeWindow';
import MemberInfoWindow from '../components/manage/MemberInfoWindow';
import UmbrellaRentWindow from '../components/manage/UmbrellaRentWindow';

// 관리페이지 인덱스 별 컴포넌트 반환
export const ManageMenu = {
  0: <MemberAuthorizeWindow />,
  1: <MemberInfoWindow />,
  2: <UmbrellaRentWindow />,
  3: <CabinetRentWindow />,
};
