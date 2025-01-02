import { useState } from 'react'
import './App.css'
import RenderBackground from './RenderBackground.jsx'
import PlayMusic from './soundEngine.jsx'
import RenderChannels from './RenderChannels.jsx'

function App() {
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null
  });

  return (
    <div className='home-screen'>
      <RenderBackground/>
      <PlayMusic channelState ={channelState}/>
      <RenderChannels channelState = {channelState} setChannelState={setChannelState}/>
    </div>
  );
}

export default App