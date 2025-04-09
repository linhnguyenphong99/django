export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product Image and Details */}
          <div className="space-y-6">
            {/* Product Image Skeleton */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div className="w-full h-[500px] bg-gray-200" />
            </div>

            {/* Quick Info Skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-32" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-8 bg-gray-200 rounded-full w-24" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info and Actions */}
          <div className="space-y-6">
            {/* Product Title and Price Skeleton */}
            <div className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />

              {/* Quantity Selector Skeleton */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="flex items-center border rounded-lg">
                  <div className="h-10 w-10 bg-gray-200" />
                  <div className="h-10 w-16 bg-gray-200" />
                  <div className="h-10 w-10 bg-gray-200" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-4">
                <div className="h-10 bg-gray-200 rounded flex-1" />
                <div className="h-10 bg-gray-200 rounded flex-1" />
              </div>
            </div>

            {/* Product Description Tabs Skeleton */}
            <div className="bg-white rounded-lg shadow animate-pulse">
              <div className="flex border-b">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="h-12 bg-gray-200 rounded-t-lg flex-1 mx-2" />
                ))}
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}