function WebpackVersionPlugin(opts) {
  if (typeof opts.cb !== 'function') {
    throw new Error('You must set the cb option');
  }
  this.opts = opts;
}

WebpackVersionPlugin.prototype.apply = function(compiler, callback) {
  const self = this;
  compiler.hooks.emit.tap({ name: 'WebpackVersionPlugin' }, function(compilation) {

    const hashMap = {
      hash: compilation.fullHash
    };

    compilation.chunks.forEach(function (item) {
      hashMap[item.name] = {
        chunkHash: item.hash,
        files: item.files,
        // contentHash: item.contentHash
      };
    });

    self.opts.cb(hashMap);
  });
};

module.exports = WebpackVersionPlugin;
