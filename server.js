const express = require('express');
const data = require('./events.json');
const app = express();
let startTime = '';

/**
 * Функция возвращает время с момента запуска сервера.
 */
const getTime = () => {
    const currentTime = new Date();
    const diff = currentTime.getTime() - startTime.getTime();
    const seconds = ('0' + Math.floor(diff / 1000 % 60).toString()).slice(-2);
    const minutes = ('0' + Math.floor(diff / 60000 % 60).toString()).slice(-2);
    const hours = ('0' + Math.floor(diff / 3600000 % 24).toString()).slice(-2);
    
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Функция фильтрует event.json по типу и возвращает массив.
 * @param {string} type - тип из get-параметра
 */
const filter = (type) => {
   return data.events.filter((item => type === item.type))
}

/**
 * Функция проверяет get-параметры на корректность
 * @param {string} current - текущий get-параметр
 */
const isIncorrectType = (current) => {
	return current != 'critical' && current != 'info'
}

app.get('/status',(req, res) => {
    res.send(200, getTime());
})

app.get('/api/events',(req, res) => {
    if (Object.keys(req.query)[0] === 'type') {
        let arrParams = req.query.type.split(':');
        let result = [];
    
        if (arrParams.some(isIncorrectType)) {
            res.send(400, 'incorrect type');
            return
        }
    
        arrParams.forEach((item)=> {
            result.push(...filter(item));
        })
        
        res.send(200, result);

    } else {
        res.send(200, data);
    }
})

app.get('*', (req, res) => {
    res.send('<h1>Page not found</h1>', 404);
  });

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
    startTime = new Date();
});