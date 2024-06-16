import { useState, useEffect } from "react";
import Scholarship from "../../Component/Scholarship/Scholarship";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const itemsPerPage = 3;

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosPublic.get(
        `/allScholarships?page=${currentPage}&size=${itemsPerPage}&search=${search}`
      );
      setScholarships(data.scholarships);
      setCount(data.count);
    };
    getData();
  }, [currentPage, search, axiosPublic]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setSearchText("");
    setCurrentPage(1);
  };

  const numberOfPages = Math.max(Math.ceil(count / itemsPerPage), 1);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className="lg:pt-32">
      <form
        onSubmit={handleSearch}
        className="flex justify-center my-8 items-center flex-col lg:flex-row"
      >
        <div className="flex p-1 lg:overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            name="search"
            placeholder="Search scholarship"
            aria-label="Search"
          />
          <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>
        <button
          onClick={handleReset}
          className="btn bg-orange-400 text-white text-lg mb-4 ml-3 mt-3"
        >
          Reset
        </button>
      </form>

      <div className="container mx-auto px-3 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <Scholarship key={scholarship._id} scholarshipItem={scholarship} />
        ))}
      </div>
      <div className="flex justify-center mt-12 mb-5">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="mx-1">Previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? "bg-blue-500 text-white" : ""
            } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;
