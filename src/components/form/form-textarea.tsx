// components/form/LabeledTextarea.tsx
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TFormFieldProps } from "aiqna_common_v1";

import { Button } from "../ui/button";

interface FormTextareaProps {
  info: TFormFieldProps;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
  clear?: (value: string | null | undefined) => void;
}

export function FormTextarea({ info, value, disabled = false, onChange, update, clear }: FormTextareaProps) {
  return (
    <div className="mt-4 mb-2 flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <Textarea
        className="max-h-[200px]"
        id={info.id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {(update || clear) && (
        <div className="flex items-center gap-2">
          {update && (
            <Button variant="outline" onClick={() => update?.(value)} disabled={disabled}>
              Update
            </Button>
          )}
          {clear && (
            <Button variant="outline" onClick={() => clear?.(value)} disabled={disabled}>
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
