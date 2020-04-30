'use strict';

const Controller = require('egg').Controller;
const code = require('../util/statusCode');
class ArticleController extends Controller {

    async index(){
        let data = await this.ctx.service.article.getList()
        this.ctx.response = {
            code:200,
            data:data
        }
    }

    /**
     * 添加文章
     * @returns {Promise<void>}
     */
    async create(){
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            await ctx.service.article.add(params);
            await code(ctx, 200);
        } catch (e) {
            await code(ctx, 500);
        }
    }

    async update(){
        console.log("这个是修改")
    }

    async destroy(){
        console.log("这个是删除")
    }
}

module.exports = ArticleController;
