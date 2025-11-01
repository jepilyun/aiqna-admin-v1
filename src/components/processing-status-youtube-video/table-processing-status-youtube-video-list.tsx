import Link from "next/link";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TSqlProcessingLogYoutubeVideo } from "aiqna_common_v1";


/**
 * A table component with the Processing Status YouTube Video list.
 * @param renderedRows - The rows to render in the table.
 * @returns A table component with the Processing Status YouTube Video list.
 */
export const TableProcessingStatusYouTubeVideoList = ({ renderedRows }: { renderedRows: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-gray-500">Video ID</TableHead>
          <TableHead className="text-center text-gray-500">Processing Status</TableHead>
          <TableHead className="text-center text-gray-500">Index Name</TableHead>
          <TableHead className="text-center text-gray-500">Is Shorts</TableHead>
          <TableHead className="text-center text-gray-500">Is Transcript Exist</TableHead>
          <TableHead className="text-center text-gray-500">Is API Data Fetched</TableHead>
          <TableHead className="text-center text-gray-500">Is Transcript Fetched</TableHead>
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
 * A table row component with the YouTube Video.
 * @param processingStatusYouTubeVideo - The Processing Status YouTube Video to render in the table.
 * @returns A table row component with the YouTube Video.
 */
export const TableProcessingStatusYouTubeVideoListRow = ({ processingStatusYouTubeVideo }: { processingStatusYouTubeVideo: TSqlProcessingLogYoutubeVideo }) => {
  return (
    <TableRow key={processingStatusYouTubeVideo.video_id}>
      <TableCell className="text-center text-cyan-400">
        <Link href={`/processing-status-youtube-videos/detail/${processingStatusYouTubeVideo.video_id}`}>
          {processingStatusYouTubeVideo.video_id}
        </Link>
      </TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.processing_status}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.index_name}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_shorts ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_transcript_exist ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_api_data_fetched ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_transcript_fetched ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_pinecone_processed ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.is_error_occurred ? "Y" : "N"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.error_message}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.processing_started?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.processing_completed?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.created_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.updated_at.toLocaleString()}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.last_processed_at?.toLocaleString() || "-"}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.source}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.priority}</TableCell>
      <TableCell className="text-center ">{processingStatusYouTubeVideo.assigned_worker}</TableCell>
    </TableRow>
  );
};
