# webpack-version-plugin
## 安装
npm
```javascript
$ npm install webpack-version-plugin --save-dev
```
yarn
```javascript
$ yarn add webpack-version-plugin --dev
```
## 使用
```javascript
// webpack.config.js
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackVersionPlugin = require('webpack-version-plugin');
const versionConfig = require(path.join(__dirname, './version.json'));

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
      // You must set the cb option
      cb: function(hashMap) {
        console.log(hashMap);
        /* do something, the hashMap like this:
        {
          hash: 'fa74f31052feddb3032256f018063b88',
          chunkHash: {
            app: '4089fbc1699ec5b6009b0f9bfcdc8327',
            vendor: 'ff7f0450afc7ff3030cba2428e593dcf'
          }
        }*/
        versionConfig.vendorJsVersion = hashMap.hash;
        fs.writeFileSync(path.join(__dirname, './version.json'), JSON.stringify(versionConfig, null, 2));        
      }
    }),
    ...
  ]
}


// version.json
// before
{
  "vendorJsVersion": "767e2c64d1208e06c8810bea26c29ab6",
  "appVersion": "0cb630602d69887ef37c143c14bbeab7"
}
// after
{
  "vendorJsVersion": "fa74f31052feddb3032256f018063b88",
  "appVersion": "0cb630602d69887ef37c143c14bbeab7"
}
```

## 起源
最近在给项目的生成文件添加形如 `[hash:8]` 版本号的时候，想到每次更改生成新的打包文件，都要去版本配置的文件里用新的版本号覆盖旧的，程序员最不喜欢做这种重复性的劳动了，就想着有没有 `webpack` 插件能做类似的功能，能把我的版本号写到配置文件里去，找了一圈只找到 [webpack-version-hash-plugin](https://www.npmjs.com/package/webpack-version-hash-plugin) ，而且只能输出在固定的位置和固定的格式 (╯‵□′)╯︵┻━┻ ，无奈，我当时直接用了时间戳作为构建的版本号，后来就做了现在的这个插件，我可以在插件的 `cb` 函数中把获取到的版本号写到我单独的 `json` 文件中，当然，这里获取到的是完整的`hash` 值，可以按需截取。
