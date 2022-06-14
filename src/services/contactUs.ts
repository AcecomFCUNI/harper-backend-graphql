import httpErrors from 'http-errors'

import { EmailDTO } from 'schemas'
import { mailer } from 'utils'
import { GE, errorHandling } from './utils'

type Process = {
  type: 'mail'
}

type Arguments = {
  emailDto: EmailDTO
}

class ContactUsService {
  #args: Arguments

  constructor(args: Arguments) {
    this.#args = args
  }

  public process({ type }: Process): Promise<void> {
    switch (type) {
      case 'mail':
        return this.#mail()
      default:
        throw new httpErrors.InternalServerError(GE.INTERNAL_SERVER_ERROR)
    }
  }

  async #mail(): Promise<void> {
    const {
      emailDto: { name, mail, phone, message, subject }
    } = this.#args

    try {
      await mailer({
        subject,
        text: `Message from: ACECOM's web page\n\nContact info:\n- Full name: ${name}\n- Email: ${mail}\n- Phone: ${phone}\n\nMessage: ${message}`,
        to: process.env.EMAIL_REPORT as string
      })
    } catch (e) {
      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR
      })
    }
  }
}

export { ContactUsService }
