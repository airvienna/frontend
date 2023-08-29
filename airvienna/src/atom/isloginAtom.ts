import { atom } from 'recoil';

export const isLoginAtom = atom({
  key: 'isloginatom',
  default: false,
});

export const userNameAtom = atom({
  key: 'username',
  default: '',
});

export const isAntiAtom = atom({
  key: 'isAntiatom',
  default: false,
});
