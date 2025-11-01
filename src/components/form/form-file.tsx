import React, { useState } from "react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TFormFieldProps } from "aiqna_common_v1";

import { LinkIconSVG } from "../svgs";
import { Button } from "../ui/button";

interface FormFileInputProps {
  info: TFormFieldProps;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  linkUrl?: string | null;
  deleteButton?: () => void;
  updateButton?: () => void;
}

export function FormFileInput({ info, disabled = false, onChange, linkUrl, deleteButton, updateButton }: FormFileInputProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    setIsDeleted(true);
    onChange?.(null);
    deleteButton?.();
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
      <Label htmlFor={info.id} className="min-w-[240px]">
        {info.label}
        {info.is_required && <span className="text-red-500">*</span>}
        {info.max_length && <span className="text-xs text-gray-500">({info.max_length})</span>}
      </Label>
      <div className="w-full flex items-center gap-2">
        <Input
          className={`${isDeleted ? "text-red-400" : ""}`}
          id={info.id}
          type="file"
          disabled={disabled || isDeleted}
          onChange={(e) => onChange?.(e.target.files?.[0] || null)}
          placeholder={info.placeholder}
        />
        {linkUrl && !isDeleted && (
          <Link href={linkUrl} target="_blank" className="flex items-center justify-center">
            <LinkIconSVG className="w-4 h-4" />
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2">
        {deleteButton && (
          <Button variant="outline" onClick={handleDelete} disabled={isDeleted}>
            Delete
          </Button>
        )}
        {updateButton && (
          <Button variant="outline" onClick={updateButton}>
            Update
          </Button>
        )}
      </div>
    </div>
  );
}
