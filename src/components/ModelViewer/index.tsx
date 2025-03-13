/* eslint-disable react/react-in-jsx-scope */
import '@google/model-viewer';

import operario from '../../assets/operario.glb';

function ModelViewer() {
  return (
    <model-viewer
      src={operario}
      alt="Modelo 3D"
      auto-rotate
      camera-controls
      ar
      style={{ width: '100%', height: '500px' }}
    />
  );
}

export default ModelViewer;
