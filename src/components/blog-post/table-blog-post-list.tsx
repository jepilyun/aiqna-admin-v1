import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlBlogPostList } from "aiqna_common_v1";

/**
 * A table component with the Blog Post list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Blog Post list.
 */
export const TableBlogPostList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">UUID36</TableHead>
          <TableHead className="text-center text-gray-500">Post URL</TableHead>
          <TableHead className="text-center text-gray-500">Title</TableHead>
          <TableHead className="text-center text-gray-500">Platform</TableHead>
          <TableHead className="text-center text-gray-500">Platform URL</TableHead>
          <TableHead className="text-center text-gray-500">Published Date</TableHead>
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
 * A table row component with the YouTube Video.
 * @param blogPost - The Blog Post to render in the table.
 * @returns A table row component with the Blog Post.
 */
export const TableBlogPostListRow = ({ blogPost }: { blogPost: TSqlBlogPostList }) => {
  return (
    <TableRow key={blogPost.uuid_36}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/blog-posts/detail/${blogPost.uuid_36}`}>
          {blogPost.uuid_36}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{blogPost.blog_post_url}</TableCell>
      <TableCell className="text-center ">{blogPost.title}</TableCell>
      <TableCell className="text-center ">{blogPost.platform}</TableCell>
      <TableCell className="text-center ">{blogPost.platform_url}</TableCell>
      <TableCell className="text-center ">{blogPost.published_date?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{blogPost.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{blogPost.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{blogPost.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{blogPost.is_active ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{blogPost.is_deleted ? "Y" : "N"}</TableCell>
    </TableRow>
  );
};
