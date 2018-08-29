import { Filter } from 'pixi.js';

import fragment from './shaders/greenRaise.frag';

export default class extends Filter<{}> {
  constructor() {
    super(undefined, fragment, {});
  }
}
