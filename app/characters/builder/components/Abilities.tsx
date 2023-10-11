'use client'
import { ChangeEvent, useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Abilities({
    handleChooseAbility,
}: any) {
    const [genMethod, setGenMethod] = useState("manual");
    const [pointBuy, setPointBuy] = useState(27);

    const [strength, setStrength] = useState(10);
    const [dexterity, setDexterity] = useState(10);
    const [constitution, setConstitution] = useState(10);
    const [intelligence, setIntelligence] = useState(10);
    const [wisdom, setWisdom] = useState(10);
    const [charisma, setCharisma] = useState(10);
    

    const abilitiesList = [
        { name: "Strength", alt: "STR", value: strength },
        { name: "Dexterity", alt: "DEX", value: dexterity },
        { name: "Constitution", alt: "CON", value: constitution },
        { name: "Intelligence", alt: "INT", value: intelligence },
        { name: "Wisdom", alt: "WIS", value: wisdom },
        { name: "Charisma", alt: "CHA", value: charisma },
      ];
    
    function handleGen(e: any) {
        setGenMethod(e.target.value);
    }

    const setValue = (type: string, target: number) => {
        switch (type) {
            case 'strength':
                setStrength(target);
                break;
            case 'dexterity':
                setDexterity(target);
                break;
            case 'constitution':
                setConstitution(target);
                break;
            case 'intelligence':
                setIntelligence(target);
                break;
            case 'wisdom':
                setWisdom(target);
                break;
            case 'charisma':
                setCharisma(target);
                break;
            default:
                break;
        }
    
        return target;
    };
    
    const handleManualSave = async (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            const sanitizedValue = Math.max(1, Math.min(18, parseInt(e.currentTarget.value)));
            const value = setValue(type, sanitizedValue);
            await handleChooseAbility({ type, value });
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleManualInput = (type: string, event: React.ChangeEvent<HTMLInputElement>) => {
        let target = parseInt(event.target.value);
        setValue(type, target);
    };
    
    
    const select = (event: any) => {
        event.target.select();
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
                                    onClick={select}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={dexterity}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("dexterity", event)}
                                    onChange={(event) => handleManualInput("dexterity", event)}
                                    onClick={select}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={constitution}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("constitution", event)}
                                    onChange={(event) => handleManualInput("constitution", event)}
                                    onClick={select}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={intelligence}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("intelligence", event)}
                                    onChange={(event) => handleManualInput("intelligence", event)}
                                    onClick={select}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={wisdom}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("wisdom", event)}
                                    onChange={(event) => handleManualInput("wisdom", event)}
                                    onClick={select}
                                />
                                <input
                                    className={style.manualInput}
                                    type='number'
                                    value={charisma}
                                    min="3"
                                    max="18"
                                    onBlur={(event) => handleManualSave("charisma", event)}
                                    onChange={(event) => handleManualInput("charisma", event)}
                                    onClick={select}
                                />
                            </div>
                            <hr></hr>
                            <div className={style.manualInputBox}>
                                {abilitiesList.map((abilities: any) => {
                                    return (
                                        <div key={abilities.alt} className={`${style.ability}`}>
                                            <p className={`${style.attributeName}`}>{abilities.alt}</p>
                                            <p className={`${style.attributeValue}`}>{abilities.value || 0}</p>
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