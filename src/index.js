function WebpackVersionPlugin(opts) {
  if (typeof opts.cb !== 'function') {
    throw new Error('You must set the cb option');
  }
  this.opts = opts;
}

WebpackVersionPlugin.prototype.apply = function(compiler, callback) {
  const self = this;
  compiler.plugin('emit', function(compilation, callback) {



    const hashMap = {
      hash: compilation.fullHash,
      chunkHash: {},
      files: {}
    };

    compilation.chunks.forEach(function (item, index) {
      hashMap.chunkHash[item.name] = item.hash;
      hashMap.files[item.name] = compilation.chunks[index].files;
    });

    self.opts.cb(hashMap);

    callback();
  });
};

module.exports = WebpackVersionPlugin;
