require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = {

  sendMail: async (address, id, content, otp) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAILER,
        pass: process.env.MAILERPASS
      }
    })

    const verificationMail = `
    <h1>Welcome to payme</h1>
    <hr>
    <p>click button below to verify, hurry!</p>
    <br>
    <form action="http://localhost:3004/backend4/api/v1/auth/verify/${id}" method="post">
    <button type="submit">verify</button>
    </form>
    <p>Regards,</p>
    <br>
    <p>payme team</p>
    `
    const reqOtpMail = `
    <h1>Your unique code</h1>
    <hr>
    <p>Use this unique code to reset your password</p>
    <br>
    <tt>${otp}</tt>
    <br>
    <p>Please don't share the code to anyone including your mum</p>
    <br>
    <p>Regards,</p>
    <br>
    <p>payme team</p>
    `

    const mailOptions = await transporter.sendMail({
      from: 'juliant@payme',
      to: address,
      subject: content === 'verify'
        ? 'Welcome to payme'
        : 'Your payme otp',
      html: content === 'verify'
        ? verificationMail
        : reqOtpMail
    })

    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log('error:' + err)
      } else {
        console.log('Mail sent' + info.response)
      }
    })
  }

}
