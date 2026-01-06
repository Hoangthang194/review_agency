"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { forexBrokersData, cryptoExchangesData, propFirmsData } from "@/data/mockData";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBrokers: 0,
    totalCrypto: 0,
    totalPropFirms: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const forexCount = Object.keys(forexBrokersData).length;
    const cryptoCount = Object.keys(cryptoExchangesData).length;
    const propFirmsCount = Object.keys(propFirmsData).length;
    
    const totalReviews = 
      Object.values(forexBrokersData).reduce((sum, broker) => sum + broker.reviews, 0) +
      Object.values(cryptoExchangesData).reduce((sum, broker) => sum + broker.reviews, 0) +
      Object.values(propFirmsData).reduce((sum, broker) => sum + broker.reviews, 0);

    setStats({
      totalBrokers: forexCount,
      totalCrypto: cryptoCount,
      totalPropFirms: propFirmsCount,
      totalReviews,
    });
  }, []);

  const statCards = [
    {
      title: "Forex Brokers",
      value: stats.totalBrokers,
      icon: "trending_up",
      color: "bg-blue-500",
      href: "/admin/forex-brokers",
    },
    {
      title: "Crypto Exchanges",
      value: stats.totalCrypto,
      icon: "currency_bitcoin",
      color: "bg-yellow-500",
      href: "/admin/crypto-exchanges",
    },
    {
      title: "Prop Firms",
      value: stats.totalPropFirms,
      icon: "business",
      color: "bg-green-500",
      href: "/admin/prop-firms",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews.toLocaleString(),
      icon: "rate_review",
      color: "bg-purple-500",
      href: "/admin/reviews",
    },
  ];

  const recentBrokers = [
    ...Object.values(forexBrokersData).slice(0, 3),
    ...Object.values(cryptoExchangesData).slice(0, 2),
    ...Object.values(propFirmsData).slice(0, 1),
  ].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the admin dashboard. Manage your reviews and brokers.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            key={index}
            href={stat.href}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-gray-200 dark:border-gray-700 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} w-14 h-14 rounded-xl flex items-center justify-center`}>
                <span className="material-icons-outlined text-white text-2xl">
                  {stat.icon}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Brokers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Recent Reviews
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentBrokers.map((broker, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <span className="material-icons-outlined text-blue-600 dark:text-blue-400">
                      account_balance
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {broker.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {broker.reviews.toLocaleString()} reviews • Rating: {broker.rating}/5
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
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
                  <Link
                    href={`/admin/reviews/${broker.slug}`}
                    className="ml-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    <span className="material-icons-outlined">chevron_right</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/forex-brokers"
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="material-icons-outlined text-2xl">trending_up</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Manage Forex Brokers</h3>
              <p className="text-blue-100 text-sm">Add or edit brokers</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/crypto-exchanges"
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="material-icons-outlined text-2xl">currency_bitcoin</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Manage Crypto Exchanges</h3>
              <p className="text-yellow-100 text-sm">Add or edit exchanges</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/prop-firms"
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="material-icons-outlined text-2xl">business</span>
            </div>
            <div>
              <h3 className="font-bold text-lg">Manage Prop Firms</h3>
              <p className="text-green-100 text-sm">Add or edit firms</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

