'use strict';

/** @type Egg.EggPlugin */
//module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
//};

/**
 * 配置跨域
 * @type {{package: string, enable: boolean}}
 */
exports.cors = {
    enable: true,
    package: 'egg-cors',
};

/**
 * 配置mongoose
 * @type {{package: string, enable: boolean}}
 */
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.redis = {
    enable: true,
    package: 'egg-redis',
};

