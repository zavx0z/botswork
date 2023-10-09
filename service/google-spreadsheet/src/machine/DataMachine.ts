import { createMachine } from "xstate"

export default createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBECGAXVBZVBjAFgJYB2YAdLJgE7oDEVYAjgK5zoDaADALqKgAOAe1iF0hQcT4gAHogC0AJgDMAFjIBWAJxKA7OoA0IAJ7yAjAvVkFm0wDZ7Dx5oC+zw2kw4CJcpVQ1aQHwQQD4QQCYQQCEQYMABEEBeEEAGEEB5EAACYMBGECi41ODwwC4QOKTAFhA4mJjAaRBAURAuXiQQIRExCSlZBFMlWzIADg6FDp0ldX7TdVsewxMEORV23XVOIYtejs1OW1d3DGw8IlIKajpAqMBWECjS0OLADhBDpMB+ECjgwDEQQ8BBECe4qqk60XFJGubJ4bIc2GFjGZk4ZBG6jWIA8m28OwYLDYJCgtAgEnIJAAboIANbkWFebbkRGsSgohDYwS4DDfKrvGqfBo-UDNJRKcF9FQqNqcQbAgzGMwAyHQwlbHxkUnI4iosBUKiCKhkfgAGwwADMlQBbMji+EkphksSyynEHE05n0ngfYRfRq-eSaTRkUwqFYKFTO73OnSgiamDrtax2RxhlxuGEbImS-iK3BwESytEYshU-F66MSnZx6mJilUy10ngMgR25lNRC2TSWLk82x89RDEb+uTNiEWMVZg0q+P55PyxXKtWanWZzzZ8i5hOwJNQM0W2kSa3VMv1b6Vlrusju2xKUymRvN0ZCiYKPodqHQ4iCCBwKT64m29cO1nyWaC8ZyNqmV0WTicDoIzaJoKgDF2E49n4NDPvaLIyPIYF+qeba2GoIxej6WE6BBcLElKRoylAsEVo6LTqGoOiBh0B5HsCHStoGv6ipGj6xn2s4oiRG5kU27ScFM2gNvyLYoUxl64TGOy4II2pqmA6CQNxr4IQgyxKGQNb7kGdGiV+diWL0V6uEAA */
  id: "DataMachine",

  context: {
    data: null,
    error: null,
  },

  initial: "start",

  states: {
    start: {
      description: `Конфигурирование процесса`,
      on: {
        request: {
          description: `Запрос данных`,
          target: "requesting",
        },

        "Повторная обработка данных": "processing",
        "Прерывание процесса": "completed"
      },
    },

    requesting: {
      description: "Отправка запроса",
      invoke: {
        src: "request",
        onDone: {
          description: `Получение данных`,
          target: "processing",
        },
        onError: {
          description: `Анализ ошибки запроса данных`,
          target: "start",
        },
      },
    },

    processing: {
      description: `Формирование данных`,
      invoke: {
        src: "process",
        onDone: {
          description: `Завершение процесса`,
          target: "completed",
        },
        onError: {
          description: `Анализ ошибки обработки данных`,
          target: "start",
        },
      },
    },

    completed: {
      description: "Завершено",
      type: "final",
    }
  },

  description: `Запрос и формирование конечных данных.`
})
