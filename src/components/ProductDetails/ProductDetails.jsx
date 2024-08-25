import React, { useEffect, useState } from 'react'
import style from './productDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { cartContext } from '../../context/CartContext';
import  { useContext } from 'react'
import useProducts from '../../Hooks/useProducts';


export default function ProductDetails() {





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






  let {id , category}=useParams();


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  
  
  
  


  const [productDatails, setProductDatails] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  function getProductDetails(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then( ({data}) =>{
      setProductDatails(data.data);

    })
    .catch( () =>{

    })
  }




  function getRelatedProducts(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then( ({data}) =>{
      let allProducts = data.data;
      let related =allProducts.filter((product)=> product.category.name == category)
      setRelatedProducts(related);
    })
    .catch( () =>{

    })
  }


  useEffect(()=>{
    getProductDetails(id);
    getRelatedProducts(category)
  },[id,category]);

  return (
    <>

    <div className='flex flex-wrap py-8 px-4 items-center '>
      <div className='w-1/4'>
      <Slider {...settings} >
        {productDatails?.images.map((src)=> <img src={src} alt="" className='w-full' />)}
      
    </Slider>
      
      </div>
      <div className='w-3/4 p-6'>
      <h1 className='text-lg font-normal text-gray-950'>{productDatails?.title}</h1>
      <p className='text-gray-700'>{productDatails?.description}</p>


      <div className='flex justify-between items-center'>
        <span>{productDatails?.price} EGP </span>
        <span>{productDatails?.ratingsAverage}  <i className='fas fa-star text-yellow-400'></i></span>
      </div>

      <button onClick={() => addProduct(productDatails.id)} disabled={loadingProductId === productDatails?.id} className='px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600 '>
              {loadingProductId === productDatails?.id
                ? <i className='fas fa-spinner fa-spin'></i>
                : 'Add to Cart'
              }
        
         </button>
      
      </div>

    </div>

    <h2 className='text-center text-4xl font-serif text-green-800 pacifico my-4 '>Similar</h2>


    <div className='flex flex-wrap py-8 px-4 items-center'>

    {relatedProducts.map((product)=>

      <div key={product.id} className='w-1/6'>

<div className='product '> 
      <Link to={`/productDetails/${product.id}/${product.category.name}`}>

      <img src={product.imageCover} alt={product.title} className='w-full  gap-3'/>
      <span className='block  text-green-600'>{product.category.name}</span>
      <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>

      <div className='flex justify-between items-center'>
        <span>{product.price} EGP </span>
        <span>{product.ratingsAverage}  <i className='fas fa-star text-yellow-400'></i></span>
      </div>

      </Link>
      <button onClick={() => addProduct(product.id)} disabled={loadingProductId === product.id} className='px-4 py-2 mx-auto mt-3 w-full rounded-lg text-white bg-green-600 '>
              {loadingProductId === product.id
                ? <i className='fas fa-spinner fa-spin'></i>
                : 'Add to Cart'
              }
         </button>
      </div>

      </div>

)}
    </div>
    
    </>
  )
}
