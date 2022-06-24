import App from './App'
import Completed from './components/Completed'
import Login from './components/auth/Login'

const routes = [
  {
    path: '/',
    name: 'todo',
    component: App
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/completed',
    name: 'completed',
    component: Completed
  }
]

export default routes