const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
})

test('correct amount of blog posts in the JSON format.', async () => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Robert C. Martin',
        url: 'https://fullstackopen.com/en/',
        likes: 0
    }
    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    assert.ok(response.body.hasOwnProperty('id'))
})

test('successfully creates a new blog post', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Robert C. Martin',
        url: 'https://fullstackopen.com/en/',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

    const addedBlog = response.body.find(blog => blog.title === newBlog.title)

    // new blog doesn't have id property
    assert.deepStrictEqual(
        { ...addedBlog, id: undefined },
        { ...newBlog, id: undefined }
    )
})

test('likes property is missing from the request', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Robert C. Martin',
        url: 'https://fullstackopen.com/en/'
    }

    const response = await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    assert.strictEqual(response.body.likes, 0)
})

test('title or url properties are missing from the request data', async () => {
    const newBlog = {
        author: 'Robert C. Martin',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})