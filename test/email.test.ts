import { readFileSync } from 'fs'
import { join } from 'path'
import { SentMessageInfo } from 'nodemailer'

import { mailer } from '../src/utils'

const mockupResult = {
  accepted: ['sluzquinosa@uni.pe'],
  rejected: [],
  envelopeTime: 640,
  messageTime: 744,
  messageSize: 6061,
  response:
    '250 2.0.0 OK  1653776100 r33-20020a056870582100b000f169cbbb32sm1847208oap.43 - gsmtp',
  envelope: { from: 'acecom.soporte@gmail.com', to: ['sluzquinosa@uni.pe'] },
  messageId: '<77fd0fc8-4dd0-0cc9-e58f-b2a530f08f49@gmail.com>'
}

describe('Mail test', () => {
  it('Should send the email', async () => {
    const result: SentMessageInfo = await mailer(
      'Test',
      'test',
      'sluzquinosa@uni.pe',
      readFileSync(join(__dirname, '../src/utils/hb.html'))
    )

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(Object.keys(mockupResult))
    )
  })
})
