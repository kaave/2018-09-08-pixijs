import * as PIXI from 'pixi.js';
import { EmbossFilter } from '@pixi/filter-emboss';
import throttle from 'lodash-es/throttle';

import '../styles/04.css';
import getCoverSize from './utils/getCoverSize';
PIXI.utils.skipHello();

const EMBOSS_FILTER_MAX_STRENGTH = 10;

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
  const embossFilter = new EmbossFilter(0);
  sprite.filters = [embossFilter];
  stage.addChild(sprite);

  window.addEventListener(
    'scroll',
    throttle(() => {
      const { height: pageHeight, top } = document.body.getBoundingClientRect();
      const maxHeight = pageHeight - window.innerHeight;
      embossFilter.strength = EMBOSS_FILTER_MAX_STRENGTH * (1 - (top + maxHeight) / maxHeight);
      app.render();
    }, 50),
  );

  document.body.appendChild(renderer.view);
});
