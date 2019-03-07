module.exports = function () {
    const expect = require('expect')
    const request = require('supertest')
    const app = require('../index')
    const { db, User, Page, main } = require('../models')

    before(main)
    beforeEach(async () => {
        await User.drop({ force: true })
        await Page.drop({ force: true })
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
                done(new Error('failed'))
            }).catch(e => {
                done()
            })
        })
        it('Should not create a user with an invalid email', done => {
            User.create({
                name: 'Jessy',
                email: 'derp'
            }).then(() => {
                done(new Error('failed'))
            }).catch(err => {
                done()
            })

        })

    })
    describe('Pages', () => {
        it('Should create a page', (done) => {
            const testPage = {
                title: 'This is our Test Title',
                slug: 'slug string',
                content: 'bla bla bla bla content',
                status: 'open',
                userid: 1,
            }
            User.create({
                name: 'Bob',
                email: 'bob@gmail.com'
            }).then(() =>
                Page.create(testPage)
                    .then(({ dataValues }) => {
                        expect(dataValues).toEqual({
                            ...testPage,
                            updatedAt: expect.any(Date),
                            createdAt: expect.any(Date),
                            id: 1,
                            userid: 1
                        })
                    }).then(done).catch(done)
            )

        })
        it('Should not create a page without a title', done => {
            Page.create({
                slug: 'slug string',
                content: 'bla bla bla bla content',
                status: 'open'
            }).then(() => done(new Error('no title!')))
                .catch(err => {
                    done()
                })
        })
        it('Should not create a page without a user', done => {
            Page.create({
                title: 'This is our Test Title',
                slug: 'slug string',
                content: 'bla bla bla bla content',
                status: 'open',
            }).then(() => done(new Error('!')))
                .catch(err => {
                    done()
                })
        })
        it('Should not create a page for a user that does not exist', done => {
            Page.create({
                title: 'This is our Test Title',
                slug: 'slug string',
                content: 'bla bla bla bla content',
                status: 'open',
                userid: 1
            }).then(() => done(new Error('!')))
                .catch(err => {
                    done()
                })
        })
    })

}
