import style from '../CharacterSheet.module.css'

export default function Attributes({
    abilities,
    computedValue,
    plus
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

    // TODO: USE ICONS FOR BACKGROUND SO YOU DON'T NEED THE NAME
    // CHANGE BORDER ANIMATION TO A FADE IN BACKGROUND LIGHTER ON HOVER

    return (
        <div className={style.attributesBox}>
            {attributesList.map((attributes) => {
                return (
                    <div className={`${style.attribute}`}>
                        <p className={`${style.attributeName}`}>{attributes.name}</p>
                        <p className={`${style.attributeComp}`}>{plus(computedValue(attributes.value))}</p>
                        <p className={`${style.attributeValue}`}>{attributes.value}</p>
                    </div>
                )
            })}
        </div>
    );
}