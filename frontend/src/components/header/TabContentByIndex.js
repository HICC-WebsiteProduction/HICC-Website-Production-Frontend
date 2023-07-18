import CabinetRentWindow from './../manage/CabinetRentWindow';
import MemberAuthorizeWindow from './../manage/MemberAuthorizeWindow';
import MemberInfoWindow from './../manage/MemberInfoWindow';

export const TabContentByIndex = {
  0: <MemberAuthorizeWindow />,
  1: <MemberInfoWindow />,
  2: <div>우산 대여 컴포넌트</div>,
  3: <CabinetRentWindow />,
};
