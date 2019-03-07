const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', { logging: false });

// const db = new Sequelize('wikistack', {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres'
// })


db.authenticate().then(() => {
  console.log('connected to db')
})
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      stringLength(val) {
        return val.length <= 200 && val.length > 0 && !/[^\w\.\s]|\.\.+/g.test(val)
      },
    },
  },
  slug: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      stringLength(val) {
        return val.length <= 200 && val.length > 0 && !/[^\w\.\s]|\.\.+/g.test(val)
      }
  }},
  content: {
    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isValidUsername(val) {
        return !/[^\w\._]|\.\.+/g.test(val)
      },
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  }
});

const main = async () => {
  await Page.sync()
  await User.sync()
  console.log('everything synced')
}



module.exports = { db, Page, User, main };

