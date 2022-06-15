<template>
  <div class="tile is-ancestor m-5">
    <div class="tile is-parent">
      <article class="tile is-child box notification" ref="chart">
        <p class="title">Workouts by week</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification is-success">
        <p class="title">439k</p>
        <p class="subtitle">Users</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification is-info">
        <p class="title">59k</p>
        <p class="subtitle">Products</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification is-warning">
        <p class="title">3.4k</p>
        <p class="subtitle">Open Orders</p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ApexCharts from "apexcharts";

const chart = ref(null);

onMounted(() => {
  var dummyData = [
    { x: 'w.1', y: 2 },
    { x: 'w.2', y: 3 },
    { x: 'w.3', y: 1 },
    { x: 'w.4', y: 0 },
    { x: 'w.5', y: 5 },
    { x: 'w.6', y: 5 },
    { x: 'w.7', y: 4 },
    { x: 'w.8', y: 0 },
    { x: 'w.9', y: 2 },
    { x: 'w.10', y: 1 },
    { x: 'w.11', y: 1 },
    { x: 'w.12', y: 3 },
    { x: 'w.13', y: 3 },
    { x: 'w.14', y: 4 },
  ];

  var options = {
    chart: {
      height: 350,
      type: 'bar',
      stacked: true,
    },
    theme: {
      palette: 'palette9'
    },
    stroke: {
      width: [0, 6]
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: 'Number of workouts',
        type: 'column',
        data: dummyData
      },
    ],
    yaxis: [
      {
        title: {
          text: 'Workouts',
          style: {
            fontSize: '14px',
            fontWeight: '0',
            fontFamily: undefined,
            color: '#5C4742'
          }
        },
      },
    ],
  };

  var apexChart = new ApexCharts(chart.value, options);
  apexChart.render();
});
</script>