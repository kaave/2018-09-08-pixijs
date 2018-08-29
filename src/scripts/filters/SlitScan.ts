import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/slitScan.frag';

export interface Props {
  rand: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1i', value: 15 },
  dimensions: {
    type: '4fv',
    value: [10, 1, 1, 1],
  },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get dimension() {
    return (this.uniforms.dimensions as any)[0] as number;
  }

  set dimension(value: number) {
    (this.uniforms.dimensions as any)[0] = value;
  }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
