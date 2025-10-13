import { useState } from 'react'
import './App.css'
import RenderBackground from './menu.jsx'
import PlayMusic from './sound.jsx'
import RenderChannels from './channel.jsx'

function App() {
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null
  });

  return (
    <div className='home-screen'>
      <RenderBackground channelState={channelState} />
      <PlayMusic channelState={channelState} />
      <RenderChannels channelState={channelState} setChannelState={setChannelState} />
    </div>
  );
}

export default App