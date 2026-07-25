import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const url = keyword 
        ? `http://localhost:5000/api/products?keyword=${keyword}`
        : 'http://localhost:5000/api/products';
      const { data } = await axios.get(url);
      setProducts(data);
    } catch (error) {
      toast.error('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [keyword]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
      }
    }
  };

  const createProductHandler = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/products', {}, config);
      navigate(`/admin/products/${data._id}/edit`);
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button 
          onClick={createProductHandler}
          className="bg-accent hover:bg-[color:var(--color-accent-hover)] text-white px-4 py-2 rounded flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create Product</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-craft-100 mb-6 flex items-center space-x-4">
        <Search className="w-5 h-5 text-craft-800" />
        <input 
          type="text"
          placeholder="Search products..."
          className="flex-1 focus:outline-none"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-sm border border-craft-100 rounded-xl overflow-hidden">
        <table className="min-w-full divide-y divide-craft-100">
          <thead className="bg-craft-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-craft-800 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-craft-800 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-craft-800 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-craft-800 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-craft-800 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-craft-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-craft-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-craft-800">{product._id.substring(0,8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-craft-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-craft-800">NPR {product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-craft-800">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <Link to={`/admin/products/${product._id}/edit`} className="text-blue-600 hover:text-blue-900 inline-block">
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button onClick={() => deleteHandler(product._id)} className="text-red-600 hover:text-red-900 inline-block">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-craft-800">No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
