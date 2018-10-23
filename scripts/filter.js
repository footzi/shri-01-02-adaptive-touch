class Filter {
    constructor() {
        this.wrapper = document.querySelector('.j-filters');
        this.close = document.querySelector('.j-button-close');
        this.rangeBrightness = this.wrapper.querySelector('input[name="brightness"');
        this.rangeContrast = this.wrapper.querySelector('input[name="contrast"');
        // Дефолтное значение для инпутов
        this.defultInputVal = 50; 

        // Дефолтное значение для контрастности и яркости
        this.brightness = 1;
        this.contrast = 1;

        // Массив для хранения раннее открытых таргетов
        // this.history = [];

        this.history = new WeakMap;
    }

    /**
     * Метод получает таргет элемента и устанавливает для него фильтра взависимости от значений инпутов
     * @param {object} target - цель на котором произашел инит модуля
     * @public
     */
    init(target) {
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

        this.rangeBrightness.value = this.defultInputVal;
        this.rangeContrast.value = this.defultInputVal;
    }

     /**
     * Метод навешивает обработчики событий на элементы
     * @private
     */
    _bindEvents() {
        this.rangeBrightness.addEventListener('input', (event) => {
            this._calcBrightness(event);
            this._setFilters();
        });

        this.rangeContrast.addEventListener('input', (event) => {
            this._calcContrast(event);
            this._setFilters();
        });
    }

    /**
     * Метод удаляет все обработчики с событий на элементы
     * @private
     */
    _unbindEvents() {
        this.rangeBrightness.removeEventListener('input', (event) => {
            this._calcBrightness(event);
            this._setFilters();
        });

        this.rangeContrast.removeEventListener('input', (event) => {
            this._calcContrast(event);
            this._setFilters();
        });
    }

    /**
     * Метод расчитывает яркость
     * @param {object} event - cобытие слайдера яркости
     * @private
     */
    _calcBrightness(event) {
        this.brightnessInputVal = Number(event.target.value);
        this.brightness = this.brightnessInputVal / this.defultInputVal;
    }

    /**
     * Метод расчитывает яркость
     * @param {object} event - cобытие слайдера контрастности
     * @private
     */
     _calcContrast(event) {
        this.contrastInputVal = Number(event.target.value);
        this.contrast = this.contrastInputVal / this.defultInputVal;
     }

     /**
     * Метод устанавливает css фильтр на таргет
     * @private
     */
    _setFilters() {
        this.target.style.filter = `contrast(${this.contrast}) brightness(${this.brightness})`;
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
 
            this.rangeBrightness.value = history.brightness;
            this.rangeContrast.value = history.contrast;
        }
    }
}

export default Filter;
