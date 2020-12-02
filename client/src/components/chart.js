import { Line } from "react-chartjs-2";
const Chart = (props) => {
  return (
    <Line
      data={{
        labels: props.x.slice(-30),
        datasets: [
          {
            label: "Cases",
            data: props.y.slice(-30),
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      }}
      options={{
        responsive: true,
        animation: {
          duration: 3000,
          easing: "easeInQuad",
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                zeroLineColor: "red",
              },
            },
          ],
        },
      }}
    />
  );
};

export default Chart;