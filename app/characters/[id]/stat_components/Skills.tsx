import style from '../CharacterSheet.module.css'

export default function Skills({
    abilities,
    proficencies,
    proficencyBonus,
    profToSymbol,
    computedValue,
    plus
}: any) {

    const skillList = [
        {
            name: "Acrobatics",
            mod: "dex",
            hasProficency: proficencies?.acrobatics
        },
        {
            name: "Animal Handling",
            mod: "wis",
            hasProficency: proficencies?.animalHandling
        },
        {
            name: "Arcana",
            mod: "int",
            hasProficency: proficencies?.arcana
        },
        {
            name: "Athletics",
            mod: "str",
            hasProficency: proficencies?.athletics
        },
        {
            name: "Deception",
            mod: "cha",
            hasProficency: proficencies?.deception
        },
        {
            name: "History",
            mod: "int",
            hasProficency: proficencies?.history
        },
        {
            name: "Insight",
            mod: "wis",
            hasProficency: proficencies?.insight
        },
        {
            name: "Intimidation",
            mod: "cha",
            hasProficency: proficencies?.intimidation
        },
        {
            name: "Investigation",
            mod: "int",
            hasProficency: proficencies?.investigation
        },
        {
            name: "Medicine",
            mod: "wis",
            hasProficency: proficencies?.medicine
        },
        {
            name: "Nature",
            mod: "int",
            hasProficency: proficencies?.nature
        },
        {
            name: "Perception",
            mod: "wis",
            hasProficency: proficencies?.perception
        },
        {
            name: "Performance",
            mod: "cha",
            hasProficency: proficencies?.performance
        },
        {
            name: "Persuasion",
            mod: "cha",
            hasProficency: proficencies?.persuasion
        },
        {
            name: "Religion",
            mod: "int",
            hasProficency: proficencies?.religion
        },
        {
            name: "Sleight of Hand",
            mod: "dex",
            hasProficency: proficencies?.sleightOfHand
        },
        {
            name: "Stealth",
            mod: "dex",
            hasProficency: proficencies?.stealth
        },
        {
            name: "Survival",
            mod: "wis",
            hasProficency: proficencies?.survival
        },
    ]

    const getAbilityValue = (name: string) => {
        switch(true){
            case name == "str":
                return abilities?.strength
            case name == "dex":
                return abilities?.dexterity
            case name == "con":
                return abilities?.constitution
            case name == "int":
                return abilities?.intelligence
            case name == "wis":
                return abilities?.wisdom
            case name == "cha":
                return abilities?.charisma
        }
    }

    return (
        <div className={style.skillsBox}>
            <table className={style.skillsTable}>
                <thead>
                    <tr>
                        <td>PROF</td>
                        <td>MOD</td>
                        <td>SKILL</td>
                        <td>BONUS</td>
                    </tr>
                </thead>
                <tbody>
                    {skillList.map((skill) => (
                        <tr key={skill.name}>
                            <td>{profToSymbol(skill.hasProficency)}</td>
                            <td>{skill.mod}</td>
                            <td>{skill.name}</td>
                            <td>
                                <p>
                                {plus(
                                proficencyBonus(skill.hasProficency) +
                                    computedValue(getAbilityValue(skill.mod))
                                )}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}