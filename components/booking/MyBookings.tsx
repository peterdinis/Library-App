import type { FC } from "react";
import Settings from "./Settings";
import MyBorrowedBooks from "./MyBorrowedBooks";

const MyBookings: FC = () => {
	return (
		<div className="grid md:grid-cols-2 md:gap-6 ml-4 mr-4">
			<div className="space-y-6 mt-5">
				<Settings />
			</div>
			<div className="mt-5">
				<MyBorrowedBooks />
			</div>
		</div>
	)
};

export default MyBookings;
