import {
  AxesHelper,
  BoxGeometry,
  Camera,
  Clock,
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

type ScreenSize = { width: number; height: number };
const transformations = {
  ROTATION: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.rotation.copy(vector as Euler),
  POSITION: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.position.set(vector.x, vector.y, vector.z),
  SCALE: (mesh: Mesh, vector: Euler | Vector3) =>
    mesh.scale.set(vector.x, vector.y, vector.z),
};
export class AnimationScene {
  screenSize: ScreenSize;
  fov: number;
  constructor(
    screenSize: ScreenSize = { width: 800, height: 600 },
    fov: number = 75
  ) {
    this.screenSize = screenSize;
    this.fov = fov;
  }

  render() {
    const rotationVector = new Euler((Math.PI / 180) * 50, 0, 0);
    const meshes = this.getMeshes();
    const transformedMeshes = meshes.map((mesh, i) => {
      this.setTransformation(mesh, "ROTATION", rotationVector);
      this.setTransformation(mesh, "POSITION", new Vector3(i, i, i));
      return mesh;
    });
    const cubesGroup = this.createGroupMeshes(transformedMeshes.slice(0, 2));
    const camera = this.initCamera(cubesGroup.position);

    const scene = this.populateScene(this.initScene(), [cubesGroup, camera]);
    scene.add(meshes[2]);
    const canvas = document.querySelector("#webgl") as HTMLCanvasElement;
    const renderer = this.initRenderer(canvas);
    renderer.render(scene, camera);
    const clock = new Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
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

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }

  populateScene(scene: Scene, sceneItems: Array<Group | Mesh | Camera>): Scene {
    return scene.add(...sceneItems);
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

  setTransformation(
    mesh: Mesh,
    transformationName: "ROTATION" | "POSITION" | "SCALE",
    vector: Euler | Vector3
  ) {
    transformations[transformationName](mesh, vector);
  }

  createGroupMeshes(objects: Array<Mesh>): Group {
    const group = new Group();
    objects.forEach((cube: Mesh, i) => {
      group.add(cube);
    });
    return group;
  }

  initCamera(targetPosition?: Vector3): Camera {
    const camera = new PerspectiveCamera(
      this.fov,
      this.screenSize.width / this.screenSize.height
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

  initRenderer(canvas: HTMLCanvasElement): Renderer {
    const renderer = new WebGLRenderer({
      canvas,
    });
    renderer.setSize(this.screenSize.width, this.screenSize.height);
    return renderer;
  }
}
