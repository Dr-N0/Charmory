import style from '../CharacterSheet.module.css'

export default function Attributes({
    abilities,
    computedValue
}: any) {

    const attributesList = [
        {
            name: "Strength",
            value: abilities?.strength,
        },
        {
            name: "Dexerity",
            value: abilities?.dexterity,
        },
        {
            name: "Constitution",
            value: abilities?.constitution,
        },
        {
            name: "Intelligence",
            value: abilities?.intelligence,
        },
        {
            name: "Wisdom",
            value: abilities?.wisdom,
        },
        {
            name: "Charisma",
            value: abilities?.charisma,
        },
    ]

    return (
        <div className={style.attributesBox}>
            {attributesList.map((attributes) => {
                return (
                    <div>
                        <span>{attributes.name}</span>
                        <span>{computedValue(attributes.value)}</span>
                        <span>{attributes.value}</span>
                    </div>
                )
            })}
        </div>
    );
}