import { BoxGeometry, Color, Euler, Mesh, MeshBasicMaterial, PerspectiveCamera, Renderer, Scene, Vector3 } from 'three';

import { Common } from '../common';
import { AnimatorParams, ScreenSize } from '../types';

export class AnimationScene {
  screenSize: ScreenSize;
  fov: number;
  common: Common;
  renderer: Renderer;
  canvas: HTMLCanvasElement;
  scenes: Array<Scene>;
  activeSceneIndex: number;
  constructor(
    common: Common,
    screenSize: ScreenSize = { width: 800, height: 600 },
    fov: number = 75
  ) {
    this.activeSceneIndex = 0;
    this.canvas = document.querySelector("#webgl") as HTMLCanvasElement;
    this.common = common;
    this.fov = fov;
    this.screenSize = screenSize;
    this.renderer = this.common.initRenderer(this.canvas, this.screenSize);
    this.scenes = [this.common.initScene()];
  }

  render() {
    const meshes = this.getMeshes().map((mesh, i) => {
      const rotationVector = new Euler((Math.PI / 180) * 50, 0, 0);
      this.common.setTransformation(mesh, "ROTATION", rotationVector);
      this.common.setTransformation(mesh, "POSITION", new Vector3(i, i, i));
      return mesh;
    });
    const cubesGroup = this.common.createGroupMeshes(meshes);
    const camera = this.common.initCamera(
      this.fov,
      this.screenSize,
      cubesGroup.position
    );
    const scene = this.common.populateScene(
      this.scenes[this.activeSceneIndex],
      [this.getMeshes()[2], cubesGroup, camera]
    );
    this.renderer.render(scene, camera);
    this.common.initAnimationLoop(
      this.animateMeshes,
      {
        cubesGroup,
        camera,
        meshes,
        elapsedTime: 0,
      },
      this.renderer,
      scene
    );
  }

  getMeshes(): Array<Mesh> {
    return [
      new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: new Color("green") })
      ),
      new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: new Color("blue") })
      ),
      new Mesh(
        new BoxGeometry(1, 1, 1),
        new MeshBasicMaterial({ color: new Color("red") })
      ),
    ];
  }

  animateMeshes = ({
    camera,
    cubesGroup,
    elapsedTime,
    meshes,
  }: AnimatorParams) => {
    cubesGroup.position.y = Math.cos(elapsedTime);
    cubesGroup.position.x = Math.sin(elapsedTime);
    camera.lookAt(cubesGroup.position);
    (<PerspectiveCamera>camera).setFocalLength(
      Math.cos(elapsedTime) * 100 + 10
    );

    meshes.map((mesh: Mesh) => {
      mesh.rotation.y = Math.sin(elapsedTime);
      mesh.rotation.x = Math.cos(elapsedTime);
      mesh.rotation.z = Math.tan(elapsedTime);

      mesh.scale.x = Math.sin(elapsedTime / 2);
      mesh.scale.y = Math.cos(elapsedTime / 2);

      return mesh;
    });
  };
}
