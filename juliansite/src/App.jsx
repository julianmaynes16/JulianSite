import { useState } from 'react'
import './App.css'
import Menu from './menu.jsx'
import PlayMusic from './sound.jsx'
import Channel from './channel.jsx'

function App() {
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null
  });

  return (
    <div className='home-screen'>
      <Menu channelState={channelState} />
      <PlayMusic channelState={channelState} />
      <Channel id={2} channelState={channelState} setChannelState={setChannelState} />
    </div>
  );
}

export default App