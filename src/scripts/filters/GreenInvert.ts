import { Filter } from 'pixi.js';

import fragment from './shaders/greenInvert.frag';

export default class extends Filter<{}> {
  constructor() {
    super(undefined, fragment, {});
  }
}
