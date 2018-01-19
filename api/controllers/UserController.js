/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  validate: async(req, res) => {
    console.log('UserController :: Starting user validation');
    try {
      if (req.user) {
        console.log('UserController :: User is already validated. Continuing...');
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
        console.warn('UserController :: User couldn\'t be validated.');
        console.warn('\t Firebase user e-mail: ', firebaseUser.email);
        console.warn('\t User e-mail: ', email);
        return res.forbidden();
      }
      const result = await ModelService.create(User, { uid, displayName, email, photoURL });
      console.log('UserController :: User validated and inserted in database.');
      return res.ok(result);
    } catch (err) {
      console.error('UserController :: Error validating user:');
      console.error(err);
      return res.serverError(err);
    }
  }
};

