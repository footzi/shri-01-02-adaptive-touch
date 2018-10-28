declare namespace window {
    const AudioContext: { new():AudioContext; };
    const webkitAudioContext: { new():AudioContext; }
}

interface Bar {
    x: number;
    width: number;
    height: number;
}

class Analyzer {
    wrapper: HTMLDivElement;
    canvas: HTMLCanvasElement;
    warning: HTMLDivElement;
    ctx: CanvasRenderingContext2D;
    counters: number;
    counterBars: number;
    bar: Bar;
    mediaElement = new WeakMap();
    counter: number;
    gragient: CanvasGradient;
    context = new AudioContext();
    analyser: AnalyserNode;
    myReq: number;

    constructor() {
        this.wrapper = document.querySelector('.j-analyzer') as HTMLDivElement;
        this.canvas = this.wrapper.querySelector('canvas') as HTMLCanvasElement;
        this.warning = this.wrapper.querySelector('.j-analyzer-no-signal') as HTMLDivElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

        this.counterBars = 8;
        this.counter = 0;
        this.counters = 0;

        this.gragient = this.ctx.createLinearGradient(0, 0, 0, 300);
        this.analyser = this.context.createAnalyser();

        this.bar = {
            x: 0,
            width: 0,
            height: 0
        };

        this.myReq = 0;

        this._addGradient();
    }

    /**
     * Метод создает градиент
     */
    private _addGradient() {
        this.gragient.addColorStop(1, '#ffe682');
        this.gragient.addColorStop(0, '#ff9e00');
    }

    /**
     * Метод создает контекст и генерит массив с данными.
     */
    public init(video: HTMLVideoElement) {
        let source: MediaElementAudioSourceNode;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
       

        if (AudioContext) {

            // if (!this.context) {
            //     this.context = new AudioContext();
            // }

            this.analyser = this.context.createAnalyser();
            this.analyser.fftSize = 256;
            
            if (this.mediaElement.has(video)) {
                source = this.mediaElement.get(video);
            } else {
                source = this.context.createMediaElementSource(video);
                this.mediaElement.set(video, source);
                source.connect(this.analyser);
                this.analyser.connect(this.context.destination); 
                this._createBars();
            }
        }
    }

    /**
     * Метод должен закрывать все существующие коннекты к медиаэлементам
     */
    public destroy() {
        //this.context = '';

        cancelAnimationFrame(this.myReq);
    }

    /**
     * Метод отрисовывает барчики
     */
    private _createBars() {
        const loop = () => {
            this.myReq = requestAnimationFrame(loop);
            let result: Uint8Array;

            result = new Uint8Array(this.analyser.frequencyBinCount);
            this.analyser.getByteFrequencyData(result);

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = this.gragient;

            for (let i = 0; i < this.counterBars; i++) {
                const position = result[i];

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
