import Analyzer from '../analyzer';
import Hls from 'hls.js';
import Filter from '../filter';

class Camera {
    constructor() {
        this.wrapper = document.querySelector('.j-cameras');
        this.closeButton = document.querySelector('.j-button-close');
        this.controls = document.querySelector('.j-controls');
        this.filterWrap = this.controls.querySelector('.j-filters');
        this.analyzerWrap = this.controls.querySelector('.j-analyzer');
        this.videos = [];
        this.analyzer = new Analyzer();
        this.filter = new Filter();
        this._bindEvents();
    }

    /**
     * Метод подключает потоки и вставляет их в соответствующие теги video.
     * @public
     */
    init(videos) {
        console.log(videos);
        
        for (let item in videos) {
            const video = document.querySelector(videos[item].target);
            const url = videos[item].url;

            this.videos.push(video);
    
            if (Hls.isSupported()) {
                const hls = new Hls();

                hls.attachMedia(video);
    
                hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    hls.loadSource(url);
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        this._bindEventsVideo(video);
                    });
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src ='https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
                video.addEventListener('loadedmetadata', () => {
                    this._bindEventsVideo(video);
                });
            }
        }
    }

    /**
     * Навешивает обработчики на требуемые элементы
     */
    _bindEvents() {
        this.closeButton.addEventListener('click', () => {
            this._close();
        })
    }

    /**
     * Метод навешивает обработчики событий на конкертный элемент камеры
     * @private
     */
    _bindEventsVideo(video) {
        video.addEventListener('click', (event) => {
            this.currentVideo = event.currentTarget;
            this._open();
        });
    }

    /**
     * Метод открывает камеру и инитит модули фильтра и анализатора
     */
    _open() {
        this.currentVideo.play();
        this.currentVideo.setAttribute('controls', 'controls');
        this.filter.init(this.currentVideo);
        this.analyzer.init(this.currentVideo);

        this._setScale();
        this._showControls();
    }

    /**
     * Метод закрывает камеру и дестроит модули фильтра и анализатора
     */
    _close() {
        this.currentVideo.pause();
        this.currentVideo.removeAttribute('controls');
        this.currentVideo.style.transform = 'scale(1)';
        this.filter.destroy();
        this.analyzer.destroy()

        this._сloseControls();
    }

    /**
     * Метод расчитывает масштаб увеличения видео исходя из его ширины
     */
    _setScale() {
        const widthScreen = this.wrapper.offsetWidth;
        const widthVideo = this.currentVideo.offsetWidth;
        const scale = widthScreen / widthVideo;

        this.currentVideo.style.transform = `scale(${scale})`;
    }

    /**
     * Метод показывает контролы
     */
    _showControls() {
        this.closeButton.classList.add('is-open');
        this.filterWrap.classList.add('is-open');
        this.analyzerWrap.classList.add('is-open');

        // Cкрывает все видео кроме активного
        this.videos.forEach((item) => {
            if (item != this.currentVideo) {
                item.style.display = 'none';
            }
        })
    }

    /**
     * Скрывает контролы
     */
    _сloseControls() {
        this.closeButton.classList.remove('is-open');
        this.filterWrap.classList.remove('is-open');
        this.analyzerWrap.classList.remove('is-open');

        // Cкрывает все видео кроме активного
        this.videos.forEach((item) => {
            item.style.display = 'block';
        })
    }

}

export default Camera;