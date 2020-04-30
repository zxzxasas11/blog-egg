const mongoose = require('mongoose');
const async = require('async');
/**
 * 分页插件
 * @param Model
 * @param params
 * @param sort
 * @return {Promise<void>}
 */
module.exports = async function(Model, params, field, populate, sort, mohu) {
  const pageSize = params.pageSize!==undefined?parseInt(params.pageSize):10, currentPage = parseInt(params.currentPage) || 1;
  const realParams = Object.assign(params);
  delete realParams.currentPage;
  delete realParams.pageSize;
  const aa = [];
  for (const i in mohu) {
    for (const j in params) {
      if (mohu[i] === j) {
        const a = {};
        a[j] = { $regex: params[j] };
        aa.push(a);
        delete params[j];
      }
    }
  }
  if(pageSize===0){
    if(aa.length>0){
      return await Model.find(realParams, field).and(aa)
          .sort(sort)
          .populate(populate)
    }else{
      return await Model.find(realParams, field)
          .sort(sort)
          .populate(populate)
    }
  }else{
    return  await async.parallel({
      count(done) { // 查询数量
        if (aa.length > 0) {
          Model.countDocuments(realParams).and(aa).exec(function(err, count) {
            done(err, count);
          });
        } else {
          Model.countDocuments(realParams).exec(function(err, count) {
            done(err, count);
          });
        }
      },
      data(done) { // 查询一页的记录
        if (aa.length > 0) {
          Model.find(realParams, field).and(aa).skip((currentPage - 1) * pageSize)
              .limit(pageSize)
              .sort(sort)
              .populate(populate).
              // .populate(populate).sort(sortParams).
              exec(function(err, doc) {
                done(err, doc);
              });
        } else {
          Model.find(realParams, field).skip((currentPage - 1) * pageSize)
              .limit(pageSize)
              .sort(sort)
              .populate(populate).
              // .populate(populate).sort(sortParams).
              exec(function(err, doc) {
                done(err, doc);
              });
        }
      },
    });
  }
};
