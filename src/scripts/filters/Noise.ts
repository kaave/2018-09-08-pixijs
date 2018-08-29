import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/noise.frag';

export interface Props {
  rand: UniformData<number>;
  strength: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  strength?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 1.5 },
  strength: { type: '1f', value: 0.25 },
  dimensions: {
    type: '4fv',
    value: [3000, 3000, 0, 0],
  },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get strength() {
    return (this.uniforms.rand as any) as number;
  }

  set strength(value: number) {
    (this.uniforms.rand as any) = value;
  }

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
