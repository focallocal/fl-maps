import '../both'
import './stylesheets/main.scss'
import 'react-day-picker/lib/style.css' // DatePicker styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'loaders.css/loaders.min.css'

import NProgress from 'nprogress' // Progress Bar
import 'nprogress/nprogress.css'

import App from './ui/app'

window.NProgress = NProgress
NProgress.configure({ showSpinner: false })

export default App
