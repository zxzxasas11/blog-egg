const arr = [
  { code: 200, msg: 'success' },
  { code: 500, msg: '服务器出现异常' },
  { code: 600, msg: '您没有该权限' },
  { code: 601, msg: '信息已存在' },
  { code: 602, msg: '该贴已经锁定,不允许回复' },
  { code: 700, msg: '该用户已经是管理员' },
  { code: 400, msg: '服务器错误' },
  { code: 401, msg: '尚未登录' },
  { code: 402, msg: '该条数据不存在,无法删除' },
  { code: 900, msg: '不可操作自己' },
];

module.exports = async (ctx, code, data) => {
  let msg;
  arr.forEach((element, index, arr1) => {
    if (element.code === code) {
      msg = element.msg;
    }
  });
  if (data) {
    ctx.response.status = code;
    ctx.body = {
      code,
      msg,
      data,
    };
  } else {
    ctx.response.status = code;
    ctx.body = {
      code,
      msg,
    };
  }
};
