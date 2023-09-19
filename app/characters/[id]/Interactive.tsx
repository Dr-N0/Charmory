'use client'
import { useState } from 'react'

import style from './CharacterSheet.module.css'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

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
                    <div className={style.navButtons}>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setTab(1)}>Combat</button>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setTab(2)}>Features & Traits</button>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setTab(3)}>Equipment</button>
                        <button className={`${style.hvrFadeWhite}`} onClick={(e:any) => setTab(4)}>Background</button>
                    </div>
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