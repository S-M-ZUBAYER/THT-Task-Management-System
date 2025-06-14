// /Zustand/useNotificationStore.js
import { create } from "zustand";

export const useNotificationStore = create((set) => ({
  unreadCount: 0,
  messages: [],
  setUnreadCount: (count) => set({ unreadCount: count }),
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
      unreadCount: state.unreadCount + 1,
    })),
  clearUnread: () => set({ unreadCount: 0 }),
}));
