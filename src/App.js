import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-js-pagination";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(30);
  const [totalLength, setTotalLength] = useState(68502);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/gitRepo?q=repo&page=${currentPage}&perPage=${postsPerPage}`);
      setPosts(res.data.data['items']);
      setLoading(false);
      
      
      setTotalLength(res.data.data['total_count'])
      console.log(totalLength);
    };

    fetchPosts();
  }, []);

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
    let fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/gitRepo?q=repo&page=${pageNumber}&perPage=${postsPerPage}`);
      setPosts(res.data.data['items']);
      setLoading(false);
      
      setTotalLength(res.data.data['total_count'])
    };

    fetchPosts();
  };


  const currentPosts = posts;//.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div className="App">
      <h1 style={{ paddingTop: "3rem" }}>GIT HUB REPO</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead style={{ backgroundColor: "BLACK", color: "white" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Full Name</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.full_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

     

      <div className="pagination-background">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={10}
          totalItemsCount={totalLength}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}
