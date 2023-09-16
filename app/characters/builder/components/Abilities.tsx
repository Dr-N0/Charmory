'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Abilities({
    
}: any) {
    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);

    const abilitiesList = [
        {
            name: "Strength",
            alt: "STR",
            value: strength,
        },
        {
            name: "Dexerity",
            alt: "DEX",
            value: dexterity,
        },
        {
            name: "Constitution",
            alt: "CON",
            value: constitution,
        },
        {
            name: "Intelligence",
            alt: "INT",
            value: intelligence,
        },
        {
            name: "Wisdom",
            alt: "WIS",
            value: wisdom,
        },
        {
            name: "Charisma",
            alt: "CHA",
            value: charisma,
        },
    ]

    return (
        <div className={style.abilitiesBox}>
            <h2>Ability Scores</h2>
            <div className={style.dropdown}>
                <button className={style.dropbtn}>Choose a Generation Method</button>
                <div className={style.dropdownContent}>
                    <button className={style.dropdownOption}>Standard Array</button>
                    <button className={style.dropdownOption}>Manual/Rolled</button>
                    <button className={style.dropdownOption}>Point Buy</button>
                </div>
            </div>
            {abilitiesList.map((abilities) => {
                return (
                    <div key={abilities.alt} className={`${style.attribute}`}>
                        <p className={`${style.attributeName}`}>{abilities.alt}</p>
                        <p className={`${style.attributeValue}`}>{abilities.value}</p>
                    </div>
                )
            })}
        </div>
    );
}