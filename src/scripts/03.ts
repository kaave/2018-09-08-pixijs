import * as PIXI from 'pixi.js';
import { EmbossFilter } from '@pixi/filter-emboss';

import '../styles/03.css';
import getCoverSize from './utils/getCoverSize';
PIXI.utils.skipHello();

function loadImages() {
  return new Promise(resolve =>
    PIXI.loader.add({ name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' }).load(resolve),
  );
}

function loadDOM() {
  return new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
}

Promise.all([loadImages(), loadDOM()]).then(() => {
  const app = new PIXI.Application(window.innerWidth, window.innerHeight);
  const { renderer, stage } = app;
  renderer.autoResize = true;
  const { texture } = PIXI.loader.resources.unsplash;

  const { size, point } = getCoverSize(texture, renderer);
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(point.x, point.y);
  sprite.width = size.width;
  sprite.height = size.height;
  sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
  sprite.filters = [new EmbossFilter(30)];
  stage.addChild(sprite);

  document.body.appendChild(renderer.view);
});
