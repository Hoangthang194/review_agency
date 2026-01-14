"use client";

import { useState, useEffect } from "react";
import { useScripts, createScript, updateScript, deleteScript, HeadScript } from "@/hooks";

export default function ScriptsPage() {
  const [scripts, setScripts] = useState<HeadScript[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScript, setEditingScript] = useState<HeadScript | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    scriptContent: "",
    position: 0,
    isActive: true,
  });

  const { data: fetchedScripts, loading: fetchLoading, error: fetchError, refetch } = useScripts({
    activeOnly: false,
  });

  // Update local state when fetched scripts change
  useEffect(() => {
    if (fetchedScripts) {
      setScripts(fetchedScripts);
      setLoading(false);
    }
  }, [fetchedScripts]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (editingScript) {
        await updateScript(editingScript.id, formData);
      } else {
        await createScript(formData);
      }

      setShowForm(false);
      setEditingScript(null);
      setFormData({
        name: "",
        scriptContent: "",
        position: 0,
        isActive: true,
      });
      await refetch();
    } catch (err: any) {
      setError(err.message || "Failed to save script");
      console.error("Error saving script:", err);
    }
  };

  // Handle edit
  const handleEdit = (script: HeadScript) => {
    setEditingScript(script);
    setFormData({
      name: script.name,
      scriptContent: script.script_content,
      position: script.position,
      isActive: script.is_active,
    });
    setShowForm(true);
    setError("");
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this script?")) {
      return;
    }

    setError("");

    try {
      await deleteScript(id);
      await refetch();
    } catch (err: any) {
      setError(err.message || "Failed to delete script");
      console.error("Error deleting script:", err);
    }
  };

  // Toggle active status
  const handleToggleActive = async (script: HeadScript) => {
    setError("");

    try {
      await updateScript(script.id, {
        isActive: !script.is_active,
      });
      await refetch();
    } catch (err: any) {
      setError(err.message || "Failed to update script");
      console.error("Error toggling script:", err);
    }
  };

  const isLoading = loading || fetchLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Script Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage scripts to be added to the &lt;head&gt; tag of the website
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingScript(null);
            setFormData({
              name: "",
              scriptContent: "",
              position: 0,
              isActive: true,
            });
            setError("");
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <span className="material-icons-outlined text-base">add</span>
          <span>Add Script</span>
        </button>
      </div>

      {/* Error Message */}
      {(error || fetchError) && (
        <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error || fetchError?.message || "An error occurred"}
          </p>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {editingScript ? "Edit Script" : "Add New Script"}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingScript(null);
                    setFormData({
                      name: "",
                      scriptContent: "",
                      position: 0,
                      isActive: true,
                    });
                    setError("");
                  }}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <span className="material-icons-outlined">close</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Script Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Example: Google Analytics, Facebook Pixel..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Script Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.scriptContent}
                  onChange={(e) =>
                    setFormData({ ...formData, scriptContent: e.target.value })
                  }
                  rows={10}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder='<script>...</script> or <meta>...</meta>'
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Paste the entire script code here (including script or meta tags)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        position: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Smaller numbers display first
                  </p>
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingScript(null);
                    setFormData({
                      name: "",
                      scriptContent: "",
                      position: 0,
                      isActive: true,
                    });
                    setError("");
                  }}
                  className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  {editingScript ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Scripts List */}
      {scripts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-12 text-center">
          <span className="material-icons-outlined text-4xl text-gray-300 dark:text-gray-600 mb-4">
            code
          </span>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No scripts yet. Add your first script!
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Order</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Status</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">Created</th>
                  <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {scripts.map((script) => (
                  <tr key={script.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900 dark:text-white">{script.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-md">
                        {script.script_content.substring(0, 100)}...
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{script.position}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleToggleActive(script)}
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                          script.is_active
                            ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            script.is_active ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                        {script.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">
                      {new Date(script.created_at).toLocaleDateString("en-US")}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(script)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <span className="material-icons-outlined text-base">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(script.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <span className="material-icons-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

