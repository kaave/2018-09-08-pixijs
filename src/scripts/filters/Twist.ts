import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/twist.frag';

export interface Props {
  rand: UniformData<number>;
  timer: UniformData<number>;
  val2: UniformData<number>;
  val3: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  timer?: UniformData<number>;
  val2?: UniformData<number>;
  val3?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 0.5 },
  timer: { type: '1f', value: 0 },
  val2: { type: '1f', value: 25 },
  val3: { type: '1f', value: 55 },
  // dimensions: { type: '4fv', value: [0, 0, 0, 0] }, // no effect
  dimensions: {
    type: '4fv',
    value: [10, 10, 0, 0],
  },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get val2() {
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    (this.uniforms.val2 as any) = value;
  }

  get val3() {
    return (this.uniforms.val3 as any) as number;
  }

  set val3(value: number) {
    (this.uniforms.val3 as any) = value;
  }

  get timer() {
    return (this.uniforms.timer as any) as number;
  }

  set timer(value: number) {
    (this.uniforms.timer as any) = value;
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

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
