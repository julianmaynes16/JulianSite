import { useState, useEffect, useRef } from 'react'
import Channel from './channel.jsx'
import './channel_grid.css'
import channelMetadata from "./channelMetadata.json"

const numChannelsDesktop = 12;
const numChannelsMobile = 6;
const scroll_index = 0;

export default function ChannelGrid({ channelState, setChannelState }) {


    return (
        <div className="channels-container">
            <div className="channel-column">
                {scroll_index != 0 &&
                    <div>
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                    </div>
                }
            </div>
            <div className="channel-grid">
                {channelMetadata.channels.map((item, index) => (
                    <Channel id={index} channelState={channelState} setChannelState={setChannelState} />
                ))}
                {[...Array(numChannelsDesktop - channelMetadata.channels.length).keys()].map(key => <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />)}

            </div>
            <div className="channel-column">
                {scroll_index != (channelMetadata.const.number_of_pages - 1) &&
                    <div>
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                        <Channel id={channelMetadata.channels.length - 1} channelState={channelState} setChannelState={setChannelState} />
                    </div>
                }
            </div>
        </div >
    )
}

function getChannelColumnId(index) {
    if (window.innerWidth < 750) {
        return
    }
}