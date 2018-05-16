import '../both'
import './stylesheets/main.scss'
import 'react-day-picker/lib/style.css' // DatePicker styles

import NProgress from 'nprogress' // Progress Bar
import 'nprogress/nprogress.css'

import App from './ui/app'
import { Accounts } from 'meteor/accounts-base'

window.NProgress = NProgress
NProgress.configure({ showSpinner: false })

Accounts.onLogin = () => {
  console.log('logged in!')
}

export default App
