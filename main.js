const paintGrid = document.getElementById('paint-grid')

let rowCount = 16
const size = `${Math.round(paintGrid.offsetWidth / rowCount)}px`

for (let j = 0; j < rowCount; j++) {
  const row = document.createElement('div')
  for (let i = 0; i < rowCount; i++) {
    const pixel = document.createElement('div')
    pixel.classList.add('pixel')
    pixel.style.width = size
    pixel.style.height = size

    row.appendChild(pixel)
  }

  paintGrid.appendChild(row)
}

const paint = (e) => {
  e.target.classList.add('black')
}

const clearGrid = (e) => {
  console.log('Clear Grid')
}

const setColorBW = (e) => {
  console.log('Set Color Black/White')
  e.target.classList.toggle('toggled')
}

const setColor = (e) => {
  console.log('Set Color')
  e.target.classList.toggle('toggled')
}
const pixel = document.querySelectorAll('.pixel')
pixel.forEach((pixel) => pixel.addEventListener('click', paint))

document.getElementById('clearButton').addEventListener('click', clearGrid)

document.getElementById('bwColorButton').addEventListener('click', setColorBW)
