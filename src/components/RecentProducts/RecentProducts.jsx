import React, { useContext, useState } from 'react';
import Style from './recentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {
  let { addToCart } = useContext(cartContext);
  const [loadingProductId, setLoadingProductId] = useState(null);

  async function addProduct(productId) {
    setLoadingProductId(productId); // Start loading for this product

    try {
      let response = await addToCart(productId);
      if (response.data.status === 'success') {
        toast.success(response.data.message, {
          duration: 2000,
          position: "top-right",
          style: {
            backgroundColor: 'green',
            color: 'white',
            padding: '25px'
          }
        });
      } else {
        toast.error(response.data.message, {
          duration: 2000,
          position: "top-right",
          style: {
            backgroundColor: 'red',
            color: 'white',
            padding: '25px'
          }
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: 'red',
          color: 'white',
          padding: '25px'
        }
      });
    } finally {
      setLoadingProductId(null); // End loading for this product
    }
  }

  function getRecent() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: getRecent,
    select: (data) => data.data.data
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex flex-wrap py-8 px-4 items-center'>
      {data.map((product) => (
        <div key={product.id} className='w-1/6 px-2 py-4'>
          <div className='product'>
            <Link to={`/productDetails/${product.id}/${product.category.name}`}>
              <img src={product.imageCover} alt={product.title} className='w-full' />
              <span className='block text-green-600'>{product.category.name}</span>
              <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
              <div className='flex justify-between items-center'>
                <span>{product.price} EGP </span>
                <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i></span>
              </div>
            </Link>
            <button
              onClick={() => addProduct(product.id)}
              className='px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600'
              disabled={loadingProductId === product.id}
            >
              {loadingProductId === product.id
                ? <i className='fas fa-spinner fa-spin'></i>
                : 'Add to Cart'
              }
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
