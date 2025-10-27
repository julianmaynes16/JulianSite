import { useState, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"


export default function ChannelGrid({ channelState, setChannelState }) {


    return (
        <div>
            <div className="channel-grid">
                {channelMetadata.channels.map((item, index) => (
                    <Channel id={index} channelState={channelState} setChannelState={setChannelState} />
                ))}
            </div>
            <div className="channel-column">
                <Channel id={1} />
                <Channel id={1} />
                <Channel id={1} />
            </div>
        </div>
    )
}

function getChannelColumnId() {

}