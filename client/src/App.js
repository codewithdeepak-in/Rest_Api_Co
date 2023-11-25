import React, { useState, useEffect } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 15;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:3001/api/exchange/search?page=${currentPage}&limit=${itemsPerPage}&term=${searchTerm}`);

                if (response) {
                    setData(response.data.results);
                    setTotalCount(response.data.totalCount);
                }
            } catch (error) {
                alert(error.message) 
            }
        }
        fetchData();
    }, [currentPage, searchTerm]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset currentPage when search term changes
    };
    const updateData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/exchange/update');
            if (response.status === 200) {
                setCurrentPage(1);
                alert('Data updated successfully')
            }
        } catch (error) {
            alert(error.message)
        }
    };

    return (
        <div className="container mt-4">
            <label htmlFor="search" className="form-label">
                Search by Exchange:&nbsp;
                <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control"
                    placeholder="Search..."
                />
            </label>
            <table className="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Exchange</th>
                        <th>24 Hour Turnover</th>
                    </tr>
                </thead>
              
                    {data.length > 0 ? (
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.url} alt={item.name} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.volume_1day_usd}</td>
                                </tr>
                            ))}
                        </tbody>
                ) : <div className="d-flex justify-content-center align-items-center w-100"><div className="spinner-border"></div></div>}
             
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center ">
                    {Array.from({ length: Math.min(Math.ceil(totalCount / itemsPerPage)) }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
                        </li>
                    ))}
                </ul>
            </nav>

            <br />

            <button onClick={updateData} className="btn btn-primary">Update Data</button>
        </div>
    );
};

export default App;
