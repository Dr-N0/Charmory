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
      characters: {    // New field
        create: [
          {
            name: 'Character Name',
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
            name: 'Extra Character Name',
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