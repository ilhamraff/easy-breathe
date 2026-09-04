import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUpload, FiX, FiArrowLeft } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getArticleById,
  createArticle,
  updateArticle,
} from "@/services/articles";
import { useAuth } from "@/contexts/AuthContext";
import { showSuccessToast, showErrorToast } from "@/utils/toast";
import { ToastContainer } from "react-toastify";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote"],
    ["link"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "blockquote",
  "link",
];

function ArticleForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user, userDetails } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [existingStatus, setExistingStatus] = useState("approved");
  const [createdAt, setCreatedAt] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  // Set default author name if creating new article
  useEffect(() => {
    if (!isEditMode && !author) {
      const defaultName =
        userDetails?.firstName || userDetails?.lastName
          ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim()
          : user?.displayName || "Admin";
      setAuthor(defaultName);
    }
  }, [isEditMode, author, user, userDetails]);

  // Fetch existing article data for edit mode
  useEffect(() => {
    if (!isEditMode) return;

    async function fetchArticle() {
      try {
        const article = await getArticleById(id);
        if (!article) {
          showErrorToast("Artikel tidak ditemukan.");
          navigate("/admin/articles");
          return;
        }
        setTitle(article.title || "");
        setAuthor(article.author || "");
        setContent(article.content || "");
        setCreatedAt(article.createdAt || "");
        setExistingThumbnail(article.thumbnail || "");
        setImagePreview(article.thumbnail || "");
        setExistingStatus(article.status || "approved");
      } catch (error) {
        console.error("Failed to fetch article:", error);
        showErrorToast("Gagal memuat data artikel.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [id, isEditMode, navigate]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      showErrorToast("File harus berupa gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showErrorToast("Ukuran gambar maksimal 5MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview(isEditMode ? existingThumbnail : "");
  }

  function validate() {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Judul wajib diisi.";
    if (!author.trim()) newErrors.author = "Penulis wajib diisi.";
    // Strip HTML tags to check if content is actually empty
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent) newErrors.content = "Konten wajib diisi.";
    if (!createdAt) newErrors.createdAt = "Tanggal wajib diisi.";
    if (!isEditMode && !imageFile && !existingThumbnail) {
      newErrors.thumbnail = "Thumbnail wajib diupload.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const data = {
        title: title.trim(),
        author: author.trim(),
        content,
        createdAt,
        oldThumbnail: existingThumbnail,
        status: existingStatus || "approved",
      };

      if (isEditMode) {
        await updateArticle(id, data, imageFile);
        showSuccessToast("Artikel berhasil diperbarui.");
      } else {
        await createArticle(data, imageFile, user);
        showSuccessToast("Artikel berhasil ditambahkan.");
      }

      setTimeout(() => navigate("/admin/articles"), 800);
    } catch (error) {
      console.error("Failed to save article:", error);
      showErrorToast(
        error.code === "permission-denied"
          ? "Anda tidak memiliki izin untuk melakukan ini."
          : "Gagal menyimpan artikel. Silakan coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state for edit mode
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
          <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/articles")}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">
          {isEditMode ? "Edit Artikel" : "Tambah Artikel Baru"}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="article-title"
              className="text-sm font-medium text-slate-700"
            >
              Judul Artikel
            </label>
            <input
              id="article-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul artikel..."
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
                errors.title
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title}</span>
            )}
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="article-author"
              className="text-sm font-medium text-slate-700"
            >
              Penulis
            </label>
            <input
              id="article-author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Nama penulis..."
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
                errors.author
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.author && (
              <span className="text-xs text-red-500">{errors.author}</span>
            )}
          </div>

          {/* Created At */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="article-date"
              className="text-sm font-medium text-slate-700"
            >
              Tanggal Publikasi
            </label>
            <input
              id="article-date"
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 transition-colors focus:outline-none focus:ring-1 ${
                errors.createdAt
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-slate-200 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.createdAt && (
              <span className="text-xs text-red-500">{errors.createdAt}</span>
            )}
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Thumbnail
            </label>

            {imagePreview ? (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Preview thumbnail"
                  className="h-40 w-auto rounded-xl border border-slate-200 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                >
                  <FiX size={14} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="article-thumbnail"
                className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors hover:bg-slate-50 ${
                  errors.thumbnail
                    ? "border-red-300 bg-red-50/30"
                    : "border-slate-200"
                }`}
              >
                <FiUpload className="mb-2 text-slate-400" size={24} />
                <p className="text-sm font-medium text-slate-600">
                  Klik untuk upload gambar
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  PNG, JPG, WEBP (maks. 5MB)
                </p>
              </label>
            )}

            <input
              id="article-thumbnail"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.thumbnail && (
              <span className="text-xs text-red-500">{errors.thumbnail}</span>
            )}
          </div>

          {/* Content (Rich Text Editor) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Konten Artikel
            </label>
            <div
              className={`rounded-xl border transition-colors [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:bg-slate-50 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-0 [&_.ql-container]:text-sm [&_.ql-editor]:min-h-[200px] ${
                errors.content
                  ? "border-red-300"
                  : "border-slate-200 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500"
              }`}
            >
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Tulis konten artikel di sini..."
              />
            </div>
            {errors.content && (
              <span className="text-xs text-red-500">{errors.content}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/admin/articles")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-700 disabled:opacity-50 active:scale-[0.98]"
          >
            {submitting
              ? "Menyimpan..."
              : isEditMode
              ? "Simpan Perubahan"
              : "Publikasikan"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default ArticleForm;
