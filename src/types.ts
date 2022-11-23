import { Camera, Group, Mesh } from 'three';

export type ScreenSize = { width: number; height: number };

export type Animator = (params: AnimatorParams) => void;

export type AnimatorParams = {
  cubesGroup: Group;
  elapsedTime: number;
  camera: Camera;
  meshes: Array<Mesh>;
};
