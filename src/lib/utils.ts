import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a date string (e.g. 2024 or 1399) into the appropriate language version
export function formatYear(year: string, lang: string): string {
  if (lang !== 'fa') return year;
  
  // English digits to Persian digits mapping
  const englishToPersianMap: { [key: string]: string } = {
    '0': '۰', '1': '۱', '2': '۲', '3': '۳', '4': '۴',
    '5': '۵', '6': '۶', '7': '۷', '8': '۸', '9': '۹'
  };
  
  return year.split('').map(char => englishToPersianMap[char] || char).join('');
}
