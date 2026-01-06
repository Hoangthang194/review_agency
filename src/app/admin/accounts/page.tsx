"use client";

import { useState } from "react";

interface Account {
  id: string;
  email: string;
  name: string;
  role: string;
  status: "active" | "locked" | "suspended";
  createdAt: string;
  lastLogin: string;
}

// Mock data - replace with actual API calls
const initialAccounts: Account[] = [
  {
    id: "1",
    email: "admin@review.com",
    name: "Admin User",
    role: "Administrator",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-09-20",
  },
  {
    id: "2",
    email: "editor@review.com",
    name: "Editor User",
    role: "Editor",
    status: "active",
    createdAt: "2024-02-20",
    lastLogin: "2024-09-19",
  },
  {
    id: "3",
    email: "writer@review.com",
    name: "Writer User",
    role: "Writer",
    status: "locked",
    createdAt: "2024-03-10",
    lastLogin: "2024-09-18",
  },
  {
    id: "4",
    email: "reviewer@review.com",
    name: "Reviewer User",
    role: "Reviewer",
    status: "active",
    createdAt: "2024-04-05",
    lastLogin: "2024-09-20",
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState<Partial<Account>>({
    email: "",
    name: "",
    role: "Editor",
    status: "active",
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || account.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddNew = () => {
    setSelectedAccount(null);
    setFormData({
      email: "",
      name: "",
      role: "Editor",
      status: "active",
    });
    setShowForm(true);
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setFormData(account);
    setShowForm(true);
  };

  const handleLockUnlock = (account: Account) => {
    setAccounts(
      accounts.map((a) =>
        a.id === account.id
          ? {
              ...a,
              status: a.status === "locked" ? "active" : "locked",
            }
          : a
      )
    );
  };

  const handleChangePassword = (account: Account) => {
    setSelectedAccount(account);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setShowPasswordDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAccount) {
      // Update existing account
      setAccounts(
        accounts.map((a) =>
          a.id === selectedAccount.id ? { ...formData, id: selectedAccount.id } as Account : a
        )
      );
    } else {
      // Add new account
      const newAccount: Account = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
      } as Account;
      setAccounts([...accounts, newAccount]);
    }
    setShowForm(false);
    setSelectedAccount(null);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }
    // Update password logic here
    alert("Password changed successfully!");
    setShowPasswordDialog(false);
    setPasswordData({ newPassword: "", confirmPassword: "" });
    setSelectedAccount(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "locked":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "suspended":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrator":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      case "Editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Account Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-icons-outlined">person_add</span>
          Create Account
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
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {["all", "active", "locked", "suspended"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${
                  selectedStatus === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                        <span className="material-icons-outlined text-blue-600 dark:text-blue-400">
                          person
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {account.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {account.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(
                        account.role
                      )}`}
                    >
                      {account.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        account.status
                      )}`}
                    >
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {account.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {account.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(account)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                        title="Edit"
                      >
                        <span className="material-icons-outlined text-sm">edit</span>
                      </button>
                      <button
                        onClick={() => handleChangePassword(account)}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 p-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded"
                        title="Change Password"
                      >
                        <span className="material-icons-outlined text-sm">lock_reset</span>
                      </button>
                      <button
                        onClick={() => handleLockUnlock(account)}
                        className={`p-2 rounded ${
                          account.status === "locked"
                            ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20"
                            : "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                        }`}
                        title={account.status === "locked" ? "Unlock" : "Lock"}
                      >
                        <span className="material-icons-outlined text-sm">
                          {account.status === "locked" ? "lock_open" : "lock"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAccounts.length === 0 && (
          <div className="p-12 text-center">
            <span className="material-icons-outlined text-gray-400 text-5xl mb-4">
              person_off
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              No accounts found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Account Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedAccount ? "Edit Account" : "Create New Account"}
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
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Editor">Editor</option>
                  <option value="Writer">Writer</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Administrator">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "active" | "locked" | "suspended",
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="locked">Locked</option>
                  <option value="suspended">Suspended</option>
                </select>
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
                  {selectedAccount ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      {showPasswordDialog && selectedAccount && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Change Password
              </h2>
              <button
                onClick={() => {
                  setShowPasswordDialog(false);
                  setSelectedAccount(null);
                }}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Changing password for: <strong>{selectedAccount.email}</strong>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  minLength={8}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Re-enter password"
                />
              </div>
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordDialog(false);
                    setSelectedAccount(null);
                  }}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

