import React from 'react'
import Link from 'next/link'; 

const Header = () => {
  return (
    <div className='bg-navBlue text-bold text-2xl text-white lg:px-32 sm:px-6 md:px-8 mx-auto flex items-center justify-between py-4 px-4 relative'>
      <Link href="/" className="hover:button text-2xl font-bold">
        Quick Vote
      </Link>
    </div>
  )
}

export default Header;
