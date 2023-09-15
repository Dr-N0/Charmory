'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Race({
    renderSwitch
}: any) {

    const raceList = [
        {
            name: "ds",
        }
    ]

    return (
        <div className={style.raceBox}>
            <button onClick={renderSwitch}>asdfsadf</button>
        </div>
    );
}