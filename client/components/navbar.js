'use client'
import Link from 'next/link';

export const Navbar = () => {
  return (
    <>
      <nav className='flex items-center flex-wrap bg-slate-800 p-3 '>
        <Link className='inline-flex items-center p-2 mr-4 ' href='/'>
            <span className='text-xl text-white font-bold uppercase tracking-wide'>
              Blog by SP
            </span>
        </Link>
        <div className="w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
            <Link className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center hover:bg-green-600 hover:text-white ' href='/'>
                Home
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};