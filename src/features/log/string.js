export const alignString = (str, minLength, alignment = 'left') => {
    const spacesToAdd = minLength - str.length
    let spacesToAddLeft, spacesToAddRight
    if (spacesToAdd < 0)
        return str
    switch (alignment) {
        case "left":
            spacesToAddLeft = 0
            spacesToAddRight = spacesToAdd
            break
        case "right":
            spacesToAddLeft = spacesToAdd
            spacesToAddRight = 0
            break
        case "center":
            spacesToAddLeft = Math.floor(spacesToAdd / 2)
            spacesToAddRight = spacesToAdd - spacesToAddLeft
            break
        default:
            throw new Error("Invalid alignment type: " + alignment)
    }

    return " ".repeat(spacesToAddLeft) + str + " ".repeat(spacesToAddRight)
}