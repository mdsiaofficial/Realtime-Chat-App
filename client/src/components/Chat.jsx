import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client'
import './Chat.css'
const PORT = 8000;
let socket;

const Chat = () => {
  const location = useLocation()
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = `localhost:${PORT}`;

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)
    // console.log(data);
    // console.log(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    console.log(name, room);
    console.log(socket);

    socket.emit('join', { name, room }, () => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }

  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message)
      setMessages([...messages, message]);
    })
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }




  return (

    <div>
      <div className='flex justify-center text-center items-center bg-gray-600'>
        <h1 className=' text-5xl bg-purple-500 rounded-2xl p-3 absolute top-10 text-center'>Realtime Chat App</h1>

      </div>

      <div className="OuterContainer flex justify-center text-center h-[100vh] items-center bg-gray-600">
        <div className="container">
          <input
            type="text"
            name=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
            id=""
          />
        </div>
      </div>
    </div>

  )
}

export default Chat