import {
  AxesHelper,
  BoxGeometry,
  Camera,
  Color,
  Euler,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Renderer,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

import { Animator, LoopParams, ScreenSize } from './types';

const transformations = {
  POSITION: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.position.set(vector.x, vector.y, vector.z),
  ROTATION: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.rotation.copy(vector as Euler),
  SCALE: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.scale.set(vector.x, vector.y, vector.z),
};
export class Common {
  animateScenery(animator: Animator, params: any): any {
    animator(params);
  }
  createGroupMeshes(objects: Array<Mesh>): Group {
    const group = new Group();
    objects.forEach((cube: Mesh) => {
      group.add(cube);
    });
    return group;
  }

  initAnimationLoop({
    renderer,
    scene,
    camera,
    animatorParams,
    animator,
  }: LoopParams) {
    const tick = () => {
      animator &&
        animatorParams &&
        this.animateScenery(animator, animatorParams);
      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  initCamera(
    fov: number,
    screenSize: ScreenSize,
    targetPosition?: Vector3
  ): Camera {
    const camera = new PerspectiveCamera(
      fov,
      screenSize.width / screenSize.height
    );
    camera.position.set(0, 0, 8);
    targetPosition && camera.lookAt(targetPosition);
    return camera;
  }

  initScene(): Scene {
    const scene = new Scene();
    scene.add(new AxesHelper());
    return scene;
  }

  initRenderer(canvas: HTMLCanvasElement, screenSize: ScreenSize): Renderer {
    const renderer = new WebGLRenderer({
      canvas,
    });
    renderer.setSize(screenSize.width, screenSize.height);
    return renderer;
  }

  populateScene(scene: Scene, sceneItems: Array<Group | Mesh | Camera>): Scene {
    return scene.add(...sceneItems);
  }

  setTransformation(
    mesh: Mesh,
    transformationName: "ROTATION" | "POSITION" | "SCALE",
    vector: Euler | Vector3
  ) {
    transformations[transformationName](mesh, vector);
  }

  getMeshes(cubeNames: Array<string>): Array<Mesh> {
    return cubeNames.map(
      () =>
        new Mesh(
          new BoxGeometry(1, 1, 1),
          new MeshBasicMaterial({ color: new Color(Math.random() * 0xffffff) })
        )
    );
  }
}
