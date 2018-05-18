import { AccountsReact } from 'meteor/meteoreact:accounts'

AccountsReact.configure({
  confirmPassword: true,
  enablePasswordChange: true,
  passwordSignupFields: 'EMAIL_ONLY',
  oauth: {
    google: {
      forceApprovalPrompt: true
    }
  }
})
