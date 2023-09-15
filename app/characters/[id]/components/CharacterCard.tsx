'use client'
import { ChangeEvent, useState } from 'react'
import style from '../CharacterSheet.module.css'

export default function Senses({
    health,
}: any) {

    const [currentHp, setCurrentHp] = useState(health.current);
    const [maxHp, setMaxHp] = useState(health.max);
    const [isDying, setIsDying] = useState(false);
    
    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (currentHp <= 0) {
                setIsDying(true)
            } else {
                setIsDying(false)
            }
        } catch (error: any) {
            console.log(error)
        }
    };

    const handleCurrent = (event: ChangeEvent<HTMLInputElement>) => {
        let target = event.target.value;
        if (parseInt(target) < 0) {
            setCurrentHp("0");
        } else if (parseInt(target) > 999) {
            setCurrentHp("999");
        } else if (parseInt(target) > maxHp) {
            setCurrentHp(maxHp);
        } else {
            setCurrentHp(target);
        }
    };

    const handleMax = (event: ChangeEvent<HTMLInputElement>) => {
        let target = event.target.value;
        if (parseInt(target) < 1) {
            setMaxHp("1");
        } else if (parseInt(target) > 999) {
            setMaxHp("999");
        } else if (parseInt(target) < currentHp) {
            setCurrentHp(target);
            setMaxHp(currentHp);
        } else {
            setMaxHp(target);
        }
    };

    return (
        <div className={style.characterCardBox}>
            <span className={style.characterCardTitle}>Character Card</span>
            
            <table className={style.characterCardTable}>
                <tbody>
                    <tr className={style.tableRow}>
                        {/* Health */}
                        <td>Health</td>
                        <td className={style.health}>
                            <div className={style.hpRow}>
                                
                                <div className={style.hpBox}>
                                    {isDying ?
                                        (<DeathSaves 
                                            onSubmit={onSubmit}
                                            currentHp={currentHp}
                                            maxHp={maxHp}
                                            handleCurrent={handleCurrent}
                                            handleMax={handleMax}
                                        />) :
                                        (<Hp
                                            onSubmit={onSubmit}
                                            currentHp={currentHp}
                                            maxHp={maxHp}
                                            handleCurrent={handleCurrent}
                                            handleMax={handleMax}
                                        />)}
                                </div>
                                
                            </div>
                            {/* <div className={style.hpBox}>
                                <span>Temp</span>
                                <span>3</span>
                            </div> */}
                        </td>
                    </tr>
                    {/* Share + Short Rest + Long Rest */}
                    <tr className={style.tableRow}>
                        <td>Rest</td>
                        <td className={style.rest}>
                            <button className={`${style.button}`}>Short</button>
                            <button className={`${style.button}`}>Long</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

function Hp({
    onSubmit,
    currentHp,
    maxHp,
    handleCurrent,
    handleMax
}: any) {
    return (
        <div className={`${style.hp}`}>
            <input
                className={style.hpValue}
                type='number'
                value={currentHp}
                min="0"
                max="999"
                onBlur={onSubmit}
                onChange={handleCurrent}
            />
            <span>/</span>
            <input
                className={style.hpValue}
                type='number'
                value={maxHp}
                min="1"
                max="999"
                onBlur={onSubmit}
                onChange={handleMax}
            />
        </div>
    );
}

function DeathSaves({
    onSubmit,
    currentHp,
    maxHp,
    handleCurrent,
    handleMax
}: any) {
    return (
        <div className={style.hp}>
            <div className={`${style.red} ${style.customcb}`}>
                <input type="checkbox" value="1" id="customcb1" name="" />
                <label className={style.inner}></label>
                <label className={style.outer}>Red</label>
            </div>

            <div className={`${style.orange} ${style.customcb}`}>
                <input type="checkbox" value="1" id="customcb2" name="" />
                <label className={style.inner}></label>
                <label className={style.outer}>Amber</label>
            </div>

            <div className={`${style.green} ${style.customcb}`}>
                <input type="checkbox" value="1" id="customcb3" name="" />
                <label className={style.inner}></label>
                <label className={style.outer}>Green</label>
            </div>
        </div>
    );
}