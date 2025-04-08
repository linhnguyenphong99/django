"use client";
import { useProductDetail } from "@/hooks/useProduct";
import { useParams } from "next/navigation";

export function HomeDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const record = useProductDetail(slug)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6 md:px-12 lg:px-20 xl:px-40">
      {/* Image */}
      <div className="relative w-full">
        {record.discount && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
            -{record.discount}%
          </span>
        )}
        <img
          src={record.image}
          alt={record.name}
          className="w-full h-[300px] md:h-[400px] object-cover rounded"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{record.name}</h1>
        <p className="text-gray-600 mb-6">{record.description}</p>
        <div className="text-xl font-semibold text-blue-600 mb-6">{record.price}</div>
        <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
