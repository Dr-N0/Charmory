'use client'
import { useState } from 'react'

import style from './BuilderComponents.module.css'

export default function Class({
    
}: any) {
    const classList = [
        {
            name: "Artificer",
            subClasses: [
                "Artillerist",
                "Armorer",
                "Battle Smith",
                "Alchemist",
            ],
        },
        {
            name: "Barbarian",
            subClasses: [
                "Path of the Zealot",
                "Path of the Ancestral Guardian",
                "Path of the Berserker",
                "Path of the Totem Warrior",
                "Path of the Storm Herald",
                "Path of Wild Magic",
                "Path of the Beast",
            ],
        },
        {
            name: "Bard",
            subClasses: [
                "College of Eloquence",
                "College of Swords",
                "College of Whispers",
                "College of Creation",
                "College of Glamor",
                "College of Valor",
                "College of Lore",
            ],
        },
        {
            name: "Cleric",
            subClasses: [
                "Knowledge",
                "Tempest Domain",
                "War Domain",
                "Forge Domain",
                "Order Domain",
                "Twilight Domain",
                "Peace Domain",
                "Nature Domain",
                "Grave Domain",
                "Light Domain",
                "Life Domain",
                "Trickery Domain",
            ],
        },
        {
            name: "Druid",
            subClasses: [
                "Circle of Dreams",
                "Circle of Stars",
                "Circle of the Shepherd",
                "Circle of Spores",
                "Circle of the Moon",
                "Circle of the Land",
                "Circle of Wildfire",
            ],
        },
        {
            name: "Fighter",
            subClasses: [
                "Cavalier",
                "Psi Warrior",
                "Arcane Archer",
                "Samurai",
                "Rune Knight",
                "Echo Knight",
                "Champion",
                "Eldritch Knight",
                "Battle Master",
            ],
        },
        {
            name: "Monk",
            subClasses: [
                "Way of Mercy",
                "Way of the Astral Self",
                "Way of Shadow",
                "Way of the Drunken Master",
                "Way of the Sun Soul",
                "Way of the Kensei",
                "Way of the Ascendant Dragon",
                "Way of the Four Elements",
                "Way of the Open Hand",
            ],
        },
        {
            name: "Paladin",
            subClasses: [
                "Oath of Devotion",
                "Oath of Vengeance",
                "Oath of the Watchers",
                "Oath of Glory",
                "Oath of Conquest",
                "Oath of Redemption",
                "Oath of the Ancients",
            ],
        },
        {
            name: "Ranger",
            subClasses: [
                "Swarmkeeper",
                "Hunter",
                "Monster Slayer",
                "Drakewarden",
                "Beast Master",
                "Gloom Stalker",
                "Horizon Walker",
                "Fey Wanderer",
            ],
        },
        {
            name: "Rogue",
            subClasses: [
                "Assassin",
                "Soulknife",
                "Inquisitive",
                "Swashbuckler",
                "Mastermind",
                "Scout",
                "Arcane Trickster",
                "Phantom",
                "Thief",
            ],
        },
        {
            name: "Sorcerer",
            subClasses: [
                "Shadow Magic",
                "Divine Soul",
                "Aberrant Mind",
                "Wild Magic",
                "Draconic Bloodline",
                "Storm Sorcery",
                "Clockwork Soul",
            ],
        },
        {
            name: "Warlock",
            subClasses: [
                "The Fiend",
                "The Fathomless",
                "The Archfey",
                "The Celestial",
                "The Great Old One",
                "The Genie",
                "The Hexblade",
            ],
        },
        {
            name: "Wizard",
            subClasses: [
                "War Magic",
                "School of Evocation",
                "School of Divination",
                "School of Conjuration",
                "Graviturgy Magic",
                "Bladesinging",
                "School of Abjuration",
                "Chronurgy Magic",
                "School of Transmutation",
                "School of Illusion",
                "School of Necromancy",
                "Order of Scribes",
                "School of Enchantment",
            ],
        },
    ]

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
        <div className={style.classBox}>
            <h2>Class</h2>
            <input
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder='Type to search'
            />
            <ul className={style.classUl}>
                {filtered.map((listValue: any) => {
                    return (
                        <li key={listValue.name} className={style.classLi}>{listValue.name}</li>
                    )
                })}
            </ul>
        </div>
    );
}