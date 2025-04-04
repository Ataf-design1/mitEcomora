import React, { useState, useEffect } from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import '../CSS/Marketplace.css';

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const { user, addToCart, addToWishlist, cart, wishlist } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, searchQuery, priceRange, minRating, sortBy]);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await axios.get('https://mit-marketplace-6e367-default-rtdb.firebaseio.com/products.json');
      if (res.data) {
        const productsArray = Object.values(res.data);
        setProducts(productsArray);
        const uniqueCategories = [...new Set(productsArray.map(product => product.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Rating filter
    filtered = filtered.filter(product => product.rating >= minRating);

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToWishlist(product);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="marketplace-container">
      <div className="filters-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filters-grid">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          <div className="price-filter">
            <label>Price Range: ${priceRange.min} - ${priceRange.max}</label>
            <div className="range-inputs">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="range-slider"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="range-slider"
              />
            </div>
          </div>

          <div className="rating-filter">
            <label>Minimum Rating:</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="rating-select"
            >
              <option value="0">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Star</option>
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          No products found matching your criteria
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.thumbnail} alt={product.title} className="product-image" />
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="wishlist-button"
                  disabled={!user}
                  title={user ? 'Add to Wishlist' : 'Login to add to wishlist'}
                >
                  {wishlist.some(item => item.id === product.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-rating">
                    {'⭐'.repeat(Math.floor(product.rating))}
                    <span className="rating-number">({product.rating})</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`cart-button ${cart.some(item => item.id === product.id) ? 'in-cart' : ''}`}
                  disabled={!user}
                  title={user ? 'Add to Cart' : 'Login to add to cart'}
                >
                  {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketPlace;