'use client'
import { useState } from 'react'
import Image from 'next/image'
import style from './BuilderComponents.module.css'
import dynamic from 'next/dynamic'

export default function Race({
    raceList,
    toggleRaceStation,
    handleChooseRace
}: any) {
    const [searchItem, setSearchItem] = useState('');
    const [filtered, setFiltered] = useState(raceList);
    const [isOpen, setIsOpen] = useState(false);
    const [tempName, setTempName] = useState('');
    const [variantList, setVariantList] = useState([]);
    const [race, setRace] = useState(raceList[0]);

    const openModal = (race: any) => {
        setIsOpen(true);
        
        setRace(race);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSelect = (currentRace: any) => {
        const { name, variants } = currentRace;
        setIsOpen(false);
        if (!variants) {
            handleChooseRace(tempName, name);
        } else {
            handleChooseRace(name, null);
        }
    }

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);

        const filteredItems = raceList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    const toggleVariants = (name: any, list: any) => {
        if (tempName == name && variantList == list) {
            setTempName("");
            setVariantList([]);
        } else {
            setTempName(name);
            setVariantList(list);
        }
    }

    const racialTraitList = [
        {
            name: "racialTrait1"
        }
    ]

    // TODO: Use shit descriptions of things and
    // kick them if window size too small

    // THE BETTER WAY TO DO THIS WAS TO JUST MAKE EVERY LIST ITEM A BUTTON AND HANDLE EACH OF THESE ONCLICK EVENTS SEPARATELY
    // BUT I USED INLINE ELEMENTS WHICH MESSED THINGS UP

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Race</h2>
            {toggleRaceStation ? (<div>asdf</div>) : (
                <>
                <input
                    className={style.inputMain}
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder='Type to search'
                />
                <ul className={style.inputUl}>
                    {filtered.map((listValue: any) => {
                        return (
                            <li key={listValue.name} className={style.inputLi}>
                                { listValue.variants.length > 0 ?
                                    <div
                                    className={style.inputBox}
                                    style={{
                                        backgroundColor: listValue.color
                                    }}
                                    onClick={() => toggleVariants(listValue.name, listValue.variants)}>
                                        <div className={style.listHeading}>
                                            <span className={style.raceName}>{listValue.name} ({listValue.variants.length})</span>
                                            
                                            {tempName == listValue.name && variantList ?
                                                (<span className={`${style.dropDownArrow} ${style.dropDownDArrow}`}></span>) :
                                                (<span className={`${style.dropDownArrow} ${style.dropDownRArrow}`}></span>)
                                            }

                                            <i className={style.raceDescription}>"{listValue.description}"</i>
                                        </div>
                                        <div className={style.variantBox}>
                                            {tempName == listValue.name && variantList ?
                                                variantList.map((variant: any) => {
                                                    return (
                                                        <div
                                                        key={variant.name}
                                                        className={style.inputVariants}
                                                        style={{
                                                            backgroundColor: variant.color
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            openModal(variant);
                                                        }}>
                                                            {variant.name}
                                                            <p style={{marginTop: 5}}><i>"{variant.description}"</i></p>
                                                        </div>
                                                    )
                                                }) :
                                                ("")
                                            }
                                        </div>
                                    </div> :
                                    (<span
                                        className={style.inputBox}
                                        style={{
                                            backgroundColor: listValue.color
                                        }}
                                        onClick={()=> openModal(listValue)}>
                                        {listValue.name}
                                        <p style={{marginTop: 5}}><i>"{listValue.description}"</i></p>
                                    </span>)
                                }
                            </li>
                        )
                    })}
                    {isOpen && (
                        <div className={style.modal} onClick={closeModal}>
                            <ul className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                                <span onClick={closeModal}>x</span>
                                {racialTraitList.map((trait: any) => {return(
                                    <li key={trait.name} className={style.inputLi}>
                                        {race.name}
                                    </li>
                                )})}
                                <button onClick={() => handleSelect(race)}>Select Race</button>
                            </ul>
                        </div>
                    )}
                </ul>
                </>
            )}
        </div>
    );
}