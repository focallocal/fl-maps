Meteor.startup(function() {

  Meteor.Mailgun.config({

    username: 'postmaster@sandbox1d46721db76744558a4f31dfe22d3a9b.mailgun.org',
    password: '43178c8316f2f7107c3fa7c3e689a98e',
    domain: 'https://api.mailgun.net/v3/sandbox1d46721db76744558a4f31dfe22d3a9b.mailgun.org'

     });

  Meteor.methods({
    'sendContactEmail': function(name, email, message) {
      this.unblock();

      Meteor.Mailgun.send({
        to: 'recipient@example.com',
        from: name + ' <' + email + '>',
        subject: 'New Contact Form Message',
        text: message,
        html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
      });
    }
  });
});
