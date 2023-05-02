import {getConversionFactor, getVisibleWidth} from './cameraVisibleArea'
import {Box3, Object3D, PerspectiveCamera} from "three"

/**
 * Вписывает объект в видимую область камеры по оси x с заданным отступом от краев в пикселях.
 * (Камера и объект по оси z на одном уровне)
 * @param {PerspectiveCamera} camera
 * @param {Object3D} object - объект, который нужно вписать в область камеры.
 * @param paddingX - отступы по оси x
 */
export const fitObjectToView = (camera: PerspectiveCamera, object: Object3D, paddingX = 0) => {
    object.updateMatrixWorld()
    const bbox = new Box3().setFromObject(object)
    const factor = getConversionFactor(camera, bbox.max.z)
    const scale = getVisibleWidth(camera, bbox.max.z) - factor * paddingX
    object.scale.set(scale, 1, 1)
    return object
}
