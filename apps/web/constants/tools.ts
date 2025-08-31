import { FileText, Image, Video, PenLine, Folder } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export type CategoryName = "PDF" | "Image" | "Video" | "AI Write" | "File";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: CategoryName;
}

export const tools: Tool[] = [
  {
    id: "pdf-compress",
    title: "PDF Compress",
    description: "Reduce PDF size",
    icon: FileText,
    category: "PDF"
  },
  {
    id: "pdf-merge",
    title: "PDF Merge",
    description: "Combine PDFs",
    icon: FileText,
    category: "PDF"
  },
  {
    id: "img-resize",
    title: "Image Resize",
    description: "Resize images",
    icon: Image,
    category: "Image"
  },
  {
    id: "video-convert",
    title: "Video Convert",
    description: "Convert videos",
    icon: Video,
    category: "Video"
  },
  {
    id: "ai-summarize",
    title: "AI Summarize",
    description: "Summarize text",
    icon: PenLine,
    category: "AI Write"
  },
  {
    id: "file-unzip",
    title: "Unzip Files",
    description: "Extract archives",
    icon: Folder,
    category: "File"
  }
];
