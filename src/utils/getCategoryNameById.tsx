import { dummy_categories } from "../types/Category.type";

export const getCategoryNameById = (name: string): number => {
  const category = dummy_categories.find(category => category.category_name === name);
  return category ? category.category_id : 0;
};