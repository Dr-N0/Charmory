'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Class({
    classList,
    toggleClassStation,
    handleChooseClass
}: any) {

    const [searchItem, setSearchItem] = useState('');
    const [filtered, setFiltered] = useState(classList);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');

    const openModal = (name: any) => {
        setIsOpen(true);
        setSelectedClass(name);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSelect = (selectedClass: any) => {
        setIsOpen(false);
        handleChooseClass(selectedClass)
    }

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = classList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    const classFeatureList = [
        {
            name: "racialTrait1"
        }
    ]

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Class</h2>
            {toggleClassStation ? (<div>class station</div>) :
            (
            <>
                <input
                    className={style.inputMain}
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder='Type to search'
                />
                <div className={style.inputValues}>
                    {filtered.map((listValue: any) => {
                        return (
                            <li
                                key={listValue.name}
                                className={style.classListValues}
                                style={{
                                    backgroundColor: listValue.color
                                }}
                                onClick={()=> openModal(listValue.name)}
                                >
                                {listValue.name}
                            </li>
                        )
                    })}
                    {isOpen && (
                        <div className={style.modal} onClick={closeModal}>
                            <ul className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                                <span onClick={closeModal}>x</span>
                                {classFeatureList.map((trait: any) => {return(
                                    <li key={trait.name} className={style.inputLi}>
                                        {selectedClass}
                                    </li>
                                )})}
                                <button onClick={() => handleSelect(selectedClass)}>Select Class</button>
                            </ul>
                        </div>
                    )}
                </div>
            </>)}
        </div>
    );
}