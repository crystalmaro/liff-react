import React, { useState } from "react";

const baseUrl = "https://openlibrary.org";

export function searchBooks(query) {
  const url = new URL(baseUrl + "/search.json");
  url.searchParams.append("title", query);

  return fetch(url).then(response => response.json());
}

export function SearchBook() {
  const [results, setResults] = useState(0);
  // calls React.useState() to obtain a stateful variable
  // useState() returns an array with two entries
  // 'result'is the current value of the state variable
  // -> will be undefined until you update the state
  // 'setResults()' is a callback function that you can call to update the state

  const handleSearch = event => {
    searchBooks(event.target.value).then(response => {
      setResults(response.docs);
    });
  };

  const resultList = (results || []).map(book => (
    <tr key={book.key}>
      <td>{book.title}</td>
      <td>{book.author_name && book.author_name.join(", ")}</td>
      <td>{book.first_publish_year}</td>
    </tr>
  ));
  return (
    <div>
      <div className="search-input">
        <input onChange={handleSearch} type="text" placeholder="Search" />
      </div>
      <h1 className="h1">Search Results</h1>
      <div className="books">
        <table>
          <thead>
            <tr>
              <th className="title-col">Title</th>
              <th className="author-col">Author</th>
              <th className="year-col">Publish Year</th>
            </tr>
          </thead>
          <tbody>{resultList}</tbody>
        </table>
      </div>
    </div>
  );
}
