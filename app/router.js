'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.prefix("/api");
  //router.resources('article','/api/article',controller.article)
  require('./router/article')(app);
  require('./router/dictionary')(app);
};
