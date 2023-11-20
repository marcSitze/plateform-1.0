import mailer from 'nodemailer';
import smtp from 'nodemailer-smtp-transport';

type EmailDTO = {
  to: string;
  text: string; // can also be html
  subject: string;
}

export class EmailService {
  constructor(){}

  sendEmail(payload: EmailDTO) {

  }

  async newmailjet(payload: EmailDTO) {
    const transport = mailer.createTransport(
      smtp({
        host: "in.mailjet.com",
        port: 2525,
        auth: {
          user:
            process.env.MAILJET_API_KEY || "50877fd9f0e6d0a3ee9528c48fafabf5",
          pass:
            process.env.MAILJET_API_SECRET ||
            "9e984acf75ef11b05b67878c1754d026",
        },
      })
    );
    try {
      // const src = await convertFile(msg.html);
      const json = await transport.sendMail({
        from: "marcsitze01@gmail.com", // From address // can take array of strings
        to: payload.to, // To address // can take array aswell
				subject: payload.subject, // Subject
        html: payload.text, // Content
        // attachments: [{
        //   filename: src,
        //   path: path.join(__dirname, `../applications/${src}`),
        //   contentType: 'application/pdf',
        // }],
      });
      console.log(json);

      // fs.unlink(path.join(__dirname, `../applications/${src}`), err => {
      //   if(err) throw Error();
      // });
      return json;
    } catch (err) {
      console.error("Something went wrong: ", err);
    }
  }
}