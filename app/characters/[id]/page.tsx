import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth"
import { ApiError } from 'next/dist/server/api-utils';
import { authOptions } from "@/lib/auth";
import style from './CharacterSheet.module.css'

import Interactive from './Interactive'
import Attributes from './stat_components/Attributes'
import CharacterCard from './stat_components/CharacterCard'
import SavingThrows from './stat_components/SavingThrows'
import Senses from './stat_components/Senses'
import Skills from './stat_components/Skills'

// Values we still need
// Inspiration, Defenses vs Conditions

export async function getServerSideProps() {
    const session = await getServerSession(authOptions);
  
    return {
      props: {
        session,
      },
    };
}

async function getCharacters(params: any, session: any) {
    const character = await prisma.character.findFirst({
        where: {
            ownerId: session?.user?.id,
            id: params.id
        },
        include: {
          proficencies: true,
          race: true,
          class: true,
          abilities: true,
          description: true,
          equipment: true,
        }
    })
    if (!character) {
      throw new ApiError(403, 'Character not found');
    }
    return character;
}

export default async function CharacterPage({ params, session }: any) {
  const characterInfo = await getCharacters(params, session);

  let asdf = JSON.stringify(characterInfo, null, '\t');

  function plus(value: any) {
    return value >= 0 ? "+" + value : value;
  }

  function computedValue(value: any) {
    if (value == 0) {
        value = 1;
    }
    return Math.floor(value/2) - 5;
  }
  
  function getProficencyBonus(skillProficency: any) {
    var level = characterInfo.level;
    var bonus = 0;

    if (skillProficency == "NONE") {
      return 0;
    }

    switch(true) {
      case level >= 17:
        bonus = 6;
        break;
      case level >= 13:
        bonus = 5;
        break;
      case level >= 9:
        bonus = 4;
        break;
      case level >= 5:
        bonus = 3;
        break;
      default:
        bonus = 2;
        break;
    }
  
    if (skillProficency && skillProficency == "EXTRA") {
      bonus = bonus * 2
    }
  
  
    return bonus;
  }

  // https://www.i2symbol.com/symbols/circle
  const profToSymbol = (s: string) => {
      switch(true){
          case s == "NONE":
              return <span>○</span>
          case s == "PROFICENT":
              return <span>●</span>
          case s == "EXTRA":
              return <span>◉</span>
      }
  }

  return (
    <main className={style.mainContainer}>
      <div className={style.characterSheetContainer}>
          <div className={style.statsContainer}>
            {/* Attributes */}
            <div className={style.topOfStats}>
              <div className={style.attributesContainer}>
                <Attributes
                  abilities={characterInfo.abilities}
                  computedValue={computedValue}
                  plus={plus}
                />
              </div>
            </div>

            <div className={style.notTopOfStats}>
              {/* Skills */}
              <div className={`${style.col}`}>
                <Skills
                  abilities={characterInfo.abilities}
                  proficencies={characterInfo.proficencies}
                  proficencyBonus={getProficencyBonus}
                  profToSymbol={profToSymbol}
                  computedValue={computedValue}
                  plus={plus}
                />
              </div>

              <div className={`${style.col}`}>
                {/* Character Card */}
                <CharacterCard
                  health = {{
                    current: characterInfo.healthCurrent,
                    max: characterInfo.healthMax
                  }}
                  />

                {/* Vital Values (Speed, AC, Prof Bonus, Init) */}
                <div className={style.vitalValuesContainer}>
                  <div className={`${style.vitalValuesBox} ${style.speedCont}`}>
                    {/* Speed (top left) */}
                    <span className={`${style.vitalValuesName}`}>Speed</span>
                    <span className={`${style.vitalValues}`}>{characterInfo.speed}</span>
                  </div>
                  <div className={`${style.vitalValuesBox} ${style.armorClassCont}`}>
                    {/* AC (top right) */}
                    <span className={`${style.vitalValuesName}`}>Armor Class</span>
                    <span className={`${style.vitalValues}`}>{characterInfo.armorClass}</span>
                  </div>
                  <div className={`${style.vitalValuesBox} ${style.proficencyBonusCont}`}>
                    {/* Proff Bonus (bottom left) */}
                    <span className={`${style.vitalValuesName}`}>Proff. Bonus</span>
                    <span className={`${style.vitalValues}`}>+ {getProficencyBonus(characterInfo.level)}</span>
                  </div>
                  <div className={`${style.vitalValuesBox}`}>
                    {/* Initiative (bottom right) */}
                    <span className={`${style.vitalValuesName}`}>Initiative</span>
                    <span className={`${style.vitalValues} ${style.init}`}>{characterInfo.initiative}</span>
                  </div>
                </div>

                {/* Saving Throws */}
                <SavingThrows 
                    abilities={characterInfo.abilities}
                    proficencies={characterInfo.proficencies}
                    proficencyBonus={getProficencyBonus}
                    profToSymbol={profToSymbol}
                    computedValue={computedValue}
                    plus={plus}
                  />

                {/* Senses */}
                <Senses
                      abilities={characterInfo.abilities}
                      proficencies={characterInfo.proficencies}
                      proficencyBonus={getProficencyBonus}
                      computedValue={computedValue}
                      plus={plus}
                      sesnseTypes={characterInfo.abilities?.wisdom}
                    />
              </div>
            </div>

          </div>
          
          <Interactive />
      </div>

      <pre>{asdf}</pre>
    </main>
  );
}