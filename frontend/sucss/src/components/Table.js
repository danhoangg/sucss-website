import React, { useState, useContext } from 'react';

import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Table = ({ data, columns, rowsPerPage, search, setSearch }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const getTotalPages = (filteredData) => Math.ceil(filteredData.length / rowsPerPage);

    const handleNextPage = (filteredData) => {
        if (currentPage < getTotalPages(filteredData) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCreateNew = () => {

    }

    const handleLogout = () => {
        logout()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Logout failed', error);
            });
    }

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="overflow-x-auto">
            <div className='overflow-x-auto border rounded-3xl border-border-color'>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-zinc-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column}
                                    className="px-6 py-3 text-lg font-medium tracking-wider text-left text-white uppercase"
                                >
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-black divide-y divide-gray-200">
                        {currentData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex} className="px-6 py-4 text-lg text-gray-200 whitespace-nowrap">
                                        {row[column]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-8">
                <button
                    onClick={() => handleLogout()}
                    className="p-3 text-white rounded-full bg-sucss-purple disabled:opacity-50"
                >
                    <BiLogOut className='-translate-x-[0.1rem] text-lg' />
                </button>
                <button
                    onClick={() => handlePreviousPage(filteredData)}
                    className="p-3 text-white rounded-full bg-sucss-purple disabled:opacity-50"
                    disabled={currentPage === 0}
                >
                    <FaChevronLeft />
                </button>
                <span>
                    Page {currentPage + 1} of {getTotalPages(filteredData)}
                </span>
                <button
                    onClick={() => handleNextPage(filteredData)}
                    className="p-3 text-white rounded-full bg-sucss-purple disabled:opacity-50"
                    disabled={currentPage === getTotalPages(filteredData) - 1}
                >
                    <FaChevronRight />
                </button>
                <button
                    onClick={() => handleCreateNew()}
                    className="p-3 text-white rounded-full bg-sucss-purple disabled:opacity-50"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default Table;
