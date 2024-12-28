import React, {useEffect} from 'react';
import homeMenuMusic from './assets/sounds/menu_music.mp3';


export default function PlayMusic({ channelState }){
    useEffect(() => {
        if(channelState.state === "menu"){
            playHomeMenuMusic();
        }
    }, [channelState]);
    return null;
}

function playHomeMenuMusic(){
    const music = new Audio(homeMenuMusic);
    music.play();
    fetch('./soundMetadata.json')
    .then(response => response.json())
    .then(data => {
    loopControl(music, data["menu"]["loop"], data["menu"]["start_time"], data["menu"]["end_time"]);
    })
    return null;
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
