// src/routes/api/images/+server.js
import { readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

const STATIC_DIR = resolve('static/ssj');

function getImages(dir) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat && stat.isDirectory()) {
      // If the item is a directory, recursively get images
      results = results.concat(getImages(filePath));
    } else if (stat && stat.isFile()) {
      // If it's a file, add to the results
      if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'))
        results.push(filePath.replace(STATIC_DIR, 'ssj'));
    }
  });
  return results;
}

export const GET = () => {
  const images = getImages(STATIC_DIR);
  return new Response(JSON.stringify(images));
};