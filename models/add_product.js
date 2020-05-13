const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const _ = require('lodash');
const ObjectId = require('mongodb').ObjectId;

const Addproduct = new mongoose.Schema({

    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

   
       name : {

           type : String,
           default : ""
       },
       currency : {

           type : String,
           default : ""
       },
       amount : {

           type : Number,
           default : 0
       },
       checked :  {
           type : Number,
           default :0
       },
       qty : {
          type : Number,
          default :1
       },

       date: {type: Date, default : Date.now()},
   

   
});

Addproduct.plugin(timestamps);

Addproduct.methods.toJSON = function () {
    const Addproduct = this;
    const taskObject = Addproduct.toObject();

    const taskJson = _.pick(taskObject, [ '_id' , 'user' ,'name', 'currency','amount','date','qty','checked' ]);

    return taskJson;
};

Addproduct.statics.count = function () {
    const tasks = this;
    return tasks.count();
};

Addproduct.statics.findById = function (id) {
    const task = this;
    return task.findOne({_id: ObjectId(id)});
};

Addproduct.statics.removeById = function (id) {
    const task = this;
    return task.remove({_id: id});
};


Addproduct.statics.getAllList = function () {
    const tasks = this;
    return tasks.find({}) ;
};


Addproduct.statics.getAllByUser = function (user_id) {
    const tasks = this;
    return tasks.find({'user' : user_id}) . populate('user' , 'name');
};


Addproduct.statics.getFromLastMonth = function (user_id) {
    const tasks = this;
    let today = new Date();
    return tasks.find({
        'user' : user_id ,
        'date':{ $gte: new Date(new Date(today.getTime() - (24*30 * 60 * 60 * 1000)))}});
};


Addproduct.statics.editProduct = function (id, updates) {
    const expense = this;
    return expense.findOneAndUpdate({_id: id},{
        $set: updates
    });
};

const Add_Product = mongoose.model('Addproduct', Addproduct);
module.exports = {Add_Product};
