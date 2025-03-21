/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { Canvas } from '@react-three/fiber';
import {
  useGLTF, OrbitControls, PerspectiveCamera, Environment,
  Html, useProgress,
} from '@react-three/drei';
import { useRef, Suspense, useEffect } from 'react';
import gsap from 'gsap';
import styles from './stage.module.css';

// Componente de indicador de carregamento
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className={styles.loader || 'loader'}>
        <div className={styles.loaderText || 'loader-text'}>
          Carregando:
          {' '}
          {progress.toFixed(0)}
          %
        </div>
        <div className={styles.loaderBar || 'loader-bar'}>
          <div
            className={styles.loaderProgress || 'loader-progress'}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Html>
  );
}

// Componente para o modelo 3D com animação via GSAP
function Model() {
  const { scene } = useGLTF('/operario.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2, // Rotaciona 360 graus
        duration: 5, // Tempo da animação em segundos
        repeat: -1, // Repetição infinita
        ease: 'linear', // Movimento contínuo e uniforme
      });
    }
  }, []);

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]} // Rotação inicial zerada
    />
  );
}

function Stage() {
  // Convertendo 115 graus para radianos
  const maxVerticalAngle = (115 * Math.PI) / 180;
  const minVerticalAngle = (65 * Math.PI) / 180;

  return (
    <div className={styles.stage}>
      <Canvas className={styles.canvas}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <spotLight position={[0, 5, 2]} intensity={1} angle={0.3} penumbra={1} />
          <Environment preset="city" />
          <PerspectiveCamera makeDefault position={[0, 1, 2]} rotation={[-Math.PI / 12, 0, 0]} />
          <Model />
          <OrbitControls
            minDistance={1.5}
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

// Precarregar o modelo para melhorar o desempenho
useGLTF.preload('/operario.glb');

export default Stage;
