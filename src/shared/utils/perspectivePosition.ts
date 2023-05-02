import {PerspectiveCamera} from "three"

/**
 * Конвертирует координаты из 3D пространства в 2D пространство с помощью перспективной проекции.
 * @param x - Координата X в 3D пространстве.
 * @param y - Координата Y в 3D пространстве.
 * @param distance - (Опционально) Расстояние между камерой и экраном.
 * @param camera
 * @param viewport
 * @returns Массив, содержащий координаты X и Y в 2D пространстве.
 */
const perspectivePosition = (x: number, y: number, distance: number, camera: PerspectiveCamera, viewport: any): [number, number] => {
    // Проверка наличия необходимых свойств
    if (!camera || !camera.fov || !viewport || !viewport.aspect)
        throw new Error("Необходимые свойства отсутствуют в хранилище канваса.")
    // Получение значений из canvasStore.
    // Расчёт вертикального угла обзора (в радианах).
    const vFOV = camera.fov * Math.PI / 180
    // Расчёт расстояния от камеры до экрана.
    const distanceToScreen = Math.hypot(camera.position.x, camera.position.y, distance)
    // Расчёт высоты экрана.
    const height = 2 * Math.tan(vFOV / 2) * distanceToScreen
    // Конвертация координат в 2D пространство.
    const screenX = (x * height * viewport.aspect) / 2
    const screenY = (y * height) / 2
    // Возврат результатов.
    return [screenX, screenY]
}
export default perspectivePosition
