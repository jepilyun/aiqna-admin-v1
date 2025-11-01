// components/form/LabeledTagListInput.tsx
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "aiqna_common_v1";

import { Button } from "../ui/button";

interface FormInputTagListProps {
  info: TFormFieldProps;
  value: string;
  disabled?: boolean;
  tagPrefix?: string; // 예: "https://www.instagram.com/explore/tags/"
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
  clear?: (value: string | null | undefined) => void;
}

export function FormInputTagList({
  info,
  value,
  disabled = false,
  tagPrefix = "https://www.instagram.com/explore/tags/",
  onChange,
  update,
  clear,
}: FormInputTagListProps) {
  const tags = value
    .replace(/[{}]/g, "")
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag);

  return (
    <div className="mt-4 mb-2 flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <div className="flex flex-col gap-2 w-full">
        <Input
          className="w-full"
          id={info.id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={info.placeholder}
        />
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <p key={tag}>
                <Link href={`${tagPrefix}${tag}`} target="_blank" className="text-sm text-cyan-500 hover:text-cyan-600">
                  #{tag}
                </Link>
              </p>
            ))}
          </div>
        )}
        {update && clear && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => update(value)} disabled={disabled}>
              Update
            </Button>
            <Button variant="outline" onClick={() => clear(value)} disabled={disabled}>
              Clear
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
