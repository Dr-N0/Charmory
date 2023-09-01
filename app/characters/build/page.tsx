'use client';

import { useEffect, Suspense } from "react";
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import style from './Build.module.css'
import Loading from '@/app/characters/build/loading';

const Home = dynamic(() => import('@/app/characters/build/components/Home'), {
    loading: () => <Loading />,
})

const Race = dynamic(() => import('@/app/characters/build/components/Race'), {
    loading: () => <Loading />,
})

const Class = dynamic(() => import('@/app/characters/build/components/Class'), {
    loading: () => <Loading />,
})

const Abilities = dynamic(() => import('@/app/characters/build/components/Abilities'), {
    loading: () => <Loading />,
})

const Description = dynamic(() => import('@/app/characters/build/components/Description'), {
    loading: () => <Loading />,
})

const Equipment = dynamic(() => import('@/app/characters/build/components/Equipment'), {
    loading: () => <Loading />,
})

export default function BuildCharacterPage() {

    // TODO: On "create character" button press inside of /characters page.
    // Create a dummy character entry inside the db with the "finished" tag set to false (which will send user back to the build page)
    // Lazy load other components separatly outside of dom, and use a counter +1/-1 system to switch between them.
    // Send their data to db on unfocus or page change or +1/-1 change

    async function handleSave(e: any) {
        e.preventDefault();
        // const user = await prisma.user.upsert({
        //     where: { email: 'test@test.com' },
        //     update: {},
        //     create: {
        //       email: 'test@test.com',
        //       password: password
        //     }
        //   })
        //   console.log(character)
    }

    // TODO: If user scrolls down while scrollIntoView is happening, the scrollIntoView will stop
    useEffect(() => {
        const currentURL = new URL(window.location.href);
        let hyperlink = currentURL.hash.slice(1);
        document.getElementById(hyperlink)?.scrollIntoView();
    }, []);

    return (
        <main className={style.mainContainer}>
            <nav className={style.navigation}>
                <ul><a href='#home'>Home</a></ul>
                <ul><a href='#race'>Race</a></ul>
                <ul><a href='#class'>Class</a></ul>
                <ul><a href='#abilities'>Abilities</a></ul>
                <ul><a href='#description'>Description</a></ul>
                <ul><a href='#equipment'>Equipment</a></ul>
                <ul><span onClick={handleSave}>Save</span></ul>
            </nav>

            <div className={style.showcase}>
                <Suspense fallback={<Loading />}>
                    <div className={style.sectionContainer}>
                        <Home />
                        <Race />
                        <Class />
                        <Abilities />
                        <Description />
                        <Equipment />
                    </div>
                </Suspense>
            </div>
        </main>
    );
}