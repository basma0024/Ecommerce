import React, { useContext, useEffect, useState } from 'react'
import style from './cart.module.css' 
import  { cartContext } from '../../context/CartContext'

export default function Cart() {
  let {getUserCart, updateCartCountItem,deleteProduct,clearCart}=useContext(cartContext);

  const [cartDetails, setcartDetails] = useState(null)
    
  async function getCart(){
   let response= await  getUserCart(); 
    setcartDetails(response?.data.data);

  } 

  async function updateCartCount(productId,count){
   let response= await  updateCartCountItem(productId,count); 
    setcartDetails(response?.data.data);

  }  
  async function deleteItem(productId){
   let response= await  deleteProduct(productId); 
    setcartDetails(response?.data.data);

  }

  async function clear(){
   let response= await  clearCart(); 
    setcartDetails(response.data.data);

  }


  useEffect(() =>{
    getCart();
    updateCartCount();
    deleteItem();
    clear();
  },[] )


  return (
    <>
            {/* <button onClick={()=> clear}>clear Cart</button> */}

    <h2 className='mx-auto text-center '>total</h2>
    <p className='mx-auto text-center '>{cartDetails?.totalCartPrice}</p>
<div className="relative overflow-x-auto  sm:rounded-lg">
    <table className="w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  uppercase bg-gray-50  dark:text-gray-400">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          {cartDetails?.products?.map((product) => 
              <tr key={product.product.id} className="bg-white border-b  hover:bg-gray-50 ">
              <td className="p-4"> 
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple iMac"/>
              </td>
              
              <td className="px-6 py-4 font-semibold  dark:text-white">
              {product.product.title}
              </td>
              <td className="px-6 py-4">
                  <div className="flex items-center">
                      <button onClick={()=> updateCartCount(product.product.id,product.count-1)} className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
                          </svg>
                      </button>
                      <div className="ms-3">
                        <span>{product.count}</span>

                      </div>
                      <button onClick={()=> updateCartCount(product.product.id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                          </svg>
                      </button>
                  </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP 
              </td>
              <td className="px-6 py-4">
                  <span onClick={()=> deleteItem(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Remove</span>
              </td>
          </tr>

          ) }
         
          
         
        </tbody>
    </table>
</div>

    
    </>
  )
}
