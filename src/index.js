function WebpackVersionPlugin(opts) {

}

WebpackVersionPlugin.prototype.apply = function(compiler, callback) {
  compiler.plugin('emit', function(compilation, callback) {
    console.log(compilation.getStats());
    callback();
  });
}

module.exports = WebpackVersionPlugin
