import * as PIXI from 'pixi.js';
import Easing from 'bezier-easing';

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

const easeInOutQuart = Easing(0.86, 0, 0.07, 1);

function createMaskRect(mask: PIXI.Graphics, width: number, height: number, x: number, y: number) {
  mask.clear();
  mask.beginFill(0);
  mask.moveTo(x, y - height / 2);
  mask.lineTo(x + width, y - height / 2);
  mask.lineTo(x + width, y + height / 2);
  mask.lineTo(x, y + height / 2);
  mask.endFill();
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
  sprite.mask = mask;
  stage.addChild(mask);
  const innerCenterY = Math.round(window.innerHeight / 2);
  const maskWidth = 1;
  const maskHeight = 20;
  const createSampleMaskRect = (maskGraphic: PIXI.Graphics, width: number, height: number) => {
    return createMaskRect(maskGraphic, width, height, 0, innerCenterY);
  };
  createSampleMaskRect(mask, maskWidth, maskHeight);

  /*
   * animation
   */
  const fps = 60;
  const animationSec = 1.5;
  const length = fps * animationSec;
  const animateWidths = [...Array(length).keys()].map(
    index => easeInOutQuart(index / (length - 1)) * (window.innerWidth - maskWidth),
  );
  const animateHeights = [...Array(length).keys()].map(
    index => easeInOutQuart(index / (length - 1)) * (window.innerHeight - maskHeight),
  );
  const animation = () => {
    const maskAnimationWidth = animateWidths.shift();
    if (maskAnimationWidth != null) {
      createSampleMaskRect(mask, maskAnimationWidth + maskWidth, maskHeight);
    } else {
      const maskAnimationHeight = animateHeights.shift();
      if (maskAnimationHeight != null) {
        const maskCurrentHeight = maskAnimationHeight + maskHeight;
        createSampleMaskRect(mask, window.innerWidth, maskCurrentHeight);
      }
    }

    app.render();
    requestAnimationFrame(animation);
  };

  document.body.appendChild(renderer.view);
});
