import React from 'react'
import Search from '../Search/Search'
import SearchPage from '../../Pages/SearchPage'
import { Link } from 'react-router-dom'

interface Props {}

const Navbar = (props: Props) => {
  return (
    <>
      <nav className="relative w-full py-2 px-12 bg-[#0e1115]">
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-20'>
            <div className='hidden font-bold lg:flex'>
              <Link to="/favourites" className='text-white hover:text-gray-600'>Favourites</Link>
            </div>

          </div>
          <div className='hidden lg:flex items-center space-x-6 text-black'>
            <div className='text-white hover:text-blue-950'>Login</div>
            <a href=''
              className='px-4 py-3 font-bold rounded text-white bg-black hover:opacity-70'
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar