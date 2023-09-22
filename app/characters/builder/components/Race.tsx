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
    const [selectedRace, setSelectedRace] = useState('');
    const [raceName, setRaceName] = useState('');
    const [variantList, setVariantList] = useState([]);

    const openModal = (name: any) => {
        setIsOpen(true);
        setSelectedRace(name);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSelect = (selectedRace: any) => {
        setIsOpen(false);
        handleChooseRace(selectedRace);
    }

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = raceList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    const toggleVariants = (name: any, list: any) => {
        if (raceName == name && variantList == list) {
            setRaceName("");
            setVariantList([]);
        } else {
            setRaceName(name);
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
                                        <div className={style.inputDiv} onClick={()=> toggleVariants(listValue.name, listValue.variants)}>
                                            {listValue.name} ({listValue.variants.length})

                                            {raceName == listValue.name && variantList ?
                                                (<span className={style.dropdownArrow}>▼</span>) :
                                                (<span className={style.dropdownArrow}>►</span>)
                                            }
                                            {raceName == listValue.name && variantList ?
                                                variantList.map((variant: any) => {
                                                    return (
                                                        <div key={variant} className={style.inputVariants} onClick={() => openModal(variant)} >
                                                            {variant}
                                                        </div>
                                                    )
                                                }) :
                                                ("")
                                            }
                                        </div> :
                                        (<span onClick={()=> openModal(listValue.name)} className={style.inputSpan}>
                                            {listValue.name}
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
                                            {selectedRace}
                                        </li>
                                    )})}
                                    <button onClick={() => handleSelect(selectedRace)}>Select Race</button>
                                </ul>
                            </div>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
}

{/* <div onClick={()=> openModal(listValue.variants)} className={style.inputDiv}>
    {listValue.name}
</div> */}

