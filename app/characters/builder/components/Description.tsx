'use client'
import { useState } from 'react'
import Image from 'next/image'
import style from './BuilderComponents.module.css'

export default function Description({
    backgroundList,
    toggleBackgroundStation,
    handleChooseBackground,
}: any) {
    const [background, setBackground] = useState(backgroundList[0]);

    function handleBackground(e: any) {
        const selectedBackground = backgroundList.find(
            (value: any) => value.name === e.target.value
        );

        if (selectedBackground) {
            setBackground(selectedBackground);
        }
    }

    function handleSelect() {
      handleChooseBackground(background.name)
    }

    return (
        <div className={style.contentContainer}>
            <h2 className={style.workstationTitle}>Description</h2>
            { toggleBackgroundStation ? ("ASDF") :
              (<><div className={style.selectBackgroundContainer}>
                  <h2>Background</h2>
                  <div className={style.selectWrapper}>
                    <div className={style.selectBackground}>
                        <label>
                            <select onChange={handleBackground} value={background.name}>
                                {backgroundList.map((values: any) => (
                                    <option key={values.name} value={values.name}>
                                        {values.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <button onClick={handleSelect}>
                      <Image
                        src="/submit.png"
                        width={25}
                        height={25}
                        alt="Submit"
                      />
                    </button>
                  </div>
              </div>
              <Background
                backgroundName={background.name}
                backgroundExplanation={background.explanation}
                backgroundFeatures={background.features ? background.features : []}
                backgroundVariants={background.variants ? background.variants : []}
              /></>
            )}
        </div>
    );
}

function Background({
    backgroundName,
    backgroundExplanation,
    backgroundFeatures,
    backgroundVariants,
  }: {
    backgroundName: string;
    backgroundExplanation: string;
    backgroundFeatures: any[];
    backgroundVariants?: any[];
  }) {
    return (
      <div className={`${style.backgroundBox}`}>
          <i className={style.explanation}>"{backgroundExplanation}"</i>
          {backgroundFeatures && (
            <div className={style.featuresBox}>
              <h3>Features:</h3>
              <ul>
                {backgroundFeatures.map((feature: any) => (
                  <li key={feature.name}>
                    <strong>{feature.name}:</strong> {feature.explanation}
                    {feature.events && (
                      <div>
                        <h4>Defining Event Options:</h4>
                        <ul>
                          {feature.events.map((event: string) => (
                            <li key={event}>{event}</li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {feature.guildBusinessOptions && (
                      <div>
                        <h4>Guild Business Options:</h4>
                        <ul>
                          {feature.guildBusinessOptions.map((option: string) => (
                            <li key={option}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {feature.extraToolProficiency && (
                      <div>
                        <h4>Extra Tool Proficiency:</h4>
                        <ul>
                          {feature.extraToolProficiency.map((tool: string) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {/* guildBusinessOptions, lifeOfSeclusionOptions, originOptions, sageSpecialtyOptions, soldierSpecialtyOptions */}
                  </li>
                ))}
              </ul>
            </div>
          )}
  
          {backgroundVariants && (
            <div>
              <h3>Variants:</h3>
              <ul>
                {backgroundVariants.map((variant: any) => (
                  <li key={variant.name}>
                    <strong>{variant.name}:</strong> {variant.explanation}
  
                    {variant.extraToolProficiency && (
                      <div>
                        <h4>Extra Tool Proficiency:</h4>
                        <ul>
                          {variant.extraToolProficiency.map((tool: string) => (
                            <li key={tool}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {variant.extraEquipment && (
                      <div>
                        <h4>Extra Equipment:</h4>
                        <ul>
                          {variant.extraEquipment.map((equipment: string) => (
                            <li key={equipment}>{equipment}</li>
                          ))}
                        </ul>
                      </div>
                    )}
  
                    {/* Add similar checks for other optional fields */}
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
    );
  }
  