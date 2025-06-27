import { defineStore } from 'pinia';
export const usePhotosStore = defineStore('photos', {
    state: () => ({
        search: '',
        albums: [],
        maxVisible: 30,
        isLoading: false,
    }),


    getters: {

        sortedAlbums: (state) => (sortKey, isAscending) => {
            const list = [...state.albums]
            return list.sort((a, b) => {
                const aVal = a[sortKey]
                const bVal = b[sortKey]
                if (typeof aVal === 'string') {
                    return isAscending
                        ? aVal.localeCompare(bVal)
                        : bVal.localeCompare(aVal)
                }
                return isAscending ? aVal - bVal : bVal - aVal
            })
        },


        visibleAlbums: (state) => (sortKey, isAscending) => {
            const sorted = usePhotosStore().sortedAlbums(sortKey, isAscending)
            return sorted.slice(0, state.maxVisible)
        },
    },
    actions: {
        async fetchAlbums() {
            const ids = this.search.trim().split(/\s+/).filter(id => /^\d+$/.test(id))
            if (!ids.length) {
                this.albums = []
                return
            }

            this.isLoading = true
            try {
                const query = ids.map(id => `albumId=${id}`).join('&')
                const res = await fetch(`https://jsonplaceholder.typicode.com/photos?${query}`)
                this.albums = await res.json()
                this.maxVisible = 30;
                this.saveState()
            } catch (e) {
                console.error('Fetch failed', e)
                this.albums = []
            } finally {
                this.isLoading = false
            }
        },
        saveState() {
            const data = {
                search: this.search,
                albums: this.albums,
                maxVisible: this.maxVisible,
            }
            localStorage.setItem('photosState', JSON.stringify(data))
        },
        loadState() {
            const raw = localStorage.getItem('photosState')
            if (!raw) return

            try {
                const data = JSON.parse(raw)
                this.search = data.search || ''
                this.albums = data.albums || []
                this.maxVisible = data.maxVisible || 30
            } catch (e) {
                console.error('Ошибка восстановления состояния', e)
            }
        },
        loadMore() {
            this.maxVisible += 30
        },
    }
});
