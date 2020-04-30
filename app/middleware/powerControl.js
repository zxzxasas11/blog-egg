// eslint-disable-next-line strict
const JWTPath = require('../util/JWTPath');
const code = require('../util/statusCode');

/**
 *
 */
module.exports = () => {
  return async function(ctx, next) {
    // 留个坑
    // get方法和管理员全部放行
    await next();
    return;
    if (ctx.request.method === 'GET' || JWTPath.find(item => item === ctx.request.url) || ctx.user.power === 9) {
      await next();
    } else {
      const data = await ctx.app.redis.get(ctx.user.userId);
      const adminPath = JSON.parse(data);
      let flag = false;
      adminPath.forEach((value, index) => {
        let rep = '/^';
        if (value.url.indexOf('*') > -1) {
          const ar = value.url.split('/');
          for (let i = 1; i < ar.length - 1; i++) {
            rep += '\\/' + ar[i];
          }
          // eslint-disable-next-line no-eval
          if (new RegExp(eval(rep + '/')).test(ctx.request.url) && ctx.request.method === value.method.toLocaleUpperCase()) {
            flag = true;
          }
        } else {
          if (value.url === ctx.request.url && ctx.request.method === value.method.toLocaleUpperCase()) {
            flag = true;
          }
        }
      });
      if (flag) {
        await next();
      } else {
        await code(ctx, 600);
      }
    }
  };
};
