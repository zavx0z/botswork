import {initializeApp} from "firebase/app"
// import {getAnalytics} from "firebase/analytics"
import {getMessaging, getToken, onMessage} from "firebase/messaging"
import {deviceDetect} from "react-device-detect"
import axios from "axios"
import {ACCESS_TOKEN} from "./features/secure/const"
import icon from './images/icon.png'

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
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const messaging = getMessaging(app)
const GENERATED_MESSAGING_KEY = 'BNlQH0HEUc74pL3aBKIW-6JIMv5F0BoaapiUz3jTCol0jhfdJVdTqi6deXAaQubEWhoHPfiVFzw2cAJPCRE5ivY'

export const sendTokenFCM = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted')
            getToken(messaging, {vapidKey: GENERATED_MESSAGING_KEY}).then((currentToken) => {
                if (currentToken)
                    axios.post('/notification/subscribe', {
                            token: currentToken,
                            device: deviceDetect(window.navigator.userAgent)
                        }, {headers: {Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}}
                    )
                else
                    console.log('No registration token available. Request permission to generate one.')
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err)
                // catch error while creating client token
                return err
            })
    })
}
onMessage(messaging, (payload) => {
    const {notification} = payload
    if ("Notification" in window)
        new Notification("Заголовок уведомления", {
            body: notification.body,
            icon: icon,
        })

    console.log('Message received. ', payload)
})