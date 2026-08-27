import { useState } from "react";
import useDataList from "./usedataList";

// Combines useDataList search with page-based slicing of the results.
const usePaginatedSearch = (
  nodes,
  {
    paramsIndex = ["frontmatter", "title"],
    paramSearch = "id",
    perPage = 10,
  } = {},
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(perPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [searchQuery, setSearchQuery] = useState("");
  const { queryResults, searchData } = useDataList(
    nodes,
    setSearchQuery,
    searchQuery,
    paramsIndex,
    paramSearch,
  );
  const searchedPosts = queryResults.slice(indexOfFirstPost, indexOfLastPost);

  return {
    searchedPosts,
    queryResults,
    searchData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    postsPerPage,
  };
};

export default usePaginatedSearch;
