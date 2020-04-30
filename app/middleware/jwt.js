// eslint-disable-next-line strict
const JWT = require('jsonwebtoken');
const jwtPath = require('../util/JWTPath');
const needLoginGet = require('../util/needLoginGet');
module.exports = options => {
  return async function(ctx, next) {
    // 拿到传会数据的header 中的token值
    next();
    return;
    ctx.state.csrf = ctx.csrf;
    const token = ctx.request.header.authorization;
    const method = ctx.method.toLowerCase();
    // 当前请求时get请求，执行接下来的中间件
    if (method === 'get' && needLoginGet.indexOf(ctx.path) < 0) {
      if(token){
        let decode = JWT.verify(token.split(' ')[1], options.secret);
        ctx.user = {
          code: decode.code,
          userId: decode.userId,
          username: decode.username,
          power: decode.power,
        };
      }
      await next();
      // 当前token值不存在的时候
    } else if (!token) {
      if (jwtPath.find(item => item === ctx.path)) {
        await next();
      } else {
        ctx.throw(401, '未登录， 请先登录');
      }
    } else { // 当前token值存在
      let decode;
      const t = token.split(' ')[1];
      try {
        // 验证当前token
        decode = JWT.verify(t, options.secret);
        ctx.user = {
          code: decode.code,
          userId: decode.userId,
          username: decode.username,
          power: decode.power,
        };
        if (!decode || !decode.username) {
          ctx.throw(401, '没有权限，请登录');
        }
        if (Date.now() - decode.expire > 0) {
          ctx.throw(401, 'Token已过期');
        }
        const user = await ctx.model.User.find({
          userId: decode.userId,
        });
        if (user) {
          await next();
        } else {
          ctx.throw('401', '用户信息验证失败');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};
