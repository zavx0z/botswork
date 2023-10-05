import { createMachine } from "xstate"

export default createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5SwPYGMDWYAuA6FADmAHaQDEAwgDIDyAygKIDaADALqKgEqwCW2vFMU4gAHogDsAFgCMuAKwspAZnnyATBPkz5ADmUAaEAE9EMgJwTcU7SxYA2NTJnrzegL7ujqTDlxohUjRscgghMFxeYgA3FCx-QLBg1g4kEG4+ASERcQQpe3tcc11dCWUWTW09QxNEdRkpa1sHJxc3XU9vdCw8AOIgkIgyMAAnEZQR3AIAGwBDbAAzCYBbBP6k7BSRDP5BYTTc-MLi0vLKnX0jUwQJdSaZO0dtNo9OkGIUCDgRHx7tnl22QOZi0uHUylOFS0F3UuiuiAAtA0FFJdOZzEpdC4WGjdOo3r8-IQSJB-pk9jlEPZ1PJrOpqWdodV4QgLHIbA8Ws9XK8ur5etMeKS0jssvtQLlzFI7pZlA8NEzLrVWRJjs0ns4eR0vCBCb1EsFhVwAWLKQh1OCwRCylCqni4cqdLTnKqyvUJBJzNSpJ5PEA */

  id: "socket",
  initial: "connected",
  states: {
    opened: {
      on: {
        CLOSE: {
          target: "closed",
          description: `Закрытие соединения`,
        },
      },

      description: `Подключен`,
    },

    closed: {
      description: `Отключен`,
    },

    connected: {
      description: `Подключение`,

      invoke: {
        src: "connect",
        id: "connect",
        onDone: { target: "opened" },

        onError: "closed",
      },
    },
  },
  predictableActionArguments: true,
  schema: {
    context: {} as {
      ws: WebSocket
    },
  },
})
