import * as PIXI from 'pixi.js';

import '../styles/05.css';
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
  const widthRatio = size.width / texture.width;
  let currentX = 0;
  const sprites: PIXI.Sprite[] = [];
  while (true) {
    const sprite = new PIXI.Sprite(texture.clone());
    const randomWidth = Math.ceil(Math.random() * 10);
    const width = currentX + randomWidth > texture.width ? texture.width - currentX : randomWidth;
    sprite.position.set(currentX * widthRatio, point.y);
    sprite.width = size.width;
    sprite.height = size.height;
    sprite.texture.frame = new PIXI.Rectangle(currentX, 0, width, texture.height);
    sprites.push(sprite);
    stage.addChild(sprite);
    currentX += width;

    if (currentX >= texture.width) {
      break;
    }
  }

  app.ticker.add(() => sprites.forEach((sprite, index) => (sprite.y += index % 2 === 0 ? 2 : -2)));

  document.body.appendChild(renderer.view);
});
