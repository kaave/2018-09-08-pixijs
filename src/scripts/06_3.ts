import * as PIXI from 'pixi.js';
import format from 'date-fns/format';

import '../styles/06.css';
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

  const dateFormat = 'YYYY/MM/DD HH:mm:ss.SSS';
  const text = new PIXI.Text(
    `Frontend Nagoya #6
${format(new Date(), dateFormat)}`,
    new PIXI.TextStyle({
      fontFamily: 'Roboto',
      fontSize: (window.innerWidth / dateFormat.length) * 1.6,
      fontWeight: 'bold',
      fill: 0xffffff,
      dropShadow: true,
      dropShadowDistance: 10,
      dropShadowColor: 0xffffff,
      dropShadowAlpha: 0.7,
      align: 'center',
    }),
  );
  text.x = (window.innerWidth - text.width) / 2;
  text.y = (window.innerHeight - text.height) / 2;
  sprite.mask = text;
  app.stage.addChild(text);

  /*
   * animation
   */
  app.ticker.add(() => {
    app.render();
    text.text = `Frontend Nagoya #6
${format(new Date(), dateFormat)}`;
  });

  document.body.appendChild(renderer.view);
});
