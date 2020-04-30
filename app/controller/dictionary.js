'use strict';

const Controller = require('egg').Controller;
const code = require('../util/statusCode');
class DictionaryController extends Controller {
    /**
     * 添加字典项 若带id 则添加子项
     * @param ctx
     * @returns {Promise<void>}
     */
    async add(ctx) {
        try {
            await ctx.service.dictionary.add(ctx.request.body);
            await code(ctx, 200);
        } catch (e) {
            await code(ctx, 500,e.message);
        }
    }

    /**
     * 获取字典列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAll(ctx){
        try {
            let data = await ctx.service.dictionary.getAll();
            await code(ctx,200,data);
        }catch (e) {
            console.log(e);
            await code(ctx,500,e.message);
        }
    }

    async del(ctx){
        console.log(ctx.params.id);
        try {
            await ctx.service.dictionary.del(ctx.params.id);
            await code(ctx,200);
        }catch (e) {
            console.log(e);
        }
    }
}

module.exports = DictionaryController;
