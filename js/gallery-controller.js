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
    document.querySelector('.grid-container').innerHTML = strHTML
}
// onclick = "