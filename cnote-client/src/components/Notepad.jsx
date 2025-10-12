import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-700 bg-gray-800 p-2 flex flex-wrap gap-1">
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("bold")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("italic")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("underline")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("strike")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Strike
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1"></div>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("heading", { level: 1 })
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("heading", { level: 3 })
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("paragraph")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        P
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1"></div>

      {/* Lists */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("bulletList")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("orderedList")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        1. List
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1"></div>

      {/* Other formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("blockquote")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Quote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          editor.isActive("codeBlock")
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        Code
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1"></div>

      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="px-3 py-1 rounded text-sm font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="px-3 py-1 rounded text-sm font-medium transition-colors bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Redo
      </button>
    </div>
  );
};

export default function Notepad() {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `<p>Start writing your notes here...</p>`,
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[500px] p-4",
      },
    },
  });

  useEffect(() => {
    // Add custom styles for better formatting visibility
    const styleId = "tiptap-custom-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .ProseMirror {
          background-color: #1f2937 !important;
          color: #e5e7eb !important;
          border: 1px solid #374151 !important;
          border-radius: 0.5rem !important;
          padding: 1rem !important;
          min-height: 500px !important;
          outline: none !important;
        }
        
        .ProseMirror:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 1px #3b82f6 !important;
        }
        
        .ProseMirror h1 {
          font-size: 2.25rem !important;
          font-weight: 700 !important;
          line-height: 2.5rem !important;
          margin-top: 2rem !important;
          margin-bottom: 1rem !important;
          color: #f9fafb !important;
        }
        
        .ProseMirror h2 {
          font-size: 1.875rem !important;
          font-weight: 600 !important;
          line-height: 2.25rem !important;
          margin-top: 1.5rem !important;
          margin-bottom: 0.75rem !important;
          color: #f9fafb !important;
        }
        
        .ProseMirror h3 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          line-height: 2rem !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.5rem !important;
          color: #f9fafb !important;
        }
        
        .ProseMirror p {
          margin-bottom: 1rem !important;
          line-height: 1.625 !important;
          color: #e5e7eb !important;
        }
        
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem !important;
          margin-top: 1rem !important;
          margin-bottom: 1rem !important;
        }
        
        .ProseMirror ul {
          list-style-type: disc !important;
        }
        
        .ProseMirror ol {
          list-style-type: decimal !important;
        }
        
        .ProseMirror li {
          margin-bottom: 0.5rem !important;
          color: #e5e7eb !important;
          display: list-item !important;
        }
        
        .ProseMirror blockquote {
          border-left: 4px solid #3b82f6 !important;
          margin: 1.5rem 0 !important;
          padding-left: 1rem !important;
          color: #9ca3af !important;
          font-style: italic !important;
          background-color: #111827 !important;
          border-radius: 0 0.375rem 0.375rem 0 !important;
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        
        .ProseMirror blockquote p {
          color: #9ca3af !important;
          margin-bottom: 0 !important;
        }
        
        .ProseMirror pre {
          background-color: #111827 !important;
          color: #e5e7eb !important;
          padding: 1rem !important;
          border-radius: 0.375rem !important;
          margin: 1rem 0 !important;
          overflow-x: auto !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
          border: 1px solid #374151 !important;
        }
        
        .ProseMirror code {
          background-color: #111827 !important;
          color: #e5e7eb !important;
          padding: 0.125rem 0.25rem !important;
          border-radius: 0.25rem !important;
          font-size: 0.875em !important;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace !important;
        }
        
        .ProseMirror strong {
          font-weight: 700 !important;
          color: #f9fafb !important;
        }
        
        .ProseMirror em {
          font-style: italic !important;
        }
        
        .ProseMirror u {
          text-decoration: underline !important;
        }
        
        .ProseMirror s {
          text-decoration: line-through !important;
        }
        
        .ProseMirror a {
          color: #60a5fa !important;
          text-decoration: underline !important;
        }
        
        .ProseMirror a:hover {
          color: #93c5fd !important;
        }
        
        /* Ensure first element doesn't have top margin */
        .ProseMirror > *:first-child {
          margin-top: 0 !important;
        }
        
        /* Ensure last element doesn't have bottom margin */
        .ProseMirror > *:last-child {
          margin-bottom: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <MenuBar editor={editor} />
        <div className="p-6">
          <EditorContent editor={editor} className="tiptap-editor" />
        </div>
      </div>
    </div>
  );
}
