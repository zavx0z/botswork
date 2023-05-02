import {MathUtils, PerspectiveCamera} from "three"

/**
 * Возвращает видимую высоту viewport камеры в единицах мира.
 *
 * @param {PerspectiveCamera} camera - Объект камеры.
 * @param {number} axisPoint - Точка по направлению камеры, где определяются единицы высоты и ширины видимой области.
 * @returns {number} Видимую высоту viewport в единицах мира.
 */
export const getVisibleHeight = (camera: PerspectiveCamera, axisPoint: number) => {
    const cameraOffset = camera.position.z
    if (axisPoint < cameraOffset) axisPoint -= cameraOffset
    else axisPoint += cameraOffset
    const vFOV = MathUtils.degToRad(camera.fov)
    return 2 * Math.tan(vFOV * 0.5) * Math.abs(axisPoint)
}

/**
 * Возвращает видимую ширину viewport камеры в единицах мира.
 *
 * @param {PerspectiveCamera} camera - Объект камеры.
 * @param {number} axisPoint - Точка по направлению камеры, где определяются единицы высоты и ширины видимой области.
 * @returns {number} Видимую ширину viewport в единицах мира.
 */
export const getVisibleWidth = (camera: PerspectiveCamera, axisPoint: number) =>
    getVisibleHeight(camera, axisPoint) * camera.aspect

/**
 * Возвращает фактор конвертации координат в пиксели, используемый для перевода координат из единиц мира в пиксели экрана.
 *
 * @param {PerspectiveCamera} camera - Объект камеры.
 * @param {number} distance - Расстояние от камеры до точки в пространстве,
 * где определяются единицы высоты и ширины видимой области. По умолчанию равно 0.
 * @returns {number} Фактор конвертации координат в пиксели.
 */
export const getConversionFactor = (camera: PerspectiveCamera, distance: number = 0) =>
    getVisibleWidth(camera, distance) / window.innerWidth
