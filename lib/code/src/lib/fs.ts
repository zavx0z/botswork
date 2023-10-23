import { writeFile, readFile } from "fs/promises"

// Функция для записи файла
export async function writeFileToFS(filename: string, data: string) {
  try {
    await writeFile(filename, data, "utf-8")
    return { success: true, message: "Файл успешно записан." }
  } catch (error: any) {
    return { success: false, message: "Ошибка записи файла: " + error.message }
  }
}

// Функция для чтения файла
export async function readFileFromFS(filename: string) {
  try {
    const data = await readFile(filename, "utf-8")
    return { success: true, data }
  } catch (error: any) {
    return { success: false, message: "Ошибка чтения файла: " + error.message }
  }
}
