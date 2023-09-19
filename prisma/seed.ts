import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('test', 12)
  console.log(password)
  
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: password,
      characters: {
        create: [
          {
            name: 'Percival "Percy" Fredrickstein Von Musel Klossowski de Rolo III',
            level: 5,
            feats: ["grapple", "alert"],
            speed: 30,
            armorClass: 14,
            initiative: 4,
            proficencies: {
              create: {
                savingStrength: 'PROFICENT',
                savingDexterity: 'PROFICENT',
                savingConstitution: 'NONE',
                savingIntelligence: 'PROFICENT',
                savingWisdom: 'NONE',
                savingCharisma: 'PROFICENT',
                
                acrobatics: 'NONE',
                animalHandling: 'PROFICENT',
                arcana: 'NONE',
                athletics: 'NONE',
                deception: 'PROFICENT',
                history: 'NONE',
                insight: 'NONE',
                intimidation: 'PROFICENT',
                investigation: 'NONE',
                medicine: 'NONE',
                nature: 'NONE',
                perception: 'PROFICENT',
                performance: 'NONE',
                persuasion: 'NONE',
                religion: 'NONE',
                sleightOfHand: 'PROFICENT',
                stealth: 'NONE',
                survival: 'PROFICENT',
              }
            },
            inspiration: true,
            healthMax: 29,
            healthCurrent: 20,
            race: {
              create: {
                name: 'Race Name'
              }
            },
            class: {
              create: {
                name: 'Class Name'
              }
            },
            abilities: {
              create: {
                genMethod: 'MANUAL',
                strength: 10,
                dexterity: 12,
                constitution: 14,
                intelligence: 8,
                wisdom: 10,
                charisma: 16
              }
            },
            description: {
              create: {
                background: 'Character Background'
              }
            },
            equipment: {
              create: {
                name: 'Equipment Name'
              }
            }
          },
          {
            name: 'EXTRA Percival Fredrickstein Von Musel Klossowski de Rolo III',
            level: 17,
            feats: ["grapple", "alert"],
            speed: 40,
            armorClass: 12,
            initiative: 2,
            proficencies: {
              create: {
                savingStrength: 'NONE',
                savingDexterity: 'EXTRA',
                savingConstitution: 'NONE',
                savingIntelligence: 'NONE',
                savingWisdom: 'NONE',
                savingCharisma: 'NONE',
                
                acrobatics: 'NONE',
                animalHandling: 'NONE',
                arcana: 'NONE',
                athletics: 'NONE',
                deception: 'NONE',
                history: 'NONE',
                insight: 'NONE',
                intimidation: 'NONE',
                investigation: 'NONE',
                medicine: 'EXTRA',
                nature: 'NONE',
                perception: 'NONE',
                performance: 'NONE',
                persuasion: 'NONE',
                religion: 'EXTRA',
                sleightOfHand: 'NONE',
                stealth: 'NONE',
                survival: 'EXTRA',
              },
            },
            inspiration: false,
            healthMax: 40,
            healthCurrent: 10,
            race: {
              create: {
                name: 'Extra Race Name'
              }
            },
            class: {
              create: {
                name: 'Extra Class Name'
              }
            },
            abilities: {
              create: {
                genMethod: 'MANUAL',
                strength: 12,
                dexterity: 14,
                constitution: 16,
                intelligence: 10,
                wisdom: 12,
                charisma: 14
              }
            },
            description: {
              create: {
                background: 'Extra Character Background'
              }
            },
            equipment: {
              create: {
                name: 'Extra Equipment Name'
              }
            }
          }
        ]
      }
    }
  })
  
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })