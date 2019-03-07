const {Page, User, db, main} = require('./models');

async function createModels(){
  await User.drop({ force: true })
  await Page.drop({ force: true })
  await User.sync()
  await Page.sync()
}

createModels().then(async ()=>{
 await User.bulkCreate([
    {name: 'lenny',
    email: 'lenny@hotmail.com'},
    {name: 'jenny',
  email: 'jenny@yahoo.com'},
    {name: 'benny',
    email :'benny@gmail.com'}
  ])
 await Page.bulkCreate([
 ])
})
