import { Request, Response } from 'express';

const express = require('express');
const data = require('./server/events.json');
const fallback = require('express-history-api-fallback')
const path = require('path');
const app = express();


app.use(express.static(__dirname + '/'));
app.use(fallback(__dirname + '/index.html'))

let startTime: Date;

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
const filter = (type: string) => {
     //@ts-ignore
   return data.events.filter(((item) => type === item.type))
}

/**
 * Функция проверяет get-параметры на корректность
 * @param {string} current - текущий get-параметр
 */
const isIncorrectType = (current: string) => {
	return current != 'critical' && current != 'info'
}

app.get('/status',(req: Request, res: Response) => {
    res.status(200);
    res.send(getTime());
})

app.get('/api/events',(req: Request, res: Response) => {
    if (Object.keys(req.query)[0] === 'type') {
        let arrParams = req.query.type.split(':');
        let result: string[] = [];
    
        if (arrParams.some(isIncorrectType)) {
            res.status(400);
            res.send('incorrect type');
            return
        }
    
        arrParams.forEach((item)=> {
            result.push(...filter(item));
        })
        
        res.status(200);
        res.send(result);

    } else {
        res.status(200);
        res.send(data);
    }
})

app.get('*', (req :Request, res: Response) => {
    res.status(404);
    res.send('<h1>Page not found</h1>');
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
    startTime = new Date();
});