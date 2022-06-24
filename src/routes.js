import App from './App'
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
  }
]

export default routes