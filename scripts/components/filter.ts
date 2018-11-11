class Filter {
    wrapper: HTMLDivElement | null;
    close: HTMLDivElement | null;
    rangeBrightness: HTMLInputElement | null;
    rangeContrast: HTMLInputElement | null;
    defultInputVal: number;
    brightness: number;
    contrast: number;
    history: WeakMap<any, any>;
    brightnessInputVal: number;
    contrastInputVal: number;
    target: HTMLVideoElement | null;

    constructor() {
        this.wrapper = document.querySelector('.j-filters');
        this.close = document.querySelector('.j-button-close');
        this.target = document.querySelector('#camera-1');

        if (this.wrapper) {
            this.rangeBrightness = this.wrapper.querySelector('input[name="brightness"');
            this.rangeContrast = this.wrapper.querySelector('input[name="contrast"');
        } else {
            this.rangeBrightness = null;
            this.rangeContrast = null;
        }
        
        // Дефолтное значение для инпутов
        this.defultInputVal = 50; 

        // Дефолтное значение для контрастности и яркости
        this.brightness = 1;
        this.contrast = 1;
        this.brightnessInputVal = 0;
        this.contrastInputVal = 0;

        // Объект для хранения раннее открытых таргетов
        this.history = new WeakMap();
    }

    /**
     * Метод получает таргет элемента и устанавливает для него фильтра взависимости от значений инпутов
     * @param {object} target - цель на котором произашел инит модуля
     * @public
     */
    init(target: HTMLVideoElement) {
        this.target = target;
        this._bindEvents();
        this._getHistory();
    }

    /**
     * Метод удаляет все навешанные обработчики событий и сбрасывает инпуты на стандартное значение.
     * @public
     */
    destroy() {
        this._unbindEvents();
        this._setHistory();

        if (this.rangeBrightness) {
            this.rangeBrightness.value = String(this.defultInputVal);
        }

        if (this.rangeContrast) {
            this.rangeContrast.value = String(this.defultInputVal);
        }
    }

     /**
     * Метод навешивает обработчики событий на элементы
     * @private
     */
    _bindEvents() {
        if (this.rangeBrightness) {
            this.rangeBrightness.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                this._calcBrightness(target);
                this._setFilters();
            });
        }

        if (this.rangeContrast) {
            this.rangeContrast.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                this._calcContrast(target);
                this._setFilters();
            });
        }
    }

    /**
     * Метод удаляет все обработчики с событий на элементы
     * @private
     */
    _unbindEvents() {
        if (this.rangeBrightness) {
            this.rangeBrightness.removeEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                
                this._calcBrightness(target);
                this._setFilters();
            });
        }
        
        if (this.rangeContrast) {
            this.rangeContrast.removeEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;

                this._calcContrast(target);
                this._setFilters();
            });
        }
    }

    /**
     * Метод расчитывает яркость
     * @param {object} event - cобытие слайдера яркости
     * @private
     */
    _calcBrightness(event: HTMLInputElement) {
        this.brightnessInputVal = Number(event.value);
        this.brightness = this.brightnessInputVal / this.defultInputVal;
    }

    /**
     * Метод расчитывает яркость
     * @param {object} event - cобытие слайдера контрастности
     * @private
     */
     _calcContrast(event: HTMLInputElement) {
        this.contrastInputVal = Number(event.value);
        this.contrast = this.contrastInputVal / this.defultInputVal;
     }

     /**
     * Метод устанавливает css фильтр на таргет
     * @private
     */
    _setFilters() {
        if (this.target) {
            this.target.style.filter = `contrast(${this.contrast}) brightness(${this.brightness})`;
        }
    }

    /**
     * Метод записывает таргет в массив истории
     * @private
     */
    _setHistory() {
        this.history.set(this.target, {
            contrast: this.contrastInputVal,
            brightness: this.brightnessInputVal
        })
    }

    /**
     * Метод проверяет открываемый таргет по истории, 
     * и если он был раннее открыт то установятся соотвествующие значения инпутов
     * @private
     */
    _getHistory() {
        const history = this.history.get(this.target);

        if (history) {
            const history = this.history.get(this.target);
 
            if (this.rangeBrightness) {
                this.rangeBrightness.value = String(history.brightness);    
            }

            if (this.rangeContrast) {
                this.rangeContrast.value = String(history.contrast);
            }
        }
    }
}

export default Filter;
