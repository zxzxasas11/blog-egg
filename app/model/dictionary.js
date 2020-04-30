'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const moment = require('moment');

    const DictionarySchema = new Schema({
            typeCode: { type: String, required: true }, //字典编码
            typeName: { type: String, required: true }, //字典名称
            parentId:{type:Schema.Types.ObjectId},
            children:[{type:Schema.Types.ObjectId,ref:"Dictionary"}],
            sort: {
                type: Number,
            },
            flag: {
                type: Number,
                default: 1, // 0未启用  1 启用 2删除
            },
    },
    { versionKey: false});
    return mongoose.model('Dictionary', DictionarySchema, 'dictionary');
};
