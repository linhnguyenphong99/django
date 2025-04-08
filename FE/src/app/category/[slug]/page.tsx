import { Layout } from "@/components/layout/layout";
import { FeaturedCategory } from "@/components/category/featured-category";
import { CategoryGrid } from "@/components/category/category-grid";

export default function CategoryPage() {
  return (
    <Layout>
      <FeaturedCategory />
      <CategoryGrid />
    </Layout>
  );
}
