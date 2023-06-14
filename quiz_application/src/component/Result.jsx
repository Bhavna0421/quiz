import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function QuizResult(props){
  const chartRef = useRef(null);
// show chart of score and total score
  useEffect(() => {
    const chartData = {
      labels: ["Your Score", "Total Score"],
      datasets: [
        {
          label: "Score",
          data: [props.score, props.totalScore],
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    if (chartRef.current) {
      // If chart already exists, destroy it before creating a new one
      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  }, [props.score, props.totalScore]);

  return (
    <>
    {/* if score is same as total score then show this exclamation */}
      {props.score === props.totalScore && (
        <h6
          style={{
            fontFamily: "Times New Roman', Times, serif",
            fontSize: "35px",
            fontWeight: "lighter",
          }}
        >
          hurry!! Best score
        </h6>
      )}
      <canvas ref={chartRef} width={400} height={300}></canvas>
      <div className="score">
        Your Score: {props.score}
        <br />
        Total Score: {props.totalScore}
      </div>
      <button className="ReStart" onClick={props.tryAgain}>
        ReStart
      </button>
    </>
  );
}

export default QuizResult;
