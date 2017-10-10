/**
 * CheckStatusController
 *
 * @description :: Server-side logic for managing checkstatuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  check: function (req, res) {
    return res.json({
      isOK: true
    });
  },
};

