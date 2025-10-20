import { useState, useEffect, useRef } from 'react'
import "./channel.css"
import channelMetadata from "./channelMetadata.json"

import channelBackground from './assets/channel/ChannelMaskIcon.png'
import menuChannelClick from './assets/sounds/ChannelClick.mp3'


import channelHoverBorder from './assets/channel/ChannelHoverBorder.png'
import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import channelMenu from './assets/channel/channelMenu.png'
import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'



export default function Channel({ id, channelState, setChannelState }) {

    // const [tooltipVisible, setTooltipVisible] = useState(false);
    const [hoverVisible, setHoverVisible] = useState(false);
    const [channelSelected, setChannelSelected] = useState(false);
    // const channelVideoRef = useRef(null);
    // const tooltipTime = useRef(null);
    // const tooltipShow = useRef(new Audio(tooltipSound));

    // const channelWidth = 320;
    // const channelHeight = 240;

    // useEffect(() => {
    //     if (channelVideoRef.current) {
    //         channelVideoRef.current.load();
    //     }
    // }, [channelState]);

    const handleChannelHover = () => {
        if (channelState.state === "menu") {
            //Play sound for entering hitbox
            const hover_sound = new Audio(menuHoverSound);
            hover_sound.play();

            //Signal to show the blue border
            setHoverVisible(true);

            //Play extended hover sound if still on the channel after a bit
            // tooltipTime.current = setTimeout(() => {
            //     tooltipShow.current.play();
            //     setTooltipVisible(true);
            // }, 300);
        }
    };

    //Exiting the channel hitbox
    const handleChannelLeave = () => {
        //clear tooltip
        // clearTimeout(tooltipTime.current);
        // tooltipTime.current = null;
        // //clears tooltip and border smoothly
        // setTooltipVisible(false);

        //remove blue border
        setHoverVisible(false);
    }

    //Clicking on channel
    const handleChannelClick = () => {
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

    return (
        <div className={`channel-container ${channelState.state == "menu" ? "menu" : "selected"}`}>

            {channelState.state == "menu" &&
                <div>
                    <img src={channelBackground} className="channel-background" />
                    <video
                        className="video"
                        width={320}
                        height={240}
                        muted={true}
                        autoPlay={true}
                        loop={true}>
                        <source src={channelMetadata["channels"][id]["icon"]} type="video/mp4" />
                        Outdated browser!
                    </video>
                    <img src={channelHoverBorder}
                        className={`hover-border ${hoverVisible ? "" : "fade-out"} ${channelSelected ? "selected" : ""}`}
                        onMouseEnter={handleChannelHover}
                        onMouseLeave={handleChannelLeave}
                        onClick={handleChannelClick} />
                </div>
            }
            {channelState.state == "selected" &&
                <div>
                    <img src={channelSelectBackground}
                        className="select-background" />
                    <div className="banner">

                    </div>
                </div>

            }
        </div>
    )
}

//Handles if music needs to loop
// function getChannelVideo(arg_channelState, channel) {
//     //console.log(arg_channelState)
//     return arg_channelState.state === "menu" ? channelMetadata["channels"][0]["icon"] : channelMetadata["channels"][channel]["banner"];
// }

function loadChannel() {
    if (screen.width < 2) {
        console.log("hi")
    }
}