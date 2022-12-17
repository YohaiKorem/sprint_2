'use strict'
let gCanvas
let gCtx
var gIsRendered = false


window.addEventListener('resize', resizeCanvas)





function homeScreen() {
    document.querySelector('.social-links').style.display = 'block'
    document.querySelector('.editor-container').style.display = 'none'
    document.querySelector('.editor-container').classList.remove('grid')
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.search-bar').style.display = 'block'
    _saveMemeToStorage()
}

function openEditor() {
    document.querySelector('.social-links').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'grid'
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.search-bar').style.display = 'none'
    gCanvas = document.querySelector('#canvas')
    gCtx = gCanvas.getContext('2d')
    _saveMemeToStorage()

}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    var heightRatio = 1.5;
    gCanvas.height = gCanvas.width * heightRatio;
    gCanvas.width = gCanvas.clientWidth
    gCanvas.height = gCanvas.clientHeight
    gMeme.lines.xPos -
        gMeme.lines.yPos - 20 * heightRatio
    _loadFromStorage()

}


function renderMeme() {

    drawImgFromLocal(gCurrImg)

    gCanvas.onmousedown = mouseDown
    gCanvas.onmousemove = mouseMove
    gCanvas.onmouseup = mouseUP
    gCanvas.onmouseout = mouseOut
    _saveMemeToStorage()
}




function drawImgFromLocal(memeImg) {
    var url = ''

    url += memeImg.url
    const img = new Image()
    img.src = url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

        gMeme.lines.forEach(line => {
            drawText(line.text, gMeme.lines.indexOf(line), line.size, line.borderColor, line.fillingColor, line.align)
        })

        drawFrame(gMeme.lines[gMeme.selectedLineIdx].xPos, gMeme.lines[gMeme.selectedLineIdx].yPos)


    }
}

function getLineIdxFromUser() {
    setLineIdx()
    renderMeme()
}


function drawFrame(x, y) {
    gCtx.beginPath()

    var text = gMeme.lines[gMeme.selectedLineIdx].text
    let { width } = gCtx.measureText(text);
    gCtx.lineWidth = 2

    // under line
    gCtx.moveTo(x - width / 2 - 10, y + 25)
    gCtx.lineTo(x + width / 2 + 10, y + 25)
    // right line
    gCtx.moveTo(x + width / 2 + 10, y + 25)
    gCtx.lineTo(x + (width / 2) + 10, y - 25)
    // left line
    gCtx.moveTo(x - width / 2 - 10, y + 25)
    gCtx.lineTo(x - (width / 2) - 10, y - 25)
    // over line
    gCtx.moveTo(x - width / 2 - 10, y - 25)
    gCtx.lineTo(x + (width / 2) + 10, y - 25)

    gCtx.stroke()

}
function isMouseInFrame(x, y) {
    return gMeme.lines.map(line => {
        let { width } = gCtx.measureText(line.text)

        if (x > line.xPos - width / 2 - 10 && x < line.xPos + width / 2 + 10 && Math.abs(y - line.yPos) <= 25) return true
        else {
            return false
        }
    })
}
// gMeme.lines[gMeme.selectedLineIdx].xPos, gMeme.lines[gMeme.selectedLineIdx].yPos


var mouseDown = function onMouseDown(event) {
    event.preventDefault()
    let startX = parseInt(event.offsetX)
    let startY = parseInt(event.offsetY)
    console.log('hi from mouse down');
    var clickedLines = isMouseInFrame(startX, startY)
    clickedLines.forEach(clickedLine => {
        if (clickedLine) {
            gMeme.selectedLineIdx = clickedLines.indexOf(clickedLine)
            gMeme.lines[gMeme.selectedLineIdx].isDrag = true
        }
    })
    renderMeme()

}
var mouseUP = function (event) {
    if (!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
    event.preventDefault()
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false
    renderMeme()
}

var mouseMove = function (event) {
    if (!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
    event.preventDefault()
    let startX = parseInt(event.offsetX)
    let startY = parseInt(event.offsetY)
    setTexPos(startX, startY)
    const line = gMeme.lines[gMeme.selectedLineIdx]
    drawText(line.text, gMeme.lines.indexOf(line), line.size, line.borderColor, line.fillingColor, line.align)
    renderMeme()
    // gMeme.lines[gMeme.selectedLineIdx].isDrag = false
}

var mouseOut = function (event) {
    if (!gMeme.lines[gMeme.selectedLineIdx].isDrag) return
    event.preventDefault()
    gMeme.lines[gMeme.selectedLineIdx].isDrag = false
    renderMeme()
}



function drawText(text, lineIdx, fontSize = 20, borderColor = 'black', fillingColor = 'white', textAlign = 'center') {
    gCtx.beginPath()
    var theFont = fontSize + 'px' + ' ' + gMeme.lines[lineIdx].font

    gCtx.lineWidth = 1
    gCtx.strokeStyle = borderColor
    gCtx.fillStyle = fillingColor
    gCtx.font = theFont;

    gCtx.textAlign = textAlign
    gCtx.textBaseline = 'middle'

    var y = gMeme.lines[lineIdx].yPos
    var x = gMeme.lines[lineIdx].xPos
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

function getMemeTextFromUser() {
    var text = document.querySelector('[name="meme-text"]').value
    setLineText(text)
    renderMeme()

}

function setColors() {
    gMeme.lines[gMeme.selectedLineIdx].fillingColor = document.querySelector('[name="filling-color"]').value
    gMeme.lines[gMeme.selectedLineIdx].borderColor = document.querySelector('[name="border-color"]').value
    renderMeme()
}

function onChangeFontSize(str) {
    changeFontSize(str)
    renderMeme()
}


function openColorPicker(input) {
    if (input === 'border') document.querySelector('[name="border-color"]').click()
    if (input === 'filling') document.querySelector('[name="filling-color"]').click()
}

function eventHandler(ev) {
    ev.preventDefault()
}

function onRemoveLine() {
    console.log(gMeme.selectedLineIdx);
    removeLine()
    renderMeme()
}

function onAddLine() {
    addLine()
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    renderMeme()
}


function onSetTextAlign(str) {
    setTextAlign(str)
    renderMeme()
}

function getFontFamilyFromUser() {
    var font = document.querySelector('[name="fonts"]').value
    console.log(font);
    setFontFamily(font)
    renderMeme()
}


function onImgInput(ev) {
    loadImageFromInput(ev, drawImgFromLocal)
    console.log(ev);
}

function loadImageFromInput(ev, onImageReady) {

    const reader = new FileReader()

    reader.onload = (event) => {
        let img = new Image()
        img.src = event.target.result
        gCurrImg = _createImg(img.src)
        img.onload = () => onImageReady(gCurrImg)

    }

    reader.readAsDataURL(ev.target.files[0])

}

function fileInput() {
    document.querySelector('[name="image"]').click()
}


function onUploadImg() {
    const imgDataUrl = gCanvas.toDataURL('image/jpeg')
    function onSuccess(uploadedImgUrl) {

        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function downloadCanvas(elLink) {

    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}





