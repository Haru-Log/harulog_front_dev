export interface Category {
  category_id: number;
  category: string;
}

export const dummy_categories: Category[] = [
  { category_id: 1, category: '운동' },
  { category_id: 2, category: '독서' },
  { category_id: 3, category: '공부' },
  { category_id: 4, category: '기상' },
]

export const category_themes: string[] = [
  'bg-category_1',
  'bg-category_2',
  'bg-category_3',
  'bg-category_4',
]