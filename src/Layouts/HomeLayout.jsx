import {AiFillCloseCircle} from "react-icons/ai"
import {FiMenu} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../Redux/Slices/AuthSlice"

const HomeLayout = ({children}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = false // useSelector((state)=> state?.auth?.isLoggedIn)

  const role = useSelector((state)=> state?.auth?.role)


  const changeWidth =() =>{
    console.log("clicked")
    const drawerSide = document.getElementsByClassName('drawer-side');
    console.log(drawerSide)
    drawerSide[0].style.width ='auto';
  }

  const hideDrawer =()=>{
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false

    const drawerSide = document.getElementsByClassName('drawer-side');
    drawerSide[0].style.width ="0";

  }
   const handleLogout = async (e)=>{
    e.preventDefault();
    const res = await dispatch(logout())
    if(res?.payload?.success)
    navigate("/")
  }

  
  return (
    <div className='min-h-[90vh]'>
        <div className='drawer absolute left-0 z-50 w-fit'>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
           <div className="drawer-content">
             <label htmlFor="my-drawer"          className="cursor-pointer relative">
                <FiMenu size={"32px"}
                className='font-bold text-white m-4'
                onClick={()=>changeWidth()}/>
             </label>
             
           </div>
           <div className="drawer-side w-0">
              <label htmlFor='my-drawer' className='drawer-overlay'></label>
              <ul className='menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative h-[100%]'>
                <li className='w-fit absolute right-2 z-50'>
                  <button onClick={hideDrawer}>
                     <AiFillCloseCircle/>
                  </button>
                </li>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                {isLoggedIn && role === "ADMIN" && (
                  <li>
                    <Link to='/admin/dashboard'> Admin DashBoard</Link>
                  </li>
                )}
                <li>
                  <Link to='/courses'>All courses</Link>
                </li>
                <li>
                  <Link to='/contact'>Contact Us</Link>
                </li>
                <li>
                  <Link to='/about'>About</Link>
                </li>
                {
                  !isLoggedIn && (
                    <li className="absolute bottom-0 w-[90%]">
                      <div className="w-full flex items-center justify-center">
                        <button className="btn-primary px-4 py-1 font-semibold rounded-full w-full bg-red-300">
                          <Link to='/login'>Login</Link>
                        </button>
                        <button className="btn-primary px-4 py-1 font-semibold rounded-full w-full bg-red-300">
                          <Link to='/signup'>Sign Up</Link>
                        </button>

                      </div>
                    </li>
                  )
                }

                {
                  isLoggedIn && (
                    <li className="absolute bottom-4 w-[90%]">
                      <div className="w-full flex items-center justify-center">
                        <button className="btn-primary px-4 py-1 font-semibold rounded-full w-full">
                          <Link to='/user/profile'>Profile</Link>
                        </button>
                        <button className="btn-primary px-4 py-1 font-semibold rounded-full w-full">
                          <Link onClick={handleLogout}>Log Out</Link>
                        </button>

                      </div>
                    </li>
                  )
                }

              </ul>
           </div>
        </div>
        
        {children}
        <Footer/>
      
    </div>
  )
}

export default HomeLayout
