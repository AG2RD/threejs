import { BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';

type ScreenSize = { width: number; height: number };
export class BasicScene {
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
    const canvas = document.querySelector("#webgl") as HTMLCanvasElement;
    const scene = new Scene();

    const cube = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new Mesh(cube, material);

    const camera = new PerspectiveCamera(
      this.fov,
      this.screenSize.width / this.screenSize.height
    );
    camera.position.setZ(4);
    camera.position.setX(2);
    scene.add(mesh);
    scene.add(camera);

    const renderer = new WebGLRenderer({
      canvas,
    });
    renderer.setSize(this.screenSize.width, this.screenSize.height);
    renderer.render(scene, camera);
  }
}
