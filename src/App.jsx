import React from 'react'
import Todos from './Todos'
import Navbar from './Navbar'

const App = () => {
  return (
    <div className='bg-zinc-700 w-full h-dvh text-white '>
      {/* <Navbar /> */}
      <h1 className='text-center font-extrabold pt-10 leading-2 text-5xl'>Todo </h1>
      <Todos />
    </div>
  )
}

export default App