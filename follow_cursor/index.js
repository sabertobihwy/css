const dom = {
    container: document.querySelector("#container"),
    text: document.querySelector("#text"),
    cursor: document.querySelector("#blinking-cursor")
}

async function delay(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

function transferToHTML(txt) {
    return `<p>${txt}</p>`
}


async function appendText() {
    const str =
        `是的，把柚子皮放进鞋子里可以帮助去除异味。柚子皮含有天然的挥发性精油，能吸附和掩盖鞋子中的异味，同时释放出清新的柑橘香味。

使用方法：

将柚子皮切成小块，尽量去掉果肉部分。
用干净的纸巾包裹柚子皮，防止汁液弄湿鞋内。
将包裹好的柚子皮放进鞋子里，静置一晚。
如果异味较重，可以多重复几次，或者搭配其他方法（如活性炭或小苏打）使用，效果会更好。`
    for (let i = 1; i < str.length; i++) {
        const txt = str.slice(0, i)
        const html = transferToHTML(txt)
        dom.text.innerHTML = html
        updateCursor()
        await delay(200)
    }

}

function findLastTextNode(node) {
    if (node instanceof Text) {
        return node
    }
    const children = node.childNodes // 
    for (let i = children.length - 1; i >= 0; i--) {
        const result = findLastTextNode(children[i])
        if (result) {
            return result
        }
    }
    return null
}

function updateCursor() {
    // 1. add a textNode on each end of paragraph
    const node = document.createTextNode("i")
    const lastTextNode = findLastTextNode(dom.text)
    lastTextNode.parentNode.appendChild(node)
    // 2. Range -> getBoundingClientRect -> translateX
    const range = document.createRange()
    range.setStart(node, 0)
    range.setEnd(node, 0)
    const rect = range.getBoundingClientRect()
    const containerRect = dom.container.getBoundingClientRect()
    const w = rect.x - containerRect.x
    const h = rect.y - containerRect.y
    dom.cursor.style.transform = `translate(${w}px,${h}px)`
    // 3. remove textNode
    node.remove()

}



appendText()