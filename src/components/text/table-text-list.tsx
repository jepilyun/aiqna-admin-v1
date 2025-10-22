import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlTextList } from "aiqna_common_v1";

/**
 * A table component with the Text list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Text list.
 */
export const TableTextList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">Hash Key</TableHead>
          <TableHead className="text-center text-gray-500">Title</TableHead>
          <TableHead className="text-center text-gray-500">Created At</TableHead>
          <TableHead className="text-center text-gray-500">Updated At</TableHead>
          <TableHead className="text-center text-gray-500">Last Processed At</TableHead>
          <TableHead className="text-center text-gray-500">Is Active</TableHead>
          <TableHead className="text-center text-gray-500">Is Deleted</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderedRows}</TableBody>
    </Table>
  );
};

/**
 * A table row component with the Text.
 * @param text - The Text to render in the table.
 * @returns A table row component with the Text.
 */
export const TableTextListRow = ({ text }: { text: TSqlTextList }) => {
  return (
    <TableRow key={text.hash_key}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/texts/detail/${text.hash_key}`}>
          {text.hash_key}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{text.title}</TableCell>
      <TableCell className="text-center ">{text.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{text.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{text.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{text.is_active ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{text.is_deleted ? "Y" : "N"}</TableCell>
    </TableRow>
  );
};
