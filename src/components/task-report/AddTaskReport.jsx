import { useState } from "react";
import { Plus } from "lucide-react";
import { useUserData } from "@/hook/useUserData";

export function AddTaskReport() {
  const [isOpen, setIsOpen] = useState(false);
  const { admin, user } = useUserData();
  console.log(admin, user);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="block text-[#004368] bg-[#E6ECF0]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-3 text-center"
      >
        <Plus className="w-4 h-4 " />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent backdrop-blur-sm bg-opacity-50">
          <div className="relative p-4 w-full max-w-[40vw]">
            <div className="relative bg-[#FFFFFF] rounded-lg shadow  dark:bg-gray-700 px-4">
              <div
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </div>
              <div className="p-4 md:p-5 text-center  ">
                <h3 className="mb-5 text-lg font-bold text-[#004368] dark:text-gray-400">
                  Today's task Report
                </h3>
                <div className="flex flex-col justify-start">
                  <div className="text-start gap-4 flex flex-col mb-4">
                    <p className="text-[#2B2B2B] ">Employee Name</p>
                    <p className="text-[#004368] font-semibold ">
                      Dolon Kumar Roy
                    </p>
                  </div>
                  <div className="mt-10">
                    <label
                      for="message"
                      className="block mb-2 text-sm font-medium text-gray-900 text-start dark:text-gray-400"
                    >
                      Write your task report
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end mt-3.5">
                  <div
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="text-[#004368] font-semibold border border-blue-normal  px-16 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm inline-flex items-center  py-2.5 text-center"
                  >
                    Submit
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
