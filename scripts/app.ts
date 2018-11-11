import Home from './pages/home';
import Camera from './pages/camera';
import Devices from './pages/devices';
import Scenario from './pages/scenario';
import Summary from './pages/summary';

import Router from './router';

const router = new Router({
    '/': Home,
    '/cameras': Camera,
    '/summary': Summary,
    '/devices': Devices,
    '/scenario': Scenario
});
