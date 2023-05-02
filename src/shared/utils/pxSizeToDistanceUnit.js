export const unitDisplayToDistanceUnit = (camera, viewport, unitSize, distance) => {
    const height = Math.tan(camera.fov * Math.PI / 180 * 0.5) * distance * 2
    const width = height * camera.aspect
    return width / viewport.width * unitSize
}
export const pxSizeToDistanceUnit = (camera, viewport, size, distance) => {
    const result = unitDisplayToDistanceUnit(size / viewport.factor, distance)
    return Math.round(result * 100) / 100
}