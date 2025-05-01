export const ALLOWED_CATEGORY_NAMES = [
  'Entertainment',
  'Bills',
  'Groceries',
  'Dining Out',
  'Transportation',
  'Personal Care',
  'Education',
  'Lifestyle',
  'Shopping',
  'General',
] as const;

export type CategoryNameType = (typeof ALLOWED_CATEGORY_NAMES)[number];
