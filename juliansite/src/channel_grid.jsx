import { useState, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"


export default function ChannelGrid({ channelState, setChannelState }) {


    return (
        <div className="channel-grid">
            {channelMetadata.channels.map((item, index) => (
                <Channel id={index} channelState={channelState} setChannelState={setChannelState} />
            ))}
        </div>
    )
}