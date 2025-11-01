import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlProcessingLogText } from "aiqna_common_v1";


/**
 * A table component with the Processing Status Text list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Processing Status Text list.
 */
export const TableProcessingStatusTextList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">ID</TableHead>
          <TableHead className="text-center text-gray-500">Hash Key</TableHead>
          <TableHead className="text-center text-gray-500">Processing Status</TableHead>
          <TableHead className="text-center text-gray-500">Index Name</TableHead>
          <TableHead className="text-center text-gray-500">Is Pinecone Processed</TableHead>
          <TableHead className="text-center text-gray-500">Is Error Occurred</TableHead>
          <TableHead className="text-center text-gray-500">Error Message</TableHead>
          <TableHead className="text-center text-gray-500">Processing Started</TableHead>
          <TableHead className="text-center text-gray-500">Processing Completed</TableHead>
          <TableHead className="text-center text-gray-500">Created At</TableHead>
          <TableHead className="text-center text-gray-500">Updated At</TableHead>
          <TableHead className="text-center text-gray-500">Last Processed At</TableHead>
          <TableHead className="text-center text-gray-500">Source</TableHead>
          <TableHead className="text-center text-gray-500">Priority</TableHead>
          <TableHead className="text-center text-gray-500">Assigned Worker</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{renderedRows}</TableBody>
    </Table>
  );
};

/**
 * A table row component with the Instagram Post.
 * @param processingStatusText - The Processing Status Instagram Post to render in the table.
 * @returns A table row component with the Instagram Post.
 */
export const TableProcessingStatusTextListRow = ({ processingStatusText }: { processingStatusText: TSqlProcessingLogText }) => {
  return (
    <TableRow key={processingStatusText.id}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/processing-status-texts/detail/${processingStatusText.id}`}>
          {processingStatusText.id}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{processingStatusText.hash_key}</TableCell>
      <TableCell className="text-center ">{processingStatusText.processing_status}</TableCell>
      <TableCell className="text-center ">{processingStatusText.index_name}</TableCell>
      <TableCell className="text-center ">{processingStatusText.is_pinecone_processed ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusText.is_error_occurred ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusText.error_message}</TableCell>
      <TableCell className="text-center ">{processingStatusText.processing_started?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusText.processing_completed?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusText.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusText.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusText.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusText.source}</TableCell>
      <TableCell className="text-center ">{processingStatusText.priority}</TableCell>
      <TableCell className="text-center ">{processingStatusText.assigned_worker}</TableCell>
    </TableRow>
  );
};
