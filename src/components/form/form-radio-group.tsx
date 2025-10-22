// components/form/LabeledRadioGroup.tsx
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TFormFieldProps } from "trand_common_v1";

import { Button } from "../ui/button";

interface FormRadioGroupProps {
  info: TFormFieldProps;
  values?: string[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  update?: (value: string | null | undefined) => void;
}

export function FormRadioGroup({
  info,
  values = ["true", "false", "null"],
  value = values[values.length - 1], // 기본값으로 fallback
  disabled = false,
  onChange,
  update,
}: FormRadioGroupProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
      <Label className="min-w-[240px]" htmlFor={info.id}>
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
      </Label>
      <RadioGroup
        id={info.id}
        value={value} // controlled from parent
        onValueChange={(val) => {
          onChange?.(val);
        }}
        className="flex items-center gap-4"
        disabled={disabled}
      >
        {values.map((val) => (
          <div key={val} className="flex items-center space-x-2">
            <RadioGroupItem value={val} id={`${info.id}_${val}`} disabled={disabled} />
            <Label htmlFor={`${info.id}_${val}`}>{val}</Label>
          </div>
        ))}
      </RadioGroup>
      {update && (
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => update(value)} disabled={disabled}>
            Update
          </Button>
        </div>
      )}
    </div>
  );
}
