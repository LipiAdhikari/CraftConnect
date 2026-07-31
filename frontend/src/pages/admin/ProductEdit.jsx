import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const ProductEdit = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [artisanName, setArtisanName] = useState('');
  const [artisanLocation, setArtisanLocation] = useState('');
  const [artisanStory, setArtisanStory] = useState('');
  
  const [artisanCut, setArtisanCut] = useState(0);
  const [materialsCost, setMaterialsCost] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  
  const [inStock, setInStock] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImageUrl(data.imageUrl);
        setCategory(data.category);
        setDescription(data.description);
        setArtisanName(data.artisanName);
        setArtisanLocation(data.artisanLocation);
        setArtisanStory(data.artisanStory);
        setArtisanCut(data.priceBreakdown?.artisanCut || 0);
        setMaterialsCost(data.priceBreakdown?.materialsCost || 0);
        setPlatformFee(data.priceBreakdown?.platformFee || 0);
        setInStock(data.inStock);
      } catch (error) {
        toast.error('Failed to fetch product');
      }
    };
    fetchProduct();
  }, [productId]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);
      setImageUrl(data.imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.put(`/api/products/${productId}`, {
        name,
        price,
        imageUrl,
        category,
        description,
        artisanName,
        artisanLocation,
        artisanStory,
        priceBreakdown: { artisanCut, materialsCost, platformFee },
        inStock,
      }, config);
      
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      toast.error('Product update failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-craft-100">
      <Link to="/admin/products" className="text-craft-800 hover:text-accent mb-6 inline-block">
        &larr; Go Back
      </Link>
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Price (NPR)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </div>
        
        <div>
          <Input label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          <input type="file" onChange={uploadFileHandler} className="mt-2 block w-full text-sm text-craft-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-craft-100 file:text-accent hover:file:bg-craft-200" />
          {uploading && <p className="text-sm text-craft-800 mt-2">Uploading...</p>}
        </div>

        <Input label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        
        <div>
          <label className="block text-sm font-medium text-craft-900 mb-1">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 border border-craft-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent" rows="3" />
        </div>

        <div className="bg-craft-50 p-4 rounded-lg space-y-4 border border-craft-100">
          <h3 className="font-semibold text-craft-900">Authenticity Passport</h3>
          <Input label="Artisan Name" value={artisanName} onChange={(e) => setArtisanName(e.target.value)} required />
          <Input label="Artisan Location" value={artisanLocation} onChange={(e) => setArtisanLocation(e.target.value)} required />
          <div>
            <label className="block text-sm font-medium text-craft-900 mb-1">Artisan Story</label>
            <textarea value={artisanStory} onChange={(e) => setArtisanStory(e.target.value)} required className="w-full px-3 py-2 border border-craft-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent" rows="2" />
          </div>
        </div>

        <div className="bg-craft-50 p-4 rounded-lg space-y-4 border border-craft-100">
          <h3 className="font-semibold text-craft-900">Transparent Pricing Breakdown (NPR)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Artisan Cut" type="number" value={artisanCut} onChange={(e) => setArtisanCut(Number(e.target.value))} required />
            <Input label="Materials Cost" type="number" value={materialsCost} onChange={(e) => setMaterialsCost(Number(e.target.value))} required />
            <Input label="Platform Fee" type="number" value={platformFee} onChange={(e) => setPlatformFee(Number(e.target.value))} required />
          </div>
        </div>

        <div className="flex items-center">
          <input type="checkbox" id="inStock" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded" />
          <label htmlFor="inStock" className="ml-2 block text-sm font-medium text-craft-900">In Stock</label>
        </div>

        <Button type="submit" className="w-full">Update Product</Button>
      </form>
    </div>
  );
};

export default ProductEdit;
