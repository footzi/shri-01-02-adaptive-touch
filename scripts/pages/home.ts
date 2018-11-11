import store from '../store';
import { paint, remove } from '../utils';
//@ts-ignore
import homeTemplate from '../../views/components/home.twig';

class Home {
    app: HTMLDivElement | null;
    data: JSON | null;

    constructor() {
        this.app = document.querySelector('#app');
        this.data = null;
        this.init();
    }

    /**
     * Метод иницизализирует компонент и генерит экшен на отправку за данными на сервер.
     */
    init() {
        const body = {
            url: 'home'
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
        
        this.paint();
    }

    /**
     * Метод отрисовывает компонент.
     */
    paint() {
        if (this.app) {
            remove(this.app);
            paint(this.app, homeTemplate(this.data));
        }
    }
}

export default Home;
