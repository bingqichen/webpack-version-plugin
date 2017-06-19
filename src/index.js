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
      chunkHash: {}
    };

    compilation.chunks.forEach(function (item) {
      hashMap.chunkHash[item.name] = item.hash;
    });

    self.opts.cb(hashMap);

    callback();
  });
};

module.exports = WebpackVersionPlugin;
