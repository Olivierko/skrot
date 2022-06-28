<template>
  <div class="tile is-ancestor m-5">
    <div class="tile is-parent">
      <article class="tile is-child box notification" ref="workoutsByWeekChart">
        <p class="title">Workouts by week</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">439k</p>
        <p class="subtitle">Users</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">59k</p>
        <p class="subtitle">Products</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">3.4k</p>
        <p class="subtitle">Open Orders</p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ApexCharts from "apexcharts";
import { useHistory } from "@/composables/useHistory";
import { toWeekNumber } from "@/utilities/date";
import { groupBy } from "@/utilities/grouping";

const { getWorkoutHistory } = useHistory();
const workoutsByWeekChart = ref(null);

const calculateStartDate = (): Date => {
  const firstDayOfWeekIndex = 1;
  const start = new Date(new Date().setDate(new Date().getDate() - 90));
  const dayOfWeekIndex = start.getDay();

  const diff = dayOfWeekIndex >= firstDayOfWeekIndex
    ? dayOfWeekIndex - firstDayOfWeekIndex
    : 6 - dayOfWeekIndex;

  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  return start;
};

const generateWeeks = (start: Date, end: Date): number[] => {
  const weeks = [];
  var date = new Date(start);
  while (date <= end) {
    weeks.push(toWeekNumber(date));
    date.setDate(date.getDate() + 1);
  }

  return [...new Set(weeks)];
};

onMounted(async () => {
  const since = calculateStartDate();
  const weeks = generateWeeks(since, new Date());
  const workouts = await getWorkoutHistory(since);

  let data: { x: String, y: Number }[] = [];
  const groupedByWeek = groupBy(workouts, (workout) => toWeekNumber(new Date(workout.start)));

  weeks.forEach(week => {
    data.push({
      x: `w.${week}`,
      y: groupedByWeek[week]?.length ?? 0
    });
  });

  var options = {
    chart: {
      height: 350,
      type: 'bar',
    },
    theme: {
      palette: 'palette9'
    },
    series: [
      {
        name: 'Number of workouts',
        type: 'column',
        data: data
      },
    ],
  };

  var apexChart = new ApexCharts(workoutsByWeekChart.value, options);
  apexChart.render();
});
</script>

<style scoped>
.widget {
  background-color: rgb(92, 71, 66);
  color: #fff;
}
</style>