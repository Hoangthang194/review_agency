"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LexicalEditor } from "@/components/admin/LexicalEditor";

type ReviewType = "forex" | "crypto" | "prop";

export default function AdminNewReviewPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reviewType, setReviewType] = useState<ReviewType>("forex");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(0);
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [logoBg, setLogoBg] = useState("bg-black");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [overview, setOverview] = useState("");
  const [pros, setPros] = useState<string[]>([]);
  const [proInput, setProInput] = useState("");
  const [cons, setCons] = useState<string[]>([]);
  const [conInput, setConInput] = useState("");
  const [contentHtml, setContentHtml] = useState("");

  // Stats fields
  const [stats, setStats] = useState([
    { icon: "payments", title: "Min Deposit", value: "" },
    { icon: "percent", title: "Effective Interest", value: "" },
    { icon: "schedule", title: "Running Time", value: "" },
  ]);

  // Terms fields
  const [terms, setTerms] = useState([
    { label: "Loan Amount:", value: "" },
    { label: "Repayment Period:", value: "" },
    { label: "Effective Interest:", value: "" },
  ]);

  // Key Info fields
  const [keyInfo, setKeyInfo] = useState([
    { label: "Effective Interest from:", value: "" },
    { label: "Minimum Loan Amount:", value: "" },
  ]);

  // Features
  const [features, setFeatures] = useState([
    { title: "", description: "" },
  ]);

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from name
  useEffect(() => {
    if (name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
  }, [name]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size must not exceed 5MB");
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Upload failed");
      }

      setUploadedImageUrl(result.url);
      // Auto-set to logo if logoUrl is empty
      if (!logoUrl) {
        setLogoUrl(result.url);
      }
      setUploadError(null);
    } catch (err: any) {
      setUploadError(err.message || "Error uploading image");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const insertImageUrl = (field: "logo" | "image", url?: string) => {
    const imageUrlToUse = url || uploadedImageUrl;
    if (imageUrlToUse) {
      if (field === "logo") {
        setLogoUrl(imageUrlToUse);
      } else if (field === "image") {
        setImageUrl(imageUrlToUse);
      }
      setShowImagePicker(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const addPro = () => {
    if (proInput.trim() && !pros.includes(proInput.trim())) {
      setPros([...pros, proInput.trim()]);
      setProInput("");
    }
  };

  const removePro = (pro: string) => {
    setPros(pros.filter((p) => p !== pro));
  };

  const addCon = () => {
    if (conInput.trim() && !cons.includes(conInput.trim())) {
      setCons([...cons, conInput.trim()]);
      setConInput("");
    }
  };

  const removeCon = (con: string) => {
    setCons(cons.filter((c) => c !== con));
  };

  const addStat = () => {
    setStats([...stats, { icon: "info", title: "", value: "" }]);
  };

  const updateStat = (index: number, field: "icon" | "title" | "value", value: string) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const addTerm = () => {
    setTerms([...terms, { label: "", value: "" }]);
  };

  const updateTerm = (index: number, field: "label" | "value", value: string) => {
    const newTerms = [...terms];
    newTerms[index] = { ...newTerms[index], [field]: value };
    setTerms(newTerms);
  };

  const removeTerm = (index: number) => {
    setTerms(terms.filter((_, i) => i !== index));
  };

  const addKeyInfo = () => {
    setKeyInfo([...keyInfo, { label: "", value: "" }]);
  };

  const updateKeyInfo = (index: number, field: "label" | "value", value: string) => {
    const newKeyInfo = [...keyInfo];
    newKeyInfo[index] = { ...newKeyInfo[index], [field]: value };
    setKeyInfo(newKeyInfo);
  };

  const removeKeyInfo = (index: number) => {
    setKeyInfo(keyInfo.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    setFeatures([...features, { title: "", description: "" }]);
  };

  const updateFeature = (
    index: number,
    field: "title" | "description",
    value: string
  ) => {
    const newFeatures = [...features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFeatures(newFeatures);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !slug || !description) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const reviewData = {
        slug,
        name,
        rating,
        reviews,
        description,
        logo: logoUrl,
        logoBg,
        tags,
        stats: stats.filter((s) => s.title && s.value),
        terms: terms.filter((t) => t.label && t.value),
        keyInfo: keyInfo.filter((k) => k.label && k.value),
        overview,
        pros,
        cons,
        features: features.filter((f) => f.title && f.description),
        content: contentHtml || null,
        averageRating: rating,
        ratingBreakdown: [
          { stars: 5, pct: "85%" },
          { stars: 4, pct: "10%" },
          { stars: 3, pct: "3%" },
          { stars: 2, pct: "1%" },
          { stars: 1, pct: "1%" },
        ],
        comments: [],
        advantages: pros,
        disadvantages: cons,
      };

      // Save to localStorage for now (replace with actual API call)
      const existingData =
        JSON.parse(localStorage.getItem(`${reviewType}BrokersData`) || "{}") || {};
      existingData[slug] = reviewData;
      localStorage.setItem(
        `${reviewType}BrokersData`,
        JSON.stringify(existingData)
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      router.push(`/admin/reviews`);
    } catch (err: any) {
      setError(err.message || "Error saving review");
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            New Review
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Create a new broker/exchange/prop firm review. Detailed content is edited using the Lexical editor below.
          </p>
        </div>
        <Link
          href="/admin/reviews"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 inline-flex items-center gap-1"
        >
          <span className="material-icons-outlined text-sm">arrow_back</span>
          Back to Reviews
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-[400px,minmax(0,1fr)] gap-8 items-start"
      >
        {/* Left: Meta fields */}
        <div className="space-y-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Review Type *
            </label>
            <select
              value={reviewType}
              onChange={(e) => setReviewType(e.target.value as ReviewType)}
              required
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="forex">Forex Broker</option>
              <option value="crypto">Crypto Exchange</option>
              <option value="prop">Prop Firm</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter broker/exchange name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="URL-friendly slug"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating (1-5) *
            </label>
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              required
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Reviews
            </label>
            <input
              type="number"
              min="0"
              value={reviews}
              onChange={(e) => setReviews(parseInt(e.target.value))}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Overview
            </label>
            <textarea
              rows={4}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed overview"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Logo URL"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="logo-upload"
              />
              <label
                htmlFor="logo-upload"
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
              >
                <span className="material-icons-outlined text-sm">
                  {uploading ? "hourglass_empty" : "upload"}
                </span>
                {uploading ? "Uploading..." : "Upload"}
              </label>
              <button
                type="button"
                onClick={() => setShowImagePicker(true)}
                className="inline-flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <span className="material-icons-outlined text-sm">image</span>
                Pick
              </button>
            </div>
            {logoUrl && (
              <div className="mt-2 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 max-w-xs">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="w-full h-auto max-h-24 object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo Background
            </label>
            <input
              type="text"
              value={logoBg}
              onChange={(e) => setLogoBg(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., bg-black, bg-[#001D5F]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add tag and press Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    <span className="material-icons-outlined text-sm">close</span>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Pros
              </label>
              <button
                type="button"
                onClick={addPro}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {pros.map((pro, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => {
                      const newPros = [...pros];
                      newPros[index] = e.target.value;
                      setPros(newPros);
                    }}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removePro(pro)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cons
              </label>
              <button
                type="button"
                onClick={addCon}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {cons.map((con, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => {
                      const newCons = [...cons];
                      newCons[index] = e.target.value;
                      setCons(newCons);
                    }}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeCon(con)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stats
              </label>
              <button
                type="button"
                onClick={addStat}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {stats.map((stat, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => updateStat(index, "icon", e.target.value)}
                    placeholder="Icon"
                    className="w-24 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={stat.title}
                    onChange={(e) => updateStat(index, "title", e.target.value)}
                    placeholder="Title"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Terms Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Terms
              </label>
              <button
                type="button"
                onClick={addTerm}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {terms.map((term, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={term.label}
                    onChange={(e) => updateTerm(index, "label", e.target.value)}
                    placeholder="Label"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={term.value}
                    onChange={(e) => updateTerm(index, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeTerm(index)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Key Info Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Key Info
              </label>
              <button
                type="button"
                onClick={addKeyInfo}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {keyInfo.map((info, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={info.label}
                    onChange={(e) => updateKeyInfo(index, "label", e.target.value)}
                    placeholder="Label"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={info.value}
                    onChange={(e) => updateKeyInfo(index, "value", e.target.value)}
                    placeholder="Value"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeKeyInfo(index)}
                    className="text-red-600 dark:text-red-400"
                  >
                    <span className="material-icons-outlined text-sm">delete</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                + Add
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => updateFeature(index, "title", e.target.value)}
                    placeholder="Feature Title"
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) => updateFeature(index, "description", e.target.value)}
                    placeholder="Feature Description"
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-2 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Review"}
            </button>
          </div>
        </div>

        {/* Right: Lexical editor */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                Detailed Content
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Edit detailed content with full toolbar, blocks, tables, media...
              </p>
            </div>
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
              <LexicalEditor onChange={setContentHtml} />
            </div>
          </div>
        </div>
      </form>

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowImagePicker(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Choose Image
              </h2>
              <button
                onClick={() => setShowImagePicker(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="text-center py-12">
                <span className="material-icons-outlined text-4xl text-gray-300 dark:text-gray-600 mb-2">
                  image
                </span>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Image picker functionality - to be implemented
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You can paste image URL directly in the input fields above
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                type="button"
                onClick={() => setShowImagePicker(false)}
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

