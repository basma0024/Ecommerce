import axios from 'axios';
import React, { createContext } from 'react'


export let cartContext=createContext();

export default function CartContextProvider(props) { 

   
        let headers={
            token: localStorage.getItem('token')
        }
    


     function getUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then(data => data)
        .catch(err =>err)
    }

    function addToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId}, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    function deleteProduct(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    

    function updateCartCountItem(productId, count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count}, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    function clearCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
       .then(data => data)
       .catch(err =>err)
    }

    

  return (
    <cartContext.Provider value={{getUserCart,addToCart,updateCartCountItem,deleteProduct,clearCart}}>
        {props.children}
    </cartContext.Provider>
  )
}



   