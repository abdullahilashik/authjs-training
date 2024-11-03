import React from 'react'

const Header = () => {
  return (
    <section className='bg-black h-[400px] w-full z-10'>
        <div className="container h-full">
            <div className="flex flex-col items-center justify-center h-full">
                {/* content */}
                <div className="flex flex-col items-center text-white">
                    <h1 className='font-bold text-5xl'>Brokers' Community</h1>
                    <p>A Community built for the brokers!</p>
                </div>
                {/* search form */}
                <form action="#" className='bg-white w-3/4 rounded shadow p-1 flex items-center justify-between mt-5'>
                    <input type="text" placeholder='Type for getting the data' className='p-2 flex-1 outline-none border-none' />
                    <select name="" id="" className='border-l-2 pl-4 border-black'>
                        <option value="">All Categories</option>
                    </select>
                </form>                
            </div>
        </div>
    </section>
  )
}

export default Header