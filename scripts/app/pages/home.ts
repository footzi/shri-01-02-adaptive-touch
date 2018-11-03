import store from '../store';
import { paint, remove } from '../utils';

class Home {
    constructor() {
        remove('home')
    }

    init() {
        const data = store.$getters.GETDATA();

        store.dispatch('send', 'formdata');
        console.log(data);

        //@ts-ignore
        document.querySelector('.b-title').addEventListener('click', (event )=> {
            store.dispatch('click', event);

            console.log(store.$getters.GETDATA());
        })
    }
}

export default Home;
