import {canvasStore} from "../Canvas"

// Функция принимает координаты в пространстве и возвращает координаты на экране, учитывая перспективу
const perspectivePosition = (spaceX, spaceY) => {
    // Импортируем объект с данными о камере и viewport'е из глобального хранилища
    const {camera: {fov, position}, viewport: {aspect}} = canvasStore
    // Переводим угол обзора камеры в радианы
    const vFOV = fov * Math.PI / 180
    // Вычисляем расстояние от камеры до экрана
    const distance = position.z
    // Вычисляем высоту экрана, учитывая угол обзора камеры и расстояние до экрана
    const height = 2 * Math.tan(vFOV / 2) * distance
    // Вычисляем координату x на экране, учитывая координату x в пространстве, высоту экрана, соотношение сторон viewport'а и делитель 2
    const x = (spaceX * height * aspect) / 2
    // Вычисляем координату y на экране, учитывая координату y в пространстве, высоту экрана и делитель 2
    const y = (spaceY * height) / 2
    // Возвращаем координаты на экране в виде массива [x, y]
    return [x, y]
}

// Экспортируем функцию для использования в других модулях
export default perspectivePosition


