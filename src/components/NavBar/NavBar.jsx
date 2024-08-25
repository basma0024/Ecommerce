import style from './navBar.module.css';
import logo from '../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
// import { UserContext } from '../../context/UserContext'; // Correct the import here

export default function NavBar() {
  let navigate = useNavigate();
  let { token, setToken } = useContext(UserContext); // Corrected context usage

  function logOut() {
    localStorage.removeItem('token');
    setToken(null); // Use setToken from context
    navigate('/login');
  }

 



  return (
    <>
   <nav className='bg-gray-100 lg:fixed static top-0 left-0 right-0 py-2 z-50'>
    <div className="container mx-auto py-2 flex flex-col lg:flex-row justify-between">

    <div className='flex flex-col lg:flex-row items-center'>
      <img src={logo} alt="logo" width={110}/>  
    
      <ul className='flex flex-col lg:flex-row items-center'>

        {token !==null ? <>
        
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to=''> Home </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='cart'> Cart </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='products'> Products </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='brands'> Brands </NavLink>  </li>
        <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='categories'> Categories </NavLink>  </li>
        </>:null }


      </ul>
    </div>
    <div>

    <ul className='flex flex-col lg:flex-row items-center '>

          {token ==null ? <>
          
          <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='login'> Log In </NavLink>  </li>
          <li className='py-2'> <NavLink className='mx-2  text-lg text-slate-900 ' to='register'> Register </NavLink>  </li>
            
            </>:null} 

          {token !==null ? <><li className='py-2' onClick={logOut}> <span className='mx-2  text-lg text-slate-900 hover:cursor-pointer' to='products'> LogOut </span> </li></> :null}
        

        <li className='flex items-center'>
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
          <i className='fab fa-facebook mx-2'></i>
        </li>
      </ul>

    </div>

    </div>
   </nav>





    </>



  )
}
