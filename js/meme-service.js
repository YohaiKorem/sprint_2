'use strict'
const STORAGE_KEY = 'imgsDB'
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gCurrImg
var gImgs = _createImgs()

// [{ id: 1, url: 'img/1.jpg', keywords: ['funny', 'politics'] }, { id: 2, url: 'img/2.jpg', keywords: ['cute', 'puppy'] }]
var gMeme = {
    selectedImgId: '',
    selectedLineIdx: 0,
    lines: [
        {
            text: 'I sometimes eat Falafel',
            size: 40,
            align: 'center',
            font: 'impact',
            fillingColor: 'white',
            borderColor: 'black',
            xPos: 410,
            yPos: 45,
            isDrag: false
        },
        {
            text: 'howdy partner',
            size: 40,
            align: 'center',
            font: 'impact',
            fillingColor: 'white',
            borderColor: 'black',
            xPos: 410,
            yPos: 520,
            isDrag: false
        }
    ]
}

function getMeme() {
    gMeme = _loadFromStorage()
    renderMeme()
}

function getImgById(imgId) {
    const img = gImgs.find(img => imgId === img.id)
    return img
}

function _createImg(url) {
    return {
        id: makeId(),
        url,
        keywords: []
    }
}


function addLine() {
    var newLine = _createLine()
    gMeme.lines.push(newLine)
}

function _createLine(text) {
    return {
        text: '',
        size: 20,
        align: 'center',
        font: 'impact',
        fillingColor: 'white',
        borderColor: 'black',
        xPos: 210,
        yPos: 225,
        isDrag: false
    }

}


function _createImgs() {
    // var imgs = loadFromStorage(STORAGE_KEY)
    var imgs = []

    for (let i = 0; i < 18; i++) {
        imgs.push(_createImg('img/' + (i + 1) + '.jpg'))
    }
    return imgs
}

function _createMeme(img) {
    return {
        selectedImgId: img.id,
        selectedLineIdx,
        lines: []
    }
}

function setLineText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function setGCurrImg(elId) {
    var id = elId.id
    gMeme.selectedImgId = id
    gCurrImg = getImgById(id)
    console.log('gCurrImg', gCurrImg, 'gMeme.selectedImgId', gMeme.selectedImgId);
    renderMeme()
}
function changeFontSize(str) {
    (str === '+') ? gMeme.lines[gMeme.selectedLineIdx].size++ : gMeme.lines[gMeme.selectedLineIdx].size--
}

function removeLine() {
    gMeme.lines.splice([gMeme.selectedLineIdx], 1)
}

function setTextAlign(str) {
    gMeme.lines[gMeme.selectedLineIdx].align = str
}


function setLineIdx() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}


function setTexPos(x, y) {
    gMeme.lines[gMeme.selectedLineIdx].xPos = x
    gMeme.lines[gMeme.selectedLineIdx].yPos = y
}

function setFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function _saveMemeToStorage() {
    saveToStorage(STORAGE_KEY, gMeme)
}
function _loadFromStorage() {
    loadFromStorage(STORAGE_KEY)
    renderMeme()
}