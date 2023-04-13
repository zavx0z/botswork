// Этот дополнительный код используется для регистрации сервис-воркера.
// Функция register() по умолчанию не вызывается.

// Это позволяет приложению загружаться быстрее при последующих посещениях в производственной среде и дает
// возможность работать офлайн. Однако это также означает, что разработчики (и пользователи)
// будут видеть обновления только при последующих посещениях страницы после того, как все вкладки,
// открытые на странице, будут закрыты, поскольку ранее кэшированные ресурсы обновляются в фоновом режиме.

// Чтобы узнать больше об этой модели и инструкциях по включению этой функции, прочитайте https://cra.link/PWA
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] это IPv6 локальный адрес.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 считаются локальными для IPv4.
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
)

export function register(config) {
  console.log('SW register')
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // Конструктор URL доступен во всех браузерах, которые поддерживают SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href)
    if (publicUrl.origin !== window.location.origin)
        // Наш сервис-воркер не будет работать, если PUBLIC_URL будет на другом происхождении
        // относительно того, на котором работает наша страница. Это может произойти, если используется CDN
        // для обслуживания ресурсов; см. https://github.com/facebook/create-react-app/issues/2374
      return
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
      // Это работает на локальном хосте. Давайте проверим, существует ли сервис-воркер или нет.
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config)
        // Добавим некоторую дополнительную информацию для локального хоста, указывая разработчиков на документацию по сервис-воркерам/PWA.
        navigator.serviceWorker
            .ready
            .then(() => console.log('Это веб-приложение обслуживается сервис-воркером, который кэширует данные. Для получения дополнительной информации посетите https://cra.link/PWA'))
      } else // Это не локальный хост. Просто регистрируем сервис-воркер
        registerValidSW(swUrl, config)
    })
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing
          if (installingWorker == null) {
            return
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // На этом этапе было загружено обновленное содержимое,
                // но предыдущий сервисный работник все еще будет обслуживать более старое содержимое,
                // пока все вкладки клиента не будут закрыты.
                console.log('Новое содержимое доступно и будет использовано, когда все вкладки для этой страницы будут закрыты. https://cra.link/PWA')
                // Выполнить обратный вызов
                if (config && config.onUpdate)
                  config.onUpdate(registration)
              } else {
                // На этом этапе все было предварительно кэшировано.
                // Это идеальное время для отображения сообщения
                // "Содержимое кэшировано для использования в автономном режиме".
                console.log('Содержимое кэшировано для использования в автономном режиме.')
                // Выполнить обратный вызов
                if (config && config.onSuccess)
                  config.onSuccess(registration)
              }
            }
          }
        }
      })
      .catch((error) => console.error('Ошибка при регистрации сервисного работника:', error))
}
function checkValidServiceWorker(swUrl, config) {
  // Проверяем, может ли service worker быть найден. Если не может, перезагружаем страницу.
  fetch(swUrl, {headers: {'Service-Worker': 'script'}})
      .then((response) => {
        // Убедитесь, что service worker существует и что мы действительно получаем файл JS.
        const contentType = response.headers.get('content-type')
        // Сервис-воркер НЕ НАЙДЕН. Возможно, это другое приложение. Перезагрузите страницу.
        if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1))
          navigator.serviceWorker
              .ready
              .then((registration) => registration
                  .unregister()
                  .then(() => window.location.reload()))
        else // Сервис-воркер НАЙДЕН. Продолжаем работу как обычно.
          registerValidSW(swUrl, config)
      })
      .catch(() => console.log('Нет соединения с Интернетом. Приложение работает в автономном режиме.'))
}
export const unregister = () => {
  if ('serviceWorker' in navigator)
    navigator.serviceWorker.ready
        .then((registration) => registration.unregister())
        .catch((error) => console.error(error.message))
}
