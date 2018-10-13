import Analyzer from './analyzer';
const analyzer = new Analyzer();

class Popup {
    constructor() {
        this.wrapper = document.querySelector('.b-popup');
        this.content = document.querySelector('.b-popup__video');
        this.close = document.querySelector('.b-popup__close');
        this.rangeBrightness = this.wrapper.querySelector('input[name="brightness"');
        this.rangeContrast = this.wrapper.querySelector('input[name="contrast"');
        this.defInputVal = 50;
        this.brightness = 1;
        this.contrast = 1;
        this._bindEvents();

        this.videos = [];
    }

    /**
     * Метод навешивает обработчики событий на элементы
     * @private
     */
    _bindEvents() {
        this.rangeBrightness.addEventListener('input', (event) => {
            this.brightnessInputVal = Number(event.target.value);
            this.brightness = this.brightnessInputVal / this.defInputVal;

            this._setFilters();
        });

        this.rangeContrast.addEventListener('input', (event) => {
            this.contrastInputVal = Number(event.target.value);
            this.contrast = this.contrastInputVal / this.defInputVal;
            this._setFilters();
        });

        this.close.addEventListener('click', (event) => {
            event.preventDefault();
            this._close();
        })
    }

    /**
     * Метод устанавливает css фильтр на видео
     * @private
     */
    _setFilters() {
        this.video.style.filter = `contrast(${this.contrast}) brightness(${this.brightness})`;
    }

    /**
     * Метод вставляет видео в попап
     * @param {object} video - DOM элемент кликнутого видео.
     * @public
     */
    insertVideo(article, video) {
        this.video = video;
        this.target = article;
        this.parentNode = this.video.parentNode;
        this.content.appendChild(this.video);
        this.video.play();
        this.video.setAttribute('controls', 'controls');
        this._setValues();

        analyzer.init(this.video);

        this._show();
       
    }

    /**
     * Метод делает попап видимым
     */
    _show() {
        this.y = this.target.getBoundingClientRect().top + pageYOffset;
        this.x = this.target.getBoundingClientRect().left;
        const widthScreen = document.querySelector('.l-cameras').offsetWidth;
        const test = this.target.offsetWidth;
        const scale = test / widthScreen;

        this.wrapper.style.transform = `translate(${this.x}px, ${this.y}px) scale(${scale})`
        this.wrapper.style.transition = '1s ease all';

        setTimeout(() => {  
           
            this.wrapper.style.transform = `translate(0px, 0px) scale(1)`
            this.wrapper.style.visibility = 'visible';
        }, 10000)


        console.log();

        // this.wrapper.classList.add('is-open');
    }

    /**
     * Устанавливает значения для инпутов если они были ранее установлены для видео
     */
    _setValues() {
        if (!this.videos.length) {
            return;
        }

        this.videos.forEach(((item) => {
            if (item.element === this.video) {
                this.rangeBrightness.value = item.brightness;
                this.rangeContrast.value = item.contrast;
                delete item.element;
            };
        }))
    }

    /**
     * Метод закрывает попап
     */
    _close() {
        this.videos.push({
            element: this.video,
            contrast: this.contrastInputVal,
            brightness: this.brightnessInputVal
        });

        this.rangeBrightness.value = this.defInputVal;
        this.rangeContrast.value = this.defInputVal;

        this.parentNode.appendChild(this.video);
        this.video.removeAttribute('controls');
        this.wrapper.classList.remove('is-open');
    }
}

export default Popup;