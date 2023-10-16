import { createMachine } from "xstate"

export const machine = createMachine(
  {
    id: "Бот",
    invoke: [
      {
        src: "telegram",
        id: "навык",
      },
      {
        src: "spreadsheet",
        id: "spreadsheet",
        systemId: "spreadsheet",
      },
    ],
    initial: "получение страниц",
    states: {
      "получение страниц": {
        entry: { type: "spreadsheet" },
        on: {
          "open.complete": { target: "обработка страниц" },
        },
        invoke: {
          src: "google-таблица",
          id: "получить страницы",
          onDone: [
            {
              target: "обработка страниц",
              reenter: false,
            },
          ],
        },
      },
      "обработка страниц": {
        entry: {
          type: "страница по порядку",
        },
        initial: "страница в работе",
        states: {
          "страница в работе": {
            on: {
              "получить ячейки первого столбца": {
                target: "получение ячеек",
                reenter: false,
              },
            },
          },
          "получение ячеек": {
            invoke: {
              src: "google-таблица",
              id: "получить ячейки",
              onDone: [
                {
                  target: "обработка ячеек",
                  guard: "ячейки имеются",
                  reenter: false,
                },
              ],
            },
          },
          "обработка ячеек": {
            entry: {
              type: "ячейка по порядку",
            },
            initial: "ячейка в работе",
            states: {
              "ячейка в работе": {
                always: [
                  {
                    target: "сохранить вопрос к GPT",
                    guard: "есть данные",
                    reenter: false,
                  },
                  {
                    target: "#Бот.обработка страниц.обработка ячеек",
                    guard: "нет данных",
                    reenter: false,
                  },
                ],
              },
              "сохранить вопрос к GPT": {
                invoke: {
                  src: "google-таблица",
                  id: "сохранить ячейку",
                  onDone: [
                    {
                      target: "отправить вопрос к GPT",
                      reenter: false,
                    },
                  ],
                },
              },
              "отправить вопрос к GPT": {
                description: "отправить вопрос GPT",
                invoke: {
                  src: "telegram",
                  id: "отправить сообщение",
                  onDone: [
                    {
                      target: "получение сообщение от GPT",
                      reenter: false,
                    },
                  ],
                },
              },
              "получение сообщение от GPT": {
                invoke: {
                  src: "telegram",
                  id: "получить сообщение",
                  onDone: [
                    {
                      target: "сохранить ответ GPT",
                      reenter: false,
                    },
                  ],
                },
              },
              "сохранить ответ GPT": {
                invoke: {
                  src: "google-таблица",
                  id: "сохранить ячейку",
                  onDone: [
                    {
                      target: "#Бот.обработка страниц",
                      reenter: false,
                    },
                  ],
                },
              },
            },
          },
        },
        on: {
          "нет страниц или страницы закончились": {
            target: "Работа выполнена",
            reenter: false,
          },
        },
      },
      "Работа выполнена": {
        type: "final",
      },
    },
    types: {
      events: {} as { type: "получить ячейки первого столбца" } | { type: "нет страниц или страницы закончились" } | { type: "open.complete" },
    },
  },
  {
    actions: {
      "страница по порядку": ({ context, event }) => {},

      "ячейка по порядку": ({ context, event }) => {},
    },
    actors: {
      telegram: createMachine({
        /* ... */
      }),

      spreadsheet: createMachine({
        /* ... */
      }),

      "google-таблица": createMachine({
        /* ... */
      }),
    },
    guards: {
      "ячейки имеются": ({ context, event, guard }) => false,

      "есть данные": ({ context, event, guard }) => false,

      "нет данных": ({ context, event, guard }) => false,
    },
    delays: {},
  },
)
