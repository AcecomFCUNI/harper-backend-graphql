import nodemailer, { SentMessageInfo } from 'nodemailer'
import { google } from 'googleapis'

const CLIENT_ID = process.env.CLIENT_ID || ''
const CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const REDIRECT_URI = process.env.REDIRECT_URI || ''
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || ''
const oAuth2Client = new google.auth.OAuth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
  forceRefreshOnFailure: true
})

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const EMAIL_SENDER = process.env.EMAIL_SENDER as string

const mailer = async (
  subject: string,
  text: string,
  to: string,
  html: string | Buffer = ''
): Promise<SentMessageInfo> => {
  const { token, res } = await oAuth2Client.getAccessToken()

  if (!token) {
    console.log('Res from oAuth2Client was:')
    console.log(res)

    throw new Error('Something went wrong getting the token')
  }

  const transporter = nodemailer.createTransport({
    auth: {
      accessToken: token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      type: 'OAuth2',
      user: EMAIL_SENDER
    },
    service: 'gmail'
  })

  const mailOptions = {
    from: `ACECOM <${EMAIL_SENDER}>`,
    html,
    sender: EMAIL_SENDER,
    subject,
    text,
    to
  }

  try {
    const result = await transporter.sendMail(mailOptions)

    return result
  } catch (err) {
    console.log('Error at mailer.js')

    throw err
  }
}

export { mailer }
