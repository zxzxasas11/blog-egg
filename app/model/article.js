'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');

    const ArticleSchema = new Schema({
        name: { type: String, required: true }, // 文章名称
        content:{type:String},                  //正文
        tag:{type:Number,ref:"Dictionary"},
        describe:{type:String},
        create_time: {           //创建时间
            type: Date,
            default: () => {
                return Date.now();
            },
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
        },
        update_time:{            //更新时间
            type: Date,
            get: v => moment(v).format('YYYY-MM-DD HH:mm:ss'),
        },
        status: {                //鉴别状态
            type: Number,
            default: 1, // 0未启用  1 启用 2删除
        },
    },
    { versionKey: false});
    return mongoose.model('Article', ArticleSchema, 'article');
};
