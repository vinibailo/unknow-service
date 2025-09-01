import { FileText, Image, Video, PenLine, Files } from "lucide-react";
import { type LucideIcon } from "lucide-react";

export type CategoryName =
  | "PDF"
  | "Image"
  | "Video"
  | "File Conversion"
  | "AI Write";

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
  {
    id: "pdf-extract-images",
    title: "PDF Extract Images",
    description: "Save images from PDF",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-extract-text",
    title: "PDF Extract Text",
    description: "Get text from PDFs",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-reorder",
    title: "PDF Reorder",
    description: "Rearrange PDF pages",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-protect",
    title: "PDF Protect",
    description: "Add password to PDF",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "pdf-unlock",
    title: "PDF Unlock",
    description: "Remove PDF password",
    icon: FileText,
    category: "PDF",
  },
  {
    id: "img-collage",
    title: "Image Collage",
    description: "Create image collages",
    icon: Image,
    category: "Image",
  },
  {
    id: "img-watermark",
    title: "Image Watermark",
    description: "Add watermarks to images",
    icon: Image,
    category: "Image",
  },
  {
    id: "img-format-convert",
    title: "Image Format Convert",
    description: "Convert image formats",
    icon: Image,
    category: "Image",
  },
  {
    id: "video-to-gif",
    title: "Video to GIF",
    description: "Convert video clips to GIF",
    icon: Video,
    category: "Video",
  },
  {
    id: "video-resize",
    title: "Video Resize",
    description: "Resize video dimensions",
    icon: Video,
    category: "Video",
  },
  {
    id: "csv-to-excel",
    title: "CSV to Excel",
    description: "Convert CSV to Excel",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "excel-to-csv",
    title: "Excel to CSV",
    description: "Convert Excel to CSV",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "csv-to-json",
    title: "CSV to JSON",
    description: "Convert CSV to JSON",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "json-to-csv",
    title: "JSON to CSV",
    description: "Convert JSON to CSV",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "csv-to-xml",
    title: "CSV to XML",
    description: "Convert CSV to XML",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "xml-to-csv",
    title: "XML to CSV",
    description: "Convert XML to CSV",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "excel-to-json",
    title: "Excel to JSON",
    description: "Convert Excel to JSON",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "json-to-excel",
    title: "JSON to Excel",
    description: "Convert JSON to Excel",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "excel-to-xml",
    title: "Excel to XML",
    description: "Convert Excel to XML",
    icon: Files,
    category: "File Conversion",
  },
  {
    id: "xml-to-excel",
    title: "XML to Excel",
    description: "Convert XML to Excel",
    icon: Files,
    category: "File Conversion",
  },
];
