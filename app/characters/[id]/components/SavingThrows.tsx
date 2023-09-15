import style from '../CharacterSheet.module.css'

export default function SavingThrows({
    abilities,
    proficencies,
    proficencyBonus,
    profToSymbol,
    computedValue,
    plus
}: any) {

    const savingThrowList = [
        {
            name: "Strength",
            alt: "STR",
            value: abilities?.strength,
            hasProficency: proficencies?.savingStrength
        },
        {
            name: "Dexerity",
            alt: "DEX",
            value: abilities?.dexterity,
            hasProficency: proficencies?.savingDexterity
        },
        {
            name: "Constitution",
            alt: "CON",
            value: abilities?.constitution,
            hasProficency: proficencies?.savingConstitution
        },
        {
            name: "Intelligence",
            alt: "INT",
            value: abilities?.intelligence,
            hasProficency: proficencies?.savingIntelligence
        },
        {
            name: "Wisdom",
            alt: "WIS",
            value: abilities?.wisdom,
            hasProficency: proficencies?.savingWisdom
        },
        {
            name: "Charisma",
            alt: "CHA",
            value: abilities?.charisma,
            hasProficency: proficencies?.savingCharisma
        },
    ]

    return (
        <div className={style.savingThrowsBox}>
            <span className={style.savingThrowsTitle}>Saving Throws</span>
            {savingThrowList.map((savingThrow) => {
                return (
                    <div className={style.savingThrows}>
                        <span>{profToSymbol(savingThrow.hasProficency)}</span>
                        <span>{savingThrow.alt}</span>
                        <span>{plus(proficencyBonus(savingThrow.hasProficency) + computedValue(savingThrow.value))}</span>
                    </div>
                )
            })}
        </div>
    );
}