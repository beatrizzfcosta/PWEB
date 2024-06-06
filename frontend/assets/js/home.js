document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found in local storage");
  }

  const progressContainers = [
    document.getElementById("progress-container-1"),
    document.getElementById("progress-container-2"),
  ];

  const fetchActiveProjectsCount = async () => {
    const response = await fetch(
      "http://localhost:15000/project/activeProjectsCount",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch components");
    }

    const data = await response.json();
    return data.count;
  };

  const fetchInactiveProjectsCount = async () => {
    const response = await fetch(
      "http://localhost:15000/project/InactiveProjectsCount",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch components");
    }

    const data = await response.json();
    return data.count;
  };

  const activeProjectsCount = await fetchActiveProjectsCount();
  const InactiveProjectsCount = await fetchInactiveProjectsCount();

    // Initialize the first progress bar
    const progressContainer1 = document.getElementById("progress-container-1");
    if (progressContainer1) {
      var bar1 = new ProgressBar.SemiCircle(progressContainer1, {
        strokeWidth: 6,
        color: "#9fb3c8",
        trailColor: "#eee",
        trailWidth: 1,
        easing: "easeInOut",
        duration: 1400,
        svgStyle: null,
        text: {
          value: "",
          alignToBottom: false,
        },
        from: { color: "#9fb3c8" },
        to: { color: "#4c6488" },
        step: function (state, bar) {
          bar.path.setAttribute("stroke", state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText("");
          } else {
            bar.setText(activeProjectsCount);
          }
          bar.text.style.color = state.color;
        },
      });
      bar1.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar1.text.style.fontSize = "2rem";
      bar1.animate(activeProjectsCount / 25); 
    }

    const progressContainer2 = document.getElementById("progress-container-2");
    if (progressContainer2) {
      var bar2 = new ProgressBar.SemiCircle(progressContainer2, {
        strokeWidth: 6,
        color: "#9fb3c8",
        trailColor: "#eee",
        trailWidth: 1,
        easing: "easeInOut",
        duration: 1400,
        svgStyle: null,
        text: {
          value: "",
          alignToBottom: false,
        },
        from: { color: "#9fb3c8" },
        to: { color: "#4c6488" },
        step: function (state, bar) {
          bar.path.setAttribute("stroke", state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText("");
          } else {
            bar.setText(InactiveProjectsCount);
          }
          bar.text.style.color = state.color;
        },
      });
      bar2.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar2.text.style.fontSize = "2rem";
      bar2.animate(InactiveProjectsCount / 25); 
    }


  const chartPecasUsadas = async () => {
    try {
      const response = await fetch(
        "http://localhost:15000/stat/mostOwnedParts",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }

      const data = await response.json();
      const ctx = document
        .getElementById("chartPecasUsadassId")
        .getContext("2d");
      return new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.map((item) => item.name),
          datasets: [
            {
              label: "Peças em maior stock",
              data: data.map((item) => item.quantity),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error in chartPecasUsadas:", error);
    }
  };

  const chartLineExample = async () => {
    try {
      const response = await fetch(
        "http://localhost:15000/stat/mostBuiltDrone",
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch components");
      }

      const data = await response.json();
      const ctx = document.getElementById("lineChartExample").getContext("2d");
      return new Chart(ctx, {
        type: "line",
        data: {
          labels: data.map((item) => item.model),
          datasets: [
            {
              label: "Maior numero de drones construidos",
              data: data.map((item) => item.quantity),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error in chartLineExample:", error);
    }
  };

  await chartPecasUsadas();
  await chartLineExample();
});
