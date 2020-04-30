'use strict';

const Service = require('egg').Service;
const pageQuery = require('../util/pageQuery');
class DictionaryService extends Service {
  /**
   * 添加字典项
   * @param params
   * @return {Promise<void>}
   */
  async add(params) {
    const { ctx } = this;
    //判断是否传id 传了则添加子项 没传则为根节点
    if (params.id) {
      /*await ctx.model.Dictionary.updateOne({ _id: params.id }, { $push: {
              value: params.value,
          } });*/
      params.parentId = params.id;
      await ctx.model.Dictionary.create(params,async(err,doc)=>{
        if(!err){
          console.log(doc._id)
          await ctx.model.Dictionary.updateOne({_id:params.id},{$push:{
              children:doc._id
            }})
        }
      })
    } else {
      await ctx.model.Dictionary.create(params);
    }
  }

  /**
   * 获取字典列表
   * @param params
   * @returns {Promise<*>}
   */
  async getAll(params){
    const { ctx } = this;
    return await ctx.model.Dictionary.find({parentId: { $exists: false } }).populate({path:"children",select:"typeCode typeName"})
  }

  /**
   * 删除
   * @param id
   * @returns {Promise<any>}
   */
  async del(id){
    const { ctx } = this;
    await ctx.model.Dictionary.findOneAndRemove({_id:id},async(err,doc)=>{
      if(doc!==null){
        if(doc.parentId===undefined){
          await ctx.model.Dictionary.remove({_id:{$in:doc.children}})
        }else{
          await ctx.model.Dictionary.updateOne({_id:doc.parentId},{$pull:{
              children:id
            }})
        }
      }
    })
  }
}
module.exports = DictionaryService;
