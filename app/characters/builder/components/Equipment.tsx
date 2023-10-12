'use client'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import style from './BuilderComponents.module.css'

export default function Equipment({
    packList,
    equipmentList,
    toggleEquipmentStation,
    handleChooseEquipment,
}: any) {
    const [chooseMethod, setChooseMethod] = useState(true);
    const [equipment, setEquipment] = useState(packList);
    const [pack, setCurrentPack] = useState(packList[0]);

    const handleSelect = (selected: any) => {
        setCurrentPack(selected);
    }

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Equipment</h2>
            {toggleEquipmentStation ? (<div>Equipment station</div>) :
            (<div className={style.equipmentInput}>
                <div>
                    <button>Simple</button>
                    <button>Complex</button>
                </div>
                { chooseMethod ? (
                    <div>
                        Simple
                    </div>
                ) : (
                    <div>
                        Complex
                    </div>
                )}
            </div>)}


            <div className={style.addItemCont}>
                <h2>Add Item</h2>
                <div className={style.addItemBox}>
                    <input className={style.addItemInput} placeholder='Name (Ex: Blaster Blade)'></input>
                    <button className={style.addItemButton}>
                        <Image
                            className={`${style.addImage}`}
                            src="/plus.png"
                            width={30}
                            height={30}
                            alt="Background"
                            onClick={() => {console.log('asdflkjasd')}}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

// {
//     "name": "Burglar's Pack",
//     "cost": 16,
//     "contents": [
//       {
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
//     ]
// },

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