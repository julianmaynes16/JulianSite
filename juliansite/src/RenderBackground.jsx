import { useState, useEffect, useRef } from 'react'

import RenderTime from './RenderTime.jsx'
import homeMenuBottom from './assets/menu/homeMenuBottom.png'
import homeMenuBackground from './assets/menu/HomeMenuBackground.jpg'
import MailButton from './assets/menu/MailButton.png'
import './renderBackground.css'

import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import tooltipBackground from './assets/menu/TooltipBackground.png'

import channelSelectBackground from './assets/channel/ChannelSelectBackground.png'

export default function RenderBackground({ channelState }){
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    const [showColon, setShowColon] = useState(true);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    // Colon flashing every second
    useEffect(() => {
        const colonInterval = setInterval(() => {
            setShowColon((prev)=> !prev);
        }, 1000);

        return () => {
            clearInterval(colonInterval);
        };
    }, []);

    //Hovering over button on bottom bar
    const handleMenuHover = () =>{
        //Play sound for entering button hitbox
        const music = new Audio(menuHoverSound);
        music.play();

        tooltipTime.current = setTimeout(() => {
            //Play sound for staying in the toolbox for a certain time
            tooltipShow.current.play();
            //Show tooltip 
            setTooltipVisible(true);
        }, 300);
    };

    //Leaving hitbox of button
    const handleMenuLeave = () =>{
        //Clear tooltip
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        setTooltipVisible(false);
    }


    return(
        <div>
            {/* Black background when you select a channel */}
            <img src = {channelSelectBackground} className = {`channel-select-background ${channelState.state === "selected" ? "selected" : "unselected"}`}/> 

            <div className = {`combined-home-screen ${channelState.state}`}>
                {/* White striped background*/}
                <img src = {homeMenuBackground} alt="Background" className = "background"/>
                
                {/* Bottom bar */}
                <div className = "bottom">

                    {/*Bottom bar image*/}
                    <img src = {homeMenuBottom} alt="Bottom" className = "home-bottom"/>
                    
                    <div className="mail">
                        {/* Mail button image */}
                        <img src = {MailButton} alt="Mail" className = "mail-button" onMouseEnter = {handleMenuHover} onMouseLeave = {handleMenuLeave}/>

                        <div className = {`mail-tooltip ${tooltipVisible ? 'visible' : 'hidden'}`}>
                            {/* Mail Tooltip image */}
                            <img className = {`mail-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'}`}
                                    src = {tooltipBackground}/>
                            {/* Mail tooltip text */}
                            <p className = {`mail-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Message Board</p>
                        </div>
                    </div>

                    <div className = "time-container">
                        <div className = "time">
                            {/* hour, minute, am pm rendering */}
                            <RenderTime 
                            hour = {getHour()}
                            minute = {getMinute()}
                            ampm = {getAMPM()}
                            show_colon = {showColon}
                            />
                        </div>

                        {/* Day of week, date render */}
                        <div className = "date">
                            {getDate()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


function getDate(){
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return dayOfWeek[today.getDay()] + " " + (today.getMonth() + 1) + "/" + today.getDate();
}


function getHour(){
    const today = new Date();
    let hour = today.getHours() % 12;
    if(hour === 0){
        hour = 12;
    }
    return hour.toString().padStart(2, '0');
}

function getMinute(){
    const today = new Date();
    let minute = today.getMinutes();
    return minute.toString().padStart(2,'0');
}

function getAMPM(){
    const today = new Date();
    const ampm = today.getHours() >= 12 ? "pm" : "am";
    return ampm;
}