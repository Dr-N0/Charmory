'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'
import classList from '@/lib/classList.json';

export default function Class({
    
}: any) {

    const [searchItem, setSearchItem] = useState('');
    const [filtered, setFiltered] = useState(classList);

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = classList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Class</h2>
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
                            }}>
                            {listValue.name}
                        </li>
                    )
                })}
            </div>
        </div>
    );
}