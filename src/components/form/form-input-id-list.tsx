// components/form/LabeledTagListInput.tsx
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "aiqna_common_v1";

import { Button } from "../ui/button";

type UrlGenerator = (id: string) => string;
type UrlGeneratorWithKey = (id: string, key: string) => string;

interface FormInputIdListProps {
  info: TFormFieldProps;
  value: string[];
  disabled?: boolean;
  urlGenerator?: UrlGenerator | UrlGeneratorWithKey;
  onChange?: (value: string) => void;
  apiKey?: string;
  fetchIds_01?: () => void;
  fetchIds_02?: () => void;
  clearIds?: () => void;
}

export function FormInputIdList({
  info,
  value,
  disabled = false,
  urlGenerator,
  onChange,
  apiKey,
  fetchIds_01,
  fetchIds_02,
  clearIds,
}: FormInputIdListProps) {
  return (
    <div className="mt-4 mb-2 flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <div className="flex flex-col items-start gap-2 w-full">
        <Input
          id={info.id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={info.placeholder}
        />
        {value.length > 0 && (
          <div className="flex flex-wrap items-center">
            {value.map((id) => {
              let url = "#";
              if (urlGenerator) {
                if (apiKey && urlGenerator.length === 2) {
                  url = (urlGenerator as UrlGeneratorWithKey)(id, apiKey);
                } else {
                  url = (urlGenerator as UrlGenerator)(id);
                }
              }

              return (
                <p key={id}>
                  <Link href={url} target="_blank" className="p-2 text-xs text-cyan-500 hover:text-cyan-600">
                    {id}
                  </Link>
                </p>
              );
            })}
          </div>
        )}
        {(fetchIds_01 || fetchIds_02 || clearIds) && (
          <div className="flex items-center gap-2">
            {fetchIds_01 && <Button onClick={() => fetchIds_01()}>Fetch IDs By Name</Button>}
            {fetchIds_02 && <Button onClick={() => fetchIds_02()}>Fetch IDs By Native</Button>}
            {clearIds && <Button onClick={() => clearIds()}>Clear IDs</Button>}
          </div>
        )}
      </div>
    </div>
  );
}
