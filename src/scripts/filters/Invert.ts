import { Filter } from 'pixi.js';

import fragment from './shaders/invert.frag';

export default class extends Filter<{}> {
  constructor() {
    super(undefined, fragment, {});
  }
}
