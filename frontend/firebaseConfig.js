import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "auth-domain",
  projectId: "project-id",
  storageBucket: "storage-bucket",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "measurement-id",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
