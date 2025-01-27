import React from "react";
import { LayoutDashboard, MessageSquare, LogOut } from "lucide-react";
export const AdminLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <div className="w-full min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r min-h-screen p-4">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-800">
            Feedback Admin
          </h1>
        </div>
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 text-blue-500 bg-blue-50 px-4 py-2 rounded-lg">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg">
            <MessageSquare size={20} />
            <span>Feedback</span>
          </a>
        </nav>
        <div className="absolute bottom-4 w-56">
          <button className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg w-full">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>;
};