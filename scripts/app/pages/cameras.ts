import store from '../store';

class Cameras {
    constructor() {
        this.paint();
    }

    paint() {
        console.log('cameras paint');
    }

    clear() {

    }

    init() {
        // const data = store.$getters.GETDATA();

        // store.dispatch('send', 'formdata');
        // console.log(data);

        // //@ts-ignore
        // document.querySelector('.b-title').addEventListener('click', (event )=> {
        //     store.dispatch('click', event);

        //     console.log(store.$getters.GETDATA());
        // })
    }
}

export default Cameras;
