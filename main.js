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
