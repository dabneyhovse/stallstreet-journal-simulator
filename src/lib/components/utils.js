export function getScaledDimensions(textureWidth, textureHeight, size, sizeMapping) {
    const [maxWidth, maxHeight] = sizeMapping[size] || sizeMapping['medium'];
    const aspectRatio = textureWidth / textureHeight;

    let width, height;
    if (aspectRatio > 1) {
        width = Math.min(maxWidth, maxWidth * aspectRatio);
        height = width / aspectRatio;
    } else {
        height = Math.min(maxHeight, maxHeight / aspectRatio);
        width = height * aspectRatio;
    }

    return { width, height };
}

export function checkOverlap(newRect, existingRects) {
    return existingRects.some(rect => {
        return !(newRect.centerU + newRect.width / 2 <= rect.centerU - rect.width / 2 ||
                 newRect.centerU - newRect.width / 2 >= rect.centerU + rect.width / 2 ||
                 newRect.centerV + newRect.height / 2 <= rect.centerV - rect.height / 2 ||
                 newRect.centerV - newRect.height / 2 >= rect.centerV + rect.height / 2);
    });
}

export async function loadStallStreets() {
    const response = await fetch('/api/images');
    let images = await response.json();
    images = images.map(image => {
        return {
            texture: image,
            size: 'medium',
            wall: getRandomElement(['left', 'right', 'front'])
        };
    });
    return images;
}

export function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}
