import style from '../CharacterSheet.module.css'

export default function Senses({
    abilities,
    proficencies,
    proficencyBonus,
    computedValue,
    senseTypes,
}: any) {

    return (
        <div className={style.characterCardBox}>
            <span className={style.characterCardTitle}>Character Card</span>
            {/* Health */}
            <div className={style.hpBoxRow}>
                <span>Hit Points</span>
                <div className={style.hpBox}>
                    <span>Current</span>
                    <span>3</span>
                </div>
                <span> / </span>
                <div className={style.hpBox}>
                    <span>Max</span>
                    <span>30</span>
                </div>
                <div className={style.hpBox}>
                    <span>Temp</span>
                    <span>3</span>
                </div>
            </div>
            {/* Share + Short Rest + Long Rest */}
            <button>Short Rest</button>
            <button>Long Rest</button>
            <div>
                {/* <button>{inspiration boolean}</button> */}
                <span>Inspiration</span>
            </div>
        </div>
    );
}