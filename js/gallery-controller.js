'use strict'


function init() {
    renderGallery()
    // renderMeme()
}

function renderGallery() {
    var strHTML = gImgs.map(img => `
            <img class="image" src="${img.url}" alt="" id="${img.id}" " onclick="openEditor(), setGCurrImg(this)">
    `
    )
    document.querySelector('.gallery-flex-container').innerHTML = strHTML
}


function toggleMenu() {
    document.querySelector('body').classList.toggle('menu-open')

    document.querySelector('.mobile-nav-container').classList.toggle('hidden')

}
// onclick = "