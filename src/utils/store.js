import { create } from "zustand";

export const useStore = create((set) => ({
    marcadores: [],
    setMarcadores: (value) => set((state) => ({marcadores: value})),
    star: {},
    setStar: (value) => set((state) => ({star: value}))
})
)