/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';

function Stage() {
  const { scene } = useGLTF('/operario.glb'); // Carrega o modelo GLB

  return (
    <Canvas style={{ width: '100%', height: '100vh' }}>
      {/* Luz ambiente para iluminar todo o modelo */}
      <ambientLight intensity={2} />
      {/* Luz direcional vinda de cima */}
      <directionalLight position={[5, 5, 5]} intensity={2} />
      {/* Luz pontual para criar sombras e realces */}
      <spotLight position={[0, 0, 0]} intensity={1} angle={0.3} penumbra={1} />

      {/* Ajuste da posição da câmera */}
      <PerspectiveCamera makeDefault position={[0, 0, 2]} />
      <PerspectiveCamera makeDefault position={[0, 1, 2]} rotation={[-Math.PI / 12, 0, 0]} />

      {/* O modelo 3D no centro */}
      <primitive object={scene} scale={1} position={[0, 0, 0]} rotation={[0, -Math.PI / 3, 0]} />

      {/* Controle de câmera */}
      <OrbitControls />
    </Canvas>
  );
}

export default Stage;
