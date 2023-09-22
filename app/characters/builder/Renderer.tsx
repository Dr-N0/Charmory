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
    raceList,
    classList,
    spellList
}: any) {
    const [workstation, setWorkstation] = useState(0);
    const [currentRace, setCurrentRace] = useState("");
    const [currentClass, setCurrentClass] = useState("");

    function renderSwitch(param: string) {
        switch(param) {
            case 'race':
                return <Race raceList={raceList} handleChooseRace={handleChooseRace} />
            case 'class':
                return <Class classList={classList} handleChooseClass={handleChooseClass} getSpellsByClassName />
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

    const handleChooseRace = (characterRace: any) => {
        setCurrentRace(characterRace);
    }

    const handleChooseClass = (characterClass: any) => {
        setCurrentClass(characterClass);
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
                    <span>Name: </span><input placeholder='name'></input>
                </div>

                {/* Dynamically update IN SHORT CONDENSED TEXT
                any changes made inside the workstation like what
                class was chosen and stuff */}
                <div className={`${style.col} ${style.displayInformation} ${style.displayButtons}`}>
                    <div>
                        <h2>Race</h2>
                        {currentRace == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(1)}>Pick Your Race</button>) :
                            ("")
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Class</h2>
                        {currentClass == '' ?
                            (<button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setWorkstation(2)}>Choose Your Class</button>) :
                            ("")
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