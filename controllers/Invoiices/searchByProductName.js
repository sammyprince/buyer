const _ = require("lodash");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const { invoices } = require("../../models/invoices");
const { User } = require("../../models/user");

const list = async (req, res) => {
  try {
    const token = req.header("x-sh-auth");
    const user = await User.findByToken(token);
    const { productName } = req.query;
    console.log(productName);

    if (!user) {
      res.status(400).json(USER_NOT_FOUND);
    } else {
      const _invoices = await invoices.searchByProductName(
        user._id,
        productName
      );

      if (!_invoices) {
        res.status(400).json({ message: "not found" });
      }

      res.json({
        code: 200,
        invoices: _invoices,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = list;
