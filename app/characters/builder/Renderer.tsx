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
    raceList,
    classList,
    spellList
}: any) {
    const [workstation, setWorkstation] = useState(0);
    const [currentRace, setCurrentRace] = useState("");
    const [toggleRaceStation, setToggleRaceStation] = useState(false);
    const [currentClass, setCurrentClass] = useState("");
    const [toggleClassStation, setToggleClassStation] = useState(false);

    function renderSwitch(param: string) {
        switch(param) {
            case 'race':
                return <Race raceList={raceList} toggleRaceStation={toggleRaceStation} handleChooseRace={handleChooseRace} />
            case 'class':
                return <Class classList={classList} toggleClassStation={toggleClassStation} handleChooseClass={handleChooseClass} getSpellsByClassName />
            case 'abilities':
                return <Abilities />
            case 'description':
                return <Description />
            case 'equipment':
                return <Equipment />
            default:
                return <h1>Workstation not being used atm</h1>
        }
    }

    async function getCharacters(session: any) {
        const response = await fetch("/api/getCharacters", {
            headers: {
            Authorization: `Bearer ${session.accessToken}`,
            },
        });
        
        if (!response.ok) {
            throw new Error("Failed to fetch characters");
        }
        
        const characters = await response.json();
        return characters;
    }

    async function handleChooseRace(characterRace: any) {
        setCurrentRace(characterRace);
        setToggleRaceStation(true);
        const response = await fetch("/api/race", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                race: characterRace,
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

    async function handleChooseClass (characterClass: any) {
        setCurrentClass(characterClass);
        setToggleClassStation(true);
        const response = await fetch("/api/class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                className: characterClass,
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
                    <span>Name: </span>
                    <input></input>
                </div>
                <br></br>

                {/* Dynamically update IN SHORT CONDENSED TEXT
                any changes made inside the workstation like what
                class was chosen and stuff */}
                <div className={`${style.col} ${style.displayInformation} ${style.displayButtons}`}>
                    <div>
                        <h2>Race</h2>
                        {currentRace == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(1)}>Pick Your Race</button>) :
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(1)}>{currentRace}</button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Class</h2>
                        {currentClass == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(2)}>Choose Your Class</button>) :
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(2)}>{currentClass}</button>)
                        }
                        
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Abilities</h2>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(3)}>Set Ability Values</button>
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Description</h2>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(4)}>Write Description</button>
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Equipment</h2>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(5)}>Add Equipment</button>
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