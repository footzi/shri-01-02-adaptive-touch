interface Getters {
    [key: string]: any;
}

interface State {
    [key: string]: string | number;
}

interface Actions {
    [key: string]: Function;
}

interface Mutations {
    [key: string]: any;
}

interface Channels {
    [key: string]: channel[];
}

interface channel {
    context?: any
    callback: Function
}

class Vuex {
    $state    : State;
    $getters  : Getters;
    $actions  : Actions;
    $mutations: Mutations
    $channels : Channels

    constructor() {
        this.$state = {};
        this.$getters = {};
        this.$actions = {};
        this.$mutations = {};
        this.$channels = {};
    }

    /**
     * Cостояние приложения.
     */
    state(data: State):object {
        this.$state = data;

        return this.$state;
    }

    /**
     * Геттеры, получают данные из стейта.
     */
    getters(data: Getters):void {
        for (let item in data) {
            this.$getters[item] = data[item].bind(this);
        }
    }

    /**
     * Акшены, генерят события для изменения стейта.
     */
    actions(data: Actions):void {
        for (let item in data) {
            this.$actions[item] = data[item].bind(this);
        }
    }

    /**
     * Мутации, изменяют стейт.
     */
    mutations(data: Mutations):void {
        for (let item in data) {
            this.$mutations[item] = data[item].bind(this);
        }
    }

    /**
     * Метод вызывает соотвествующий экшен.
     */
    dispatch(name: string, data?:any) {
        return this.$actions[name](data);
    }

    /**
     * Метод вызывает соотвествуюшую мутацию.
     */
    commit(name: string, data?:any) {
        return this.$mutations[name](data);
    }

    /**
     * Событийная модель. Метод создает подписку на событие.
     */
    on(channel: string) {
        if (!this.$channels[channel]) {
            return false;
        }

        const firstArgument = 1;
        const args = Array.prototype.slice.call(arguments, firstArgument);

        this.$channels[channel].forEach((subscription) => {
            subscription.callback.apply(subscription.context, args);
        });

        return this;
    }

    /**
     * Событийная модель. Метод вызывает коллбэк при наступлении события.
     */
    watch(channel: string, fn: Function) {
        if (!this.$channels[channel]) {
            this.$channels[channel] = [];
        }

        this.$channels[channel].push({
            context : this,
            callback: fn
        });
    }

    /**
     * Событийная модель. Метод удаляет подписку на событие.
     */
    off(channel: string) {
        delete this.$channels[channel];
    }
}

export default Vuex;