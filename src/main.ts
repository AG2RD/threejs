import './style.css';

import { CameraScene } from './camera/camera';
import { Common } from './common/common';

// import { BasicScene } from './basic-scene/basic-scene';
export class Application {
  main() {
    const common = new Common();
    // const scene = new BasicScene();
    // const scene = new TransformObject();
    // const scene = new AnimationScene(common);
    const scene = new CameraScene(common);
    scene.render();
  }
}

new Application().main();
