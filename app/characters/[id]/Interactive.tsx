'use client'
import { useState } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import style from './CharacterSheet.module.css'

import Combat from './interactive_components/Combat'
const Features = dynamic(() => import('./interactive_components/Features'), { loading: () => <Loading />})
const Equipment = dynamic(() => import('./interactive_components/Equipment'), { loading: () => <Loading />})
const Background = dynamic(() => import('./interactive_components/Background'), { loading: () => <Loading />})

export default function Interactive({
    
}: any) {
    const [tab, setTab] = useState(1);

    function interactiveSwitch(param: string) {
        switch(param) {
            case 'combat':
                return <Combat />
            case 'feat':
                return <Features />
            case 'equipment':
                return <Equipment />
            case 'background':
                return <Background />
            default:
                return <h1>Workstation not being used atm</h1>
        }
    }

    return (
        <div className={style.interactiveContainer}>
            <div className={`${style.workstationContainer}`}>
                <div className={`${style.wrapper}`}>
                    <nav className={style.navButtonBox}>
                        <span className={`${style.navButton}`}>
                            <Image
                                className={`${style.navIcons} ${style.combat}`}
                                src="/sword.png"
                                width={50}
                                height={50}
                                alt="Sword"
                                onClick={(e:any) => setTab(1)}
                            />
                        </span>
                        <span className={`${style.navButton}`}>
                            <Image
                                className={`${style.navIcons} ${style.features}`}
                                src="/features.png"
                                width={50}
                                height={50}
                                alt="Features"
                                onClick={(e:any) => setTab(2)}
                            />
                        </span>
                        <span className={`${style.navButton}`}>
                            <Image
                                className={`${style.navIcons} ${style.equipment}`}
                                src="/equipment.png"
                                width={50}
                                height={50}
                                alt="Equipment"
                                onClick={(e:any) => setTab(3)}
                            />
                        </span>
                        <span className={`${style.navButton}`}>
                            <Image
                                className={`${style.navIcons} ${style.background}`}
                                src="/background.png"
                                width={50}
                                height={50}
                                alt="Background"
                                onClick={(e:any) => setTab(4)}
                            />
                        </span>
                    </nav>
                    {
                        tab == 1 ? interactiveSwitch('combat') : 
                        tab == 2 ? interactiveSwitch('feat') :
                        tab == 3 ? interactiveSwitch('equipment') :
                        tab == 4 ? interactiveSwitch('background') : interactiveSwitch('')
                    }
                </div>
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}