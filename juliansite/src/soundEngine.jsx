import React, {useEffect, useRef} from 'react';
import homeMenuMusic from './assets/sounds/menu_music.mp3';
import menuZoomInSound from './assets/sounds/menuZoomInSound.mp3'


export default function PlayMusic({ channelState }){
    const menu_music = useRef(new Audio(homeMenuMusic));
    console.log(channelState.state);
    useEffect(() => {
        if(channelState.state === "menu"){
            playHomeMenuMusic(menu_music.current);
        }
        else{
            playChannelMusic(menu_music.current);
        }

        return () => {
            menu_music.current.pause();
            menu_music.current.currentTime = 0;
        };
    }, [channelState]);
    return null;
}

function playHomeMenuMusic(menu_music){
    menu_music.play();
    fetch('./soundMetadata.json')
    .then(response => response.json())
    .then(data => {
    loopControl(menu_music, data["menu"]["loop"], data["menu"]["start_time"], data["menu"]["end_time"]);
    })
    return null;
}

function playChannelMusic(menu_music){
    console.log(!menu_music.paused)
    if(!menu_music.paused){
        menu_music.pause();
    }
    const zoomInSound = new Audio(menuZoomInSound)
    setTimeout(() => {
        zoomInSound.play();
    }, 300);
}

function loopControl(music, loop, start_time, end_time){
    if(loop){
        music.ontimeupdate = () => {
            if(music.currentTime >= end_time){
                music.currentTime = start_time;
            }
        };
    }
}
