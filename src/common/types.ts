import { Camera, Renderer, Scene } from 'three';

export type ScreenSize = { width: number; height: number };

export type Animator = (params: any) => void;

export type LoopParams = {
  renderer: Renderer;
  scene: Scene;
  camera: Camera;
  animatorParams?: any;
  animator?: Animator;
};
