import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { OrbitControls } from '@react-three/drei';

import './App.scss';

const BoxMesh = ({ position, color = 'lightblue', args }) => {
  // const ref = useRef(null);
  // const [colorMap, displacementMap, normalMap, roughnessMap, ambientMap] =
  //   useLoader(THREE.TextureLoader, [
  //     '/color.jpg',
  //     '/displacement.jpg',
  //     '/normal.jpg',
  //     '/roughness.jpg',
  //     '/ambient-occlusion.jpg',
  //   ]);

  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.002));

  return (
    <a.mesh
      // ref={ref}
      position={position}
      // rotation={[0.2, 0, 0.1]}
      castShadow
      receiveShadow
    >
      <boxBufferGeometry
        attach="geometry"
        args={args} //size of the box
      />
      <meshPhysicalMaterial
        attach="material"
        color={'lightblue'}
        speed={2}
        color={color}
        // map={colorMap}
        // displacementScale={0}
        // displacementMap={displacementMap}
        // normalMap={normalMap}
        // roughnessMap={roughnessMap}
        // aoMap={ambientMap}
      />
    </a.mesh>
  );
};

const GroupBoxMesh = ({ args }) => {
  const ref = useRef(null);
  useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.002));

  return (
    <group ref={ref}>
      <BoxMesh position={[0, 1.19, 0]} args={[2, 0.8, 2]} color="#60A5BF" />
      <BoxMesh position={[0, 0, 0]} args={[2, 1.5, 2]} color="#3D7E98" />
    </group>
  );
};

const Bulb = (props) => {
  return (
    <mesh {...props}>
      <pointLight castShadow />
      {/* <sphereBufferGeometry args={[0.2]} /> */}
      {/* <meshPhongMaterial emissive={'yellow'} /> */}
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas colorManagement shadows camera={{ position: [3, 3, 3], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          {/* <pointLight position={[-10, 0, -20]} intensity={0.5} />
          <pointLight position={[0, -10, 0]} intensity={1.5} /> */}
          {/* <directionalLight
            castShadow
            position={[5, 4, 5]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          /> */}

          <GroupBoxMesh />
          <Bulb position={[3, 3, 0]} />
          <OrbitControls />
          {/* <axesHelper args={[5]} /> */}
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
