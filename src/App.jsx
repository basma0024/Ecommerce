import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import LayOut from './components/LayOut/LayOut';
import About from './components/About/About';
import Products from './components/Products/Products';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import Home from './components/Home/Home';
import Forget from './components/forget/Forget';
import CounterContextProvider from './context/CounterContext';
import userContextProvider from './context/userContext';

let x = createBrowserRouter([
  { path:'',element:<LayOut/>, children:[
    { index : true , element: <Home/> },
    // { path : 'home' , element: <Home/> },
    {path : 'about', element : <About/> },
    {path : 'products', element : <Products/> },
    {path : 'brands', element : <Brands/> },
    {path : 'cart', element : <Cart/> },
    {path : 'categories', element : <Categories/> },
    {path : 'login', element : <Login/> },
    {path : 'register', element : <Register/> },
    {path : 'forget', element : <Forget/> },
    {path : '*', element : <NotFound/> },
   
  ]}

])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <userContextProvider>

    <CounterContextProvider>

      <RouterProvider router={x}/>

    </CounterContextProvider>


    </userContextProvider>


    </>
    
     
  )
}

export default App
