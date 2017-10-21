module.exports = {
  create: (model, data) => {
    return new Promise((resolve, reject) => {
      model.create(data).exec((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  run: (model, func, data) => {
    return new Promise((resolve, reject) => {
      model[func](data).exec((err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }
};
