import * as PIXI from 'pixi.js';

import '../styles/07.css';
import getCoverSize from './utils/getCoverSize';
PIXI.utils.skipHello();

function loadImages() {
  return new Promise(resolve =>
    PIXI.loader
      .add([
        { name: 'unsplash', url: 'alex-iby-628881-unsplash.jpg' },
        { name: 'bg', url: 'anastasia-taioglou-214774-unsplash.jpg' },
      ])
      .load(resolve),
  );
}

function loadDOM() {
  return new Promise(resolve => window.addEventListener('DOMContentLoaded', resolve));
}

Promise.all([loadImages(), loadDOM()]).then(() => {
  const app = new PIXI.Application(window.innerWidth, window.innerHeight);
  const { renderer, stage } = app;
  renderer.autoResize = true;

  const { texture: background } = PIXI.loader.resources.bg;
  const backgroundInfo = getCoverSize(background, renderer);
  const backgroundSprite = new PIXI.Sprite(background);
  backgroundSprite.position.set(backgroundInfo.point.x, backgroundInfo.point.y);
  backgroundSprite.width = backgroundInfo.size.width;
  backgroundSprite.height = backgroundInfo.size.height;
  backgroundSprite.texture.frame = new PIXI.Rectangle(0, 0, background.width, background.height);
  stage.addChild(backgroundSprite);

  const { texture } = PIXI.loader.resources.unsplash;
  const { size, point } = getCoverSize(texture, renderer);
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(point.x, point.y);
  sprite.width = size.width;
  sprite.height = size.height;
  sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
  stage.addChild(sprite);

  document.body.appendChild(renderer.view);

  const select = document.querySelector('.Source__select');
  if (!select || !(select instanceof HTMLSelectElement)) {
    return;
  }

  select.addEventListener('change', ({ currentTarget }) => {
    if (!currentTarget || !(currentTarget instanceof HTMLSelectElement)) {
      return;
    }

    sprite.blendMode = parseInt(currentTarget.value, 10);
  });
  Object.entries(PIXI.BLEND_MODES).forEach(([key, index]) => {
    const option = document.createElement('option');
    option.value = index.toString();
    option.innerText = `${key} | ${index}`;
    select.appendChild(option);
  });
});
