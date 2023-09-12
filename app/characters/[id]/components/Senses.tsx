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
            <span className={style.sensesTitle}>Senses</span>
            {sensesList.map((senses) => {
                return (
                    <div>
                        <span className={style.senseProf}>{proficencyBonus(senses.hasProficency) + computedValue(senses.value) + 10}</span>
                        <span className={style.senseName}>{senses.name}</span>
                    </div>
                )
            })}
        </div>
    );
}