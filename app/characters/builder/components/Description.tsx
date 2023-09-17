'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Description({
    
}: any) {
    const backgroundList = [
        {
            name: "Acolyte",
            description: "",
            bonuses: [],
        },
        {
            name: "Charlatan",
            description: "",
            bonuses: [],
        },
        {
            name: "Criminal",
            description: "",
            bonuses: [],
        },
        {
            name: "Entertainer",
            description: "",
            bonuses: [],
        },
        {
            name: "Folk Hero",
            description: "",
            bonuses: [],
        },
        {
            name: "Guild Artisan",
            description: "",
            bonuses: [],
        },
        {
            name: "Hermit",
            description: "",
            bonuses: [],
        },
        {
            name: "Noble",
            description: "",
            bonuses: [],
        },
        
        {
            name: "Outlander",
            description: "",
            bonuses: [],
        },
        {
            name: "Sage",
            description: "",
            bonuses: [],
        },
        {
            name: "Sailor",
            description: "",
            bonuses: [],
        },
        {
            name: "Soldier",
            description: "",
            bonuses: [],
        },
        {
            name: "Urchin",
            description: "",
            bonuses: [],
        },
    ]

    const [backgroundName, setBackgroundName] = useState(backgroundList[0].name);
    const [backgroundDesc, setBackgroundDesc] = useState(backgroundList[0].description);
    const [backgroundBonus, setBackgroundBonus] = useState(backgroundList[0].bonuses);

    function handleBackground(e: any){
        var selectedValue = backgroundList.map(value => {
            if (value.name == e.target.value) {
                setBackgroundName(value.name);
                setBackgroundDesc(value.description);
            }
        });
    }

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Description</h2>
            <div className={style.selectBackgroundContainer}>
                <h2>Background</h2>
                <div className={style.selectBackground}>
                    <label>
                        <select onChange={handleBackground} value={backgroundName}>
                            {backgroundList.map((values: any) => {
                                return (
                                    <option key={values.name} value={values.name}>{values.name}</option>
                                )
                            })}
                        </select>
                    </label>
                </div>
            </div>
            <Background
                name={backgroundName}
                description={backgroundDesc}
                bonuses={backgroundBonus}
            />
            <div>
                
            </div>
        </div>
    );
}

function Background({name, description, bonuses}: any) {
    return (
        <div className={`${style.backgroundBox}`}>
            <div key={name} className={`${style.background}`}>
                <p className={`${style.backgroundName}`}>{name}</p>
                <p className={`${style.backgroundValue}`}>{description}</p>
            </div>
        </div>
    );
}