
// eslint-disable-next-line strict
module.exports = () => {
  return async function controllerWrap(controllerFn, self) {
    return async function() {
      const that = self;
      try {
        await controllerFn.apply(that, arguments);
      } catch (e) {
        throw (e);
      }
    };
  };
};
