import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_576,w_576/v1684855112/assets/96/4dd3d1-94e7-481e-b28c-08d59353b9e0/original/earner-illustra.png)] h-screen flex pt-8 justify-between flex-col w-full'>
            <img className='w-24 ml-8' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"  alt="logo" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>
                    Get Started with Uber
                </h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>

        </div>

    </div>
  )
}

export default Home