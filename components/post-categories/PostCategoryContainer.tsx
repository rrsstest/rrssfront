import { CategoryCard } from "./CategoryCard";

export const PostCategoryContainer = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <CategoryCard category="obra" />
      <CategoryCard category="gas" />
      <CategoryCard category="electro" />
      <CategoryCard category="capacitaciones" />
      <CategoryCard category="padron" />
      <CategoryCard category="publicaciones" />
    </div>
  );
};
