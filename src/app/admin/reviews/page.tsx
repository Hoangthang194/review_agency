"use client";

import { useState } from "react";
import Link from "next/link";
import { forexBrokersData, cryptoExchangesData, propFirmsData } from "@/data/mockData";

type BrokerType = "forex" | "crypto" | "prop";

interface BrokerListItem {
  type: BrokerType;
  slug: string;
  name: string;
  rating: number;
  reviews: number;
}

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<BrokerType | "all">("all");

  const allBrokers: BrokerListItem[] = [
    ...Object.values(forexBrokersData).map((b) => ({
      type: "forex" as BrokerType,
      slug: b.slug,
      name: b.name,
      rating: b.rating,
      reviews: b.reviews,
    })),
    ...Object.values(cryptoExchangesData).map((b) => ({
      type: "crypto" as BrokerType,
      slug: b.slug,
      name: b.name,
      rating: b.rating,
      reviews: b.reviews,
    })),
    ...Object.values(propFirmsData).map((b) => ({
      type: "prop" as BrokerType,
      slug: b.slug,
      name: b.name,
      rating: b.rating,
      reviews: b.reviews,
    })),
  ];

  const filteredBrokers = allBrokers.filter((broker) => {
    const matchesSearch = broker.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || broker.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeLabel = (type: BrokerType) => {
    switch (type) {
      case "forex":
        return "Forex Broker";
      case "crypto":
        return "Crypto Exchange";
      case "prop":
        return "Prop Firm";
    }
  };

  const getTypeColor = (type: BrokerType) => {
    switch (type) {
      case "forex":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "crypto":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "prop":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
    }
  };

  const getTypeHref = (type: BrokerType, slug: string) => {
    switch (type) {
      case "forex":
        return `/admin/forex-brokers/${slug}`;
      case "crypto":
        return `/admin/crypto-exchanges/${slug}`;
      case "prop":
        return `/admin/prop-firms/${slug}`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and edit all broker reviews
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
        >
          <span className="material-icons-outlined">add</span>
          Add New Review
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                search
              </span>
              <input
                type="text"
                placeholder="Search brokers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                filterType === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("forex")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                filterType === "forex"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Forex
            </button>
            <button
              onClick={() => setFilterType("crypto")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                filterType === "crypto"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Crypto
            </button>
            <button
              onClick={() => setFilterType("prop")}
              className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                filterType === "prop"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Prop Firms
            </button>
          </div>
        </div>
      </div>

      {/* Brokers List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reviews
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBrokers.map((broker) => (
                <tr
                  key={`${broker.type}-${broker.slug}`}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                        <span className="material-icons-outlined text-blue-600 dark:text-blue-400">
                          account_balance
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {broker.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(
                        broker.type
                      )}`}
                    >
                      {getTypeLabel(broker.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {broker.rating}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`material-icons-outlined text-sm ${
                              i < Math.round(broker.rating)
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          >
                            star
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {broker.reviews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={getTypeHref(broker.type, broker.slug)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        <span className="material-icons-outlined">edit</span>
                      </Link>
                      <button className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                        <span className="material-icons-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBrokers.length === 0 && (
          <div className="p-12 text-center">
            <span className="material-icons-outlined text-gray-400 text-5xl mb-4">
              search_off
            </span>
            <p className="text-gray-600 dark:text-gray-400">
              No brokers found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

