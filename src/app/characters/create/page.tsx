'use client';

import { useState } from 'react';
import Link from 'next/link'
import style from './Create.module.css'
import CreateCharacter from '@/src/components/CreateCharacter';

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
        <main>
            <div className={style.creation}>
                <nav>
                    <ul>Home</ul>
                    <ul>Race</ul>
                    <ul>Class</ul>
                    <ul>Abilities</ul>
                    <ul>Description</ul>
                    <ul>Equipment</ul>
                    <ul>Save</ul>
                </nav>
                <section>
                    <p>Home</p>
                </section>
                <section>
                    <p>Race</p>
                </section>
                <section>
                    <p>Class</p>
                </section>
                <section>
                    <p>Abilities</p>
                </section>
                <section>
                    <p>Description</p>
                </section>
                <section>
                    <p>Eqipment</p>
                </section>
            </div>


            {/* <div>
                <p className={style.hoverUnderlineAnimation}>Characters</p>
            </div>

            <button onClick={clickthing}>sadf</button>
            <section>
                <h1>asdf</h1>
            </section>
            <section>
                <h1>asdf</h1>
            </section>
            <section>
                <h1>asdf</h1>
            </section>
            

            <CreateCharacter /> */}
        </main>
    );
}