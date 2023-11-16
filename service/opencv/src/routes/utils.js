
function drawImageToCanvas(image) {
    const canvas = document.createElement("canvas")
    canvas.width = image.width
    canvas.height = image.height
    canvas.getContext("2d", { willReadFrequently: true }).drawImage(image, 0, 0, image.width, image.height)
    return canvas
}
function convertImage(image) {
    const canvas = drawImageToCanvas(image)
    const ctx = canvas.getContext("2d")

    let result = []
    for (let y = 0; y < canvas.height; y++) {
        result.push([])
        for (let x = 0; x < canvas.width; x++) {
            let data = ctx.getImageData(x, y, 1, 1).data
            result[y].push(data[0])
            result[y].push(data[1])
            result[y].push(data[2])
        }
    }
    function convertArray(array) {
        return JSON.stringify(array).replace(/\[/g, "{").replace(/\]/g, "}")
    }
    const arrayCode = `
    #define IMAGE_WIDTH ${canvas.width}
    #define IMAGE_HEIGHT ${canvas.height}
    #define BYTES_PER_PIXEL 3
    uint8_t imageData[IMAGE_HEIGHT][IMAGE_WIDTH * BYTES_PER_PIXEL] = ${convertArray(result)};
  `
    return arrayCode
}
