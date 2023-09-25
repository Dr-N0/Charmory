'use client'
import { ChangeEvent, useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Abilities({
    
}: any) {
    const [genMethod, setGenMethod] = useState("manual");
    const [strength, setStrength] = useState(8);
    const [dexterity, setDexterity] = useState(8);
    const [constitution, setConstitution] = useState(8);
    const [intelligence, setIntelligence] = useState(8);
    const [wisdom, setWisdom] = useState(8);
    const [charisma, setCharisma] = useState(8);
    const [pointBuy, setPointBuy] = useState(27);

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

    // const standardArray = [8, 10, 12, 13, 14, 15];
    

    function handleGen(e: any){
        setGenMethod(e.target.value);
    }
    
    const handleManualSave = async (type: string, e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Set these into the db with the params 18 max, 0 min
            // switch (type){
            //     case "strength":
            //         if (target < 3) {
            //             setStrength(3);
            //         } else if (target > 18) {
            //             setStrength(18);
            //         } else {
            //             setStrength(target);
            //         }
            //         break;
            //     case "dexterity":
            //         if (target < 3) {
            //             setDexterity(3);
            //         } else if (target > 18) {
            //             setDexterity(18);
            //         } else {
            //             setDexterity(target);
            //         }
            //         break;
            //     case "constitution":
            //         if (target < 3) {
            //             setConstitution(3);
            //         } else if (target > 18) {
            //             setConstitution(18);
            //         } else {
            //             setConstitution(target);
            //         }
            //         break;
            //     case "intelligence":
            //         if (target < 3) {
            //             setIntelligence(3);
            //         } else if (target > 18) {
            //             setIntelligence(18);
            //         } else {
            //             setIntelligence(target);
            //         }
            //         break;
            //     case "wisdom":
            //         if (target < 3) {
            //             setWisdom(3);
            //         } else if (target > 18) {
            //             setWisdom(18);
            //         } else {
            //             setWisdom(target);
            //         }
            //         break;
            //     case "charisma":
            //         if (target < 3) {
            //             setCharisma(3);
            //         } else if (target > 18) {
            //             setCharisma(18);
            //         } else {
            //             setCharisma(target);
            //         }
            //         break;
            //     default:
            //         break;
            // }
        } catch (error: any) {
            console.log(error)
        }
    };

    const handleManualInput = (type: string, event: ChangeEvent<HTMLInputElement>) => {
        let target = parseInt(event.target.value);

        switch (type){
            case "strength":
                if (target > 18) {
                    setStrength(18);
                } else {
                    setStrength(target);
                }
                break;
            case "dexterity":
                if (target > 18) {
                    setDexterity(18);
                } else {
                    setDexterity(target);
                }
                break;
            case "constitution":
                if (target > 18) {
                    setConstitution(18);
                } else {
                    setConstitution(target);
                }
                break;
            case "intelligence":
                if (target > 18) {
                    setIntelligence(18);
                } else {
                    setIntelligence(target);
                }
                break;
            case "wisdom":
                if (target > 18) {
                    setWisdom(18);
                } else {
                    setWisdom(target);
                }
                break;
            case "charisma":
                if (target > 18) {
                    setCharisma(18);
                } else {
                    setCharisma(target);
                }
                break;
            default:
                break;
        }
    };

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
                            {/* <option value="standard">Standard Array</option> */}
                            <option value="manual">Manual/Rolled</option>
                            {/* <option value="buy">Point Buy</option> */}
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
                    (
                        <div className={`${style.abilityBox}`}>
                            <div className={style.manualInputBox}>
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={strength}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("strength", event)}
                                    onChange={(event) => handleManualInput("strength", event)}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={dexterity}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("dexterity", event)}
                                    onChange={(event) => handleManualInput("dexterity", event)}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={constitution}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("constitution", event)}
                                    onChange={(event) => handleManualInput("constitution", event)}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={intelligence}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("intelligence", event)}
                                    onChange={(event) => handleManualInput("intelligence", event)}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={wisdom}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("wisdom", event)}
                                    onChange={(event) => handleManualInput("wisdom", event)}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={charisma}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("charisma", event)}
                                    onChange={(event) => handleManualInput("charisma", event)}
                                />
                            </div>
                            <hr></hr>
                            <div className={style.manualInputBox}>
                                {abilitiesList.map((abilities: any) => {
                                    return (
                                        <div key={abilities.alt} className={`${style.ability}`}>
                                            <p className={`${style.attributeName}`}>{abilities.alt}</p>
                                            <p className={`${style.attributeValue}`}>{abilities.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) :
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