import { Suspense } from 'react';
import Link from 'next/link'
import style from './Create.module.css'
import CreateCharacter from '@/app/components/CreateCharacter';
import Loading from './loading';

export default function CreateCharacterPage() {

    function clickthing() {
        // For window
        window.scrollTo({
            left: 10,
            top: 10,
            behavior: 'smooth'
        });
    }

    return (
        <main className={style.mainContainer}>
            <nav className={style.navigation}>
                <ul><Link href='#home'>Home</Link></ul>
                <ul><a href='#race'>Race</a></ul>
                <ul><a href='#class'>Class</a></ul>
                <ul><a href='#abilities'>Abilities</a></ul>
                <ul><Link href='#description'>Description</Link></ul>
                <ul><a href='#equipment'>Equipment</a></ul>
                <ul>Save</ul>
            </nav>

            <div className={style.showcase}>
                <Suspense fallback={<Loading />}>
                    <CreateCharacter />
                </Suspense>
            </div>
        </main>
    );
}