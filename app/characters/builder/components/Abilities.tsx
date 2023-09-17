'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Abilities({
    
}: any) {
    const [genMethod, setGenMethod] = useState("standard");
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

    function handleGen(e: any){
        setGenMethod(e.target.value);
    }

    // TODO: Ability row is static and pushes the screen
    // when it gets too small 

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Ability Scores</h2>
            <div className={style.selectBackgroundContainer}>
                <h2>Generation Method</h2>
                <div className={style.selectGenMethod}>
                    <label>
                        <select onChange={handleGen} value={genMethod}>
                            <option value="standard">Standard Array</option>
                            <option value="manual">Manual/Rolled</option>
                            <option value="buy">Point Buy</option>
                        </select>
                    </label>
                </div>
            </div>
            {
                genMethod == "standard" ? 
                    <Standard
                        abilitiesList={abilitiesList}
                    /> :
                genMethod == "manual" ? 
                    <Manual
                        abilitiesList={abilitiesList}
                    /> :
                genMethod == "buy" ?
                    <PointBuy
                        abilitiesList={abilitiesList}
                    /> : ""
            }
        </div>
    );
}

function Standard(abilitiesList: any) {
    const aList = abilitiesList.abilitiesList;
    return (
        <div className={`${style.abilityBox}`}>
            {aList.map((abilities: any) => {
                return (
                    <div key={abilities.alt} className={`${style.ability}`}>
                        <p className={`${style.attributeName}`}>{abilities.alt}</p>
                        <p className={`${style.attributeValue}`}>{abilities.value}</p>
                    </div>
                )
            })}
        </div>
    );
}

function Manual(abilitiesList: any) {
    const aList = abilitiesList.abilitiesList;
    return (
        <div className={`${style.abilityBox}`}>
            {aList.map((abilities: any) => {
                return (
                    <div key={abilities.alt} className={`${style.ability}`}>
                        <p className={`${style.attributeName}`}>{abilities.alt}</p>
                        <p className={`${style.attributeValue}`}>{abilities.value}</p>
                    </div>
                )
            })}
        </div>
    );
}

function PointBuy(abilitiesList: any) {
    const aList = abilitiesList.abilitiesList;
    return (
        <div className={`${style.abilityBox}`}>
            {aList.map((abilities: any) => {
                return (
                    <div key={abilities.alt} className={`${style.ability}`}>
                        <p className={`${style.attributeName}`}>{abilities.alt}</p>
                        <p className={`${style.attributeValue}`}>{abilities.value}</p>
                    </div>
                )
            })}
        </div>
    );
}