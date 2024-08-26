// scripts/loadStallStreets.js
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';

const STATIC_DIR = resolve('static/ssj');
const OUTPUT_FILE = resolve('src/lib/stallstreets.json');

function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomElement = array[randomIndex];
    return randomElement;
}

function getImages(dir) {
    let results = [];
    const list = readdirSync(dir);
    list.forEach((file) => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        let img = {
            texture: "",
            size: 'medium',
            wall: getRandomElement(['left', 'right', 'front'])
        };
        if (stat && stat.isDirectory()) {
            results = results.concat(getImages(filePath));
        } else if (stat && stat.isFile() && (filePath.endsWith(".png") || filePath.endsWith(".jpg") || filePath.endsWith(".jpeg"))) {
            img.texture = filePath.replace(STATIC_DIR, 'ssj')
            results.push(img);
        }
    });
    return results;
}

const images = getImages(STATIC_DIR);
writeFileSync(OUTPUT_FILE, JSON.stringify(images, null, 2));
console.log(`Image list generated at ${OUTPUT_FILE}`);