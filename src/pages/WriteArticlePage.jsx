import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiUpload, FiX, FiArrowLeft, FiUser, FiInfo, FiCheckCircle } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAuth } from "@/contexts/AuthContext";
import {
  getArticleById,
  submitArticleAsUser,
  updateArticleAsUser,
} from "@/services/articles";
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

function WriteArticlePage() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user, userDetails } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [rejectionNote, setRejectionNote] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEditMode);

  const authorDisplayName =
    (userDetails?.firstName || userDetails?.lastName)
      ? `${userDetails.firstName || ""} ${userDetails.lastName || ""}`.trim()
      : user?.displayName || user?.email?.split("@")[0] || "Kontributor";

  // Fetch existing article if in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    async function fetchExistingArticle() {
      try {
        const article = await getArticleById(id);
        if (!article) {
          showErrorToast("Artikel tidak ditemukan.");
          navigate("/kontribusi/artikel-saya");
          return;
        }

        // Check ownership
        if (article.authorId && user?.uid && article.authorId !== user.uid) {
          showErrorToast("Anda tidak memiliki akses untuk mengedit artikel ini.");
          navigate("/kontribusi/artikel-saya");
          return;
        }

        // Cannot edit approved articles
        if (article.status === "approved") {
          showErrorToast("Artikel yang telah dipublikasikan tidak dapat diedit lagi.");
          navigate("/kontribusi/artikel-saya");
          return;
        }

        setTitle(article.title || "");
        setContent(article.content || "");
        setExistingThumbnail(article.thumbnail || "");
        setImagePreview(article.thumbnail || "");
        if (article.status === "rejected" && article.rejectionReason) {
          setRejectionNote(article.rejectionReason);
        }
      } catch (error) {
        console.error("Failed to fetch article for edit:", error);
        showErrorToast("Gagal memuat data artikel.");
        navigate("/kontribusi/artikel-saya");
      } finally {
        setLoading(false);
      }
    }

    fetchExistingArticle();
  }, [id, isEditMode, user?.uid, navigate]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

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
    if (!title.trim()) newErrors.title = "Judul artikel wajib diisi.";
    const strippedContent = content.replace(/<[^>]*>/g, "").trim();
    if (!strippedContent) newErrors.content = "Konten artikel wajib diisi.";
    if (!isEditMode && !imageFile && !existingThumbnail) {
      newErrors.thumbnail = "Thumbnail gambar wajib diunggah.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (isEditMode) {
        const updateData = {
          title: title.trim(),
          content,
          oldThumbnail: existingThumbnail,
        };
        await updateArticleAsUser(id, updateData, imageFile, user);
        showSuccessToast("Artikel Anda telah diperbarui dan sedang menunggu persetujuan admin.");
      } else {
        const articleData = {
          title: title.trim(),
          content,
          author: authorDisplayName,
        };
        await submitArticleAsUser(articleData, imageFile, user, userDetails);
        showSuccessToast("Artikel Anda telah dikirim dan sedang menunggu persetujuan admin.");
      }

      setTimeout(() => {
        navigate("/kontribusi/artikel-saya");
      }, 1200);
    } catch (error) {
      console.error("Failed to submit article:", error);
      showErrorToast(
        error.code === "permission-denied"
          ? "Izin ditolak. Pastikan Anda telah masuk dengan akun yang benar."
          : "Gagal mengirimkan artikel. Silakan coba kembali."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-32 animate-pulse rounded-xl bg-slate-100" />
            <div className="h-48 animate-pulse rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Navigation & Header */}
        <div className="mb-6">
          <Link
            to="/kontribusi/artikel-saya"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FiArrowLeft size={16} />
            Kembali ke Artikel Saya
          </Link>
          <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {isEditMode ? "Edit Artikel Kontribusi" : "Tulis Artikel Kontribusi"}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Bagikan cerita inspiratif, tips sehat, atau edukasi berhenti merokok Anda.
            Artikel akan ditinjau oleh tim kurasi Easy Breathe sebelum dipublikasikan.
          </p>
        </div>

        {/* Previous rejection note if present */}
        {rejectionNote && (
          <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50/80 p-4 sm:p-5">
            <div className="flex gap-3">
              <FiInfo className="mt-0.5 shrink-0 text-rose-600" size={18} />
              <div>
                <h4 className="text-sm font-semibold text-rose-900">
                  Catatan Review Sebelumnya dari Admin:
                </h4>
                <p className="mt-1 text-sm text-rose-700">{rejectionNote}</p>
                <p className="mt-2 text-xs text-rose-600">
                  Silakan perbaiki artikel sesuai catatan di atas. Saat disimpan, artikel akan dikirimkan kembali untuk peninjauan ulang.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            {/* Author info card (Read-only preview) */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700 font-semibold">
                  <FiUser size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Penulis Artikel</p>
                  <p className="text-sm font-semibold text-slate-800">{authorDisplayName}</p>
                </div>
              </div>
              <span className="text-xs bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-2.5 py-1 font-medium">
                Kontributor
              </span>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="article-title" className="text-sm font-semibold text-slate-800">
                Judul Artikel <span className="text-rose-500">*</span>
              </label>
              <input
                id="article-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: 5 Strategi Efektif Menghindari Godaan Merokok di Minggu Pertama"
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-1 ${
                  errors.title
                    ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500"
                    : "border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                }`}
              />
              {errors.title && (
                <span className="text-xs font-medium text-rose-500">{errors.title}</span>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Gambar Sampul / Thumbnail <span className="text-rose-500">*</span>
              </label>

              {imagePreview ? (
                <div className="relative inline-block w-full max-w-md">
                  <img
                    src={imagePreview}
                    alt="Preview thumbnail"
                    className="aspect-video w-full rounded-xl border border-slate-200 object-cover shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 rounded-full bg-rose-600 p-1.5 text-white shadow-md transition-colors hover:bg-rose-700"
                    title="Ganti gambar"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="user-thumbnail-input"
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 transition-colors hover:bg-teal-50/40 ${
                    errors.thumbnail
                      ? "border-rose-300 bg-rose-50/30"
                      : "border-slate-200 bg-slate-50/50"
                  }`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600 mb-3">
                    <FiUpload size={22} />
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    Klik untuk memilih foto sampul
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Mendukung JPG, PNG, WEBP (maks. 5MB). Rekomendasi rasio 16:9
                  </p>
                </label>
              )}

              <input
                id="user-thumbnail-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {errors.thumbnail && (
                <span className="text-xs font-medium text-rose-500">{errors.thumbnail}</span>
              )}
            </div>

            {/* Content with Rich Text Editor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-800">
                Isi Konten Artikel <span className="text-rose-500">*</span>
              </label>
              <div
                className={`rounded-xl border transition-colors [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:bg-slate-50 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-0 [&_.ql-container]:text-sm [&_.ql-editor]:min-h-[260px] ${
                  errors.content
                    ? "border-rose-300"
                    : "border-slate-200 focus-within:border-teal-500 focus-within:ring-1 focus-within:ring-teal-500"
                }`}
              >
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Tuliskan pengalaman, riset, atau panduan Anda di sini secara lengkap..."
                />
              </div>
              {errors.content && (
                <span className="text-xs font-medium text-rose-500">{errors.content}</span>
              )}
            </div>

            {/* Submission notice */}
            <div className="rounded-xl bg-teal-50/60 border border-teal-100 p-4 flex gap-3 items-start">
              <FiCheckCircle className="text-teal-600 shrink-0 mt-0.5" size={18} />
              <div className="text-xs text-teal-800 leading-relaxed">
                <p className="font-semibold">Informasi Penayangan</p>
                <p className="mt-0.5 text-teal-700">
                  Setelah dikirim, status artikel akan menjadi <strong>Menunggu Review</strong>. Tim kurator kami akan memeriksa kualitas konten sebelum disetujui untuk tayang di halaman publik.
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/kontribusi/artikel-saya")}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-700 disabled:opacity-50 active:scale-[0.98]"
            >
              {submitting
                ? "Mengirim..."
                : isEditMode
                ? "Perbarui & Kirim Ulang"
                : "Kirimkan Artikel"}
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}

export default WriteArticlePage;
