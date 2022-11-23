import { Group, Mesh } from 'three';

export type ScreenSize = { width: number; height: number };

export type Animator = (params: AnimatorParams) => void;

export type AnimatorParams = {
  cubesGroup: Group;
  meshes: Array<Mesh>;
};
