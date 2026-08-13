import fa from '../dictionaries/fa.json';
import en from '../dictionaries/en.json';

const dictionaries = {
  fa: () => Promise.resolve(fa),
  en: () => Promise.resolve(en),
};

export type Locale = 'fa' | 'en';

export const getDictionary = async (locale: string) => {
  if (locale === 'en') return dictionaries.en();
  return dictionaries.fa(); // Default to Persian/Dari
};
