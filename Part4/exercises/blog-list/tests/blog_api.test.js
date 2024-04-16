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
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
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
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'Robert C. Martin',
        url: 'https://fullstackopen.com/en/',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

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
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
        author: 'Robert C. Martin',
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

test('delete succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    assert(!blogsAtEnd.includes(blogToDelete))
})

test('updating the information of an individual blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = blogToUpdate.likes + 10

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
})

after(async () => {
    await mongoose.connection.close()
})