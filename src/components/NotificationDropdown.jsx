import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "@/Zustand/useNotificationStore";
import { useWebSocket } from "@/hook/useWebSocket";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useWebSocket();
  const { unreadCount, messages, clearUnread } = useNotificationStore();

  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      clearUnread();
    }
  }, [isOpen, unreadCount, clearUnread]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction="right">
      <DrawerTrigger asChild>
        <div className="relative p-1 rounded-full hover:bg-gray-200 transition">
          <Bell className="text-[#B0C5D0]" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-r z-50">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Your recent messages</DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto px-4">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            <ul>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className="px-2 py-2 border-b last:border-b-0 hover:bg-gray-100 text-sm"
                >
                  <strong>From:</strong> {msg.name}
                  <br />
                  <span>{msg.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationDrawer;
