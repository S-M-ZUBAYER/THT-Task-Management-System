import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import icons from "@/constants/icons";

const employeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  designation: z.string().min(1, "Designation is required"),
  joinDate: z.date({ required_error: "Joining date is required" }),
  image: z.any().optional(),
});

export function AddEmployeeDailog() {
  const [isOpen, setIsOpen] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      designation: "Software Engineer",
      joinDate: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="hover:bg-[#004368]  border-1 border-[#004368] text-[#004368] h-[44px] w-[300px] transition-all hover:text-white flex justify-center items-center rounded-sm font-semibold"
      >
        Add new Employee
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent backdrop-blur-sm bg-opacity-50">
          <div className="relative p-4 w-full max-w-[30vw] ">
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

              <div>
                <div className=" rounded-2xl  space-y-4">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 pb-8"
                  >
                    {/* Image Upload */}
                    <div className="flex justify-center pt-20">
                      <label className="w-40 h-40 border border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer bg-gray-100">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <img src={icons.Img} alt="imag" className="w-8 h-8" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Employee name
                      </label>
                      <Input
                        {...register("name")}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          color: "#004368",
                        }}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Employee email
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          color: "#004368",
                        }}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Employee Password
                      </label>
                      <Input
                        type="password"
                        {...register("password")}
                        style={{
                          outline: "none",
                          boxShadow: "none",
                          color: "#004368",
                        }}
                      />
                      {errors.password && (
                        <p className="text-sm text-red-500">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Designation */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Employee’s Designation
                      </label>
                      <Select
                        onValueChange={(value) =>
                          setValue("designation", value)
                        }
                        defaultValue="Software Engineer"
                      >
                        <SelectTrigger
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            color: "#004368",
                          }}
                        >
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Software Engineer">
                            Software Engineer
                          </SelectItem>
                          <SelectItem value="UI/UX Designer">
                            UI/UX Designer
                          </SelectItem>
                          <SelectItem value="Project Manager">
                            Project Manager
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.designation && (
                        <p className="text-sm text-red-500">
                          {errors.designation.message}
                        </p>
                      )}
                    </div>

                    {/* Joining Date */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Joining Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            style={{
                              backgroundColor: "transparent",
                              outline: "none",
                              color: "#004368",
                            }}
                          >
                            {watch("joinDate")
                              ? format(watch("joinDate"), "dd MMM yyyy")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={watch("joinDate")}
                            onSelect={(date) => setValue("joinDate", date)}
                          />
                        </PopoverContent>
                      </Popover>
                      {errors.joinDate && (
                        <p className="text-sm text-red-500">
                          {errors.joinDate.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-blue-900 text-white hover:bg-blue-800 "
                      style={{
                        backgroundColor: "#004368",
                        outline: "none",
                      }}
                    >
                      Add Employee
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
