# webpack-version-plugin
## 使用
```bash
const webpack = require('webpack');
const WebpackVersionPlugin = require('webpack-version-plugin');

module.exports = {
  entry: {
    app: 'src/app',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: 'dist/',
    filename: 'js/[name]_[hash:8].js',
    publicPath: 'cdn_path'
  },
  plugins: [
    new WebpackVersionPlugin({
      cb: function(hashMap) {
        console.log(hashMap);
        /*{
          hash: 'fa74f31052feddb3032256f018063b88',
          chunkHash: {
            app: '4089fbc1699ec5b6009b0f9bfcdc8327',
            vendor: 'ff7f0450afc7ff3030cba2428e593dcf'
          }
        }*/        
      }
    }),
    ...
  ]
}
```

## 起源
