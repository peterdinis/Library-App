"use client"

import { FC, useState } from 'react';
import {
    BookOpen,
    Users,
    Clock,
    BarChart3,
    Search,
    Bell,
    UserCircle,
    BookMarked,
    UserCheck,
    AlertCircle
} from 'lucide-react';
import ModeToggle from '../shared/ModeToggle';

const Wrapper: FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-stone-800 flex">
            {/* Sidebar */}
            <div className="w-64 bg-indigo-700 dark:bg-stone-900 text-white p-6">
                <div className="flex items-center gap-2 mb-8">
                    <BookOpen className="h-8 w-8" />
                    <h1 className="text-xl font-bold">Knižnica Admin</h1>
                </div>

                <nav className="space-y-2">
                    {[
                        { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                        { id: 'books', icon: BookMarked, label: 'Books' },
                        { id: 'members', icon: Users, label: 'Members' },
                        { id: 'loans', icon: Clock, label: 'Loans' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
                    ${activeTab === item.id
                                    ? 'bg-indigo-800 text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600'}`}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative">
                                <Bell className="h-6 w-6 text-gray-600" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <div className="flex items-center gap-2">
                                <UserCircle className="h-8 w-8 text-gray-600" />
                                <span className="text-sm font-medium">Admin User</span>
                            </div>
                            <ModeToggle />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {[
                            {
                                title: 'Total Books',
                                value: '2,543',
                                icon: BookMarked,
                                color: 'bg-blue-500'
                            },
                            {
                                title: 'Active Members',
                                value: '847',
                                icon: UserCheck,
                                color: 'bg-green-500'
                            },
                            {
                                title: 'Books on Loan',
                                value: '234',
                                icon: Clock,
                                color: 'bg-yellow-500'
                            },
                            {
                                title: 'Overdue Returns',
                                value: '12',
                                icon: AlertCircle,
                                color: 'bg-red-500'
                            }
                        ].map((stat, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-3 rounded-lg`}>
                                        <stat.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">Recent Activity</h2>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-gray-500">
                                        <th className="pb-4">Action</th>
                                        <th className="pb-4">Book</th>
                                        <th className="pb-4">Member</th>
                                        <th className="pb-4">Date</th>
                                        <th className="pb-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {[
                                        {
                                            action: 'Borrowed',
                                            book: 'The Great Gatsby',
                                            member: 'John Smith',
                                            date: '2024-03-10',
                                            status: 'Active'
                                        },
                                        {
                                            action: 'Returned',
                                            book: '1984',
                                            member: 'Sarah Johnson',
                                            date: '2024-03-09',
                                            status: 'Completed'
                                        },
                                        {
                                            action: 'Overdue',
                                            book: 'To Kill a Mockingbird',
                                            member: 'Mike Brown',
                                            date: '2024-03-01',
                                            status: 'Late'
                                        }
                                    ].map((item, index) => (
                                        <tr key={index} className="border-t border-gray-100">
                                            <td className="py-4">{item.action}</td>
                                            <td className="py-4">{item.book}</td>
                                            <td className="py-4">{item.member}</td>
                                            <td className="py-4">{item.date}</td>
                                            <td className="py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs
                              ${item.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                                                        item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                            'bg-red-100 text-red-800'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Wrapper