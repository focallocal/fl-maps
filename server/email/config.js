Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@maps.focallocal.org',
    password: '29616944c3065bb0a0dbd3d3804ba22f'
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
