import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatusDropdown({ current }) {
  return (
    <Select defaultValue={current}>
      <SelectTrigger
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          boxShadow: "none",
        }}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Solved">Solved</SelectItem>
        <SelectItem value="In progress">In progress</SelectItem>
        <SelectItem value="not started">Not started</SelectItem>
      </SelectContent>
    </Select>
  );
}
