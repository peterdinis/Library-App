import { FC } from "react";

const WrapperTable: FC = () => {
    return (
        <div className="overflow-x-auto p-4 sm:p-6">
            <table className="w-full min-w-[600px]">
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
                            action: "Borrowed",
                            book: "The Great Gatsby",
                            member: "John Smith",
                            date: "2024-03-10",
                            status: "Active",
                        },
                        {
                            action: "Returned",
                            book: "1984",
                            member: "Sarah Johnson",
                            date: "2024-03-09",
                            status: "Completed",
                        },
                        {
                            action: "Overdue",
                            book: "To Kill a Mockingbird",
                            member: "Mike Brown",
                            date: "2024-03-01",
                            status: "Late",
                        },
                    ].map((item, index) => (
                        <tr key={index} className="border-t border-gray-100">
                            <td className="py-4">{item.action}</td>
                            <td className="py-4">{item.book}</td>
                            <td className="py-4">{item.member}</td>
                            <td className="py-4">{item.date}</td>
                            <td className="py-4">
                                <span
                                    className={`whitespace-nowrap rounded-full px-2 py-1 text-xs ${item.status === "Active"
                                            ? "bg-blue-100 text-blue-800"
                                            : item.status === "Completed"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WrapperTable