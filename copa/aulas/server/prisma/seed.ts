import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.uSer.create({
    data: {
      name: 'jhon Doe',
      email: 'jhondoe@gmail.com',
      avatarUrl: 'http://github.com/KevinDevelopment.png'
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'New Pool',
      code: 'Teste123',
      ownerid: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.011Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-04T12:00:00.011Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamsPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    },
  })
}

main()