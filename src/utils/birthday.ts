import { CronJob } from 'cron'

import { getOnlyMembers } from 'database'
import { mailer } from './mail'

const birthdayChecker = new CronJob(
  '00 00 5 * * *',
  async (): Promise<void> => {
    const currentDate = new Date()
    let day: string
    let month: string

    if (currentDate.getMonth() >= 10)
      month = (currentDate.getMonth() + 1).toString()
    else month = `0${currentDate.getMonth() + 1}`

    if (currentDate.getUTCDate() >= 10)
      day = currentDate.getUTCDate().toString()
    else day = `0${currentDate.getUTCDate()}`

    const members = await getOnlyMembers()
    const chosenMembers = members.filter(member => {
      const memberBirthday = member.birthday
        .slice(0, 10)
        .split('-')
        .slice(1, 3)
        .toString()

      return memberBirthday === `${month},${day}`
    })

    if (chosenMembers.length !== 0)
      await Promise.all(
        chosenMembers.map(async member =>
          Promise.all([
            mailer(
              '¡Feliz cumpleaños!',
              `De parte de ACECOM, deseamos que pases un lindo día :)\n¡Feliz cumpleaños ${
                member.name.split(' ')[0]
              }!`,
              member.email[0]
            ),
            mailer(
              'Birthday report',
              `Today was ${member.name}'s birthday`,
              process.env.EMAIL_RECEIVER_1 as string
            )
          ])
        )
      )
  }
)

export { birthdayChecker }
