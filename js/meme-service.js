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
            size: 20,
            align: 'left',
            fillingColor: 'red',
            xPos: 210,
            yPos: 25
        },
        {
            text: 'howdy partner',
            size: 20,
            align: 'left',
            fillingColor: 'red',
            xPos: 210,
            yPos: 125
        }
    ]
}

function getMeme() {

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
    renderMeme()
}

function setGCurrImg(elId) {
    var id = elId.id
    gMeme.selectedImgId = id
    gCurrImg = getImgById(id)
    console.log('gCurrImg', gCurrImg, 'gMeme.selectedImgId', gMeme.selectedImgId);
    renderMeme()
}