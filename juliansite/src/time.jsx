import { useState, useEffect, useRef } from 'react'
import './time.css'

import timeAM from './assets/time/time_am.png'
import timePM from './assets/time/time_pm.png'
import timeColon from './assets/time/time_colon.png'
import time0 from './assets/time/time_0.png'
import time1 from './assets/time/time_1.png'
import time2 from './assets/time/time_2.png'
import time3 from './assets/time/time_3.png'
import time4 from './assets/time/time_4.png'
import time5 from './assets/time/time_5.png'
import time6 from './assets/time/time_6.png'
import time7 from './assets/time/time_7.png'
import time8 from './assets/time/time_8.png'
import time9 from './assets/time/time_9.png'

const timeDict = {
    "0": time0,
    "1": time1,
    "2": time2,
    "3": time3,
    "4": time4,
    "5": time5,
    "6": time6,
    "7": time7,
    "8": time8,
    "9": time9,
    "am": timeAM,
    "pm": timePM
}

export default function RenderTime({ hour, minute, ampm, show_colon }) {
    return (
        <div>
            {/* First hour digit, no leading 0 */}
            {hour[0] !== "0" &&
                <img src={timeDict[hour[0]]} className="hour-digit-0" />
            }

            {/* Second hour digit */}
            <img src={timeDict[hour[1]]} className="hour-digit-1" />

            {/* Colon, flashing */}
            <img src={timeColon} className={`colon ${show_colon}`} />

            {/* First minute digit */}
            <img src={timeDict[minute[0]]} className="minute-digit-0" />

            {/* Second minute Digit */}
            <img src={timeDict[minute[1]]} className="minute-digit-1" />

            {/* AM PM */}
            <img src={timeDict[ampm]} className="am-pm" />
        </div>
    )
}
