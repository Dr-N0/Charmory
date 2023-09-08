// 'use client';

// import { useEffect, Suspense } from "react";
import Home from '@/app/characters/build/components/Home'
import Race from '@/app/characters/build/components/Race'
import Class from '@/app/characters/build/components/Class'
import Abilities from '@/app/characters/build/components/Abilities'
import Description from '@/app/characters/build/components/Description'
import Equipment from '@/app/characters/build/components/Equipment'

import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import style from './Build.module.css'

export default function BuildCharacterPage() {

    // TODO: On "create character" button press inside of /characters page.
    // Create a dummy character entry inside the db with the "finished" tag set to false (which will send user back to the build page)
    // Lazy load other components separatly outside of dom, and use a counter +1/-1 system to switch between them.
    // Send their data to db on unfocus or page change or +1/-1 change

    // async function handleSave(e: any) {
    //     e.preventDefault();
    //     // const user = await prisma.user.upsert({
    //     //     where: { email: 'test@test.com' },
    //     //     update: {},
    //     //     create: {
    //     //       email: 'test@test.com',
    //     //       password: password
    //     //     }
    //     //   })
    //     //   console.log(character)
    // }

    // TODO: If user scrolls down while scrollIntoView is happening, the scrollIntoView will stop
    // useEffect(() => {
    //     const currentURL = new URL(window.location.href);
    //     let hyperlink = currentURL.hash.slice(1);
    //     document.getElementById(hyperlink)?.scrollIntoView();
    // }, []);

    return (
        <main className={style.mainContainer}>
            <nav className={style.navigation}>
                <ul><a href='#home'>Home</a></ul>
                <ul><a href='#race'>Race</a></ul>
                <ul><a href='#class'>Class</a></ul>
                <ul><a href='#abilities'>Abilities</a></ul>
                <ul><a href='#description'>Description</a></ul>
                <ul><a href='#equipment'>Equipment</a></ul>
                <ul><span>Save</span></ul>
            </nav>

            <div className={style.showcase}>
                <div className={style.sectionContainer}>
                    <Home />
                    <Race />
                    <Class />
                    <Abilities />
                    <Description />
                    <Equipment />
                </div>
            </div>
        </main>
    );
}