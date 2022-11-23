import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { AbstractTheatre } from '../common/abstractTheatre';
import { Common } from '../common/common';

export class CameraScene extends AbstractTheatre {
  constructor(common: Common) {
    super(common);
  }

  render(): void {
    const activeScene = this.scenes[this.activeSceneIndex];
    this.common.populateScene(
      activeScene,
      this.common.getMeshes(["cube", "cube2"])
    );
    this.renderer.render(activeScene, this.camera);
    this.common.initAnimationLoop({
      renderer: this.renderer,
      scene: activeScene,
      camera: this.camera,
      animatorParams: new OrbitControls(this.camera, this.renderer.domElement),
      animator: this.animator,
    });
  }

  animator(controls: OrbitControls) {
    controls.update();
  }
}
