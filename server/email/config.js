Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@sandboxc712bd2e68bd4df2b723586cf3d8a08b.mailgun.org',
    password: '96127c135bfd73be9208ec6e022f4d24',
    domain: 'sandboxc712bd2e68bd4df2b723586cf3d8a08b.mailgun.org'
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
