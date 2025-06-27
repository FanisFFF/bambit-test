import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useThemeStore } from './store/theme'
import { usePhotosStore } from './store/photos'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
const themeStore = useThemeStore()
themeStore.loadTheme()
const store = usePhotosStore();
store.loadState();

app.mount('#app')

