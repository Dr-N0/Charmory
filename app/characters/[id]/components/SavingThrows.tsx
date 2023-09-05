import style from '../CharacterSheet.module.css'

export default function SavingThrows({
    abilities,
    proficencies,
    proficencyBonus,
    computedValue
}: any) {

    const savingThrowList = [
        {
            name: "Strength",
            value: abilities?.strength,
            hasProficency: proficencies?.savingStrength
        },
        {
            name: "Dexerity",
            value: abilities?.dexterity,
            hasProficency: proficencies?.savingDexterity
        },
        {
            name: "Constitution",
            value: abilities?.constitution,
            hasProficency: proficencies?.savingConstitution
        },
        {
            name: "Intelligence",
            value: abilities?.intelligence,
            hasProficency: proficencies?.savingIntelligence
        },
        {
            name: "Wisdom",
            value: abilities?.wisdom,
            hasProficency: proficencies?.savingWisdom
        },
        {
            name: "Charisma",
            value: abilities?.charisma,
            hasProficency: proficencies?.savingCharisma
        },
    ]

    return (
        <div className={style.savingThrowsBox}>
            {savingThrowList.map((savingThrow) => {
                return (
                    <div>
                        <span>{savingThrow.name}</span>
                        <span>{proficencyBonus(savingThrow.hasProficency) + computedValue(savingThrow.value)}</span>
                        <span>{savingThrow.value}</span>
                    </div>
                )
            })}
        </div>
    );
}