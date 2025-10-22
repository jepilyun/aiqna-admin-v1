import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlInstagramPostList } from "aiqna_common_v1";

/**
 * A table component with the Instagram Post list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Instagram Post list.
 */
export const TableInstagramPostList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">UUID36</TableHead>
          <TableHead className="text-center text-gray-500">Post URL</TableHead>
          <TableHead className="text-center text-gray-500">Post Type</TableHead>
          <TableHead className="text-center text-gray-500">Media Count</TableHead>
          <TableHead className="text-center text-gray-500">OG Title</TableHead>
          <TableHead className="text-center text-gray-500">Like Count</TableHead>
          <TableHead className="text-center text-gray-500">Comment Count</TableHead>
          <TableHead className="text-center text-gray-500">View Count</TableHead>
          <TableHead className="text-center text-gray-500">User ID</TableHead>
          <TableHead className="text-center text-gray-500">User Name</TableHead>
          <TableHead className="text-center text-gray-500">Published Date</TableHead>
          <TableHead className="text-center text-gray-500">Location Name</TableHead>
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
 * @param instagramPost - The Instagram Post to render in the table.
 * @returns A table row component with the Instagram Post.
 */
export const TableInstagramPostListRow = ({ instagramPost }: { instagramPost: TSqlInstagramPostList }) => {
  return (
    <TableRow key={instagramPost.uuid_36}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/instagram-posts/detail/${instagramPost.uuid_36}`}>
          {instagramPost.uuid_36}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{instagramPost.instagram_post_url}</TableCell>
      <TableCell className="text-center ">{instagramPost.post_type}</TableCell>
      <TableCell className="text-center ">{instagramPost.media_count}</TableCell>
      <TableCell className="text-center max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap">{instagramPost.og_title}</TableCell>
      <TableCell className="text-center ">{instagramPost.like_count}</TableCell>
      <TableCell className="text-center ">{instagramPost.comment_count}</TableCell>
      <TableCell className="text-center ">{instagramPost.view_count}</TableCell>
      <TableCell className="text-center ">{instagramPost.user_id}</TableCell>
      <TableCell className="text-center ">{instagramPost.user_name}</TableCell>
      <TableCell className="text-center ">{instagramPost.published_date?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{instagramPost.location_name}</TableCell>
      <TableCell className="text-center ">{instagramPost.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{instagramPost.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{instagramPost.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{instagramPost.is_active ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{instagramPost.is_deleted ? "Y" : "N"}</TableCell>
    </TableRow>
  );
};
