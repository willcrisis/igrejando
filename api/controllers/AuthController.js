/**
 * AuthController
 *
 * @description :: Server-side logic for managing Auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: false
  },

  /**
   * `AuthController.login()`
   * Login endpoint for users
   */
  login: async (req, res) => {
    try {
      const data = await AuthService.login(req.body);
      return res.json(data);
    } catch ({message, lineError}) {
      res.badRequest({message});
    }
  },

  /**
   * `AuthController.signUp()`
   */
  signUp: function (req, res) {
    return res.json({
      todo: 'signUp() is not implemented yet!'
    });
  }
};

