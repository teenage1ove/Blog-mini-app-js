let posts = []

const postTitleInputNode = document.querySelector('.editor__input')
const postTextInputNode = document.querySelector('.editor__area')
const newPostBtnNode = document.querySelector('.editor__button')
const postsNode = document.querySelector('.list__content')
const errorNode = document.querySelector('.editor__error')

document.addEventListener('click', (e) => {
    let cur = e.target
    if (cur.tagName === 'I') {
        cur.parentNode.remove()
        posts.splice(Number(cur.dataset.id),1)
    }
    if (postsNode.innerText === '') {
        postsNode.innerHTML = '<p class="list__prev-text">Тут пока все пусто</p>'
    }
})

postTitleInputNode.addEventListener('input',() => {
    validation()
})

postTextInputNode.addEventListener('input',() => {
    validation()
})

function validation () {
    let titleLength = postTitleInputNode.value.length
    let textLength = postTextInputNode.value.length

    

    if (textLength == 0) {
        errorNode.innerText = `Введите текст`
        newPostBtnNode.classList.add("not")
        errorNode.classList.remove('editor__error_hidden')
        return
    }

    if (titleLength > 20) {
        errorNode.innerText = `Длина не может быть больше 20 `
        errorNode.classList.remove('editor__error_hidden')
        return
    }

    if (titleLength == 0) {
        errorNode.innerText = `Введите заголовок`
        errorNode.classList.remove('editor__error_hidden')
        newPostBtnNode.classList.add("not")
        return
    }

    if (textLength > 90) {
        errorNode.innerText = `Длина не может быть больше 90 `
        errorNode.classList.remove('editor__error_hidden')
        return
    }

    errorNode.classList.add('editor__error_hidden')
    newPostBtnNode.classList.remove("not")
}

newPostBtnNode.addEventListener('click', () => {
    let titleLength = postTitleInputNode.value.length
    let textLength = postTextInputNode.value.length

    const postFromUser = getPostFromUser()
    if (titleLength !== 0 && textLength !== 0) {
        addPost (postFromUser)
        newPostBtnNode.classList.remove("not")
        postTitleInputNode.value = ''
        postTextInputNode.value = ''
    }
    
})


function getPostFromUser() {
    const title = postTitleInputNode.value
    const text = postTextInputNode.value

    return {
        title,
        text
    }
}

function addPost({title, text}) {
    let id = 0
    const currentDate = new Date()
    const dt = `${currentDate.toLocaleDateString()}`
    posts.push({
        id,
        dt,
        title,
        text,
    })
    renderPost()
    id+=1
}

function getPosts() {
    return posts
}

function renderPost() {
    const posts = getPosts()

    let str = posts.map(i => {
        return toHTML(i)
    }).join('')

    function toHTML(post) {
        return `
            <div class="list__post">
                <p class="list__post-date">${post.dt}</p>
                <p class="list__post-title">${post.title}</p>
                <p class="list__post-text">${post.text}</p>
                <i class="fa-solid fa-xmark list__post-close"></i>
            </div>
        `
    }

    postsNode.innerHTML = str
}