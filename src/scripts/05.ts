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
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(point.x, point.y);
  sprite.width = size.width;
  sprite.height = size.height;
  sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
  stage.addChild(sprite);

  const mask = new PIXI.Graphics();
  mask.beginFill(0);
  mask.moveTo(50, 50);
  mask.lineTo(300, 50);
  mask.lineTo(300, 300);
  mask.lineTo(50, 300);
  mask.lineTo(50, 50);
  mask.endFill();
  sprite.mask = mask;
  stage.addChild(mask);

  app.ticker.add(() => {
    mask.x += 1;
  });
  document.body.appendChild(renderer.view);
});