import { useState, useEffect, useRef } from 'react'
import "./renderChannels.css"
import channelMetadata from "./channelMetadata.json"

import channelBackground from './assets/channel/ChannelMask.png'
import menuChannelClick from './assets/sounds/ChannelClick.mp3'


import channelHoverBorder from './assets/channel/ChannelHoverBorder.png'
import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import tooltipBackground from './assets/menu/TooltipBackground.png'
import channelMenu from './assets/channel/channelMenu.png'

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
    const channelVideoRef = useRef(null);
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const channelWidth = 320;
    const channelHeight = 240;

    useEffect(() => {
        if(channelVideoRef.current){
            channelVideoRef.current.load();
        }
    }, [channelState]);

    //Hovering over a channel
    const handleChannelHover = () =>{
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
    const handleChannelLeave = () =>{
        //clear tooltip
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        //clears tooltip and border smoothly
        setTooltipVisible(false);

        //remove blue border
        setChannelHoverVisible(false);
    }

    //Clicking on channel
    const handleChannelClick = () =>{
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
            <div className = "channel-container-0">

                {/* Shape of channel with nothing inside */}
                {/* {Array.from({length: 12}, (_, i) => getChannel(0))} */}
                {/* <img src = {channelBackground} className = "channel-background-0"/>
                <img src = {channelBackground} className = "channel-background-1"/> */}
                {/* Video played in the channel */}
                {/* <div className = {`channel-video ${channelSelected ? "selected" : ""}`}>
                    <div className = {`icon-banner`}>
                        <video 
                            width = {channelWidth} 
                            height ={channelHeight} 
                            muted = {true} 
                            autoPlay = {true}  
                            loop = {true}
                            ref = {channelVideoRef}>
                        {console.log(getChannelVideo(channelState,"Homebrew Channel"))}
                            {channelMetadata["channels"]?.["Homebrew Channel"]?.icon && (
                            <source src={getChannelVideo(channelState,"Homebrew Channel")} type="video/mp4" />
                            )}
                            Outdated browser!
                        </video>
                    </div>
                    <div className = {'banner-menu'}>
                        <img src = {channelMenu}/>
                    </div>
                </div> */}

                {/* Blue border when hovering over a channel*/}
                {/* <img src = {channelHoverBorder} 
                        className = {`channel-hover-border ${channelHoverVisible ? "" : "fade-out"} ${channelSelected ? "selected" : ""}`} 
                        onMouseEnter = {handleChannelHover} 
                        onMouseLeave = {handleChannelLeave}
                        onClick = {handleChannelClick}/> */}
                
                {/* Channel tooltip text when hovering over channel */}
                {/* <div className = {`channel-tooltip ${tooltipVisible ? 'visible' : 'hidden'} ${channelSelected ? "selected" : ""}`}> */}
                    {/* Tooltip image */}
                    {/* <img className = {`channel-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'}`}
                            src = {tooltipBackground}/> */}
                    {/* Tooltip text */}
                    {/* <p className = {`channel-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Homebrew Channel</p>
                </div> */}
            </div>
            <div className= "channel-container-1">
                {/* {Array.from({length: 12}, (_, i) => getChannel(0))} */}
            </div>
            <div className= "channel-container-2">
                
            </div>
            <div className= "channel-container-3">
                
            </div>
        </div>
    )
}

function getChannel(id){
    return (
        <img src = {channelBackground} className = {`channel-background-${id}`}/>
    )
}

//Handles if music needs to loop
function getChannelVideo(arg_channelState, channel){
    //console.log(arg_channelState)
    return arg_channelState.state === "menu" ? channelMetadata["channels"][channel]["icon"] : channelMetadata["channels"][channel]["banner"];
}
