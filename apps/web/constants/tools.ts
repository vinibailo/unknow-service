import { FileText, Image, Video, PenLine } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export type CategoryName = "PDF" | "Image" | "Video" | "AI Write";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: CategoryName;
  premium?: boolean;
}

export const tools: Tool[] = [
  {
    id: "pdf-merge",
    title: "PDF Merge",
    description: "Combine PDFs",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-split",
    title: "PDF Split",
    description: "Split PDF pages",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-compress",
    title: "PDF Compress",
    description: "Reduce PDF size",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert PDF pages to images",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "img-bg-remove",
    title: "Background Remove",
    description: "Erase image background",
    icon: Image,
    category: "Image",
  },
  {
    id: "img-resize",
    title: "Image Resize",
    description: "Resize images",
    icon: Image,
    category: "Image",
  },
  {
    id: "img-compress",
    title: "Image Compress",
    description: "Reduce image file size",
    icon: Image,
    category: "Image",
  },
  {
    id: "video-compress",
    title: "Video Compress",
    description: "Reduce video size",
    icon: Video,
    category: "Video",
  },
  {
    id: "mp4-to-mp3",
    title: "MP4 to MP3",
    description: "Extract audio from video",
    icon: Video,
    category: "Video",
  },
  {
    id: "paragraph-rewriter",
    title: "Paragraph Rewriter",
    description: "Rewrite text with AI",
    icon: PenLine,
    category: "AI Write",
  },
];
