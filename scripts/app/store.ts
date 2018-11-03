import Vuex from '../../vuex/index';

const store = new Vuex();

store.state({
    page: 'home',
    data: ''
});

store.getters({
    GETDATA: function() {
        return this.$state;
    }
});

store.actions({
    send: function(data: any) {
        return 5;
    },

    click: function(event: Event) {
        store.commit('SETDATA', event.target)
    }
})

store.mutations({
    SETDATA: function(data: string):void {
        //@ts-ignore
        this.$state.page = data;
    }
})

export default store;