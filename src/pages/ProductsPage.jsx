"use client";
import { Trash2 } from "lucide-react";

import { useState } from "react";

function ProductsPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Fresh Apples",
      category: "Fruits",
      price: 4.99,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 50,
      description: "Fresh red apples, perfect for snacking",
      unit: "per kg",
    },
    {
      id: 2,
      name: "Whole Milk",
      category: "Dairy",
      price: 3.49,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 25,
      description: "Fresh whole milk, 1 liter",
      unit: "per bottle",
    },
    {
      id: 3,
      name: "White Bread",
      category: "Bakery",
      price: 2.99,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 30,
      description: "Fresh baked white bread loaf",
      unit: "per loaf",
    },
    {
      id: 4,
      name: "Chicken Breast",
      category: "Meat",
      price: 8.99,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 15,
      description: "Fresh chicken breast, boneless",
      unit: "per kg",
    },
    {
      id: 5,
      name: "Bananas",
      category: "Fruits",
      price: 2.49,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 40,
      description: "Fresh yellow bananas",
      unit: "per bunch",
    },
    {
      id: 6,
      name: "Cheddar Cheese",
      category: "Dairy",
      price: 5.99,
      image:
        "https://cdn.grofers.com/app/assets/products/sliding_images/jpeg/637aa24b-46a7-42a3-9fb6-ee8d524caf05.jpg?ts=1727092588",
      stock: 20,
      description: "Aged cheddar cheese block",
      unit: "per 200g",
    },
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("products");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Fruits", "Dairy", "Bakery", "Meat", "Vegetables"];

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    alert(`Order placed successfully! Total: $${getTotalPrice()}`);
    setCart([]);
    setActiveTab("products");
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg?height=300&width=300&text=No+Image";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Departmental Store
          </h1>
          <p className="text-gray-600 mt-1">
            Fresh products delivered to your door
          </p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                {products.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "cart"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Cart
              {cart.length > 0 && (
                <span className="ml-2 bg-red-100 text-red-800 py-0.5 px-2.5 rounded-full text-xs">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
          </nav>
        </div>

        {activeTab === "products" && (
          <div className="space-y-6 text-black">
            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={handleImageError}
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          ${product.price}
                        </span>
                        <span className="text-gray-500 text-sm ml-1">
                          {product.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart tab remains unchanged */}
        {activeTab === "cart" && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Shopping Cart
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 border text-red-500 border-b-black rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            ${item.price} {item.unit}
                          </p>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg transition-colors border-rounded-lg bg-red-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-3xl font-bold text-gray-900">
                        Total: ${getTotalPrice()}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setActiveTab("products")}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={placeOrder}
                        className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* ... */}
      </div>
    </div>
  );
}

export default ProductsPage;
