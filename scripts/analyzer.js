class Analyzer {
    constructor () {
        this.canvas = document.querySelector('.b-popup__analyzer');
        this.warning = document.querySelector('.b-popup__no-signal');
        this.ctx = this.canvas.getContext('2d');
        this.result = [];
        this.counterBars = 8;
        this.bar = {};
        this._addGradient();
    }

    /**
     * Метод создает градиент
     */
    _addGradient() {
        this.gragient = this.ctx.createLinearGradient(0,0,0,300);
        this.gragient.addColorStop(1,'#ffe682');
        this.gragient.addColorStop(0,'#ff9e00');
    }

    /**
     * Метод создает контекст и генерит массив с данными.
     * @param {*} video - DOM элемент видео-цели
     */
    init(video) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        if (AudioContext) {
            const context = new AudioContext();

            this.analyser = context.createAnalyser();
            this.analyser.fftSize = 256;
            const source = context.createMediaElementSource(video);

            source.connect(this.analyser);
            this.analyser.connect(context.destination)

            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.bufferLength);

            this._createBars();
        }
    }

    /**
     * Метод отрисовывает барчики
     */
    _createBars() {
        const loop = () => {
            requestAnimationFrame(loop);

            this.result = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(this.result);

            this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.gragient;

            for (let i = 0; i < this.counterBars; i++) {
                const position = this.result[i]
                
                if (position) {
                    this.warning.style.display = 'none';
                } else {
                    this.warning.style.display = 'block';
                }

                this.bar.x = i * 12;
                this.bar.width = 10;
                this.bar.height = - position;
        
                this.ctx.fillRect(this.bar.x, this.canvas.height, this.bar.width, this.bar.height)
            }
        }

        loop();
    }
}

export default Analyzer;