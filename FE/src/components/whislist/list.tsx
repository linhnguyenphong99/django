"use client";

import { useState } from "react";
import { Trash } from "lucide-react";

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
        <div>
            <h1 className="text-2xl font-bold">Wishlist</h1>
        <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="mr-2" onChange={(e) => {
                const checked = e.target.checked;
                setWishlistItems((prevItems) =>
                    prevItems.map(item => ({ ...item, selected: checked }))
                );
            }} />
            <span className="font-medium">Select All</span>
        </label>
        </div>
        {!wishlistItems.length ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
            wishlistItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 border rounded-lg shadow-md">
                    <div>
                        <label className="flex items-center cursor-pointer">
                            <input type="checkbox" className="mr-2" />
                            <h3 className="font-medium" onClick={() => window.location.href = `/product/${item.id}`}>{item.name}</h3>
                        </label>
                        <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                        handleOpenModal(item.id)}
                        >
                        <span className="text-red-500 hover:text-red-700">
                            <Trash />
                        </span>
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

