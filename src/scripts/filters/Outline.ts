import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/outline.frag';

export interface Props {
  dimensions: UniformData<number[]>;
}

interface Args {
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  dimensions: {
    type: '4fv',
    value: [300, 200, 0, 0],
  },
};

export default class extends Filter<Props> {
  get dimensionX() {
    return (this.uniforms.dimensions as any)[0] as number;
  }

  set dimensionX(value: number) {
    (this.uniforms.dimensions as any)[0] = value;
  }

  get dimensionY() {
    return (this.uniforms.dimensions as any)[1] as number;
  }

  set dimensionY(value: number) {
    (this.uniforms.dimensions as any)[1] = value;
  }

  get dimensionZ() {
    return (this.uniforms.dimensions as any)[2] as number;
  }

  set dimensionZ(value: number) {
    (this.uniforms.dimensions as any)[2] = value;
  }

  get dimensionA() {
    return (this.uniforms.dimensions as any)[3] as number;
  }

  set dimensionA(value: number) {
    (this.uniforms.dimensions as any)[3] = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
