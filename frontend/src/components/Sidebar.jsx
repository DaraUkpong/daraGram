import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {RiHomeFill} from 'react-icons/ri';
import { IoIosArrowForward} from 'react-icons/io';
import logo from '../assets/logo.png'
import { categories } from '../utils/data'
import { TbLogout } from 'react-icons/tb';
import {Flowbite, DarkThemeToggle} from 'flowbite-react'

const isNotActiveStyle = "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle = "flex items-center px-5 gap-3 font-extrabold  border-r-2 border-black transition-all duration-200 ease-in-out capitalize dark:border-white";



const Sidebar = ({user, closeToggle}) => {
    const handleCloseSidebar = () => {
        if(closeToggle !== undefined){
            closeToggle(false);
        }

    }

    const logout = () => {
        localStorage.clear();
    
        navigate('/login');
      };
    return ( 
        <div className='flex flex-col justify-between h-full overflow-y-scroll dark:bg-gray-900 dark:text-white min-w-210 hide-scrollbar'>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between'>
                    <Link to='/' className='flex px-5 gap-2 my-6 pt-1 w-190 items-center' onClick={handleCloseSidebar}>
                    <img src={logo} alt="logo"className='w-full' />
                </Link>  
                    <Flowbite>
                <DarkThemeToggle fontSize={30}/>
              </Flowbite>

              
                </div>
            
                <div className='flex flex-col gap-5'>
                    <NavLink
                    to='/'
                    className={({isActive}) => (isActive ? isActiveStyle : isNotActiveStyle )}
                    onClick={handleCloseSidebar}
                    >
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className='mt-3 px-5 text-base 2xl:text-xl'>Discover Feeds</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        
                    
                        <NavLink 
                        to={`/category/${category.name}`}
                        className={({isActive}) => (isActive ? isActiveStyle : isNotActiveStyle)}
                    onClick={handleCloseSidebar}
                    key={category.name}
                        >
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
                {user && (
                    <Link
                    to={`user-profile/${user._id}`}
                    className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3'
                    onClick={handleCloseSidebar}
                    >
                        <img src={user.image} alt="userImage" className='w-10 h-10 rounded-full ' />
                        <p className='dark:text-black'>{user.userName}</p>
                    </Link>
                )}
                {user && (
                    <button
                    
                    className='flex my-1 mb-3 gap-2 p-2 items-center justify-center bg-red-500 rounded-lg shadow-lg mx-5'
                    onClick={logout}
                    >
                        
                    <TbLogout />
                    <p>Logout</p>
                    </button>
                )}

        </div>
     );
}
 
export default Sidebar;