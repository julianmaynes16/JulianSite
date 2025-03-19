import { useState, useEffect, useRef } from 'react'
import "./renderChannels.css"
import homebrewMenuVideo from './assets/videos/homebrew_menu_2.mp4'
import channelBackground from './assets/channel/ChannelMask.png'
import menuChannelClick from './assets/sounds/ChannelClick.mp3'


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
    const [channelSelected, setChannelSelected] = useState(false);
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const channelWidth = 320;
    const channelHeight = 240;

    //Hovering over a channel
    const handleMenuHover = () =>{
        if(channelState.state === "menu"){
            //Play sound for entering hitbox
            const hover_sound = new Audio(menuHoverSound);
            hover_sound.play();

            //Signal to show the blue border
            setChannelHoverVisible(true);

            //Play extended hover sound if still on the channel after a bit
            tooltipTime.current = setTimeout(() => {
                tooltipShow.current.play();
                setTooltipVisible(true);
            }, 300);
        }
    };
    
    //Exiting the channel hitbox
    const handleMenuLeave = () =>{
        //clear tooltip
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        //clears tooltip and border smoothly
        setTooltipVisible(false);

        //remove blue border
        setChannelHoverVisible(false);
    }

    //Clicking on channel
    const handleMenuClick = () =>{
        //play audio
        const channel_click_sound = new Audio(menuChannelClick);
        channel_click_sound.play();

        //Set the state to the selected channel after a bit
        setTimeout(() => {
            setChannelSelected(true);
            setChannelState({
                state: "selected",
                channel: "Homebrew Channel",
            });

        }, 200);
    }
    return(
        <div>
            <div className = "channel-container">

                {/* Shape of channel with nothing inside */}
                <img src = {channelBackground} className = "channel-background"/>
                {/* Video played in the channel */}
                <div className = "channel-video">
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

                {/* Blue border when hovering over a channel*/}
                <img src = {channelHoverBorder} 
                        className = {`channel-hover-border ${channelHoverVisible ? "" : "fade-out"} ${channelSelected ? "selected" : ""}`} 
                        onMouseEnter = {handleMenuHover} 
                        onMouseLeave = {handleMenuLeave}
                        onClick = {handleMenuClick}/>
                
                {/* Channel tooltip text when hovering over channel */}
                <div className = {`channel-tooltip ${tooltipVisible ? 'visible' : 'hidden'} ${channelSelected ? "selected" : ""}`}>
                    {/* Tooltip image */}
                    <img className = {`channel-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'}`}
                            src = {tooltipBackground}/>
                    {/* Tooltip text */}
                    <p className = {`channel-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Homebrew Channel</p>
                </div>
            </div>
        </div>
    )
}