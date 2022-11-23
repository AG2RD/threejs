import { Camera, Renderer, Scene } from 'three';

import { Common } from './common';
import { ITheatre } from './interfaces/theatre.interface';
import { ScreenSize } from './types';

export abstract class AbstractTheatre implements ITheatre {
  screenSize: ScreenSize;
  fov: number;
  common: Common;
  renderer: Renderer;
  canvas: HTMLCanvasElement;
  scenes: Scene[];
  camera: Camera;
  activeSceneIndex: number;

  constructor(
    common: Common,
    screenSize: ScreenSize = { width: 800, height: 600 },
    fov: number = 75,
    activeSceneIndex = 0
  ) {
    this.activeSceneIndex = activeSceneIndex;
    this.canvas = document.querySelector("#webgl") as HTMLCanvasElement;
    this.common = common;
    this.fov = fov;
    this.screenSize = screenSize;
    this.camera = this.common.initCamera(fov, screenSize);
    this.renderer = this.common.initRenderer(this.canvas, screenSize);
    this.scenes = [this.common.initScene()];
  }
  abstract render(): void;
}
