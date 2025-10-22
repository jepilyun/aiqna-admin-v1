import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TFormFieldProps } from "trand_common_v1";

import { Button } from "../ui/button";

interface FormSearchBoxProps {
  info?: TFormFieldProps;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  search?: (value: string | null | undefined) => void;
}

export function FormSearchBox({ info, value, disabled = false, onChange, search }: FormSearchBoxProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Input
        id={info?.id || "search-input"}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={info?.placeholder || "Search"}
      />
      <Button variant="outline" onClick={() => search?.(value)} disabled={disabled}>
        <Search className="w-4 h-4" />
      </Button>
    </div>
  );
}
