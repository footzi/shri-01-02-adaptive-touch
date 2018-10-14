import touch from './touch.js';
import Cameras from './cameras.js';

/**
 * Подлкючает скрипты для тач событий первого дз
 */
touch();

/**
 * Подключение камер на соотвестующей странице
 */
if (document.querySelector('.j-cameras')) {
    const cameras = new Cameras();

    const videos = [
        {
            target: '#camera-1',
            url:
                'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
        },
        {
            target: '#camera-2',
            url:
                'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
        },
        {
            target: '#camera-3',
            url:
                'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
        },
        {
            target: '#camera-4',
            url:
                'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
        }
    ];

    cameras.init(videos);
};

