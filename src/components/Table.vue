<script setup>
import { ref,  h,defineComponent } from 'vue'
import { usePhotosStore } from '../store/photos'

const store = usePhotosStore()

const currentSortKey = ref('albumId')
const isAscending = ref(true)



function handleSort(key) {
    if (currentSortKey.value === key) {
        isAscending.value = !isAscending.value
    } else {
        currentSortKey.value = key
        isAscending.value = true
    }
}

function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight >= scrollHeight - 10) {
        store.loadMore()
    }
}
const SortIcon = defineComponent({
  props: ['columnKey'],
  setup(props) {
    return () =>
      h(
        'span',
        { class: 'inline-block w-4 text-center ml-1' },
        currentSortKey.value === props.columnKey
          ? (isAscending.value ? '▲' : '▼')
          : '\u00A0' 
      )
  },
})
</script>

<template>
    <div @scroll.passive="handleScroll"
        class="mb-10 w-full max-w-xl max-h-[600px] overflow-y-auto border rounded border-slate-300 dark:text-white">
        <table class="w-full text-left">
            <thead class="bg-gray-100 sticky top-0 dark:bg-slate-900 dark:text-slate-400">
                <tr>
                    <th @click="handleSort('id')" class="cursor-pointer pl-1 ">
                        ИД
                        <SortIcon columnKey="id" />
                    </th>
                    <th @click="handleSort('albumId')" class="cursor-pointer ">
                        Альбом
                        <SortIcon columnKey="albumId" />
                    </th>

                    <th @click="handleSort('title')" class="cursor-pointer ">
                        Название
                        <SortIcon columnKey="title" />
                    </th>
                    <th @click="handleSort('url')" class="cursor-pointer ">
                        Ссылка
                        <SortIcon columnKey="url" />
                    </th>
                    <th @click="handleSort('thumbnailUrl')" class="cursor-pointer ">
                        Миниатюра
                        <SortIcon columnKey="thumbnailUrl" />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="album in store.visibleAlbums(currentSortKey, isAscending)" :key="album.id">
                    <td class="px-2 py-1 ">{{ album.albumId }}</td>
                    <td class="px-2 py-1">{{ album.id }}</td>
                    <td class="px-2 py-1" :title="album.title">{{ album.title.slice(0, 15) }}...</td>
                    <td class="px-2 py-1" :title="album.url">{{ album.url.slice(0, 15) }}...</td>
                    <td class="px-2 py-1" :title="album.thumbnailUrl">{{ album.thumbnailUrl.slice(0, 15) }}...</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>
