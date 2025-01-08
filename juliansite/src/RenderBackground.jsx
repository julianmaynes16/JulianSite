import { useState, useEffect, useRef } from 'react'

import RenderTime from './RenderTime.jsx'
import homeMenuBottom from './assets/homeMenuBottom.png'
import homeMenuBackground from './assets/HomeMenuBackground.jpg'
import MailButton from './assets/MailButton.png'
import './renderBackground.css'

import menuHoverSound from './assets/sounds/MenuHover.mp3'
import tooltipSound from './assets/sounds/tooltipSound.mp3'
import tooltipBackground from './assets/TooltipBackground.png'

export default function RenderBackground(){
    const tooltipTime = useRef(null);
    const tooltipShow = useRef(new Audio(tooltipSound));

    // const [time,setTime] = useState(getTime());
    const [showColon, setShowColon] = useState(true);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        // const interval = setInterval(()=> {
        //     setTime(getTime());
        // }, 1000);

        const colonInterval = setInterval(() => {
            setShowColon((prev)=> !prev);
        }, 1000);

        return () => {
            //clearInterval(interval);
            clearInterval(colonInterval);
        };
    }, []);

    const handleMenuHover = () =>{
        const music = new Audio(menuHoverSound);
        music.play();
        tooltipTime.current = setTimeout(() => {
            tooltipShow.current.play();
            setTooltipVisible(true);
        }, 300);
    };

    const handleMenuLeave = () =>{
        clearTimeout(tooltipTime.current);
        tooltipTime.current = null;
        setTooltipVisible(false);
    }


    return(
        <div className = "combined-home-screen">
            <img src = {homeMenuBackground} alt="Background" className = "background"/>
            <div className = "bottom">
                <img src = {homeMenuBottom} alt="Bottom" className = "home-bottom"/>
                <img src = {MailButton} alt="Mail" className = "mail-button" onMouseEnter = {handleMenuHover} onMouseLeave = {handleMenuLeave}/>
                    
                <div className = {`mail-tooltip ${tooltipVisible ? 'visible' : 'hidden'}`}>
                    <img className = {`mail-tooltip-background ${tooltipVisible ? 'visible' : 'hidden'}`}
                            src = {tooltipBackground}/>
                    <p className = {`mail-tooltip-text ${tooltipVisible ? 'visible' : 'hidden'}`}>Message Board</p>
                </div>

                <div className = "time-container">
                    <div className = "time">
                        <RenderTime 
                        hour = {getHour()}
                        minute = {getMinute()}
                        ampm = {getAMPM()}
                        show_colon = {showColon}
                        />
                    </div>
                    <div className = "date">
                        {getDate()}
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
    return minute.toString().padStart(1,'0');
}

function getAMPM(){
    const today = new Date();
    const ampm = today.getHours() >= 12 ? "pm" : "am";
    return ampm;
}