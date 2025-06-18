import { create } from "zustand";
export const useNotificationStore = create((set) => ({
  unreadCount: 0,
  messages: [],

  setUnreadCount: (count) => set({ unreadCount: count }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [msg, ...state.messages],
      unreadCount: state.unreadCount + 1,
    })),

  setMessages: (msgs) => {
    const lastSeenId =
      Number(localStorage.getItem("lastSeenNotificationId")) || 0;

    const sortedMessages = msgs.sort((a, b) => b.id - a.id);

    const unreadMessages = sortedMessages.filter((msg) => msg.id > lastSeenId);

    set({
      messages: sortedMessages,
      unreadCount: unreadMessages.length,
    });
  },

  clearUnread: () =>
    set((state) => {
      const highestId = state.messages?.[0]?.id;
      if (typeof highestId === "number") {
        localStorage.setItem("lastSeenNotificationId", highestId.toString());
      }
      return { unreadCount: 0 };
    }),
}));
