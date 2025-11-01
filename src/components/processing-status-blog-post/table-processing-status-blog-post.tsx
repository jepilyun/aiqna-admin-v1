import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlProcessingLogBlogPost } from "aiqna_common_v1";


/**
 * A table component with the Processing Status Blog Post list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Processing Status Blog Post list.
 */
export const TableProcessingStatusBlogPostList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">ID</TableHead>
          <TableHead className="text-center text-gray-500">Blog Post URL</TableHead>
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
 * @param processingStatusBlogPost - The Processing Status Instagram Post to render in the table.
 * @returns A table row component with the Instagram Post.
 */
export const TableProcessingStatusBlogPostListRow = ({ processingStatusBlogPost }: { processingStatusBlogPost: TSqlProcessingLogBlogPost }) => {
  return (
    <TableRow key={processingStatusBlogPost.id}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/processing-status-blog-posts/detail/${processingStatusBlogPost.id}`}>
          {processingStatusBlogPost.id}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.blog_post_url}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.processing_status}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.index_name}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.is_data_fetched ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.is_pinecone_processed ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.is_error_occurred ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.error_message}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.processing_started?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.processing_completed?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.source}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.priority}</TableCell>
      <TableCell className="text-center ">{processingStatusBlogPost.assigned_worker}</TableCell>
    </TableRow>
  );
};
