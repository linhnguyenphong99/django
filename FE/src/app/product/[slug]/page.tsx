"use client";

import { useProductDetail } from "@/hooks/useProduct";
import { ProductDetailContent } from "@/components/product/product-detail-content";
import { Layout } from "@/components/layout/layout";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product, loading, error } = useProductDetail(params.slug);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-toolify-purple"></div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600">The product you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProductDetailContent product={product} />
    </Layout>
  );
}
