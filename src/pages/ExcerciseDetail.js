import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./ExcerciseDetail.css"; // Assuming you have a CSS file for styling

export default function ExerciseDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const location = useLocation();
  const exercise = location.state?.exercise;

  if (!exercise) {
    return <p>No exercise data found for id {id}</p>;
  }

  const capitalize = (text) =>
    typeof text === "string" && text.length > 0
      ? text.charAt(0).toUpperCase() + text.slice(1)
      : "Unknown";

  return (
    <div>
      <div className="excerciseDetail-cont">
        <div className="excerciseDetail-header">
          <h1>{capitalize(exercise.name)}</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#1a1a1a8f",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #795889",
              }}
            >
              {capitalize(exercise.primaryMuscles?.[0])}
            </div>
            <div
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                backgroundColor: "#1a1a1a8f",
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid #795889",
              }}
            >
              {capitalize(exercise.equipment)}
            </div>
          </div>

          <div>
            {(exercise.instructions || []).map((instruction, i) => (
              <div style={{ marginBottom: "30px" }} key={i}>
                {i + 1}. {instruction}
              </div>
            ))}
          </div>
        </div>

        <img
          src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/refs/heads/main/exercises/${exercise.id}/1.jpg`}
          alt={exercise.name}
          style={{ objectFit: "cover", width: "60%", borderRadius: "20px" }}
        />
      </div>

      {exercise.secondaryMuscles?.length > 0 && (
        <div
          style={{
            marginTop: "50px",
            width: "90%",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <div style={{ paddingLeft: "20px" }}>
            <h1 style={{ fontSize: "30px" }}>Also Works Out:</h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                marginBottom: "20px",
                marginTop: "15px",
                justifyContent: "start",
              }}
            >
              {exercise.secondaryMuscles.map((muscle, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    backgroundColor: "#1a1a1a8f",
                    padding: "10px 30px",
                    borderRadius: "10px",
                    border: "1px solid #795889",
                  }}
                >
                  {capitalize(muscle)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
