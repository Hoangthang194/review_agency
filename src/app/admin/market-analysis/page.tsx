"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Article {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  category: string;
  excerpt: string;
}

// Mock data - replace with actual API calls
const initialArticles: Article[] = [
  {
    id: "1",
    title: "Weekly Cryptocurrency Trends",
    slug: "weekly-cryptocurrency-trends",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJv3_6G5ci1XBQYHtf8xEiKUBevUp0y66ohqpviv6VikBgHNCvSJ8xlyY65avg27RJFoEbUSv8fkcKMYrpVn9eAl1oM7ZQVpztxlJ_Qx9tXMM3GLNRT2cGbS23XwZ9cx1Jfvc5LJjzFJqy6gL3lybcre8JpZBxUb5DI_ST8Yko3UagiP8g5c1WiXy9v7driNMDS0VLRqg3cMuYdmGvumVxDhKydkhcPgrBLpjAIUb0IzVQPXLFWuHy9635VFQNZ_OAM4J7MI7PQmg",
    date: "August 24, 2024",
    category: "Crypto Market",
    excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
  },
  {
    id: "2",
    title: "Stock Market Weekly Recap",
    slug: "stock-market-recap",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwt21mm-bKrvservJfe0Djes7al57sPK17cD02Pg8d1eD3N-zoImzbRem4c4AW4pmphMvtZGbXokBwX6HULoTbjduOItLYxPJNGvitGgeFVx2tQ_n1SgfVqwBoqIUkcPBeYX8cvQJlRj-0FCqa0DQgOf2ShY-53n44MIM99urWFANSvNFfG4tpCPTEGefh8MQkZTREohH7Q2dful3vK_c7tqOuaDVAvpd9ZnzO3zXH5DW2GZgSs5Xwc5LEl-oyvpy_udnlWtyriUE",
    date: "August 24, 2024",
    category: "Stock Market",
    excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
  },
  {
    id: "3",
    title: "Weekly Forex Market Insights",
    slug: "weekly-forex-insights",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOwo-y4r1IFVgPgT7iin9SviOUrS-78hJnx7nS8J3tVtChl7EW2ZMEAFOLpRgaZaaxqVDzqZP1O01_sAYoU1Xaw3ExT86mVVl1PBEwsw_PojXUU6A08w-FmpxcwnRyZUSK8I07Lr5hf_YCL2ULsYwBmkYMj0TBEz5Af8cvrSzsWT_EljYs9_iJZFl1PyrS4xyYs4hbCrIPXlFoxNexGfkC7dU5fkqgBZGp9Xa3DBzW1CSZ6zCou9bnqbSCV3p4Lf3vqY3FHUBNjEQ",
    date: "August 24, 2024",
    category: "Forex Trading",
    excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
  },
  {
    id: "4",
    title: "Top Social Traders of the Week",
    slug: "top-social-traders",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYJnyyVP1P9uNTxJXg-NLgcQPiaenVNCp0RGWzIqFQjbBfzEx8hwXUfj3-B5sg-xKPnO0W4OoWjkhpOGBff3scF5eBf5qtDBm5Oj99DodhkAZpLOHbuIiT2C9kEhW-oJgiKTjoe1YMnkxI-u1HlBtHqYKr5KtWX9vNn40DHKoBYPQ-qMIifRpysAioU2iyzmNfF9lokvQZJmPzYFHG_3GkuNaFdkUeZ4ntSl-qTTmuXkq06Rw9Ms8dvZKdZ9nDfsU8PThbnblefDE",
    date: "August 24, 2024",
    category: "Social Trading",
    excerpt: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...",
  },
];

export default function MarketAnalysisPage() {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState<Partial<Article>>({
    title: "",
    slug: "",
    image: "",
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    category: "",
    excerpt: "",
  });

  const categories = ["all", "Crypto Market", "Stock Market", "Forex Trading", "Social Trading"];

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (article: Article) => {
    setArticleToDelete(article);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (articleToDelete) {
      setArticles(articles.filter((a) => a.id !== articleToDelete.id));
      setShowDeleteDialog(false);
      setArticleToDelete(null);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setFormData(article);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      image: "",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      category: "",
      excerpt: "",
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArticle) {
      // Update existing article
      setArticles(
        articles.map((a) =>
          a.id === editingArticle.id ? { ...formData, id: editingArticle.id } as Article : a
        )
      );
    } else {
      // Add new article
      const newArticle: Article = {
        ...formData,
        id: Date.now().toString(),
        slug: formData.slug || formData.title?.toLowerCase().replace(/\s+/g, "-") || "",
      } as Article;
      setArticles([...articles, newArticle]);
    }
    setShowForm(false);
    setEditingArticle(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Market Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage market analysis articles
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-icons-outlined">add</span>
          Add New Article
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Excerpt
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredArticles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {article.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {article.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {article.date}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-md">
                      {article.excerpt}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        title="Edit"
                      >
                        <span className="material-icons-outlined">edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(article)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                        title="Delete"
                      >
                        <span className="material-icons-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredArticles.length === 0 && (
          <div className="p-12 text-center">
            <span className="material-icons-outlined text-gray-400 text-5xl mb-4">
              article
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              No articles found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {editingArticle ? "Edit Article" : "Add New Article"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== "all").map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  {editingArticle ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <span className="material-icons-outlined text-red-600 dark:text-red-400">
                  warning
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Delete Article
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete <strong>{articleToDelete?.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => {
                  setShowDeleteDialog(false);
                  setArticleToDelete(null);
                }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
