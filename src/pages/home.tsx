import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

interface IMsg {
  user: string;
  msg: string;
}

// create random user
const user = 'User_' + String(new Date().getTime()).substr(-3);

// component
const Index: React.FC = () => {
  const inputRef = useRef(null);

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IMsg[]>([]);
  const [msg, setMsg] = useState<string>('');

  useEffect((): any => {
    // connect to socket server

    const socket = io('http://localhost:3000', {
      path: '/api/socketio',
    });

    // log socket connection
    socket.on('connect', () => {
      console.log('SOCKET CONNECTED!', socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on('message', (message: IMsg) => {
      chat.push(message);
      setChat([...chat]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const message: IMsg = {
        user,
        msg,
      };

      // dispatch message to other users
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      // reset field if OK
      if (resp.ok) setMsg('');
    }

    // focus after click
    inputRef?.current?.focus();
  };

  return (
    <div>
      <div>
        <h1>Realtime Chat App</h1>
        <h2>Next.js and Socket.io</h2>
      </div>
      <div>
        <div>
          {chat.length ? (
            chat.map((chat, i) => (
              <div key={'msg_' + i}>
                <span>{chat.user === user ? 'Me' : chat.user}</span>: {chat.msg}
              </div>
            ))
          ) : (
            <div>No chat messages</div>
          )}
        </div>
        <div>
          <div>
            <div>
              <input
                ref={inputRef}
                type="text"
                value={msg}
                placeholder={connected ? 'Type a message...' : 'Connecting...'}
                disabled={!connected}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
              />
            </div>
            <div>
              <button onClick={sendMessage} disabled={!connected}>
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
