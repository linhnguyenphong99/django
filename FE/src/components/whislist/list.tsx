"use client";

import { useState } from "react";

export default function WishlistContent() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Product 1", description: "Description for Product 1", price: "29.99" },
    { id: 2, name: "Product 2", description: "Description for Product 2", price: "49.99" },
    { id: 3, name: "Product 3", description: "Description for Product 3", price: "19.99" },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleOpenModal = (itemId: number) => {
    setShowModal(true);
    setSelectedItem(itemId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleRemove = (itemId: number) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    setShowModal(false);
  };

  return (
    <div className="space-y-4">
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md" onClick={() => window.location.href = `/product/${item.id}`}>
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="text-toolify-purple font-medium">${item.price}</div>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleOpenModal(item.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a1 1 0 00-1 1v1H5a1 1 0 000 2h1v12a2 2 0 002 2h10a2 2 0 002-2V6h1a1 1 0 000-2h-3V3a1 1 0 00-1-1H10zm0 2h8v12H10V4z" />
              </svg>
            </button>
            {showModal && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-lg font-semibold">Wishlist Item</h2>
                        <p className="mt-2">Are you sure you want to remove this item from your wishlist?</p>
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mx-2"
                                onClick={() => handleRemove(item.id)}
                            >
                                Yes, Remove
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 mx-2"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

