import { Box, Card, useTheme } from "@mui/material";
import { H2, H5 } from "../../../components/Typography";
import Chart from "react-apexcharts";
import { number_to_price } from "../../../ultis/Ultis";

const TotalSpent = ({ dataChart, totalMoney }) => {
  let dateTimeNow = new Date();
  let yearNow = dateTimeNow.getFullYear();

  const data = {
    series: [
      {
        name: "Tổng",
        data: dataChart,
      },
    ],
    categories: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
  };
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: { show: false },
    },
    colors: [theme.palette.primary.main],
    dataLabels: { enabled: false },
    // fill: { opacity: 1 },
    grid: {
      show: false,
    },
    states: {
      active: {
        filter: { type: "none" },
      },
      hover: {
        filter: { type: "none" },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: data.categories,
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 500,
        },
      },
    },
    yaxis: { show: false },

    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "60%",
        rangeBarOverlap: false,
      },
    },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (val) => `${number_to_price(val)} VND`,
      },
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: {
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            labels: { show: false },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                colors: theme.palette.text.disabled,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 500,
              },
            },
          },
        },
      },
    ],
  };

  const chartSeries = data.series;

  return (
    <Card
      sx={{
        paddingX: 4,
        height: "100%",
        paddingBottom: "1.5rem",
        paddingTop: "calc(1.5rem + 15px)",
        [theme.breakpoints.down(425)]: { padding: "1.5rem" },
      }}
    >
      <H5>Tổng tiền ({yearNow})</H5>
      <H2 color="primary.main">{number_to_price(totalMoney)} VND</H2>

      <Box
        sx={{
          "& .apexcharts-tooltip *": {
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
          "& .apexcharts-tooltip": {
            boxShadow: 0,
            borderRadius: 4,
            alignItems: "center",
            "& .apexcharts-tooltip-text-y-value": { color: "primary.main" },
            "& .apexcharts-tooltip.apexcharts-theme-light": {
              border: `1px solid ${theme.palette.divider}`,
            },
            "& .apexcharts-tooltip-series-group:last-child": {
              paddingBottom: 0,
            },
          },
        }}
      >
        <Chart
          height={245}
          options={chartOptions}
          series={chartSeries}
          type="bar"
        />
      </Box>
    </Card>
  );
};

export default TotalSpent;
