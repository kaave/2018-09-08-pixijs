import h2c from 'html2canvas';
import * as PIXI from 'pixi.js';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';

import '../styles/index.css';
PIXI.utils.skipHello();

window.addEventListener('DOMContentLoaded', () => {
  const targetLink = document.querySelector('a[href="#"]');
  if (!targetLink) {
    return;
  }

  targetLink.addEventListener('click', event => {
    event.preventDefault();
    h2c(document.body).then(canvas => {
      const app = new PIXI.Application(window.innerWidth, window.innerHeight);
      const { renderer, stage } = app;
      renderer.autoResize = true;
      const texture = PIXI.Texture.fromCanvas(canvas);
      const sprite = new PIXI.Sprite(texture);
      sprite.position.set(0, 0);
      sprite.width = texture.width;
      sprite.height = texture.height;
      sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
      const zoomBlurFilter = new ZoomBlurFilter(0, [texture.width / 2, texture.height / 2], 10);
      sprite.filters = [zoomBlurFilter];
      stage.addChild(sprite);

      renderer.view.classList.add('PixiRenderer');
      document.body.appendChild(renderer.view);

      app.ticker.add(() => {
        if (zoomBlurFilter.strength >= 3) {
          location.reload();
          return;
        }

        zoomBlurFilter.strength += 0.02;
      });
    });
  });
});
