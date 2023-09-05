import style from '../CharacterSheet.module.css'

export default function Skills({
    abilities,
    proficencies,
    proficencyBonus,
    computedValue,
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
            hasProficency: proficencies?.slightOfHand
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
            {skillList.map((skill) => {
                return (
                    <div>
                        <span>{skill.hasProficency}</span>
                        <span>{skill.mod}</span>
                        <span>{skill.name}</span>
                        <span>{proficencyBonus(skill.hasProficency) + computedValue(getAbilityValue(skill.mod))}</span>
                    </div>
                )
            })}
        </div>
    );
}