
import { FC } from "react";
import CategoriesSearch from "./CategoriesSearch";
import Header from "../shared/Header";

const AllCategoriesWrapper: FC = () => {
    return (
        <>
            <Header text="Všetky kategórie" />
            <CategoriesSearch />
        </>
    )
}

export default AllCategoriesWrapper