/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF, OrbitControls, PerspectiveCamera, Environment,
} from '@react-three/drei';
import { useRef } from 'react';
import styles from './stage.module.css';

// Componente para o modelo 3D com animação
function Model() {
  const { scene } = useGLTF('/ice.glb');
  const modelRef = useRef();

  // Hook para animação - roda a cada frame
  useFrame(({ clock }) => {
    // Rotação lenta usando o tempo do relógio como base
    // Multiplicador pequeno (0.1) para tornar a rotação bem lenta
    modelRef.current.rotation.y = clock.getElapsedTime() * 1;
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
  return (
    <div className={styles.stage}>
      <Canvas className={styles.canvas}>
        {/* Luz ambiente para iluminar todo o modelo */}
        <ambientLight intensity={0.5} />
        {/* Luz direcional vinda de cima */}
        <directionalLight position={[5, 5, 5]} intensity={2} />
        {/* Luz pontual para criar sombras e realces */}
        <spotLight position={[0, 0, 0]} intensity={1} angle={0.3} penumbra={1} />
        {/* Ambiente de iluminação HDR para reflexos mais naturais */}
        <Environment preset="city" />
        {/* Ajuste da posição da câmera */}
        <PerspectiveCamera makeDefault position={[0, 1, 2]} rotation={[-Math.PI / 12, 0, 0]} />
        {/* O modelo 3D com animação */}
        <Model />
        {/* Controle de câmera */}
        <OrbitControls
          minDistance={1.5} // Distância mínima (mais perto)
          maxDistance={4} // Distância máxima (mais longe)
        />
      </Canvas>
    </div>
  );
}

export default Stage;
