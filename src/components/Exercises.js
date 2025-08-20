import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pagination.css"; // separate CSS for pagination


// test dummy data (300 items)
const TestExercises = Array.from({ length: 300 }, (_, i) => ({
  id: i + 1,
  name: `Exercise ${i + 1}`,
  category: i % 2 === 0 ? "Strength" : "Cardio",
  equipment: i % 3 === 0 ? "Bodyweight" : "Dumbbells"
}));


export default function Exercises({ exercises = TestExercises }) {
  const itemsPerPage = 15;
  const totalPages = Math.ceil(exercises.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

  // current page items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = exercises.slice(startIndex, startIndex + itemsPerPage);

  // pagination block (window) logic
  const blockSize = 5;
  const blockStart = Math.floor((currentPage - 1) / blockSize) * blockSize + 1;
  const blockEnd = Math.min(blockStart + blockSize - 1, totalPages);

  // pages in the current block
  const visiblePages = [];
  for (let i = blockStart; i <= blockEnd; i++) visiblePages.push(i);

  // block navigation
  const goToPrevBlock = () => {
    const prevPage = Math.max(1, blockStart - 1);
    setCurrentPage(prevPage);
  };

  const goToNextBlock = () => {
    const nextPage = Math.min(totalPages, blockEnd + 1);
    setCurrentPage(nextPage);
  };

  return (
    <div>
      {/* Cards */}
      <div
        className="cards-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {currentItems.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/exercise/${exercise.id}`}
            state = {{exercise}} 
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="exercise-card"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "12px",
                borderRadius: "8px",
                width: "350px",
                textAlign: "center",
                background: "rgba(255,255,255,0.02)",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: 6 }}>
                {exercise.name}
              </div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>
                {exercise.category}
              </div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>
                {exercise.equipment}
              </div>
              <img
                className="exercise-cardimg"
                alt={exercise.name}
                style={{ width: "100%", borderRadius: "6px", marginTop: "8px" }}
                src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/refs/heads/main/exercises/${exercise.id}/1.jpg`}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        {blockStart > 1 && (
          <>
            <PageCircle
              number={1}
              active={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            />
            <span className="dots" onClick={goToPrevBlock} aria-hidden>
              ...
            </span>
          </>
        )}

        {visiblePages.map((page) => (
          <PageCircle
            key={page}
            number={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          />
        ))}

        {blockEnd < totalPages && (
          <>
            <span className="dots" onClick={goToNextBlock} aria-hidden>
              ...
            </span>
            <PageCircle
              number={totalPages}
              active={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Small circle button for page numbers
function PageCircle({ number, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`page-circle ${active ? "active" : ""}`}
    >
      {number}
    </button>
  );
}
