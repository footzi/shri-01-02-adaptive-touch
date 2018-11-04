import axios from 'axios';
import Myframework from '../my-framework';

const store = new Myframework();

/**
 * Описываем стейт
 */
store.state({
    $route: '/',
    $prev_route: '/',
    page: 'home',
    data: ''
});

/**
 * Описываем геттеры
 */
store.getters({
    GET_DATA: function() {
        return this.$state.data;
    }
});

/**
 * Описываем экшены
 */
store.actions({
    // Переход в роутинге.
    jump: function(data: object):void {
        store.commit('SET_ROUTE', data);
    },

    // Отправка запроса за данными для компонента.
    send: function(body: any):void {
        const url = body.url;

        axios.post(`/api/${url}`)
            .then((response) => {
                store.commit('SET_PAGE', url);
                store.commit('SET_DATA', response.data);
            })
    },

    // Вывод в консоль текущее состояние стейта
    console: function() {
        console.log(this.$state)
    }
});

/**
 * Описываем мутации
 */
store.mutations({
    // Сохраняем инфу о текущем и предыдущем роуте.
    SET_ROUTE: function(data: any): void {
        this.$state.$route = data.currentRoute;
        this.$state.$prev_route = data.prevRoute;
    },

    // Меняем стейт исходя из данных полученных от сервера.
    SET_DATA: function(data: string): void {
        this.$state.data = data;

        // генерим событие для компонента о получения данных от сервера
        this.on('setdata');
    },

    // Устанавливает в стейт имя текущей страницы
    SET_PAGE: function(data:string):void {
        this.$state.page = data;
    }
});

export default store;
