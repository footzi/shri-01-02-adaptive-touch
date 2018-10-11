class Popup {
    constructor() {
        this.wrapper = document.querySelector('.b-popup');
        this.content = document.querySelector('.b-popup__content');
        this.rangeBrightness = this.wrapper.querySelector('input[name="brightness"');
        this.rangeContrast = this.wrapper.querySelector('input[name="contrast"');
        this.canvas = this.content.querySelector('canvas');
        this.bindEvents();
    }

    open() {
        this.wrapper.classList.add('is-open');
    }

    bindEvents() {
        this.rangeBrightness.addEventListener('input', (event) => {
            this.changeBrightnes(event.target);
        });

        this.rangeContrast.addEventListener('input', (event) => {
            this.changeContrast(event.target);
        });
    }

    changeBrightnes(target) {
        const value = target.value / 50;
        this.ctx.filter = `brightness(${value})`;
    }

    changeContrast(target) {
        const value = target.value / 50;
        this.ctx.filter = `contrast(${value})`;
    }

    insertVideo(video) {
        this.open();

        video.setAttribute("controls","controls"); 
        video.play();
        
        this.ctx = this.canvas.getContext('2d');

       
        this.canvas.width = video.videoWidth;
        this.canvas.height = video.videoHeight;

        

        const draw = () => {
            this.ctx.drawImage(video, 0, 0);
            requestAnimationFrame(draw);
        }

        draw();
    }

    createCenvas() {

    }
}

export default Popup;