# webpack-version-plugin
Use the webpack version plugin, you can get the hash and chunkhash, then do something.

## Install
npm
```bash
$ npm install webpack-version-plugin --save-dev
```
yarn
```bash
$ yarn add webpack-version-plugin --dev
```

## Usage
```javascript
// webpack.config.js
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackVersionPlugin = require('webpack-version-plugin');
const versionConfig = require(path.join(__dirname, './version.json'));

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../src/app'),
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, '../dist/'),
    filename: 'js/[name]_[chunkhash:8].js',
    publicPath: 'cdn_path'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]_[chunkhash:8].css'
    }),
    new WebpackVersionPlugin({
      // You must set the cb option
      cb: function(hashMap) {
        console.log(hashMap);
        /* do something, the hashMap like this:
        {
          hash: '6f0486fb6449204e4b3db696f95df4bc',
          app: {
            chunkHash: 'e03808e758b346644766a53e7996ef40',
            files: [ 'css/app_e03808e7.css', 'js/app_e03808e7.js' ]
          },
          vendor: {
            chunkHash: 'fdf3345a25608a6df7614afaf3896002',
            files: [ 'js/vendor_fdf3345a.js' ]
          }
        }*/
        versionConfig.appVersion = hashMap.app.chunkHash;
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
  "vendorJsVersion": "767e2c64d1208e06c8810bea26c29ab6",
  "appVersion": "e03808e758b346644766a53e7996ef40"
}
```

## Changelog
- 2021-06-01

  Ignore dynamic module. Beacuse the dynamic module(Their name is null) will import by entry, it is not necessary to store.

- 2018-04-16

  Use webpack@v4 event hooks.

## 起源
最近在给项目的生成文件需要添加形如 `[hash:8]` 版本号并把该版本号同步记录到某配置文件内，想到每次更改生成新的打包文件，都要去版本配置的文件里更改版本号，程序员最不喜欢做这种重复性的劳动了，就想着有没有 `webpack` 插件能做类似的功能，能把我的版本号写到配置文件里去，找了一圈只找到 [webpack-version-hash-plugin](https://www.npmjs.com/package/webpack-version-hash-plugin) ，而且只能输出在固定的位置和固定的格式 (╯‵□′)╯︵┻━┻ ，无奈，我当时直接用了时间戳作为构建的版本号，后来就做了现在的这个插件，我可以在插件的 `cb` 函数中把获取到的版本号写到我单独的 `json` 文件中，当然，这里获取到的是完整的`hash` 值，可以按需截取。
