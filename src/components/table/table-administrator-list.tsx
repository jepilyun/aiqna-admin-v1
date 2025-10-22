import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TAdmin } from "aiqna_common_v1";

/**
 * A table component with the administrator list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the administrator list.
 */
export const TableAdministratorList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">Aid</TableHead>
          <TableHead className="text-center text-gray-500">Email</TableHead>
          <TableHead className="text-center text-gray-500">Name</TableHead>
          <TableHead className="text-center text-gray-500">Is Active</TableHead>
          <TableHead className="text-center text-gray-500">Level</TableHead>
          <TableHead className="text-center text-gray-500">Created At</TableHead>
          <TableHead className="text-center text-gray-500">Created By</TableHead>
          <TableHead className="text-center text-gray-500">Last Accessed At</TableHead>
          <TableHead className="text-center text-gray-500">Deactivated At</TableHead>
          <TableHead className="text-center text-gray-500">Deactivated By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderedRows}</TableBody>
    </Table>
  );
};

/**
 * A table row component with the administrator.
 * @param administrator - The administrator to render in the table.
 * @returns A table row component with the administrator.
 */
export const TableAdministratorListRow = ({ administrator }: { administrator: TAdmin }) => {
  return (
    <TableRow key={administrator.aid}>
      <TableCell className="text-center">{administrator.aid}</TableCell>
      <TableCell className="text-center text-cyan-400">
        {administrator.email ? <Link href={`/administrators/detail/${administrator.aid}`}>{administrator.email}</Link> : "-"}
      </TableCell>
      <TableCell className="text-center">{administrator.name}</TableCell>
      <TableCell className="text-center">{administrator.is_active ? "Y" : "N"}</TableCell>
      <TableCell className="text-center">{administrator.level}</TableCell>
      <TableCell className="text-center">{administrator.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center">{administrator.created_by}</TableCell>
      <TableCell className="text-center">{administrator.last_accessed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center">{administrator.deactivated_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center">{administrator.deactivated_by}</TableCell>
    </TableRow>
  );
};
