const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

const Item = new mongoose.Schema({

   

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

    name : {type : String , default: ""},

    amount : {type : Number , default: 0 },

    currency : {type : String , default: ""},

    qty : {type : Number , default : 0},

});

Item.plugin(timestamps);

Item.methods.toJSON = function () {
    const Item = this;
    const taskObject = Item.toObject();

    const taskJson = _.pick(taskObject, [ '_id' , 'name' , 'amount' ,'currency','qty' ]);

    return taskJson;
};

Item.statics.count = function () {
    const tasks = this;
    return tasks.count();
};

Item.statics.findById = function (id) {
    const task = this;
    return task.findOne({_id: ObjectId(id)}) . populate('user' , 'name');
};


Item.statics.findByUser = function (id) {
    const task = this;
    return task.find({user: ObjectId(id)}) . populate('user' , 'name' );
};


Item.statics.removeById = function (id) {
    const task = this;
    return task.remove({_id: id});
};


Item.statics.getAllList = function () {
    const tasks = this;
    return tasks.find({})  .  populate('user' , 'name');
};


Item.statics.getAllByUser = function (user_id) {
    const tasks = this;
    return tasks.find({'user' : user_id}) . populate('user' , 'name');
};


Item.statics.getFromLastMonth = function (user_id) {
    const tasks = this;
    let today = new Date();
    return tasks.find({
        'user' : user_id ,
        'date':{ $gte: new Date(new Date(today.getTime() - (24*30 * 60 * 60 * 1000)))}});
};



Item.statics.editItem = function (id, updates) {
    const article = this;
    return article.findOneAndUpdate({_id: id},{
        $set: updates,
        new : true
    });
};

const items = mongoose.model('Item', Item);
module.exports = {items};
