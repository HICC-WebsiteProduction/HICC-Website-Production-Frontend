import { atom, selector } from 'recoil';

export const notice = atom({
  key: 'notice',
  default: [],
});

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
