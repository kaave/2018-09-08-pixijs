import { Filter } from 'pixi.js';

import fragment from './shaders/blueRaise.frag';

export default class extends Filter<{}> {
  constructor() {
    super(undefined, fragment, {});
  }
}
