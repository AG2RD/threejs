import './style.css';

import { BasicScene } from './basic-scene/basic-scene';

export class Application {
  main() {
    const scene = new BasicScene();
    scene.render();
  }
}

new Application().main();
