import gsap from 'gsap';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Object3D, Renderer, Scene } from 'three';

import { Common } from '../common';
import { ScreenSize } from '../types';

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
    const meshes = this.getMeshes();
    const cubesGroup = this.common.createGroupMeshes(meshes);
    const camera = this.common.initCamera(this.fov, this.screenSize);
    this.common.populateScene(this.scenes[this.activeSceneIndex], [
      cubesGroup,
      camera,
    ]);
    this.gsapAnimation(cubesGroup.children[0], {
      duration: 10,
      delay: 1,
      x: 3,
    });
    this.gsapAnimation(camera, { duration: 10, delay: 1, x: -3 });
    this.common.initAnimationLoop(this.renderer, this.scenes[0], camera);
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

  animateObject3D = ({ camera, cubesGroup, elapsedTime, meshes }: any) => {
    cubesGroup.position.y = Math.cos(elapsedTime);
    cubesGroup.position.x = Math.sin(elapsedTime);
    camera.lookAt(cubesGroup.position);
    // (<PerspectiveCamera>camera).setFocalLength(
    //   Math.cos(elapsedTime) * 100 + 10
    // );

    meshes.map((mesh: Mesh) => {
      mesh.rotation.y = Math.sin(elapsedTime);
      mesh.rotation.x = Math.cos(elapsedTime);
      mesh.rotation.z = Math.tan(elapsedTime);

      mesh.scale.x = Math.sin(elapsedTime / 2);
      mesh.scale.y = Math.cos(elapsedTime / 2);

      return mesh;
    });
  };

  gsapAnimation(object: Object3D, params: gsap.TweenVars) {
    gsap.to(object.position, params);
  }
}
