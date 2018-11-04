import store from './store';

interface Routes {
    [key: string]: Function;
}

class Router {
    routes: Routes;
    links: HTMLLinkElement[] | null;
    linkHref: string | null;
    linkTarget: HTMLElement;

    constructor(routes: Routes) {
        this.routes = routes;
        this.links = null;
        this.linkHref = window.location.pathname;

        const linkTarget = document.querySelector<HTMLLinkElement>('.j-router-link');
        if (!linkTarget) {
            throw new Error('Not found');
        }
        this.linkTarget = linkTarget;

        this.routerLink();
        this.bindEvents();
        this.jump();
    }

    bindEvents() {
        if (this.links) {
            this.links.forEach((item: HTMLLinkElement) => {
                item.addEventListener('click', event => {
                    event.preventDefault();
                    this.linkTarget = event.target as HTMLLinkElement;

                    this.linkHref = this.linkTarget.getAttribute('href');
                    this.jump();
                });
            });
        }
    }

    jump() {
        const historyRoute = {
            currentRoute: this.linkHref,
            prevRoute   : window.location.pathname
        };

        for (const route in this.routes) {
            if (route === this.linkHref) {
                //@ts-ignore
                new this.routes[route]();
                window.history.pushState(null, '', route);

                // Создаем экшен перехода, и сохраняем инфо в стор.
                store.dispatch('jump', historyRoute);
            }
        }

        this.setActiveLink();
    }

    routerLink() {
        this.links = Array.from(document.querySelectorAll('.j-router-link'));
    }

    setActiveLink() {
        if (this.links) {
            this.links.forEach((item) => {
                item.classList.remove('is-active');
            })

            this.linkTarget.classList.add('is-active');
        }
    }
}

export default Router;
