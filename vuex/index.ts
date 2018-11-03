interface Getters {
    [key: string]: Function;
}

interface State {
    [key: string]: string | number;
}

interface Actions {
    [key: string]: Function;
}

interface Mutations {
    [key: string]: Function;
}

class Vuex {
    $state    : State;
    $getters  : Getters;
    $actions  : Actions;
    $mutations: Mutations

    constructor() {
        this.$state = {};
        this.$getters = {};
        this.$actions = {};
        this.$mutations = {};
    }

    state(data: State):object {
        this.$state = data;

        return this.$state;
    }

    getters(data: Getters):void {
        for (let item in data) {
            this.$getters[item] = data[item].bind(this);
        }
    }

    actions(data: Actions):void {
        for (let item in data) {
            this.$actions[item] = data[item].bind(this);
        }
    }

    mutations(data: Mutations):void {
        for (let item in data) {
            this.$mutations[item] = data[item].bind(this);
        }
    }

    dispatch(name: string, data:any) {
        return this.$actions[name](data);
    }

    commit(name: string, data:any) {
        return this.$mutations[name](data);
    }
}

export default Vuex;