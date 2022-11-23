import { Camera, Renderer, Scene } from 'three';

import { Common } from '../common';
import { ScreenSize } from '../types';

export interface ITheatre {
  screenSize: ScreenSize;
  fov: number;
  common: Common;
  renderer: Renderer;
  canvas: HTMLCanvasElement;
  scenes: Array<Scene>;
  activeSceneIndex: number;
  camera: Camera;
  render(): void;
}
