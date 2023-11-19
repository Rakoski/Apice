'use strict';

const dotenv = require('dotenv')
dotenv.config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const {DataTypes} = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

fs
    .readdirSync(__dirname)
    .filter(file => {
      return (
          file.indexOf('.') !== 0 &&
          file !== basename &&
          file.slice(-3) === '.js' &&
          file.indexOf('.test.js') === -1
      );
    })
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.pessoa = require("./pessoa")(sequelize, DataTypes)
db.bairro = require("./bairro")(sequelize, DataTypes)
db.cidade = require("./cidade")(sequelize, DataTypes)
db.venda_produto = require("./venda_produto")(sequelize, DataTypes)
db.produto = require("./produto")(sequelize, DataTypes)
db.venda = require("./venda")(sequelize, DataTypes)

db.bairro.hasMany(db.pessoa, {
  foreignKey : 'bairro_id',
  as: 'review',
    onDelete: 'CASCADE'
})

db.cidade.hasMany(db.pessoa, {
  foreignKey : 'cidade_id',
  as: 'review',
    onDelete: 'CASCADE'
})

db.pessoa.belongsTo(db.cidade, {
  foreignKey: "cidade_id",
})

db.pessoa.belongsTo(db.cidade, {
  foreignKey: "bairro_id",
});

db.produto.hasMany(db.venda_produto, {
  foreignKey: 'produto_id',
  as: 'review',
    onDelete: 'CASCADE'
})

db.venda.hasMany(db.venda_produto, {
  foreignKey: 'venda_id',
  as: 'review',
    onDelete: 'CASCADE'
})

db.venda_produto.belongsTo(db.venda,{
  foreignKey: 'produto_id'
})

db.venda_produto.belongsTo(db.produto, {
  foreignKey: 'venda_id'
})

db.pessoa.hasMany(db.venda, {
  foreignKey: 'pessoa_id',
  as: 'review',
    onDelete: 'CASCADE'
})

db.venda.belongsTo(db.pessoa, {
  foreignKey: 'pessoa_id'
})

module.exports = db;
