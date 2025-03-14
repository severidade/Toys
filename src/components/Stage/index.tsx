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

// Componente para o modelo 3D com animação
function Model() {
  const { scene } = useGLTF('/operario.glb');
  const modelRef = useRef();

  // Hook para animação - roda a cada frame
  useFrame(({ clock }) => {
    // Rotação lenta usando o tempo do relógio como base
    if (modelRef.current) {
      modelRef.current.rotation.y = clock.getElapsedTime() * 1;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]} // Rotação inicial zerada, pois será controlada pelo useFrame
    />
  );
}

function Stage() {
  // Convertendo 115 graus para radianos
  const maxVerticalAngle = (115 * Math.PI) / 180;

  // Calculando um ângulo mínimo que permita uma visão coerente
  const minVerticalAngle = (65 * Math.PI) / 180;

  return (
    <div className={styles.stage}>
      <Canvas className={styles.canvas}>
        {/* Suspense para gerenciar o estado de carregamento */}
        <Suspense fallback={<Loader />}>
          {/* Luz ambiente para iluminar todo o modelo */}
          <ambientLight intensity={0.5} />
          {/* Luz direcional vinda de cima */}
          <directionalLight position={[5, 5, 5]} intensity={2} />
          {/* Luz pontual para criar sombras e realces */}
          <spotLight position={[0, 5, 2]} intensity={1} angle={0.3} penumbra={1} />
          {/* Ambiente de iluminação HDR para reflexos mais naturais */}
          <Environment preset="city" />
          {/* Ajuste da posição da câmera */}
          <PerspectiveCamera makeDefault position={[0, 1, 2]} rotation={[-Math.PI / 12, 0, 0]} />
          {/* O modelo 3D com animação */}
          <Model />
          {/* Controle de câmera com restrições */}
          <OrbitControls
            minDistance={1.5} // Distância mínima (mais perto)
            maxDistance={4} // Distância máxima (mais longe)
            enableRotate
            rotateSpeed={0.5}
            minPolarAngle={minVerticalAngle}
            maxPolarAngle={maxVerticalAngle}
            enablePan={false} // Desativa o pan (arrastar) da câmera
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Precarregar o modelo para melhorar o desempenho
useGLTF.preload('/operario.glb');

export default Stage;
