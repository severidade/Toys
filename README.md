## Configurar o Vite para lidar com arquivos .glb

No seu arquivo de configuração do Vite (vite.config.js), adicione a configuração necessária para que o Vite trate arquivos .glb corretamente:

```js
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.glb'],
});
```
Isso permitirá que o Vite reconheça arquivos .glb como ativos e os trate corretamente no processo de build.
tes