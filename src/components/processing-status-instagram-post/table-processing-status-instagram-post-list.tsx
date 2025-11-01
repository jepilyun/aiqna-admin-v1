import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlProcessingLogInstagramPost } from "aiqna_common_v1";


/**
 * A table component with the Processing Status Instagram Post list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Processing Status Instagram Post list.
 */
export const TableProcessingStatusInstagramPostList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">ID</TableHead>
          <TableHead className="text-center text-gray-500">Instagram Post URL</TableHead>
          <TableHead className="text-center text-gray-500">Processing Status</TableHead>
          <TableHead className="text-center text-gray-500">Index Name</TableHead>
          <TableHead className="text-center text-gray-500">Is Data Fetched</TableHead>
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
 * @param processingStatusInstagramPost - The Processing Status Instagram Post to render in the table.
 * @returns A table row component with the Instagram Post.
 */
export const TableProcessingStatusInstagramPostListRow = ({ processingStatusInstagramPost }: { processingStatusInstagramPost: TSqlProcessingLogInstagramPost }) => {
  return (
    <TableRow key={processingStatusInstagramPost.id}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/processing-status-instagram-posts/detail/${processingStatusInstagramPost.id}`}>
          {processingStatusInstagramPost.id}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.instagram_post_url}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.processing_status}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.index_name}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.is_data_fetched ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.is_pinecone_processed ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.is_error_occurred ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.error_message}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.processing_started?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.processing_completed?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.source}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.priority}</TableCell>
      <TableCell className="text-center ">{processingStatusInstagramPost.assigned_worker}</TableCell>
    </TableRow>
  );
};
