/* eslint-disable react/react-in-jsx-scope */
// import './App.css';
// import ModelViewer from './components/ModelViewer/index.tsx';
import Stage from './components/Stage/index.tsx';
import './CSS/style.css';

function App() {
  return (
    <main>
      <h1 className="app_title">Explorando Gráficos</h1>
      <p className="app_sub_title">Renderização de Objeto 3D no Navegador usando Three.js</p>
      <Stage />
    </main>
  );
}

export default App;
