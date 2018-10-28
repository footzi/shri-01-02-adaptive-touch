class Analyzer {
    constructor() {
        this.wrapper = document.querySelector('.j-analyzer');
        this.canvas = this.wrapper.querySelector('canvas');
        this.warning = this.wrapper.querySelector('.j-analyzer-no-signal');
        this.ctx = this.canvas.getContext('2d');
        this.result = [];
        this.counterBars = 8;
        this.bar = {};
        this._addGradient();
        this.mediaElement = new WeakMap();

        this.counter = 0;
    }

    /**
     * Метод создает градиент
     */
    _addGradient() {
        this.gragient = this.ctx.createLinearGradient(0, 0, 0, 300);
        this.gragient.addColorStop(1, '#ffe682');
        this.gragient.addColorStop(0, '#ff9e00');
    }

    /**
     * Метод создает контекст и генерит массив с данными.
     * @param {*} video - DOM элемент видео-цели
     */
    init(video) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        if (AudioContext) {

            if (!this.context) {
                this.context =  new AudioContext();
            }

            this.analyser = this.context.createAnalyser();
            this.analyser.fftSize = 256;
            
            if (this.mediaElement.has(video)) {
                this.source = this.mediaElement.get(video);
            } else {
                this.source = this.context.createMediaElementSource(video);
                this.mediaElement.set(video, this.source);
                this.source.connect(this.analyser);
                this.analyser.connect(this.context.destination); 
                this._createBars();
            }
        }
    }

    /**
     * Метод должен закрывать все существующие коннекты к медиаэлементам
     */
    destroy() {;
        this.context = '';

        cancelAnimationFrame(this.myReq);
    }

    /**
     * Метод отрисовывает барчики
     */
    _createBars() {
        const loop = () => {
            this.myReq = requestAnimationFrame(loop);

            this.result = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(this.result);

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.gragient;

            for (let i = 0; i < this.counterBars; i++) {
                const position = this.result[i];

                if (position) {
                    this.warning.style.display = 'none';
                } else {
                    this.warning.style.display = 'block';
                }

                this.bar.x = i * 12;
                this.bar.width = 10;
                this.bar.height = -position;

                this.ctx.fillRect(
                    this.bar.x,
                    this.canvas.height,
                    this.bar.width,
                    this.bar.height
                );
            }
        };

        loop();
    }
}

export default Analyzer;
