import { SpreadSheetActor } from "@service/google-spreadsheet"
import { createMachine } from "xstate"
import { waitFor } from "xstate"
SpreadSheetActor.subscribe((state) => {
  const persistedState = SpreadSheetActor.getPersistedState()
  console.log(`\n`)
  // console.log(JSON.stringify(persistedState, null, 2))
  console.log(JSON.stringify(persistedState))
  console.log(JSON.stringify(state))
})
// console.log(JSON.stringify(GoogleSheetActor.getSnapshot().toJSON()))

SpreadSheetActor.start()
const { context } = await waitFor(SpreadSheetActor, (snapshot) => snapshot.matches({ open: "idle" }), { timeout: 10000 })
SpreadSheetActor.send({ type: "title.update", title: "GPT" })

const machine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SEQQQfCCCEQAdIfhBWG4QQYRBBxEEFYQQXhBAOEBIAJBBEHUAEQQBhBLAxEAGIIB7AOzEwCWPAG5cA1v1yEiFdIBkQOoxYVWgaRAA2gAYAuolAAHLrAEAXAbz0gAHogC0AVgCMmAOyaAzJoCcAFh8AOACYfQMd-F3sAGhAATzt3AF8E6LQsVEBGEGZ0jEAuECZFZjZMekKVfMAmEGosjBJ2KWJZBUB5EFJAThAcimpsEgZy1EBmEFRFfHTWJi1dJBBDYzMLKZsEW19MD0dQ3yCQsP9ouIRA+x8klIxMDOr0PILlVhx8YnIqahaSEhzOXn4hUQl76UaLzaHQmlhmpnMPEsi1sjkcXkwgQAbPZ7L4AsFQv5drFED53Aj7CcQKlzpkmNkrvkSrd-o9KDRXu9PnxBCJxJIHjJ5ECSO0KOpHJMDEYIfNQDCMa5-F41l4ths9oh4cdkiSzhcKblqUoiprKdcmTlMK92hUqlr0LVQVNwXMoQtEEdpet-JonBEXP51lFcQgkf4kZgiWrSfrtTc9eSDfkjSbgebLtahWDRfboXZQoFMF4kZpwkifIX-PiIkr-e5nIdiWHoxGaVHLobSO9iqhAKIgpR5fWwDFQtGoOWoAHEAAoAFRZ33Zf1oHa7zWBBBtItmkIzCHc2ZcYS97scnu9h3LMv8NY1dapkZUZKbsZbxowvaY5UBPb7A6HY8n3FZPw55zoM+r48nOGSAJIgTwkCu0xpuujoIGEOb2JWgYeE49hIsefpwu4Ljnmkl7XA2N7hlecb1KQDJ0KgEFQdQGAjhOU5sr8nIAqBtHpJBDIwXa8ESoggTZvYmhiUijjoY4mHYfsjjuEihIEbelrEbqpFEfebzGnOnbKDyGDlCQ6BMT+XysQBukLry7TLjoqZruK1h2D4LguDmoReu4fguMimHltJ7qIiGpyEXe14cGQxkRdQFB4J0JFqNQgDsIEwOSoGQMjxbQch8XBTmLPi2ZiZo6yBJobiVrJTpKcSPBcBAcCWKkDlig6glLPYXrSrKlbypi8LlrYyLuKsJXur55U+GiymUfRiWtemCGwpogRDZJo0heqYWqTqpSsItAnOZ1ng9XKCqDX6M2hhe4WJcU6ljNQlRJodBXxKNbneZoikXeEvpyV4InKWRan7XSVHPEab3tcdyzZoGO7-eWW6qqFKkxhFGMRtDtr5bDMLIpoOZ5gWRYBKWAN4l49jBiDmlY6DWmtqa1wvZaJAwxumGIjK6zuChGFYVT-qBF49N3Y92PkQ+bZ6ZQ3aoL2-aDqZXPLXhwYEudA3I36LhYXTN07Zj91M7yrZPswIEKO+KtfhO6sdbY-iYNrmEEsWlPlvKiTG9LYO0ubFFcvNXE8c8jHfk7cPBJgAYuEWmy62WOHBH76Pm2bDNxlZ+kKIZ0XR3jjkE-EtNIi4ubIuTJZ4SLjjk0b6OAAQgloVKoUhRWQTAx4s3o+MGYllRVazVQgaJG0kQA */
  id: "Бот",

  invoke: [{
    src: "telegram",
    id: "навык"
  }, {
    src: "google-таблица",
    id: "навык"
  }],

  states: {
    "получение страниц": {
      invoke: {
        src: "google-таблица",
        id: "получить страницы",
        onDone: "обработка страниц"
      }
    },

    "обработка страниц": {
      states: {
        "страница в работе": {
          on: {
            "получить ячейки первого столбца": "получение ячеек"
          }
        },

        "получение ячеек": {
          invoke: {
            src: "google-таблица",
            id: "получить ячейки",
            onDone: [{
              target: "обработка ячеек",
              cond: "ячейки имеются"
            }, {
              target: "обработка ячеек",
              cond: "ячеек нет"
            }]
          }
        },

        "обработка ячеек": {
          entry: "ячейка по порядку",

          states: {
            "ячейка в работе": {
              always: [{
                target: "сохранить ответ GPT",
                cond: "есть данные"
              }, {
                target: "#Бот.обработка страниц.обработка ячеек",
                cond: "нет данных"
              }]
            },

            "сохранить вопрос к GPT": {
              invoke: {
                src: "google-таблица",
                id: "сохранить ячейку",

                onDone: [{
                  target: "отправить вопрос к GPT",
                  cond: "New guard"
                }, "отправить вопрос к GPT"]
              }
            },

            "отправить вопрос к GPT": {
              invoke: {
                src: "telegram",
                id: "отправить сообщение",
                onDone: "получение сообщение от GPT"
              },

              description: `отправить вопрос GPT`
            },

            "получение сообщение от GPT": {
              invoke: {
                src: "telegram",
                id: "получить сообщение",
                onDone: "сохранить ответ GPT"
              }
            },

            "сохранить ответ GPT": {
              invoke: {
                src: "google-таблица",
                id: "сохранить ячейку"
              }
            }
          },

          initial: "ячейка в работе"
        }
      },

      initial: "страница в работе",
      entry: "страница по порядку",

      on: {
        "нет страниц или страницы закончились": "Работа выполнена"
      }
    },

    "Работа выполнена": {
      type: "final"
    }
  },

  initial: "получение страниц"
})
