const nodemailer = require("nodemailer");

exports.email = function(email,subject,text){
    var transporter = nodemailer.createTransport({
        service:'gmail.com',
        auth: {
            user:'cookiemonsterdecoratedcookies@gmail.com',
            pass:'Cookieslove2'
        }
    });

    var mailOptions = {
        from:'cookiemonsterdecoratedcookies@gmail.com',
        to:email,
        subject:subject,
        html:text,
        attachments: [{
            filename: 'favicon.png',
            path: __dirname + '/images/favicon.png',
            cid: 'unique@kreata.ee' 
        }]
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        } else{
            console.log('sent email!')
        }
    })
}
