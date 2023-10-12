'use client'
import { useState } from 'react'
import style from './Builder.module.css'
import dynamic from 'next/dynamic'

const Race = dynamic(() => import('./components/Race'), { loading: () => <Loading /> })
const Class = dynamic(() => import('./components/Class'), { loading: () => <Loading /> })
const Abilities = dynamic(() => import('./components/Abilities'), { loading: () => <Loading /> })
const Description = dynamic(() => import('./components/Description'), { loading: () => <Loading /> })
const Equipment = dynamic(() => import('./components/Equipment'), { loading: () => <Loading /> })

export default function Renderer({
  character,
  spellList,
  raceList,
  classList,
  backgroundList,
  equipmentList,
}: any) {
    const [name, setName] = useState(character.name);
    const [previousName, setPreviousName] = useState(character.name);
    const [state, setState] = useState({
        workstation: 0,
        currentRace: "",
        toggleRaceStation: false,
        currentClass: "",
        toggleClassStation: false,
        currentAbilities: character.abilities,
        currentBackground: "",
        toggleBackgroundStation: false,
        currentPack: "",
        toggleEquipmentStation: false,
        extraEquipment: [],
        loading: false,
    });

    const {
        workstation,
        currentRace,
        toggleRaceStation,
        currentClass,
        toggleClassStation,
        currentAbilities,
        currentBackground,
        toggleBackgroundStation,
        currentPack,
        toggleEquipmentStation,
        extraEquipment,
        loading,
    } = state;
    
    function renderSwitch(param: string) {
        switch(param) {
            case 'race':
                return <Race raceList={raceList} toggleRaceStation={toggleRaceStation} handleChooseRace={handleChooseRace} />
            case 'class':
                return <Class classList={classList} toggleClassStation={toggleClassStation} handleChooseClass={handleChooseClass} />
            case 'abilities':
                return <Abilities abilityList={currentAbilities} handleChooseAbility={handleChooseAbility} />
            case 'description':
                return <Description backgroundList={backgroundList} toggleBackgroundStation={toggleBackgroundStation} handleChooseBackground={handleChooseBackground} />
            case 'equipment':
                return <Equipment packList={equipmentList.packList} equipmentList={equipmentList.itemList} toggleEquipmentStation={toggleEquipmentStation} handleChooseEquipmentPack={handleChooseEquipmentPack} extraEquipment={extraEquipment} />
            default:
                return <h1>Workstation not being used atm</h1>
        }
    }

    const setWorkstation = (value: number) => {
        setState((prevState) => ({ ...prevState, workstation: value }));
    };

    function currentName(e: any){
        setName(e.target.value);
    }

    const toggleStation = (stationKey: string) => {
        setState((prevState: any) => ({ ...prevState, [stationKey]: !prevState[stationKey] }));
    };

    const handleAsyncOperation = async (apiEndpoint: string, data: object, successCallback: Function, stationKey: string) => {
        if (stationKey != "") {
            setState((prevState) => ({ ...prevState, loading: true }));
        }

        try {
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Failed to ${successCallback.name.toLowerCase()}`);
            }

            const responseData = await response.json();
            successCallback(responseData);
            if (stationKey != "") {
                toggleStation(stationKey);
            }
        } catch (error) {
            console.error(error);
        } finally {
            if (stationKey != "") {
                setState((prevState) => ({ ...prevState, loading: false }));
            }
        }
    };

    // TODO: RATE LIMIT THE FUCK OUT OF THESE
    const saveName = async (e: any) => {
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
    };

    const handleChooseRace = async (value: any, variant: any) => {
        const data = { race: variant || value, variant, characterId: character?.id };
        await handleAsyncOperation("/api/race", data, () => {
            setState((prevState) => ({ ...prevState, currentRace: data.race }));
        }, 'toggleRaceStation');
    };

    const handleChooseClass = async (value: any) => {
        const data = { className: value, characterId: character.id };
        await handleAsyncOperation("/api/class", data, () => {
            setState((prevState) => ({ ...prevState, currentClass: data.className }));
        }, 'toggleClassStation');
    };

    const handleChooseAbility = async (type: string, value: number) => {
        let updatedAbilities = { ...character.abilities, [type]: value };
        const data = { updatedAbilities: updatedAbilities, characterId: character?.id };

        try {
            await handleAsyncOperation("/api/ability", data, () => {
                setState((prevState) => ({
                    ...prevState,
                    currentAbilities: updatedAbilities,
                }));
            }, '');
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleChooseBackground = async (value: any) => {
        const data = { background: value, characterId: character.id };
        await handleAsyncOperation("/api/background", data, () => {
            setState((prevState) => ({ ...prevState, currentBackground: data.background }));
        }, 'toggleBackgroundStation');
    };
    
    const handleChooseEquipmentPack = async (value: any) => {
        const data = { pack: value, characterId: character.id };
        await handleAsyncOperation("/api/equipment", data, () => {
            setState((prevState) => ({ ...prevState, currentPack: data.pack }));
        }, 'toggleEquipmentStation');
    };

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
                        {currentRace == '' ? (
                            <button className={`${style.hvrFadeWhite} ${style.displayButtonUnselected}`} onClick={(e:any) => setWorkstation(1)}>
                                Pick Your Race
                            </button>
                            ) : (
                                <button className={`${style.hvrFadeWhite} ${style.displayButtonSelected}`} onClick={(e:any) => setWorkstation(1)}>
                                    {currentRace}
                                </button>
                            )
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Class</h2>
                        {currentClass == '' ? (
                            <button className={`${style.hvrFadeWhite} ${style.displayButtonUnselected}`} onClick={(e:any) => setWorkstation(2)}>
                                Choose Your Class
                            </button>
                            ) : (
                            <button className={`${style.hvrFadeWhite} ${style.displayButtonSelected}`} onClick={(e:any) => setWorkstation(2)}>
                                {currentClass}
                            </button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Abilities</h2>
                        <div>
                            {currentAbilities ? (
                                <button className={`${style.hvrFadeWhite} ${style.displayButtonSelected}`} onClick={(e) => setWorkstation(3)}>
                                    Change Ability Values
                                </button>
                                ) : (
                                <button className={`${style.hvrFadeWhite} ${style.displayButtonUnselected}`} onClick={(e) => setWorkstation(3)}>
                                    Set Ability Values
                                </button>
                            )}
                            {/* <div>
                                {Object.entries(currentAbilities).map(([key, value]: any) => (
                                    <p key={key}>
                                        {key}: {value}
                                    </p>
                                ))}
                            </div> */}
                        </div>
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Description</h2>
                        {currentBackground == '' ? (
                            <button className={`${style.hvrFadeWhite} ${style.displayButtonUnselected}`} onClick={(e:any) => setWorkstation(4)}>
                                Select A Background
                            </button>
                            ) : (
                            <button className={`${style.hvrFadeWhite} ${style.displayButtonSelected}`} onClick={(e:any) => setWorkstation(4)}>
                                <span>{currentBackground}</span>
                            </button>)
                        }
                    </div>
                    <hr></hr>
                    <div>
                        <h2>Equipment</h2>
                        <button className={`${style.hvrFadeWhite} ${style.displayButtonUnselected}`} onClick={(e:any) => setWorkstation(5)}>
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
                {loading ? (
                    <Loading />
                ) : (
                    <>{
                        workstation == 1 ? renderSwitch("race") :
                        workstation == 2 ? renderSwitch("class") :
                        workstation == 3 ? renderSwitch("abilities") :
                        workstation == 4 ? renderSwitch("description") :
                        workstation == 5 ? renderSwitch("equipment") : renderSwitch("")
                    }</>
                )}
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