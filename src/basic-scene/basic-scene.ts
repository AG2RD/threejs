import * as three from "three";

const scene = new three.Scene();

const cube = new three.BoxGeometry(1, 1, 1);
const material = new three.MeshBasicMaterial({ color: "red" });
