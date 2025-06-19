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
import { useNavigate } from "react-router-dom";

const NotificationDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path) => {
    setIsOpen(false);
    console.log(path);
    navigate(path);
  };

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
          <div className="w-7 h-7 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2.52992 14.394C2.31727 15.7471 3.268 16.6862 4.43205 17.1542C8.89481 18.9486 15.1052 18.9486 19.5679 17.1542C20.732 16.6862 21.6827 15.7471 21.4701 14.394C21.3394 13.5625 20.6932 12.8701 20.2144 12.194C19.5873 11.2975 19.525 10.3197 19.5249 9.27941C19.5249 5.2591 16.1559 2 12 2C7.84413 2 4.47513 5.2591 4.47513 9.27941C4.47503 10.3197 4.41272 11.2975 3.78561 12.194C3.30684 12.8701 2.66061 13.5625 2.52992 14.394Z"
                stroke="#004368"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 21C9.79613 21.6219 10.8475 22 12 22C13.1525 22 14.2039 21.6219 15 21"
                stroke="#B0C5D0"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </DrawerTrigger>
      <DrawerContent className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg border-r z-50">
        <DrawerHeader style={{ backgroundColor: "white" }}>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>Your recent messages</DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[calc(100vh-160px)] overflow-y-auto px-4 custom-scrollbar">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications</p>
          ) : (
            <ul className="space-y-2 list-none ">
              {messages.map((msg, index) => {
                const prevMsg = messages[index - 1];
                const showDateHeader = index === 0 || msg.date !== prevMsg.date;

                return (
                  <div key={index}>
                    {showDateHeader && (
                      <p className="text-xs font-semibold text-gray-500 my-2 text-center ">
                        {msg.date}
                      </p>
                    )}
                    <li
                      className="px-2 py-2 border-b last:border-b-0 hover:bg-gray-400 text-sm bg-gray-100 rounded-md"
                      onClick={() => handleNavigation(msg.path)}
                    >
                      <strong>From:</strong> {msg.name}
                      <br />
                      <span
                        className="flex items-center gap-2"
                        dangerouslySetInnerHTML={{ __html: msg.message }}
                      />
                    </li>
                  </div>
                );
              })}
            </ul>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationDrawer;
