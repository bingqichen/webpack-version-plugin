function WebpackVersionPlugin(opts) {
  if (typeof opts.cb !== 'function') {
    throw new TypeError('You must set the cb function');
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
      // The dynamic module(Their name is null) will import by entry, it is not necessary to store.
      if (!!item.name) {
        hashMap[item.name] = {
          chunkHash: item.hash,
          files: item.files,
          // contentHash: item.contentHash
        };
      }
    });

    self.opts.cb(hashMap);
  });
};

module.exports = WebpackVersionPlugin;
