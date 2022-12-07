window.addEventListener('load', () => {
    let drawApp = document.getElementById('drawApp')
    let footerCanvas = document.getElementById('footerCanvas')
    let number = document.getElementById('number')
    let win = window.getComputedStyle(drawApp)
    let colorsAll = document.getElementById('colorsAll')
    let context = drawApp.getContext('2d')
    let i = 1
    let bol = false
    number.value = context.lineWidth
    let sizeIcons = document.querySelectorAll('.sizeIcons')
    let materialsIconOn = document.querySelectorAll('.materialsIconOn')
    number.oninput = () => {
        context.lineWidth = number.value
    }
    materialsIconOn.forEach((el, id) => {
        el.addEventListener('click', () => {
            for (let bord of materialsIconOn) {
                bord.classList.remove('active')
            }
            el.classList.add('active')
            switch (id) {
                case 0:
                    bol = true
                    blockWidthColor[0].classList.add('active')
                    context.strokeStyle = blockWidthColor[0].style.backgroundColor
                    break
                case 1:
                    bol = false
                    context.strokeStyle = win.backgroundColor
                    for (let color of blockWidthColor) {
                        color.classList.remove('active')
                    }
                    break
                case 2:
                    bol = false
                    for (let color of blockWidthColor) {
                        color.classList.remove('active')
                    }
                    context.strokeStyle = win.backgroundColor
                    context.clearRect(0, 0, drawApp.width, drawApp.height)
                    break
            }
        })
    })
    sizeIcons.forEach((el, id) => {
        el.addEventListener('click', () => {
            switch (id) {
                case 0:
                    context.lineWidth += i
                    number.value = context.lineWidth
                    break
                case 1:
                    context.lineWidth -= i
                    number.value = context.lineWidth
                    break
            }
        })
    })
    let colors = ['black', 'gray', 'white', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
    for (let color of colors) {
        let div = document.createElement('div')
        colorsAll.appendChild(div)
        div.setAttribute('class', 'blockWidthColor')
        div.style.backgroundColor = color
    }
    let isPressed = false
    let blockWidthColor = document.querySelectorAll('.blockWidthColor')
    blockWidthColor[0].classList.add('active')
    context.strokeStyle = blockWidthColor[0].style.backgroundColor

    drawApp.addEventListener('mousedown', (e) => {
        if (bol == true) {
            isPressed = true
            context.beginPath()
            context.moveTo(e.offsetX, e.offsetY)
            blockWidthColor.forEach((el) => {
                el.addEventListener('click', () => {
                    for (let color of blockWidthColor) {
                        color.classList.remove('active')
                    }
                    
                    el.classList.add('active')
                    context.strokeStyle = el.style.backgroundColor
                })
            })
        }
        if(bol == false) {
            isPressed = true
            context.beginPath()
            context.moveTo(e.offsetX, e.offsetY)
            context.strokeStyle = win.backgroundColor
            blockWidthColor.forEach((el) => {
                el.addEventListener('click', () => {
                    for (let color of blockWidthColor) {
                        color.classList.remove('active')
                    }
                    context.strokeStyle = win.backgroundColor
                })
            })
        }
    })
    drawApp.addEventListener('mousemove', (e) => {
        if (isPressed) {
            context.lineTo(e.offsetX, e.offsetY)
            context.stroke()
        }
    })
    drawApp.addEventListener('mouseup', () => {
        isPressed = false
        context.closePath()
    })
    drawApp.addEventListener('mousemove', (e) => {
        footerCanvas.innerHTML = `X: ${e.offsetX} | Y: ${e.offsetY}`
    })
})
