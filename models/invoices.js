const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const ObjectId = require("mongodb").ObjectId;

const Invoices = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  invoice_no: { type: String, default: "" },

  merchant_id: { type: String, default: "" },

  discount: { type: Number, default: 0 },

  cus_phone: { type: String, default: "" },

  cus_address: { type: String, default: "" },

  cus_email: { type: String, default: "" },

  payment_type: { type: String, default: "" },

  date: { type: Date, default: Date.now() },

  vat: { type: Number, default: 0 },

  items: [],

  total: { type: Number, default: 0 },
});

Invoices.plugin(timestamps);

Invoices.methods.toJSON = function () {
  const Invoices = this;
  const taskObject = Invoices.toObject();

  const taskJson = _.pick(taskObject, [
    "_id",
    "invoice_no",
    "discount",
    "user",
    "cus_phone",
    "cus_address",
    "cus_email",
    "payment_type",
    "vat",
    "date",
    "total",
    "items",
    "merchant_id",
  ]);

  return taskJson;
};

Invoices.statics.count = function () {
  const tasks = this;
  return tasks.count();
};

Invoices.statics.findById = function (id) {
  const task = this;
  return task.findOne({ _id: ObjectId(id) }).populate("user", "name");
};

Invoices.statics.findByUser = function (id) {
  const task = this;
  return task.find({ user: ObjectId(id) }).populate("user", "name");
};

Invoices.statics.removeById = function (id) {
  const task = this;
  return task.remove({ _id: id });
};

Invoices.statics.getAllList = function () {
  const tasks = this;
  return tasks.find({}).populate("user", "name");
};

Invoices.statics.getAllByUser = function (user_id) {
  const tasks = this;
  console.log("Awais");
  return tasks.find({ user: user_id }).populate("user", "name");
};

Invoices.statics.searchBycustomerEmail = function (email) {
  const tasks = this;
  console.log("Awais");
  return tasks.find({ cus_email: email }).populate("user", "name");
};

Invoices.statics.CsearchByInvoiceNo = function (email, invoice_no) {
  const tasks = this;
  console.log("Awais");
  return tasks
    .find({
      cus_email: email,
      invoice_no: invoice_no,
    })
    .populate("user", "name");
};
Invoices.statics.MsearchByInvoiceNo = function (user, invoice_no) {
  const tasks = this;
  console.log("Awais");
  return tasks
    .find({
      user: user,
      invoice_no: invoice_no,
    })
    .populate("user", "name");
};
Invoices.statics.searchByProductName = function (user_id, productName) {
  const tasks = this;
  return tasks
    .find({
      user: user_id,
      items: { $elemMatch: { name: productName } },
    })
    .populate("user", "name");
};

Invoices.statics.getFromLastMonth = function (user_id) {
  const tasks = this;
  let today = new Date();
  return tasks.find({
    user: user_id,
    date: {
      $gte: new Date(new Date(today.getTime() - 24 * 30 * 60 * 60 * 1000)),
    },
  });
};

Invoices.statics.editInvoice = function (id, updates) {
  const article = this;
  return article.findOneAndUpdate(
    { _id: id },
    {
      $set: updates,
      new: true,
    }
  );
};

const invoices = mongoose.model("Invoices", Invoices);
module.exports = { invoices };
