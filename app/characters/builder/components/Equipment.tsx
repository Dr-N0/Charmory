'use client'
import { ChangeEvent, useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Equipment({
    equipmentList,
    toggleEquipmentStation,
    handleChooseEquipment,
}: any) {
    const [chooseMethod, setChooseMethod] = useState("packs");
    const [searchItem, setSearchItem] = useState('');
    const [filtered, setFiltered] = useState(equipmentList);

    const handleSelect = (selected: any) => {
        console.log('Selected: ', selected);
    }

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = equipmentList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Equipment</h2>
            {toggleEquipmentStation ? (<div>class station</div>) :
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
                                onClick={() => handleSelect}>
                                {listValue.name}
                            </li>
                        )
                    })}
                </div>
            </>)}
        </div>
    );
}

// {
//     "name": "Waterskin",
//     "description": "A container designed for holding water.",
//     "group": "Containers",
//     "cost": {
//         "value": 2,
//         "type": "sp"
//     },
//     "weight": {
//         "value": 5,
//         "type": "lb"
//     },
//     "qty": 1
// },