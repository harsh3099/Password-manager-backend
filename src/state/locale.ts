import { atom } from 'recoil';

import { Locale } from '../types/locale';

export const LocaleState = atom<Locale>({
  key: 'LocaleState',
  default: Locale.English,
});
