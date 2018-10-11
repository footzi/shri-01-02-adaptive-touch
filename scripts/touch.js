export default function() {
    const container = document.querySelector(".j-container");

    if (!container) {
        return;
    }
    
    const image = container.querySelector("img");
    const pointer = container.querySelector(".j-pointer");

    let containerWidth = 0;
    let startPosition = 0;
    let leftBorder = 0;
    let rightBorder = 0;
    let newPosition = 0;
    let endPosition = 0;
    let startX = 0;
    let ratio = 0;
    let pointerNewPosition = 0;

    let touches = {
        first: 0,
        second: 0,
    };

    let newTouches = {
        first: 0,
        second: 0,
    };

    image.onload = function() {
        const imageWidth = image.offsetWidth;
        containerWidth = container.offsetWidth;
        const pointerWidth = pointer.offsetWidth;
        const pointerPosition = containerWidth / 2 - pointerWidth / 4;
        
        startPosition = (containerWidth - imageWidth) / 2;
        leftBorder = 0;
        rightBorder = containerWidth - imageWidth;
        
        image.style.left = `${startPosition}px`;
        pointer.style.left = `${pointerPosition}px`;
    }

    const moveHandler = () => {
        newPosition = event.x - startX + startPosition;
            ratio = newPosition / rightBorder;
            pointerNewPosition = ratio * containerWidth;
        
            if (newPosition >= rightBorder && newPosition <= leftBorder) {
                image.style.left = `${newPosition}px`;
                endPosition = newPosition;
        
                pointer.style.left = `${pointerNewPosition}px`;
            }
    }

    const pinchHandler = () => {
        const scale = (newTouches.second - touches.second) / 100 + 1;

        if (scale > 1) {
            image.style.transform = `scale(${scale})`;
        }
    }

    const rotateHandler = () => {
        const brightness = 100 - (newTouches.second - newTouches.first) / 5;

        image.style.filter = `brightness(${brightness}%)`;
    }

    image.addEventListener("pointerdown", event => {
        startX = event.x;

        if (event.isPrimary) {
            touches.first = event.x;
            touches.firstY = event.y;
        } else {
            touches.second = event.x;
            touches.secondY = event.y;
        }
    });

    image.addEventListener("pointermove", event => {
        if (event.isPrimary) {
            newTouches.first = event.x;
        } else {
            newTouches.second = event.x;
        }

        if (newTouches.first === 0 && touches.second != newTouches.second) {
        rotateHandler();
        }

        if (newTouches.first != 0 && touches.second != newTouches.second) {
            pinchHandler();
        }

        if ((touches.second === 0) && (newTouches.second === 0)) {
            moveHandler();
        }
    });

    image.addEventListener("pointerup", () => {
        startPosition = endPosition;
        touches.first = 0;
        touches.second = 0;
        newTouches.first = 0;
        newTouches.second = 0;
    });
}


