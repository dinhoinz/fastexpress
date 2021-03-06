const bcrypt = require('bcrypt');

const getModelAlias = (aliasDatabase, db) => model => {
  const aliasList = Object.keys(aliasDatabase);

  if (aliasList.includes(model)) {
    const alias = aliasList[aliasList.indexOf(model)];

    return {
      model: db[aliasDatabase[alias]],
      as: model,
    };
  }

  return {
    model: db[model],
  };
};

/* eslint no-param-reassign: "off" */
/* eslint no-underscore-dangle: "off" */
const cryptPassword = bcryptSalt => user => {
  if (user.password !== user._previousDataValues.password) {
    return bcrypt.hash(user.password, bcrypt.genSaltSync(bcryptSalt)).then(hash => {
      user.password = hash;
    });
  }

  return null;
};

module.exports = {
  getModelAlias,
  cryptPassword,
};
