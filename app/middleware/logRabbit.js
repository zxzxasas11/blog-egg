// eslint-disable-next-line strict
module.exports = (options,app) => {
    return async function(ctx, next) {
        await next();
        return;
        let startTime = new Date().getTime();
        ctx.log = {
            safe :false
        };
        await next();
        let endTime = new Date().getTime();
        const params = {
            url:ctx.request.url,
            method:ctx.request.method,
            userId:ctx.user===undefined?null:ctx.user.userId,
            username:ctx.user===undefined?null:ctx.user.username,
            status:ctx.response.status,
            create_time:new Date(),
            costTime:endTime-startTime
        };
        //定义是否为安全接口  即接口传参是否能被监控
        if(!ctx.log.safe){
            params.body = ctx.request.method==='GET'?ctx.request.query:ctx.request.body;
        }
        await ctx.service.rabbit.send(params);
    };
};
