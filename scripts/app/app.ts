import Home from './pages/home'
import Cameras from './pages/cameras'
import Router from './router';

const router = new Router({
    '/': Home,
    '/cameras': Cameras
})
