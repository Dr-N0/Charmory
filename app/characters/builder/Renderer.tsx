'use client'
import { useState } from 'react'

import style from './Builder.module.css'

import dynamic from 'next/dynamic'

const Race = dynamic(() => import('./components/Race'), { loading: () => <Loading />})
const Class = dynamic(() => import('./components/Class'), { loading: () => <Loading />})
const Abilities = dynamic(() => import('./components/Abilities'), { loading: () => <Loading />})
const Description = dynamic(() => import('./components/Description'), { loading: () => <Loading />})
const Equipment = dynamic(() => import('./components/Equipment'), { loading: () => <Loading />})

export default function Renderer({
    character,
    spellList,
    raceList,
    classList,
    backgroundList,
    equipmentList,
}: any) {
    const [workstation, setWorkstation] = useState(0);
    const [name, setName] = useState(character.name);
    const [previousName, setPreviousName] = useState(character.name);
    const [currentRace, setCurrentRace] = useState("");
    const [toggleRaceStation, setToggleRaceStation] = useState(false);
    const [currentClass, setCurrentClass] = useState("");
    const [toggleClassStation, setToggleClassStation] = useState(false);
    const [currentBackground, setCurrentBackground] = useState("");
    const [toggleBackgroundStation, setToggleBackgroundStation] = useState(false);
    const [currentPack, setCurrentPack] = useState("");
    const [toggleEquipmentStation, setToggleEquipmentStation] = useState(false);

    function renderSwitch(param: string) {
        switch(param) {
            case 'race':
                return <Race raceList={raceList} toggleRaceStation={toggleRaceStation} handleChooseRace={handleChooseRace} />
            case 'class':
                return <Class classList={classList} toggleClassStation={toggleClassStation} handleChooseClass={handleChooseClass} />
            case 'abilities':
                return <Abilities handleChooseAbility={handleChooseAbility} />
            case 'description':
                return <Description backgroundList={backgroundList} toggleBackgroundStation={toggleBackgroundStation} handleChooseBackground={handleChooseBackground} />
            case 'equipment':
                return <Equipment packList={equipmentList.packList} equipmentList={equipmentList.itemList} toggleEquipmentStation={toggleEquipmentStation} handleChooseEquipmentPack={handleChooseEquipmentPack}/>
            default:
                return <h1>Workstation not being used atm</h1>
        }
    }

    function currentName(e: any){
        setName(e.target.value);
    }

    // TODO: RATE LIMIT THE FUCK OUT OF THIS
    async function saveName(e: any) {
        if (name != previousName) {
            const response = await fetch("/api/name", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    characterId: character?.id
                }),
            });
            
            if (!response.ok) {
                throw new Error("Failed to post name");
            }

            setPreviousName(name);
        }
    }

    async function handleChooseRace(value: any, variant: any) {
        if (variant) {
            setCurrentRace(variant);
        } else {
            setCurrentRace(value);
        }
        setToggleRaceStation(true);
        const response = await fetch("/api/race", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                race: value,
                variant: variant,
                characterId: character?.id
            }),
        });
        
        if (!response.ok) {
            setCurrentRace("");
            setToggleClassStation(false);
            throw new Error("Failed to set race");
        }
        
        const data = await response.json();
        return data;
    }

    async function handleChooseClass(value: any) {
        setCurrentClass(value);
        setToggleClassStation(true);
        const response = await fetch("/api/class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                className: value,
                characterId: character.id
            }),
        });
        
        if (!response.ok) {
            setCurrentClass("");
            setToggleClassStation(false);
            throw new Error("Failed to set class");
        }

        const data = await response.json();
        return data;
    }

    async function handleChooseBackground(value: any) {
        setCurrentBackground(value);
        setToggleBackgroundStation(true);
        const response = await fetch("/api/background", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                background: value,
                characterId: character.id
            }),
        });
        
        if (!response.ok) {
            setCurrentBackground("");
            setToggleClassStation(false);
            throw new Error("Failed to set class");
        }

        const data = await response.json();
        return data;
    }

    async function handleChooseEquipmentPack(value: any) {
        setCurrentPack(value);
        setToggleEquipmentStation(true);
        const response = await fetch("/api/equipment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pack: value,
                characterId: character.id
            }),
        });
        
        if (!response.ok) {
            setCurrentPack("");
            setToggleClassStation(false);
            throw new Error("Failed to set class");
        }

        const data = await response.json();
        return data;
    }

    async function handleChooseAbility(value: Number, type: String) {
        const response = await fetch("/api/race", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                race: value,
                variant: type,
                characterId: character?.id
            }),
        });
        
        if (!response.ok) {
            setCurrentRace("");
            setToggleClassStation(false);
            throw new Error("Failed to set race");
        }
        
        const data = await response.json();
        return data;
    }

    return (
        <>
        <main className={style.rendererBox}>
            <div className={`${style.col} ${style.displayContainer}`}>
                <h1 className={style.title}>
                    <span className={style.ch}>Ch </span>
                    <span className={style.ar}>ar </span>
                    <span>&nbsp;Info</span>
                </h1>
                
                <br></br>

                <div className={style.name}>
                    <h2>Name: </h2>
                    <input
                        value={name}
                        onBlur={(event) => saveName(event)}
                        onChange={(event) => currentName(event)}></input>
                </div>
                <br></br>

                {/* Dynamically update IN SHORT CONDENSED TEXT
                any changes made inside the workstation like what
                class was chosen and stuff */}
                <div className={`${style.col} ${style.displayInformation} ${style.displayButtons}`}>
                    <div>
                        <h2>Race</h2>
                        {currentRace == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(1)}>
                                Pick Your Race
                            </button>) :
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(1)}>
                                {currentRace}
                            </button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Class</h2>
                        {currentClass == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(2)}>
                                Choose Your Class
                            </button>) :
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(2)}>
                                {currentClass}
                            </button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Abilities</h2>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(3)}>
                            Set Ability Values
                        </button>
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Description</h2>
                        {currentBackground == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(4)}>
                                Select A Background
                            </button>) :
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(4)}>
                                <span>{currentBackground}</span>
                            </button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Equipment</h2>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(5)}>
                            Add Equipment
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${style.workstationContainer}`}>
                <h1 className={style.title}>
                    <span className={style.ar}>Ar</span>
                    <span className={style.mory}>mory</span>
                    <span>&nbsp;Station</span>
                </h1>
                <div className={`${style.wrapper}`}>
                    {
                        workstation == 1 ? renderSwitch('race') : 
                        workstation == 2 ? renderSwitch('class') :
                        workstation == 3 ? renderSwitch('abilities') :
                        workstation == 4 ? renderSwitch('description') :
                        workstation == 5 ? renderSwitch('equipment') : renderSwitch('')
                    }
                </div>
            </div>
        </main>
        </>
    );
}

function Loading() {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}