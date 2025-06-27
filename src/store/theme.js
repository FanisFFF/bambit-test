// store/theme.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  function loadTheme() {
    const saved = localStorage.getItem('theme')
    isDark.value = saved === 'dark'
    updateHtmlClass()
  }

  function toggleTheme() {
    console.log('click')
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateHtmlClass()
  }

  function updateHtmlClass() {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  return { isDark, toggleTheme, loadTheme }
})
