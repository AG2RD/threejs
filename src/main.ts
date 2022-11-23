import './style.css';

import { AnimationScene } from './animation/animation';
import { Common } from './common';

// import { BasicScene } from './basic-scene/basic-scene';
export class Application {
  main() {
    // const scene = new BasicScene();
    // const scene = new TransformObject();
    const common = new Common();
    const scene = new AnimationScene(common);
    scene.render();
  }
}

new Application().main();
