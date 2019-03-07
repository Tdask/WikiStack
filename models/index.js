const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});
// const db = new Sequelize('wikistack', {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres'
// })


db.authenticate().then(()=>{
  console.log('connected to db')
})
const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    notEmpty: true,
    allowNull: false,
    stringLength(val){
      return val.length <= 200 && val.length > 0
    },
  slug: {
    type: Sequelize.STRING
  },
  content: {

    type: Sequelize.TEXT
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
  }})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

const main = async ()=>{
  await Page.sync()
  await User.sync()
  console.log('everything synced')
}

main()

module.exports = { db };
