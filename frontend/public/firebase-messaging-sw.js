importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.2/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  projectId: "project-id",
  storageBucket: "storage-bucket",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "measurement-id",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
