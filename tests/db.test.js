module.exports = function () {
    const expect = require('expect')
    const request = require('supertest')
    const app = require('../index')
    const { db, User, Page, main } = require('../models')

    before(main)
    beforeEach(async () => {
        await User.drop()
        await Page.drop()
        await User.sync()
        await Page.sync()
    })
    describe('GET /', () => {
        it('Should say hello', done => {
            request(app)
                .get('/')
                .expect(200)
                .expect(({ res }) => {
                    expect(res.text).toBe('HELLO')
                })
                .end(done)
        })
    })
    describe('USERS', () => {
        it('Should create a user', done => {
            User.create({
                name: 'BOB',
                email: 'bob@gmail.com'
            }).then(({ dataValues }) => {
                expect(dataValues).toEqual({
                    id: 1,
                    name: 'BOB',
                    email: 'bob@gmail.com',
                    updatedAt: expect.any(Date),
                    createdAt: expect.any(Date)
                })
            }).then(done)
                .catch(done)
        })
        it('Should not create a new user without a name', done => {
            User.create({
                email: 'bob@gmail.com'
            }).then(({ dataValues }) => {
                console.log('FAILED TEST');
            }).catch(e => {
                done()
            })
        })

    })
}