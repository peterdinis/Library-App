"use client";

import { FC, useState } from "react";
import {
  BookOpen,
  Users,
  BarChart3,
  Search,
  BookText,
  ChartColumnStacked,
  BookMarked,
  Library,
  Menu,
  X,
  Users2,
} from "lucide-react";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import AdminProfileDropdown from "../AdminProfileDropdown";
import ModeToggle from "../../shared/ModeToggle";

const AdminCategories: FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between bg-indigo-700 p-4 dark:bg-stone-900 lg:hidden">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-white" />
          <h1 className="text-lg font-bold text-white">Knižnica Admin</h1>
        </div>
        <button onClick={toggleSidebar} className="text-white">
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 z-30 h-full w-64 transform bg-blue-800 p-6 text-white transition-transform duration-200 ease-in-out dark:bg-stone-900 lg:static lg:translate-x-0`}
      >
        <div className="mb-8 hidden items-center gap-2 lg:flex">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-xl font-bold">Knižnica Admin</h1>
        </div>

        <nav className="space-y-2">
          {[
            {
              id: "dashboard",
              icon: BarChart3,
              label: "Admin",
              link: "/admin",
            },
            {
              id: "books",
              icon: BookMarked,
              label: "Knihy",
              link: "/admin/books",
            },
            {
              id: "members",
              icon: Users,
              label: "Všetci používatelia",
              link: "/admin/users",
            },
            {
              id: "categories",
              icon: ChartColumnStacked,
              label: "Kategórie",
              link: "/admin/categories",
            },
            {
              id: "authors",
              icon: Users2,
              label: "Spisovatelia/ky",
              link: "/admin/authors",
            },
            {
              id: "genres",
              icon: Library,
              label: "Žánre",
              link: "/admin/genres",
            },
            {
              id: "borrowedBooks",
              icon: BookText,
              label: "Všetky objednávky",
              link: "/admin/booking",
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-600"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <Link href={item.link} className="whitespace-nowrap">
                {item.label}
              </Link>
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)] min-w-0 flex-1 flex-col bg-gray-50 dark:bg-stone-800 lg:h-screen">
        {/* Header */}
        <header className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-4 dark:bg-stone-900 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <div className="relative max-w-xs flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                <Input
                  type="text"
                  placeholder="Hľadať knihu..."
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-medium sm:inline">
                  <AdminProfileDropdown />
                </span>
              </div>
              <ModeToggle />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
            Categories
        </main>
      </div>
    </div>
  );
};

export default AdminCategories;
