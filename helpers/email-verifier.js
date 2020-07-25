import dotenv from 'dotenv';
import Verifier from 'email-verifier';

/*
  https://emailverification.whoisxmlapi.com/blog/how-to-verify-an-email-address-using-nodejs
*/

dotenv.config();

const verifier = new Verifier(process.env.EMAIL_VERIFEIR_TOKEN);

export default (email) => new Promise((resolve, reject) => {
  verifier.verify(email, (err, data) => {
    if (err){
      reject(err);
    } else {
      if (data.formatCheck === 'false' || data.smtpCheck === 'false'){
        const error = new Error();
        error.message = 'Provide valid EmailId!!!';
        reject(error);
      }
      resolve(data);
    }
  });
});
