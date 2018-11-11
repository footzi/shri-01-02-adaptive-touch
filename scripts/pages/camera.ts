import store from '../store';
import { paint, remove } from '../utils';
import Cameras from '../components/cameras';
//@ts-ignore
import cameraTemplate from '../../views/components/camera.twig';

interface Videos {
    target: string;
    url: string;
}

interface Data {
    title: string;
    videos: Videos[];
}

class Camera {
    app: HTMLDivElement | null;
    data: Data;
    videos: Videos[];

    constructor() {
        this.app = document.querySelector('#app');
        this.data = {
            title: '',
            videos: []
        };
        this.videos = [];
        this.init();
    }

    /**
     * Метод иницизализирует компонент и генерит экшен на отправку за данными на сервер.
     */
    init() {
        const body = {
            url: 'camera'
        }

        store.dispatch('send', body);

        store.watch('setdata', () => {
            this.getData();
            store.off('setdata');
            store.dispatch('console');
        });
    }

    /**
     * Метод получает данные из стора.
     */
    getData() {
        this.data = store.$getters.GET_DATA();
        this.videos = this.data.videos;
        
        this.paint();
    }

    /**
     * Метод отрисовывает компонент.
     */
    paint() {
        if (this.app) {
            remove(this.app);
            paint(this.app, cameraTemplate(this.data));

            this.initCameras();
        }
    }

    /**
     * Подключение камер
     */
    initCameras() {
        if (document.querySelector('.j-cameras')) {
            const cameras = new Cameras();
            cameras.init(this.videos);
        };
    }
}

export default Camera;
