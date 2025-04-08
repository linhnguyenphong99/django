"use client";

import useProduct from "@/hooks/useProduct";

export function HomeContent() {
  const products = useProduct()

  return (
    <main className="px-4 py-6 sm:px-6 md:px-12 lg:px-20 xl:px-40">
      <section className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">Welcome to TrendyShop</h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto">
          Discover the latest fashion trends at unbeatable prices.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center">Featured Products</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {products.product.map(product => (
            <a href={product.get_absolute_url}>
              <div key={product.id} className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              {/* Sale tag */}
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -20%
                </div>

                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = './image/not-found.jpg'
                  }}
                  className="w-full h-52 sm:h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                  <p className="text-gray-700 mb-2">{product.price}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    Limited-time offer on our best-selling item.
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="text-center bg-yellow-100 p-5 rounded-lg">
        <h2 className="text-lg sm:text-xl font-semibold mb-1">Spring Sale is On!</h2>
        <p className="text-sm sm:text-base">Up to 50% off on selected items. Don’t miss out!</p>
      </section>
    </main>
  );
}
