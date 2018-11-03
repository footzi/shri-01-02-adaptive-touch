interface Routes {
    [key: string]: Function;
}

class Router {
    routes: Routes;
    links: HTMLLinkElement[] | null;
    linkHref: string | null;

    constructor(routes: Routes) {
        this.routes = routes;
        this.links = null;
        this.linkHref = window.location.pathname;

        this.routerLink();
        this.bindEvents();
        this.jump();
    }

    bindEvents() {
        if (this.links) {
            this.links.forEach((item:HTMLLinkElement) => {
                item.addEventListener('click', (event) => {
                    event.preventDefault();
                    const target = event.target as HTMLLinkElement;

                    this.linkHref = target.getAttribute('href');
                    this.jump();
                })
            });
        }   
    }

    jump() {
        for (const route in this.routes) {
            if (route === this.linkHref) {
                //@ts-ignore
                new this.routes[route];
                window.history.pushState(null, '', route);
            }
        }
    }

    routerLink() {
        this.links = Array.from(document.querySelectorAll('.j-router-link'));
    }
}

export default Router;
