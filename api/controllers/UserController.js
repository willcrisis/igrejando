/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  validate: async(req, res) => {
    try {
      if (req.user) {
        return res.ok(req.user);
      }

      const {
        firebaseUser
      } = req;

      const {
        displayName,
        email,
        photoURL,
        uid
      } = req.body.user;

      if (firebaseUser.email !== email) {
        return res.forbidden();
      }
      const result = await ModelService.create(User, { uid, displayName, email, photoURL });
      return res.ok(result);
    } catch (err) {
      return res.serverError(err);
    }
  }
};

