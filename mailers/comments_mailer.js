const nodeMailer = require('../config/nodemailer');


// this is another way of exporting the method
exports.newComment = (comment) => {
    console.log("Inside new comment mailer", comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'ashishpal7861@gmail.com',
        to: comment.user.email,
        subject: "new comment published",
        // html: '<h1>yupp, your comment is now published</h1>'
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log("mail sent", info);
        return;
    });
}