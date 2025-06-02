import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useCallback } from "react";

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
import { axiosApi } from "@/lib/axiosApi";
import toast from "react-hot-toast";
import { CalendarDaysIcon, X } from "lucide-react";

const updateEmployeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits"),
  designation: z.string().min(1, "Designation is required"),
  joiningDate: z.date({ required_error: "Joining date is required" }),
  image: z.any().optional(),
});

export function UpdateEmployeeDialog({ employee, fetchData, onClose }) {
  const [preview, setPreview] = useState(employee?.image || null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateEmployeeSchema),
    defaultValues: {
      name: employee?.name || "",
      phone: employee?.phone || "",
      designation: employee?.designation || "",
      joiningDate: employee?.joiningDate
        ? new Date(employee.joiningDate)
        : new Date(),
      image: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("designation", data.designation);
      formData.append("joiningDate", format(data.joiningDate, "yyyy-MM-dd"));
      formData.append("role", employee.role);
      formData.append("id", employee.id);
      if (data.image) {
        formData.append("image", data.image);
      }

      console.log(formData);

      const res = await axiosApi.post("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      if (res.status === 200) {
        toast.success("Employee updated successfully");
        onClose();
        fetchData();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        setValue("image", file);
        setPreview(URL.createObjectURL(file));
      }
    },
    [setValue]
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-transparent backdrop-blur-sm bg-opacity-50">
      <div className="relative p-4 w-full max-w-[30vw]">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 px-4">
          <div
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            aria-label="Close dialog"
          >
            <X className="w-3 h-3" aria-hidden="true" />
          </div>

          <div className="rounded-2xl space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pb-8">
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
                    <img src={icons.Img} alt="Image" className="w-8 h-8" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    aria-label="Upload employee image"
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employee Name
                </label>
                <Input
                  {...register("name")}
                  className="focus:ring-[#004368] focus:border-[#004368]"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email (Read-Only) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employee Email
                </label>
                <Input
                  value={employee?.email || ""}
                  readOnly
                  className="bg-gray-100 cursor-not-allowed focus:ring-0 focus:border-0"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  type="text"
                  {...register("phone")}
                  className="focus:ring-[#004368] focus:border-[#004368]"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Designation
                </label>
                <Select
                  defaultValue={employee?.designation || ""}
                  onValueChange={(val) =>
                    setValue("designation", val, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className="focus:ring-[#004368] focus:border-[#004368]"
                    style={{ backgroundColor: "white", outline: "none" }}
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
                      className="w-full justify-start text-left font-normal focus:ring-[#004368] focus:border-[#004368]"
                      style={{ backgroundColor: "white", outline: "none" }}
                    >
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      {watch("joiningDate")
                        ? format(watch("joiningDate"), "dd MMM yyyy")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={watch("joiningDate")}
                      onSelect={(date) => setValue("joiningDate", date)}
                    />
                  </PopoverContent>
                </Popover>
                {errors.joiningDate && (
                  <p className="text-sm text-red-500">
                    {errors.joiningDate.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full  text-white hover:bg-[#003050] transition-colors"
                disabled={isLoading}
                style={{ backgroundColor: "#004368" }}
              >
                {isLoading ? "Updating..." : "Update Employee"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEmployeeDialog;
