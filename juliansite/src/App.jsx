import { useState } from 'react'
import './App.css'
import RenderBackground from './RenderBackground.jsx'
import PlayMusic from './soundEngine.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [channelState, setChannelState] = useState({
    state: "menu",
    channel: null
  });
  return (
    <>
      <RenderBackground/>
      <PlayMusic channelState ={channelState}/>
    </>
  );
}

export default App