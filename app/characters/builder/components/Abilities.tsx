'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Abilities({
    
}: any) {

    return (
        <div className={style.abilitiesBox}>
            <h1>Abilities</h1>
            <ul>
                <li><input /></li>
                <li><input /></li>
                <li><input /></li>
                <li><input /></li>
                <li><input /></li>
                <li><input /></li>
            </ul>
        </div>
    );
}