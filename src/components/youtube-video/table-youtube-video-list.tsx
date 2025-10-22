import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlYoutubeVideoList } from "aiqna_common_v1";


/**
 * A table component with the YouTube Video list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the YouTube Video list.
 */
export const TableYouTubeVideoList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">Video ID</TableHead>
          <TableHead className="text-center text-gray-500">Title</TableHead>
          <TableHead className="text-center text-gray-500">Published Date</TableHead>
          <TableHead className="text-center text-gray-500">Is Shorts</TableHead>
          <TableHead className="text-center text-gray-500">Channel ID</TableHead>
          <TableHead className="text-center text-gray-500">Channel Name</TableHead>
          <TableHead className="text-center text-gray-500">Language</TableHead>
          <TableHead className="text-center text-gray-500">Default Audio Language</TableHead>
          <TableHead className="text-center text-gray-500">View Count</TableHead>
          <TableHead className="text-center text-gray-500">Like Count</TableHead>
          <TableHead className="text-center text-gray-500">Favorite Count</TableHead>
          <TableHead className="text-center text-gray-500">Comment Count</TableHead>
          <TableHead className="text-center text-gray-500">Duration Seconds</TableHead>
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
 * @param youtubeVideo - The YouTube Video to render in the table.
 * @returns A table row component with the YouTube Video.
 */
export const TableYouTubeVideoListRow = ({ youtubeVideo }: { youtubeVideo: TSqlYoutubeVideoList }) => {
  return (
    <TableRow key={youtubeVideo.video_id}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/youtube-videos/detail/${youtubeVideo.video_id}`}>
          {youtubeVideo.video_id}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{youtubeVideo.title}</TableCell>
      <TableCell className="text-center">{youtubeVideo.published_date?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center">{youtubeVideo.is_shorts ? "Y" : "N"}</TableCell>
      <TableCell className="text-center">{youtubeVideo.channel_id}</TableCell>
      <TableCell className="text-center">{youtubeVideo.channel_name}</TableCell>
      <TableCell className="text-center">{youtubeVideo.language}</TableCell>
      <TableCell className="text-center">{youtubeVideo.default_audio_language}</TableCell>
      <TableCell className="text-center">{youtubeVideo.view_count}</TableCell>
      <TableCell className="text-center">{youtubeVideo.like_count}</TableCell>
      <TableCell className="text-center">{youtubeVideo.favorite_count}</TableCell>
      <TableCell className="text-center">{youtubeVideo.comment_count}</TableCell>
      <TableCell className="text-center">{youtubeVideo.duration_seconds}</TableCell>
      <TableCell className="text-center">{youtubeVideo.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center">{youtubeVideo.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center">{youtubeVideo.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center">{youtubeVideo.is_active ? "Y" : "N"}</TableCell>
      <TableCell className="text-center">{youtubeVideo.is_deleted ? "Y" : "N"}</TableCell>
    </TableRow>
  );
};
