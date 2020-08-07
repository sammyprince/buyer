const express = require("express");
const router = express.Router();
const { register_route } = require("../utils/routes");

//////////////////////////////////////////////////////////////////////
///////////////// INVOICES ////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

const add_invoice = require("../controllers/Invoiices/add_invoice");
const get_invoice = require("../controllers/Invoiices/get");
const list_invoice = require("../controllers/Invoiices/list_all_invoices");
const edit_invoice = require("../controllers/Invoiices/edit_an_invoice");
const delete_invoice = require("../controllers/Invoiices/delete");
const searchByProductName = require("../controllers/Invoiices/searchByProductName");
const CsearchByInvoiceNo = require("../controllers/Invoiices/CsearchByInvocieNo");
const MsearchByInvoiceNo = require("../controllers/Invoiices/MsearchByInvoiceNo");

const list_all_invoices_by_user = require("../controllers/Invoiices/list_all_invoices_by_user");

register_route({
  router,
  route: "/merchantID",
  post_method: add_invoice,
});

register_route({
  router,
  route: "/buyerId/invoiceId",
  get_method: get_invoice,
});

register_route({
  router,
  route: "/merchants/id/invoices",
  get_method: list_all_invoices_by_user,
});

register_route({
  router,
  route: "/edit_invoice",
  post_method: edit_invoice,
});

register_route({
  router,
  route: "/delete_invoice",
  get_method: delete_invoice,
});

register_route({
  router,
  route: "/buyerId",
  get_method: list_invoice,
});

register_route({
  router,
  route: "/searchByproductName",
  get_method: searchByProductName,
});
register_route({
  router,
  route: "/CsearchByInvoiceNo",
  get_method: CsearchByInvoiceNo,
});
register_route({
  router,
  route: "/MsearchByInvoiceNo",
  get_method: MsearchByInvoiceNo,
});

module.exports = router;
