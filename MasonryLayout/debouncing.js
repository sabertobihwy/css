const d_layout = debounce(layout, 1000)

function debounce(func, duration) {
    let timerId
    return function (...args) {
        clearTimeout(timerId)
        setTimeout(() => {
            func.apply(this, args)
        }, duration)
    }
}

// window.onresize = d_layout(1, 2, 3)

window.onresize = d_layout

var arr = [0, 0, 0]
var container = document.querySelector('.container')
var arrDoms = document.querySelectorAll('.box')
var buttomDoms = document.querySelector('button')

buttomDoms.onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


function getMinIndex(arr) {
    let idx1 = Math.min(arr[0], arr[1]) === arr[0] ? 0 : 1
    return Math.min(arr[idx1], arr[2]) === arr[idx1] ? idx1 : 2
}

function addImage(nthImage, boxWidth) {
    const img = new Image();
    img.src = `imgs/img${nthImage}.png`
    // 设置图片加载完成时的处理函数
    img.onload = function () {
        img.style.width = `${boxWidth}px`;
        img.style.height = 'auto';

        const nthArr = getMinIndex(arr)
        arrDoms[nthArr].appendChild(img);
        const height = img.clientHeight; // first dom then clientHeight 
        arr[nthArr] += height

    };
}
function layout(...args) {
    clearDom()
    // get the viewport width 
    var currWdith = container.clientWidth - 70
    // calculate each box's width 
    var boxWidth = currWdith / 3
    for (let i = 1; i <= 12; i++) {
        addImage(i, boxWidth)
    }
}
function clearDom() {
    arrDoms.forEach((d) => {
        d.innerHTML = ''
    })
}