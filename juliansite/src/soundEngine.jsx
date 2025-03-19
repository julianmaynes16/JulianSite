import React, {useEffect, useRef} from 'react';
import homeMenuMusic from './assets/sounds/menu_music.mp3';
import menuZoomInSound from './assets/sounds/menuZoomInSound.mp3'

const ZOOMIN_DELAY = 300;
const ZOOMIN_SOUND_DURATION = 522;
const CHANNEL_MUSIC_START_OFFSET = -40;

export default function PlayMusic({ channelState }){
    const menu_music = useRef(new Audio(homeMenuMusic));
    useEffect(() => {
        //If in menu play background music
        if(channelState.state === "menu"){
            playHomeMenuMusic(menu_music.current);
        }
        //If selected a channel play its music
        else{
            fetch('./channelMetadata.json')
            .then(response => response.json())
            .then(data => {
                playChannelMusic(menu_music.current, data["channels"][channelState.channel]);
            })
        }
        
        return () => {
            menu_music.current.pause();
            menu_music.current.currentTime = 0;
        };
    }, [channelState]);
    return null;
}

//Playing home menu music
function playHomeMenuMusic(menu_music){
    menu_music.play();
    loopControl(menu_music, "menu");
    return null;
}

//Playing channel music
function playChannelMusic(menu_music, channel){
    //If the menu music is playing, pause it
    if(!menu_music.paused){
        menu_music.pause();
    }

    //play zoom in sound after delay
    const zoomInSound = new Audio(menuZoomInSound);
    setTimeout(() => {
        zoomInSound.play();
    }, ZOOMIN_DELAY);
    
    //Play channel music after zoomin sound finishes
    const channelMusic = new Audio(channel["music"]);
        setTimeout(() => {
        channelMusic.play();
        loopControl(channelMusic, channel["name"]);
    }, ZOOMIN_DELAY + CHANNEL_MUSIC_START_OFFSET  + ZOOMIN_SOUND_DURATION);

}

//Handles if music needs to loop
function loopControl(music, music_type){
    //Refers to soundMetadata.json
    fetch('./soundMetadata.json')
    .then(response => response.json())
    .then(data => {

        //If audio needs to loop
        if(data[music_type]["loop"]){
            //If music reaches the end then go back to the start of loop
            music.ontimeupdate = () => {
                if(music.currentTime >= data[music_type]["end_time"]){
                    music.currentTime = data[music_type]["start_time"];
                }
            };
        }
    });
}
