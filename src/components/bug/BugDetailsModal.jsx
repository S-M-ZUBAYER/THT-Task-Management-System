import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React from "react";

export default function BugDetailsModal({ isOpen, onClose, bug }) {
  if (!bug) return null;

  const {
    BugDetails,
    findDate,
    solveDate,
    priority,
    status,
    attachmentFile,
    assignWith,
  } = bug;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="bg-white w-full max-w-lg rounded-xl p-6 shadow-xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-black bg-[#E6ECF0] rounded-full p-1 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </div>

              <h2 className="text-xl font-semibold mb-4">Bug Details</h2>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Description:</strong> {BugDetails}
                </p>
                <p>
                  <strong>Status:</strong> {status}
                </p>
                <p>
                  <strong>Priority:</strong> {priority}
                </p>
                <p>
                  <strong>Found:</strong>{" "}
                  {findDate ? new Date(findDate).toLocaleDateString() : "—"}
                </p>
                <p>
                  <strong>Solved:</strong>{" "}
                  {solveDate ? new Date(solveDate).toLocaleDateString() : "—"}
                </p>
                <p>
                  <strong>Attachment:</strong>{" "}
                  {attachmentFile ? (
                    <a
                      href={attachmentFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View File
                    </a>
                  ) : (
                    "None"
                  )}
                </p>
                <div>
                  <strong>Assigned Users:</strong>
                  <ul className="list-disc list-inside">
                    {assignWith.map((user) => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
