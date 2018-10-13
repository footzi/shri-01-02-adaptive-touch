import Hls from 'hls.js';
import Popup from './popup';

const popup = new Popup;

const bindEvents = (video) => {
    const article = video.parentNode;
    article.addEventListener('click', () => {
        popup.insertVideo(article, video);
    })
}

const videos = [
    {                                                                                                                                                                                                                                                                                                                                                                                                   
        target: "#camera-1",
        url   :"http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8"
    },{                                                                                                                                                
        target: "#camera-2",
        url   :"http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8"
    },{
        target: "#camera-3",
        url   : "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8"
    },{
        target: "#camera-4",
        url   : "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8"
    }
];

export default function cameras() {
    for (let item in videos) {
        const video = document.querySelector(videos[item].target);
        const url = videos[item].url

        if (Hls.isSupported()) {
            const hls = new Hls();
    
            hls.attachMedia(video);
    
            hls.on(Hls.Events.MEDIA_ATTACHED, function() {
                hls.loadSource(url);
                hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
                    bindEvents(video);
                });
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            video.addEventListener('loadedmetadata',function() {
                bindEvents(video);
            });
          }
    }
}
