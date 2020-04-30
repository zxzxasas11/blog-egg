/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1588214554346_451';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cors = {
    origin: '*', // 访问白名单,根据你自己的需要进行设置
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  config.mongoose = {
    //url: 'mongodb://112.51.254.68:27017/forum',
    url: 'mongodb://xby:zxzxasas11@47.114.44.30:27017/blog',
    options: {
      //useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
  config.jwt = {
    secret: 'egg-api-jwt',
  };
  // 加入的中间件要写在这个里面
  config.middleware = [
    'jwt',
    // 'controllerWrap',
    'powerControl',
    //'logRabbit'
  ];

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ]
  };
  //定义redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '47.114.44.30', // Redis host
      password: '',
      db: 0,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
