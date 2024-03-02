const dummy = (blogs) => {
    return 1;                                                                                       
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlogs = (blogs) => {
    const mostLikes = Math.max(...blogs.map(blog => blog.likes))

    return blogs.find(blog => blog.likes === mostLikes)
}

module.exports = {
    dummy, totalLikes, favoriteBlogs
}
