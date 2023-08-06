import { atom, selector } from 'recoil';

// 알림 내역 저장소
export const notice = atom({
  key: 'notice',
  default: [],
});

// 전체 알림을 받아 읽지 않은 알림의 수를 세준다
export const unreadNotice = selector({
  key: 'unreadNotice',
  get: ({ get }) => {
    const wholeNotice = get(notice);
    const unreadNotice = wholeNotice.filter(
      notice => notice.state === 'unread',
    );
    return unreadNotice.length;
  },
});

// 게시판에서 온 알림을 관리한다.
// 알림을 읽었다면 읽음 처리를 해준다.
export const noticeBoard = selector({
  key: 'noticeBoard',
  get: ({ get }) => {
    const wholeNotice = get(notice);
    return wholeNotice.filter(notice => notice.type === 'board');
  },

  set: ({ set, get }, newValue) => {
    let wholeNotice = get(notice);

    newValue.forEach(newNotice => {
      wholeNotice = wholeNotice.map(notice => {
        if (notice.id === newNotice.id && notice.state !== newNotice.state) {
          return { ...notice, state: 'read' };
        }
        return notice;
      });
    });

    set(notice, wholeNotice);
  },
});

// 일정에서 온 알림을 관리한다.
// 알림을 읽었다면 읽음 처리를 해준다.
export const noticeSchedule = selector({
  key: 'noticeSchedule',
  get: ({ get }) => {
    const wholeNotice = get(notice);
    return wholeNotice.filter(notice => notice.type === 'schedule');
  },

  set: ({ set, get }, newValue) => {
    let wholeNotice = get(notice);

    newValue.forEach(newNotice => {
      wholeNotice = wholeNotice.map(notice => {
        if (notice.id === newNotice.id && notice.state !== newNotice.state) {
          return { ...notice, state: 'read' };
        }
        return notice;
      });
    });

    set(notice, wholeNotice);
  },
});

// 대여에서 온 알림을 관리한다.
// 알림을 읽었다면 읽음 처리를 해준다.
export const noticeRent = selector({
  key: 'noticeRent',
  get: ({ get }) => {
    const wholeNotice = get(notice);
    return wholeNotice.filter(notice => notice.type === 'rent');
  },

  set: ({ set, get }, newValue) => {
    let wholeNotice = get(notice);

    newValue.forEach(newNotice => {
      wholeNotice = wholeNotice.map(notice => {
        if (notice.id === newNotice.id && notice.state !== newNotice.state) {
          return { ...notice, state: 'read' };
        }
        return notice;
      });
    });

    set(notice, wholeNotice);
  },
});
