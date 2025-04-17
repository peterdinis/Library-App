"use client";

import type { Author } from "@prisma/client";
import {
  BarChart3,
  BookMarked,
  BookOpen,
  BookText,
  ChartColumnStacked,
  Library,
  Menu,
  Users2,
  X,
} from "lucide-react";
import Link from "next/link";
import { type FC, useState } from "react";
import { api } from "~/trpc/react";
import ModeToggle from "../../shared/ModeToggle";
import { AuthorsTable } from "./AuthorsTable";
import { authorsColumns } from "./authorsColumns";
import ProfileDropdown from "../../auth/ProfileDropdown";
import Loader from "~/components/ui/loader";

const AdminAuthors: FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data, isLoading } = api.author.getAllAuthors.useQuery();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  if (isLoading) return <Loader width={8} height={8} />;

  return (
    <div className="flex h-screen flex-col overflow-hidden lg:flex-row">
      <div className="flex items-center justify-between bg-indigo-700 p-4 lg:hidden dark:bg-stone-900">
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
      <div
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 z-30 h-full w-64 transform bg-blue-800 p-6 text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 dark:bg-stone-900`}
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
              <item.icon className="h-5 w-5 shrink-0" />
              <Link href={item.link} className="whitespace-nowrap">
                {item.label}
              </Link>
            </button>
          ))}
        </nav>
      </div>
      {isSidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-[calc(100vh-64px)] min-w-0 flex-1 flex-col bg-gray-50 lg:h-screen dark:bg-stone-800">
        <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-4 sm:px-6 dark:bg-stone-900">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="hidden text-sm font-medium sm:inline">
                  <ProfileDropdown />
                </span>
              </div>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <h1 className="text-center text-5xl font-bold">
            Všetci spisovatelia
          </h1>
          <AuthorsTable
            columns={authorsColumns}
            data={data as unknown as Author[]}
          />
        </main>
      </div>
    </div>
  );
};

export default AdminAuthors;
