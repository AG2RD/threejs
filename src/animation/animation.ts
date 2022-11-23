import gsap from 'gsap';
import { BoxGeometry, Color, Mesh, MeshBasicMaterial, Object3D } from 'three';

import { AbstractTheatre } from '../common/abstractTheatre';
import { Common } from '../common/common';

export class AnimationScene extends AbstractTheatre {
  constructor(common: Common) {
    super(common);
  }

  render() {
    const cubesGroup = this.common.createGroupMeshes(
      this.getMeshes(["sandra", "emma", "lydia", "barbara"])
    );
    this.camera.lookAt(cubesGroup.position);
    this.common.populateScene(this.scenes[this.activeSceneIndex], [
      cubesGroup,
      this.camera,
    ]);
    this.gsapAnimation(cubesGroup.children[0], {
      duration: 10,
      delay: 1,
      x: 3,
    });
    this.gsapAnimation(this.camera, { duration: 10, delay: 1, x: -3 });
    this.common.initAnimationLoop({
      renderer: this.renderer,
      scene: this.scenes[0],
      camera: this.camera,
    });
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

  animateObject3D = ({ cubesGroup, elapsedTime, meshes }: any) => {
    cubesGroup.position.set(Math.cos(elapsedTime), Math.sin(elapsedTime), 0);
    meshes.map((mesh: Mesh) => {
      mesh.rotation.set(
        Math.sin(elapsedTime),
        Math.cos(elapsedTime),
        Math.tan(elapsedTime)
      );
      mesh.scale.set(Math.sin(elapsedTime / 2), Math.cos(elapsedTime / 2), 1);
      return mesh;
    });
  };

  gsapAnimation(object: Object3D, params: gsap.TweenVars) {
    gsap.to(object.position, params);
  }
}
