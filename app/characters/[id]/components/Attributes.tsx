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
                    <div className={`${style.box} ${style.attribute}`}>
                        <p className={style.attributeName}>{attributes.name}</p>
                        <p className={style.attributeComp}>{computedValue(attributes.value)}</p>
                        <p className={style.attributeValue}>{attributes.value}</p>
                    </div>
                )
            })}
        </div>
    );
}