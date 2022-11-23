import './style.css';

import { AnimationScene } from './animation/animation';

// import { BasicScene } from './basic-scene/basic-scene';
export class Application {
  main() {
    // const scene = new BasicScene();
    // const scene = new TransformObject();
    const scene = new AnimationScene();
    scene.render();
  }
}

new Application().main();
