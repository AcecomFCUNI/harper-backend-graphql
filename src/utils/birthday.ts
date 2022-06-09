import { CronJob } from 'cron'
import { readFileSync } from 'fs'
import { join } from 'path'

import { getOnlyMembers } from 'database'
import { toTitleCase } from './helpers'
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

    if (currentDate.getDate() >= 10) day = currentDate.getDate().toString()
    else day = `0${currentDate.getDate()}`

    const members = await getOnlyMembers()
    const chosenMembers = members.filter(member => {
      const memberBirthday = member.birthday
        .slice(0, 10)
        .split('-')
        .slice(1, 3)
        .toString()

      return memberBirthday === `${month},${day}`
    })

    if (chosenMembers.length !== 0) {
      const mailPromiseArray = chosenMembers
        .map(async member => [
          mailer({
            subject: '¡Feliz cumpleaños!',
            to: member.email[0],
            text: `De parte de ACECOM, deseamos que pases un lindo día :)\n¡Feliz cumpleaños ${
              member.name.split(' ')[0]
            }!`,
            html: readFileSync(join(__dirname, './hb.html'))
              .toString()
              .replace('{name}', member.name.split(' ')[0])
              .replace('{day}', day)
              .replace(
                '{month}',
                toTitleCase(
                  currentDate.toLocaleString('es-ES', { month: 'long' })
                )
              )
              .replace('{year}', currentDate.getFullYear().toString())
          }),
          mailer({
            subject: 'Birthday report',
            to: process.env.EMAIL_BIRTHDAY_REPORT as string,
            text: `Today was ${member.name}'s birthday`
          })
        ])
        .flat(Infinity)

      await Promise.allSettled(mailPromiseArray)
    }
  }
)

export { birthdayChecker }
