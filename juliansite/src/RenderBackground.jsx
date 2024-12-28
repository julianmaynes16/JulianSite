import { useState, useEffect, useRef } from 'react'
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

    const [time,setTime] = useState(getTime());
    const [showColon, setShowColon] = useState(true);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        const interval = setInterval(()=> {
            setTime(getTime());
        }, 1000);

        const colonInterval = setInterval(() => {
            setShowColon((prev)=> !prev);
        }, 1000);

        return () => {
            clearInterval(interval);
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
            <img src = {homeMenuBottom} alt="Bottom" className = "home-bottom"/>
            <img src = {homeMenuBackground} alt="Background" className = "background"/>
            <img src = {MailButton} alt="Mail" className = "mail-button" onMouseEnter = {handleMenuHover} onMouseLeave = {handleMenuLeave}/>
            {tooltipVisible && (
                
                <div className = "mail-tooltip">
                    <img className = "mail-tooltip-background"
                         src = {tooltipBackground}/>
                    <p className = "mail-tooltip-text">Message Board</p>
                </div>
            )}
            
            <p className = "time-container">
                <span className = "time-left">
                    {getTime().split(':')[0]}
                </span>
                <span className = {`colon ${showColon ? 'visible' : 'hidden'}`}>:</span>
                <span className = "time-right">
                    {getTime().split(':')[1]}
                </span>
                <span className = "am-pm">
                    {getAMPM()}
                </span>
                <span className = "date-text">{getDate()}</span>
            </p>
        </div>
    );
}

function getDate(){
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    return dayOfWeek[today.getDay()] + " " + (today.getMonth() + 1) + "/" + today.getDate();
}

function getTime(){
    const today = new Date();
    let hour = today.getHours();
    if(hour === 0){
        hour = 12;
    }
    else if(hour > 12){
        hour = (hour % 13)+1;
    }
    return hour + ":" + (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
}

function getAMPM(){
    const today = new Date();
    const ampm = today.getHours() >= 12 ? "PM" : "AM";
    return ampm;
}