import { useState, useEffect, useRef } from 'react'
import "./renderChannels.css"
import homebrewMenuVideo from './assets/videos/homebrew_menu_2.mp4'
import channelBackground from './assets/channel/ChannelMask.png'
import channeljson from './channelMetadata.json'
import menuChannelClick from './assets/sounds/ChannelClick.mp3'

import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'
import channelHoverBorder from './assets/channel/ChannelHoverBorder.png'
import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import tooltipBackground from './assets/menu/TooltipBackground.png'

export default function RenderChannels({ channelState, setChannelState }){
    // const channels = [];
    // fetch('./channelMetadata.json')
    // .then(response => response.json())
    // .then(data => {
    // for(let i = 0; i < data[channels].length; i++){

    // }
    // })
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [channelHoverVisible, setChannelHoverVisible] = useState(false);
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const channelWidth = 320;
    const channelHeight = 240;

    const handleMenuHover = () =>{
        if(channelState.state === "menu"){
            const hover_sound = new Audio(menuHoverSound);
            hover_sound.play();
            setChannelHoverVisible(true);
            tooltipTime.current = setTimeout(() => {
                tooltipShow.current.play();
                setTooltipVisible(true);
            }, 300);
        }
    };
    
    const handleMenuLeave = () =>{
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        setChannelHoverVisible(false);
        setTooltipVisible(false);
    }

    const handleMenuClick = () =>{
        const channel_click_sound = new Audio(menuChannelClick);
        channel_click_sound.play();
        setTimeout(() => {
            
            setChannelState({
                state: "selected",
                channel: "Homebrew Channel",
            })

        }, 200);
    }
    return(
        <div>
            <img src = {channelSelectBackground} className = {`channel-select-background ${channelState.state === "selected" ? "selected" : "unselected"}`}/>
            <div className = "channel-container">
                <img src = {channelBackground} className = "channel-background"/>
                <div className = "channel">
                    <video 
                        width = {channelWidth}
                        height ={channelHeight}
                        muted = {true}
                        autoPlay = {true}
                        loop = {true}>
                        <source src = {homebrewMenuVideo} type = "video/mp4" />
                        Outdated browser!
                    </video>

                </div>
                <img src = {channelHoverBorder} 
                        className = {`channel-hover-border ${channelHoverVisible ? "" : "fade-out"} ${channelState.state === "selected" ? "selected" : ""}`} 
                        onMouseEnter = {handleMenuHover} 
                        onMouseLeave = {handleMenuLeave}
                        onClick = {handleMenuClick}/>
                <div className = {`channel-tooltip ${tooltipVisible ? 'visible' : 'hidden'}`}>
                    <img className = {`channel-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'} ${channelState.state === "selected" ? "selected" : ""}`}
                            src = {tooltipBackground}/>
                    <p className = {`channel-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Homebrew Channel</p>
                </div>
                
            </div>
        </div>
    )
}