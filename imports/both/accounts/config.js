import { AccountsReact } from 'meteor/meteoreact:accounts'

AccountsReact.configure({
  showLabels: false,
  showForgotPasswordLink: true,
  confirmPassword: true,
  enablePasswordChange: true,
  passwordSignupFields: 'EMAIL_ONLY',
  oauth: {
    google: {
      forceApprovalPrompt: true
    }
  },
  texts: {
    links: {
      'toSignUp': 'Don\'t have an account? Join now'
    }
  }
})
