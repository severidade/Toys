/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF, OrbitControls, PerspectiveCamera, Environment,
  Html, useProgress,
} from '@react-three/drei';
import { useRef, Suspense } from 'react';
import styles from './stage.module.css';

// Componente de indicador de carregamento
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loader}>
        <div className={styles.loaderText}>
          Carregando:
          {' '}
          {progress.toFixed(0)}
          %
        </div>
        <div className={styles.loaderBar}>
          <div className={styles.loaderProgress} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Html>
  );
}

// Componente para o modelo 3D com animação
function Model() {
  const { scene } = useGLTF('/ice.glb');
  const modelRef = useRef(null);

  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime();
    }
  });

  return <primitive ref={modelRef} object={scene} scale={1} position={[0, 0, 0]} />;
}

useGLTF.preload('/ice.glb');

function Stage() {
  const maxVerticalAngle = (115 * Math.PI) / 180;
  const minVerticalAngle = (30 * Math.PI) / 180;

  return (
    <div className={styles.stage}>
      <Canvas shadows>
        <Suspense fallback={<Loader />}>
          {' '}
          {/* Suspense para carregamento */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
          <spotLight position={[0, 5, 2]} intensity={1} angle={-0.3} penumbra={20} castShadow />
          <Environment preset="sunset" />
          <PerspectiveCamera makeDefault position={[0, 1, 2]} />
          <Model />
          <OrbitControls
            minDistance={0.7}
            maxDistance={4}
            enableRotate
            rotateSpeed={0.5}
            minPolarAngle={minVerticalAngle}
            maxPolarAngle={maxVerticalAngle}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Stage;
