export interface Category {
  category_id: number;
  category_name: string;
}

export const dummy_categories: Category[] = [
  { category_id: 1, category_name: '운동' },
  { category_id: 2, category_name: '공부' },
  { category_id: 3, category_name: '독서' },
  { category_id: 4, category_name: '기상' },
]

export const category_themes: string[] = [
  'bg-운동',
  'bg-공부',
  'bg-독서',
  'bg-기상',
]