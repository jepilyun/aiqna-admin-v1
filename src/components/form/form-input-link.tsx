// components/form/LabeledLinkInput.tsx
import Link from "next/link";

import { LinkIconSVG } from "../svgs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "aiqna_common_v1";

import { Button } from "../ui/button";

interface FormInputLinkProps {
  info: TFormFieldProps;
  value: string;
  disabled?: boolean;
  linkUrl?: string | null;
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
  clear?: (value: string | null | undefined) => void;
}

export function FormInputLink({ info, value, disabled = false, linkUrl, onChange, update, clear }: FormInputLinkProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label className="min-w-[240px]" htmlFor={info.id}>
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          id={info.id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={info.placeholder}
        />
        {linkUrl && (
          <Link href={linkUrl} target="_blank" className="flex items-center justify-center">
            <LinkIconSVG className="w-4 h-4" />
          </Link>
        )}
      </div>
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
  );
}
