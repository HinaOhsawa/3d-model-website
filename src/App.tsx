import { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/Addons.js";

function App() {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;

    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };
    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    //renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    //3dモデルのインポート
    const gltfLoader = new GLTFLoader();

    let mixer1: THREE.AnimationMixer;
    let mixer2: THREE.AnimationMixer;
    // gltfLoader.load("./models/shiba.gltf", (gltf) => {
    // gltfLoader.load("./animation-model/neko.gltf", (gltf) => {
    gltfLoader.load("./model2/nakokichi_4.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.set(0, -1, 0);
      // model.rotation.y = -Math.PI / -10;
      scene.add(model);

      //モデルのアニメーション
      mixer1 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      clips.forEach(function (clip) {
        const action = mixer1.clipAction(clip);
        action.play();
      });
    });

    
    gltfLoader.load("./model2/nakokichi_3.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(2, 2, 2);
      model.position.set(2, -1, 0);
      // model.rotation.y = -Math.PI / -10;
      scene.add(model);

      //モデルのアニメーション
      mixer2 = new THREE.AnimationMixer(model);
      const clips = gltf.animations;
      clips.forEach(function (clip) {
        const action = mixer2.clipAction(clip);
        action.play();
      });
    });

    //ライト
    // const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(ambientLight);
    // const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    // scene.add(pointLight);

    //カメラコントロール
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // const clock = new THREE.Clock();

    //描画
    const tick = () => {
      //カメラを回転
      // const elapsedTime = clock.getElapsedTime(); //時間の経過を取得
      // camera.position.x = Math.cos(Math.PI * elapsedTime * 0.2) * 10;
      // camera.position.z = Math.sin(Math.PI * elapsedTime * 0.2) * 10;

      renderer.render(scene, camera);
      controls.update();

      if (mixer1) {
        mixer1.update(0.01);
      }
      if (mixer2) {
        mixer2.update(0.01);
      }

      window.addEventListener("resize", () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
      });

      requestAnimationFrame(tick);
    };
    tick();
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        {/* <h3>シバワン</h3>
        <p>Web Developer</p> */}
      </div>
    </>
  );
}

export default App;
