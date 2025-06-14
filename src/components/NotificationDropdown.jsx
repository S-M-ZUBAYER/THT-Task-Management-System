import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "@/Zustand/useNotificationStore";
import { useWebSocket } from "@/hook/useWebSocket";

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useWebSocket();
  const { unreadCount, messages, clearUnread } = useNotificationStore();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open && unreadCount > 0) {
      clearUnread();
    }
  }, [open, clearUnread, unreadCount]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-1 rounded-full hover:bg-gray-200 transition"
      >
        <Bell className="text-[#B0C5D0]  " />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-[-5vw] mt-2 w-64 bg-white rounded-md shadow-lg border z-50 max-h-96 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No notifications</p>
          ) : (
            <ul>
              {messages.map((msg, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 border-b last:border-b-0 text-sm"
                >
                  <strong>From:</strong> {msg.from} <br />
                  <span>{msg.message}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
