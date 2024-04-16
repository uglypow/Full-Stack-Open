const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Full Stack Open",
        author: "The University of Helsinki",
        url: "https://fullstackopen.com/en/",
        likes: 5,
    },
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}


module.exports = { initialBlogs, blogsInDb }