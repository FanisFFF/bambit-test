<script setup>
import { usePhotosStore } from '../store/photos';
import { useThemeStore } from '../store/theme';

const photosStore = usePhotosStore();
const theme =useThemeStore();

</script>


<template>
    <header class="p-4 mb-8 flex justify-center gap-3 border-b-2 border-slate-200 dark:bg-slate-900">
        <input v-model="photosStore.search" placeholder="Enter album IDs..." class="p-2 border rounded dark:text-white" />
        <button @click="photosStore.fetchAlbums" class="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
            Search
        </button>
        <button @click="theme.toggleTheme" class="p-2 rounded border dark:bg-slate-50">
            {{ theme.isDark ? '🌙 Dark' : '☀️ Light' }}
        </button>
    </header>
</template>
