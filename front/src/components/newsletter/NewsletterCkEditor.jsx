import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function NewsletterCkEditor({ value = "", onChange }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-black">
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
          // ✅ on enlève tout ce qui peut tenter des uploads/Cloud
          removePlugins: [
            "ImageUpload",
            "EasyImage",
            "CKFinder",
            "CKBox",
            "CloudServices",
          ],
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          if (onChange) onChange(data);
        }}
      />
    </div>
  );
}
