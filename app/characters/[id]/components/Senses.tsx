import style from '../CharacterSheet.module.css'

export default function Senses({
    abilities,
    proficencies,
    proficencyBonus,
    computedValue,
    senseTypes,
}: any) {

    const sensesList = [
        {
            name: "Passive Wis (Perception)",
            value: abilities?.wisdom,
            hasProficency: proficencies?.perception
        },
        {
            name: "Passive Int (Investigation)",
            value: abilities?.intelligence,
            hasProficency: proficencies?.investigation
        },
        {
            name: "Passive Wis (Insight)",
            value: abilities?.wisdom,
            hasProficency: proficencies?.insight
        }
    ]

    return (
        <div className={style.sensesBox}>
            {sensesList.map((senses) => {
                return (
                    <div>
                        <span>{proficencyBonus(senses.hasProficency) + computedValue(senses.value) + 10}</span>
                        <span>{senses.name}</span>
                    </div>
                )
            })}
        </div>
    );
}