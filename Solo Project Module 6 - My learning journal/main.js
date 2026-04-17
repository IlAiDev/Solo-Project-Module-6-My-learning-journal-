import { blogs } from './blogsData.js'
import { aboutMe } from './aboutMeData.js'


const main = document.getElementById('main')

document.addEventListener('click', (e) => {
    if(e.target.dataset.link === "about") {
        e.preventDefault()
        window.history.pushState(null, null, e.target.href);
        renderAboutMeContent()
    }
    else if (e.target.dataset.link === "home") {
        e.preventDefault()
        window.history.pushState(null, null, e.target.href)
        renderHomePage()
    }
    else if (e.target.dataset.blogid) {
        renderblogPage(e.target.dataset.blogid)
    }
})

function renderAboutMeContent() {
    main.innerHTML = `
        <article class="about-me-section">
            <section class="about-me-info">
                <div class="about-me-card">
                    <img src="images/${aboutMe[0].image}">
                    <div>
                        <h2>${aboutMe[0].title}</h2>
                        <p>${aboutMe[0].subContent}</p>
                    </div>
                </div>
                <div class="about-me-content">${aboutMe[0].fullContent}</div>
            </section>
        </article>
        `
}

function renderblogPage(blogId) {
    const blogObj = blogs.filter((blog) => {
        return blog.id == blogId
    })[0]
    
    main.innerHTML = `
        <section class="blogs-page-section">
            <div class="blog-page-info">
                <p>${blogObj.date}</p>
                <h2>${blogObj.title}</h2>
                <p>${blogObj.content}</p>
            </div>
                <img src="/images/${blogObj.image}">
                <div class="about-me-content">${aboutMe[0].fullContent}</div>
        </section>
        `
}

function renderHomePage() {
    const articleHome = document.createElement('article')
    articleHome.className = 'home-section'
    
    let hederBlogHtml = `` 
    
    blogs.forEach((blog) => {
        if (blog.id === 1) {
            hederBlogHtml = `
            <section class="main-blog" style="background-image: url(/images/${blog.image});">
                <p>${blog.date}</p>
                <h2 data-blogid="${blog.id}">${blog.title}</h2>
                <p>${blog.content}</p>
            </section>
            `
        } else {
            articleHome.innerHTML += `
            <section class="blog-cards">
                <img src="/images/${blog.image}">
                <p>${blog.date}</p>
                <h2 data-blogid="${blog.id}">${blog.title}</h2>
                <p>${blog.content}</p>
            </section>
            `
        }
    })
    
    main.innerHTML = ""
    main.innerHTML = hederBlogHtml
    main.appendChild(articleHome)
}

renderHomePage()