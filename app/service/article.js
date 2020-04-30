'use strict';

const Service = require('egg').Service;
const pageQuery = require('../util/pageQuery');
class ArticleService extends Service {

    /**
     * 添加权限 name url method sort
     * @param params
     * @return {Promise<void>}
     */
    async add(params) {
        const { ctx } = this;
        try {
            await ctx.model.Article.create(params);
        }catch (e) {
            console.log(e)
        }

    }

    async getList(params){
        const { ctx } = this;
        return ctx.model.Article.find()
    }

}
module.exports = ArticleService;
