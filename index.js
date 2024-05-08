let posts = []

const postTitleInputNode = document.querySelector('.editor__input')
const postTextInputNode = document.querySelector('.editor__area')
const newPostBtnNode = document.querySelector('.editor__button')
const postsNode = document.querySelector('.list__content')
const errorNode = document.querySelector('.editor__error')

newPostBtnNode.classList.add('not')

function validationPostText() {
    if (postsNode.innerText === '') {
        postsNode.innerHTML = '<p class="list__prev-text">Тут пока все пусто</p>'
    }
}

function setLocalStorage() {
    window.localStorage.setItem('posts', JSON.stringify(posts))
}

document.addEventListener('DOMContentLoaded', () => {
    validationPostText()
})

document.addEventListener('click', (e) => {
    let cur = e.target
    if (cur.tagName === 'I') {
        cur.parentNode.remove()
        posts.splice(Number(cur.dataset.id),1)
        setLocalStorage()
    }
    validationPostText()
    
})

newPostBtnNode.addEventListener('click', () => {
    let titleLength = postTitleInputNode.value.length
    let textLength = postTextInputNode.value.length

    const postFromUser = getPostFromUser()
    if (titleLength !== 0 && textLength !== 0) {
        addPost (postFromUser)
        postTitleInputNode.value = ''
        postTextInputNode.value = ''
        newPostBtnNode.classList.add('not')
    }
    
})
renderPost()

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
    const dt = `${currentDate.toLocaleDateString()} ${currentDate.getHours()}:${currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`
    posts.push({
        id,
        dt,
        title,
        text,
    })
    setLocalStorage()
    renderPost()
    id+=1
}


function renderPost() {
    posts = JSON.parse(window.localStorage.getItem('posts'))

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


postTitleInputNode.addEventListener('input',validation)
postTextInputNode.addEventListener('input',validation)


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