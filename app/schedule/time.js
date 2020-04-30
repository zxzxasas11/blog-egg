const moment =require('moment')
module.exports = {
  schedule: {
    cron: '00 05 17 * * *', //每周一的5点30分0秒更新
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    //const time = moment(new Date()).format("YYYY-MM-DD");
    //await ctx.service.source.updateSource(time);
  }
};
