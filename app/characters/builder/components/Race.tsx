'use client'
import { useState } from 'react'
import Image from 'next/image'
import style from './BuilderComponents.module.css'
import dynamic from 'next/dynamic'
import raceList from '@/lib/raceList.json';

export default function Race({
    renderSwitch
}: any) {
    const [searchItem, setSearchItem] = useState('');
    const [filtered, setFiltered] = useState(raceList);

    const handleInputChange = (e: any) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = raceList.filter((list: any) =>
            list.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFiltered(filteredItems);
    }

    // TODO: Use shit descriptions of things and
    // kick them if window size too small

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Race</h2>
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
                            {listValue.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}