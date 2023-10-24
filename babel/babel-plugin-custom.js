module.exports = function (babel) {
  return {
    visitor: {
      Identifier(path, state) {
        const node = path.node;
        console.log(node)

        if (node.name === 'a'){
          node.name = 'b'
        }
      }
    }
  }
};
