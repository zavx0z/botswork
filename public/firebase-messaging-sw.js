importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js")
const firebaseConfig = {
    apiKey: "AIzaSyDI9fxdrgYBoPJfFLzH3tgD1pbm7gSzVjE",
    authDomain: "bots-work.firebaseapp.com",
    databaseURL: "https://bots-work.firebaseio.com",
    projectId: "bots-work",
    storageBucket: "bots-work.appspot.com",
    messagingSenderId: "97591584557",
    appId: "1:97591584557:web:353e6eabe74445cd3b95a4",
    measurementId: "G-6987H82MN6"
}
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload)
    // Customize notification here
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle,
        notificationOptions)
})