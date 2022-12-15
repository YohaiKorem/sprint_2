'use strict'
let gCanvas
let gCtx

function homeScreen() {
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.gallery-container').style.display = 'grid'
    document.querySelector('.search-bar').style.display = 'block'
}

function openEditor() {
    document.querySelector('.editor-container').style.display = 'grid'
    document.querySelector('.gallery-container').style.display = 'none'
    console.log('hi'); document.querySelector('.search-bar').style.display = 'none'
}


function renderMeme() {

    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    drawImgFromLocal(gCurrImg)
}

function drawImgFromLocal(memeImg) {
    var url = ''

    url += memeImg.url
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        gMeme.lines.forEach(line => {
            drawText(line.text, gMeme.lines.indexOf(line))
        })
        drawUnderLine(gMeme.lines[gMeme.selectedLineIdx].xPos, gMeme.lines[gMeme.selectedLineIdx].yPos)
    }
}

function getLineIdxFromUser() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    renderMeme()
}


function drawUnderLine(x, y, xEnd = 250, yEnd = 250) {
    var text = gMeme.lines[gMeme.selectedLineIdx].text
    let { width } = gCtx.measureText(text);
    gCtx.lineWidth = 2
    gCtx.moveTo(width / 2, y + 10)
    gCtx.lineTo(width * 1.5, y + 10)
    gCtx.strokeStyle = 'red'
    gCtx.stroke()


    // gCtx.fillText(text, x, y);
    // gCtx.fillRect(x, y, width, 2)
    console.log(width);
}


function drawText(text, lineIdx) {
    // const { offsetX, offsetY } = ev
    var fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    var theFont = fontSize + 'px' + ' arial'
    // "40px arial"

    gCtx.lineWidth = 1
    gCtx.strokeStyle = gMeme.lines.borderColor
    gCtx.fillStyle = gMeme.lines.fillingColor
    gCtx.font = theFont;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    var y = 25 + lineIdx * 100
    var x = 210

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.

    // drawUnderLine(x, y,)
}

function getMemeTextFromUser() {
    var text = document.querySelector('[name="meme-text"]').value
    setLineText(text)

}

function setColors() {
    gMeme.lines.fillingColor = document.querySelector('[name="filling-color"]').value
    gMeme.lines.borderColor = document.querySelector('[name="border-color"]').value

    renderMeme()
}

function onChangeFontSize(str) {
    (str === '+') ? gMeme.lines[gMeme.selectedLineIdx].size++ : gMeme.lines[gMeme.selectedLineIdx].size--
    renderMeme()
}


function eventHandler(ev) {
    ev.preventDefault()
}