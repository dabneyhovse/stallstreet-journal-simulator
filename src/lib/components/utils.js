import { sizeMapping } from './settings/constants'

export function getScaledDimensions(textureWidth, textureHeight, size) {
    const largest_dim = sizeMapping[size] || sizeMapping['medium'];
    const aspectRatio = textureWidth / textureHeight;

    let width, height;
    if (aspectRatio > 1) {
        width = largest_dim;
        height = width / aspectRatio;
    } else {
        height = largest_dim;
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

export function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}