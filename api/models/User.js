/**
 * User.js
 *
 * @description :: Represents a User that can login via Firebase
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    uid: {
      type: 'string',
      required: true
    },
    displayName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    photoURL: {
      type: 'string'
    }
  }
};

