import * as PIXI from 'pixi.js';
import * as dat from 'dat.gui';

import '../styles/08.css';
import BlueInvert from './filters/BlueInvert';
import BlueRaise from './filters/BlueRaise';
import Convergence from './filters/Convergence';
import CutSlider from './filters/CutSlider';
import Glow from './filters/Glow';
import GreenInvert from './filters/GreenInvert';
import GreenRaise from './filters/GreenRaise';
import HighContrast from './filters/HighContrast';
import Invert from './filters/Invert';
import Noise from './filters/Noise';
import Outline from './filters/Outline';
import RedInvert from './filters/RedInvert';
import RedRaise from './filters/RedRaise';
import Shaker from './filters/Shaker';
import SlitScan from './filters/SlitScan';
import Swell from './filters/Swell';
import Twist from './filters/Twist';

PIXI.utils.skipHello();

interface Filter {
  key: string;
  enabled: boolean;
  random?: boolean;
  keyChar: string;
  filter: PIXI.Filter<any>;
  properties?: Array<{ name: string; max: number; min: number; step?: number }>;
}

interface Images {
  key: string;
  url: string;
  desc: string;
}

const images: Images[] = [
  { key: 'woman', url: 'alex-iby-628881-unsplash.jpg', desc: 'Woman: Photo by Alex Iby on Unsplash' },
  { key: 'woman2', url: 'stas-svechnikov-31192-unsplash.jpg', desc: 'Woman2: Photo by Stas Svechnikov on Unsplash' },
  { key: 'man', url: 'shttefan-472897-unsplash.jpg', desc: 'Man: Photo by SHTTEFAN on Unsplash' },
  { key: 'car', url: 'alan-king-581569-unsplash.jpg', desc: 'Car: Photo by alan King on Unsplash' },
  { key: 'sea', url: 'anastasia-taioglou-214774-unsplash.jpg', desc: 'Sea: Photo by Anastasia Taioglou on Unsplash' },
  { key: 'food', url: 'toa-heftiba-422022-unsplash.jpg', desc: 'Food: Photo by Toa Heftiba on Unsplash' },
  { key: 'illust', url: 'monitor_tenin_nenrei_kakunin.png', desc: 'Illust: by Illust-ya' },
];

const filters: Filter[] = [
  { key: 'redInvert', enabled: false, keyChar: 'q', filter: new RedInvert() },
  { key: 'redRaise', enabled: false, keyChar: 'w', filter: new RedRaise() },
  { key: 'greenInvert', enabled: false, keyChar: 'e', filter: new GreenInvert() },
  { key: 'greenRaise', enabled: false, keyChar: 'r', filter: new GreenRaise() },
  { key: 'blueInvert', enabled: false, keyChar: 't', filter: new BlueInvert() },
  { key: 'blueRaise', enabled: false, keyChar: 'y', filter: new BlueRaise() },
  { key: 'invert', enabled: false, keyChar: 'u', filter: new Invert() },
  { key: 'highContrast', enabled: false, keyChar: 'i', filter: new HighContrast() },
  {
    key: 'convergence',
    enabled: false,
    random: false,
    keyChar: 'a',
    filter: new Convergence(),
    properties: [
      { name: 'rand', min: -5, max: 5 },
      { name: 'dimensionX', min: 0, max: 2000 },
      { name: 'dimensionY', min: 0, max: 2000 },
    ],
  },
  {
    key: 'cutSlider',
    enabled: false,
    random: false,
    keyChar: 's',
    filter: new CutSlider(),
    properties: [
      { name: 'rand', min: -10, max: 10 },
      { name: 'val1', min: -10, max: 10 },
      { name: 'val2', min: -30, max: 30 },
      { name: 'dimensionX', min: -50, max: 50 },
      { name: 'dimensionY', min: -50, max: 50 },
    ],
  },
  {
    key: 'glow',
    enabled: false,
    random: false,
    keyChar: 'd',
    filter: new Glow(),
    properties: [
      { name: 'blur', min: 0, max: 20, step: 0.05 },
      { name: 'dimensionX', min: 0, max: 50 },
      { name: 'dimensionY', min: 0, max: 50 },
    ],
  },
  {
    key: 'noise',
    enabled: false,
    random: false,
    keyChar: 'f',
    filter: new Noise(),
    properties: [
      { name: 'rand', min: 0, max: 100 },
      { name: 'strength', min: 0, max: 100 },
      { name: 'dimensionX', min: 0, max: 5000 },
      { name: 'dimensionY', min: 0, max: 5000 },
    ],
  },
  {
    key: 'outline',
    enabled: false,
    random: false,
    keyChar: 'g',
    filter: new Outline(),
    properties: [{ name: 'dimensionX', min: 0, max: 1000 }, { name: 'dimensionY', min: 0, max: 1000 }],
  },
  {
    key: 'shaker',
    enabled: false,
    random: false,
    keyChar: 'h',
    filter: new Shaker(),
    properties: [
      { name: 'blurX', min: -10, max: 10, step: 0.01 },
      { name: 'blurY', min: -10, max: 10, step: 0.01 },
      { name: 'dimensionX', min: 0, max: 5000 },
      { name: 'dimensionY', min: 0, max: 5000 },
    ],
  },
  {
    key: 'slitScan',
    enabled: false,
    random: false,
    keyChar: 'j',
    filter: new SlitScan(),
    properties: [{ name: 'rand', min: -200, max: 200 }, { name: 'dimension', min: 0, max: 500 }],
  },
  {
    key: 'swell',
    enabled: false,
    random: false,
    keyChar: 'z',
    filter: new Swell(),
    properties: [
      { name: 'rand', min: -200, max: 200, step: 0.05 },
      { name: 'dimensionX', min: -5000, max: 5000 },
      { name: 'dimensionY', min: -5000, max: 5000 },
      { name: 'dimensionZ', min: -5000, max: 5000 },
      { name: 'dimensionA', min: -5000, max: 5000 },
    ],
  },
  {
    key: 'twist',
    enabled: false,
    random: false,
    keyChar: 'x',
    filter: new Twist(),
    properties: [
      { name: 'rand', min: -200, max: 200, step: 0.05 },
      { name: 'val2', min: -200, max: 200, step: 0.05 },
      { name: 'val3', min: -200, max: 200, step: 0.05 },
      { name: 'dimensionX', min: 0, max: 5000 },
      { name: 'dimensionY', min: 0, max: 5000 },
    ],
  },
];

function setFilter(key: string, gui: dat.GUI, cb: () => void) {
  const filter = filters.find(f => f.key === key);
  if (!filter) {
    return;
  }

  const folder = gui.addFolder(`${key} (${filter.keyChar})`);
  folder
    .add(filter, 'enabled')
    .listen()
    .onChange((enabled: boolean) => {
      filter.enabled = enabled;
      cb();
    });

  const { properties } = filter;
  if (properties && properties.length > 0) {
    folder
      .add(filter, 'random')
      .listen()
      .onChange((random: boolean) => {
        filter.random = random;
        cb();
      });

    properties.forEach(({ name, max, min, step }) => {
      const guiController = folder.add(filter.filter, name, min, max).listen();
      if (step != null) {
        guiController.step(step);
      }
      guiController.onChange(cb);
    });
  }
}

function setSourceList(selectElement: HTMLElement) {
  [
    ...images.map(({ key, desc }) => ({ key: `preset-${key}`, desc: `Preset (${desc})` })),
    { key: 'camera', desc: 'CAMERA *RECOMMENDED*' },
    { key: 'upload', desc: 'Upload image' },
  ].forEach(({ key, desc }) => {
    const optionElement = document.createElement('option');
    optionElement.value = key;
    optionElement.innerText = desc;
    selectElement.appendChild(optionElement);
  });
}

class Main {
  renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  stage: PIXI.Container;
  sourceSelectElement: HTMLSelectElement;
  sourceFileElement: HTMLInputElement;
  uploadImageCanvas?: HTMLCanvasElement;

  constructor() {
    this.updateFilters = this.updateFilters.bind(this);
    const sourceSelectElement = document.querySelector('.Source__select');
    const sourceFileElement = document.querySelector('.Source__file');
    if (
      !sourceSelectElement ||
      !(sourceSelectElement instanceof HTMLSelectElement) ||
      !sourceFileElement ||
      !(sourceFileElement instanceof HTMLInputElement)
    ) {
      throw new Error('Invalid DOM error');
    }
    this.sourceSelectElement = sourceSelectElement;
    this.sourceFileElement = sourceFileElement;
    setSourceList(this.sourceSelectElement);

    this.sourceSelectElement.addEventListener('change', this.handleChangeSourceSelect.bind(this));
    this.sourceFileElement.addEventListener('change', () => {
      const file = (this.sourceFileElement.files || [])[0];
      if (!file || !file.type.match(/^image\/(png|jpe?g|gif)$/)) {
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = event => {
        if (!event.target) {
          return;
        }

        const image = new Image();
        image.onload = () => {
          this.uploadImageCanvas = document.createElement('canvas');
          this.uploadImageCanvas.width = image.width;
          this.uploadImageCanvas.height = image.height;
          const context = this.uploadImageCanvas.getContext('2d');
          if (!context) {
            return;
          }
          context.drawImage(image, 0, 0);
          this.stage.removeChildren();
          this.sourceSelectElement.value = 'upload';
          this.setTextureToStage(PIXI.Texture.fromCanvas(this.uploadImageCanvas));
        };
        image.src = (event.target as any).result;
      };

      fileReader.readAsDataURL(file);
    });

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    this.stage = new PIXI.Container();
    const gui = new dat.GUI({ hideable: false });
    gui.useLocalStorage = false;

    PIXI.loader.add(images.map(({ key: name, url }) => ({ name, url }))).load(this.onImageLoad.bind(this));
    this.renderer.autoResize = true;
    document.body.appendChild(this.renderer.view);

    const modifyColorFolder = gui.addFolder('🎨 Modify color');
    modifyColorFolder.open();
    setFilter('redInvert', modifyColorFolder, this.updateFilters);
    setFilter('redRaise', modifyColorFolder, this.updateFilters);
    setFilter('greenInvert', modifyColorFolder, this.updateFilters);
    setFilter('greenRaise', modifyColorFolder, this.updateFilters);
    setFilter('blueInvert', modifyColorFolder, this.updateFilters);
    setFilter('blueRaise', modifyColorFolder, this.updateFilters);
    setFilter('invert', modifyColorFolder, this.updateFilters);
    setFilter('highContrast', modifyColorFolder, this.updateFilters);

    const hardcoreModulation = gui.addFolder('🎸 Hardcore Modulation');
    hardcoreModulation.open();
    setFilter('convergence', hardcoreModulation, this.updateFilters);
    setFilter('cutSlider', hardcoreModulation, this.updateFilters);
    setFilter('glow', hardcoreModulation, this.updateFilters);
    setFilter('noise', hardcoreModulation, this.updateFilters);
    setFilter('outline', hardcoreModulation, this.updateFilters);
    setFilter('shaker', hardcoreModulation, this.updateFilters);
    setFilter('slitScan', hardcoreModulation, this.updateFilters);

    const animate = gui.addFolder('🐼 Animate');
    animate.open();
    setFilter('swell', animate, this.updateFilters);
    setFilter('twist', animate, this.updateFilters);

    this.setAnimation();
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        filters.forEach(filter => (filter.random = false));
      } else {
        filters.forEach(filter => (filter.enabled = false));
      }
      this.updateFilters();
      return;
    }

    const lowerKey = event.key.toLowerCase();
    const targetFilter = filters.find(({ keyChar }) => keyChar === lowerKey);
    if (!targetFilter) {
      return;
    }

    if (event.shiftKey) {
      targetFilter.random = !targetFilter.random;
    } else {
      targetFilter.enabled = !targetFilter.enabled;
    }
    this.updateFilters();
  }

  updateFilters() {
    this.stage.filters = filters.filter(({ enabled }) => enabled).map(({ filter }) => filter);

    this.renderer.render(this.stage);
  }

  setAnimation({ fps }: { fps: number } = { fps: 24 }) {
    /*
     * requestAnimationFrame pattern
     */
    const startTime = performance.now();
    let lastFrame = 0;
    const loop = () => {
      const timeDiff = performance.now() - startTime;
      const frame = Math.ceil(timeDiff / (1000 / fps));

      if (lastFrame < frame) {
        filters
          .filter(({ enabled, random, properties }) => enabled && random && properties)
          .forEach(({ filter, properties }) => {
            if (!properties) {
              return;
            }
            properties.forEach(({ name, min, max }) => {
              const value = Math.floor((max - min) * Math.random());
              (filter as any)[name] = value;
            });
          });
        const swellFilter = filters.find(({ key }) => key === 'swell');
        const twistFilter = filters.find(({ key }) => key === 'twist');
        if (swellFilter) {
          (swellFilter.filter as any).timer += 1;
        }
        if (twistFilter) {
          (twistFilter.filter as any).timer += 1;
        }
        lastFrame = frame;
        this.renderer.render(this.stage);
      }

      requestAnimationFrame(loop);
    };

    return requestAnimationFrame(loop);
  }

  onImageLoad() {
    this.setTextureToStage(PIXI.loader.resources.woman.texture.clone());
    this.renderer.render(this.stage);
  }

  setTextureToStage(texture: PIXI.Texture) {
    const sprite = new PIXI.Sprite(texture);
    sprite.texture.frame = new PIXI.Rectangle(0, 0, texture.width, texture.height);
    // similate background-size: cover
    const rendererRatio = { x: 1, y: this.renderer.height / this.renderer.width };
    const textureRatio = { x: 1, y: texture.height / texture.width };

    if (textureRatio.y < rendererRatio.y) {
      // 画面の縦の比率より、画像の縦の比率が小さい
      // そのままだと横が余るので、横をあわせる
      sprite.width = (texture.width * this.renderer.height) / texture.height;
      sprite.height = this.renderer.height;
      sprite.position.set(sprite.width / -2 + this.renderer.width / 2, 0);
    } else {
      // 画面の縦の比率より、画像の縦の比率が大きい
      // そのままだと縦が余るので、縦をあわせる
      sprite.width = this.renderer.width;
      sprite.height = (texture.height * this.renderer.width) / texture.width;
      sprite.position.set(0, sprite.height / -2 + this.renderer.height / 2);
    }

    this.stage.addChild(sprite);
  }

  handleChangeSourceSelect() {
    this.stage.removeChildren();

    const matcher = this.sourceSelectElement.value.match(/^preset-(.+)/);
    if (matcher) {
      this.setTextureToStage(PIXI.loader.resources[matcher[1]].texture.clone());
    } else if (this.sourceSelectElement.value === 'camera') {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
          const url = window.URL.createObjectURL(stream);
          const video = document.createElement('video');
          video.src = url;
          video.oncanplay = () => this.setTextureToStage(PIXI.Texture.fromVideo(video));
          video.play();
        })
        .catch(error => {
          console.error('mediaDevice.getUserMedia() error:', error);
          return;
        });
    } else if (this.sourceSelectElement.value === 'upload') {
      if (!this.uploadImageCanvas) {
        return;
      }
      this.setTextureToStage(PIXI.Texture.fromCanvas(this.uploadImageCanvas));
    }

    this.renderer.render(this.stage);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  // main.setAnimation();
  main.updateFilters();

  window.addEventListener('keypress', main.handleKeyPress.bind(main));
});
