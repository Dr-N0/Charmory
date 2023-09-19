'use client'
import { useState } from 'react'
import Image from 'next/image'
import style from './BuilderComponents.module.css'

export default function Race({
    renderSwitch
}: any) {
    const raceList = [
        {
            name: "Aarakocra",
        },
        {
            name: "Aasimar",
            variants: [
                "Fallen Aasimar",
                "Protector Aasimar",
                "Scourge Aasimar",
            ],
        },
        {
            name: "Bugbear",
        },
        {
            name: "Centaur",
        },
        {
            name: "Changeling"
        },
        {
            name: "Dragonborn",
            variants: [
                "Basic Dragonborn",
                "Draconblood Dragonborn",
                "Ravenite Dragonborn",
            ],
        },
        {
            name: "Duergar",
        },
        {
            name: "Drow",
        },
        {
            name: "Dwarf",
            variants: [
                "Hill Dwarf",
                "Mountain Dwarf",
            ],
        },
        {
            name: "Eladrin",
            variants: [
                "Autumn Eladrin",
                "Spring Eladrin",
                "Summer Eladrin",
                "Winter Eladrin",
            ],
        },
        {
            name: "Elf",
            variants: [
                "High Elf",
                "Sea Elf",
                "Wood Elf",
            ],
        },
        {
            name: "Firbolg",
        },
        {
            name: "Gith",
            variants: [
                "Githyanki",
                "Githzerai",
            ],
        },
        {
            name: "Gnome",
            variants: [
                "Deep Gnome",
                "Forest Gnome",
                "Rock Gnome",
            ],
        },
        {
            name: "Goblin",
        },
        {
            name: "Goliath",
        },
        {
            name: "Half-Elf",
        },
        {
            name: "Half-Orc",
        },
        {
            name: "Halfling",
            variants: [
                "Lightfoot Halfling",
                "Stout Halfling",
            ],
        },
        {
            name: "Hobgoblin",
        },
        {
            name: "Human",
        },
        {
            name: "Kenku",
        },
        {
            name: "Kobold",
        },
        {
            name: "Lizardfolk",
        },
        {
            name: "Orc",
        },
        {
            name: "Shadar-Kai",
        },
        {
            name: "Tabaxi",
        },
        {
            name: "Tiefling",
            variants: [
                "Asmodeus Tiefling",
                "Baalzebul Tiefling",
                "Dispater Tiefling",
                "Fierna Tiefling",
                "Glasya Tiefling",
                "Levistus Tiefling",
                "Mammon Tiefling",
                "Mephistopheles Tiefling",
                "Zariel Tiefling",
            ]
        },
        {
            name: "Triton",
        },
        {
            name: "Yuan-ti",
        },
    ]

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