import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Join.css'

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div>
      <div className='flex justify-center text-center items-center bg-gray-600'>
        <h1 className=' text-5xl bg-purple-500 rounded-2xl p-3 absolute top-20 text-center'>Realtime Chat App</h1>

      </div>

      <div className="joinOuterContainer flex justify-center text-center h-[100vh] items-center bg-gray-600">
        <div className="joinInnerContainer w-[20%] ">
          <h1 className="heading text-white text-4xl pb-3 border-b-2 border-white">Join</h1>
          <div>
            <input
              type="text"
              placeholder=''
              className='joinInput mt-10 rounded-sm px-4 py-5 w-[100%]'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder=''
              className='joinInput mt-10 rounded-sm px-4 py-5 w-[100%]'
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>

          <Link
            onClick={(e) => (!name || !room) ? e.preventDefault() : null}
            to={`/chat?name=${name}&room=${room}`}
          >
            <button className='button mt-10 text-white uppercase no-underline p-5 rounded-md inline-block border w-[100%] focus:outline-0' type="submit">Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Join