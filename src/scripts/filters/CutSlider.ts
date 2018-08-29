import { Filter, UniformData } from 'pixi.js';

import fragment from './shaders/cutSlider.frag';

export interface Props {
  rand: UniformData<number>;
  val1: UniformData<number>;
  val2: UniformData<number>;
  dimensions: UniformData<number[]>;
}

interface Args {
  rand?: UniformData<number>;
  val1?: UniformData<number>;
  val2?: UniformData<number>;
  dimensions?: UniformData<number[]>;
}

const defaultProps: Props = {
  rand: { type: '1f', value: 5 },
  val1: { type: '1f', value: 5 },
  val2: { type: '1f', value: 20 },
  dimensions: { type: '4fv', value: [50, 50, 0, 0] }, // no effect
  // dimensions: {
  //   type: '4fv',
  //   value: [
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //     Math.floor(Math.random() * 200),
  //   ],
  // },
};

export default class extends Filter<Props> {
  get rand() {
    return (this.uniforms.rand as any) as number;
  }

  set rand(value: number) {
    (this.uniforms.rand as any) = value;
  }

  get val1() {
    return (this.uniforms.val1 as any) as number;
  }

  set val1(value: number) {
    (this.uniforms.val1 as any) = value;
  }

  get val2() {
    return (this.uniforms.val2 as any) as number;
  }

  set val2(value: number) {
    (this.uniforms.val2 as any) = value;
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

  // get dimensionZ() {
  //   return (this.uniforms.dimensions as any)[2] as number;
  // }

  // set dimensionZ(value: number) {
  //   (this.uniforms.dimensions as any)[2] = value;
  // }

  // get dimensionA() {
  //   return (this.uniforms.dimensions as any)[3] as number;
  // }

  // set dimensionA(value: number) {
  //   (this.uniforms.dimensions as any)[3] = value;
  // }

  constructor(args: Args = {}) {
    super(undefined, fragment, { ...defaultProps, ...args } as any);
  }
}
