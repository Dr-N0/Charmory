import style from '../CharacterSheet.module.css'

export default function Attributes({
    abilities,
    computedValue,
    plus
}: any) {

    const attributesList = [
        {
            name: "Strength",
            alt: "STR",
            value: abilities?.strength,
        },
        {
            name: "Dexerity",
            alt: "DEX",
            value: abilities?.dexterity,
        },
        {
            name: "Constitution",
            alt: "CON",
            value: abilities?.constitution,
        },
        {
            name: "Intelligence",
            alt: "INT",
            value: abilities?.intelligence,
        },
        {
            name: "Wisdom",
            alt: "WIS",
            value: abilities?.wisdom,
        },
        {
            name: "Charisma",
            alt: "CHA",
            value: abilities?.charisma,
        },
    ]

    // TODO: USE ICONS FOR BACKGROUND SO YOU DON'T NEED THE NAME
    // CHANGE BORDER ANIMATION TO A FADE IN BACKGROUND LIGHTER ON HOVER

    // 1200px should be when we swtich to alt name

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