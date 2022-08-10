<template>
  <div class="p-5">
    <input class="input" type="date" placeholder="Text input" v-model="startDateInput">
  </div>
  <div class="tile is-ancestor m-5">
    <div class="tile is-parent">
      <article class="tile is-child box notification" ref="workoutsByWeekChartContainer">
        <p class="title">Workouts by week</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">{{ toElapsedTime(averageDuration) }}</p>
        <p class="subtitle">Average workout length</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">{{ averageWorkoutsPerWeek }}</p>
        <p class="subtitle">Average workouts per week</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box notification widget">
        <p class="title">{{ totalWorkouts }}</p>
        <p class="subtitle">Total workouts</p>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import ApexCharts from "apexcharts";
import { useHistory } from "@/composables/useHistory";
import { toElapsedTime, toWeekNumber } from "@/utilities/date";
import { groupBy } from "@/utilities/grouping";

const { getWorkoutHistory } = useHistory();
const workoutsByWeekChartContainer = ref(null);
const averageDuration = ref(0);
const averageWorkoutsPerWeek = ref(0);
const totalWorkouts = ref(0);
var workoutsByWeekChart: ApexCharts;

const calculateStartDate = (): Date => {
  const firstDayOfWeekIndex = 1;
  const start = new Date(new Date().setDate(new Date().getDate() - 90));
  const dayOfWeekIndex = start.getDay();

  const diff = dayOfWeekIndex >= firstDayOfWeekIndex
    ? dayOfWeekIndex - firstDayOfWeekIndex
    : 6 - dayOfWeekIndex;

  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  start.setTime(start.getTime() - start.getTimezoneOffset() * 60000);

  return start;
};

const startDate = calculateStartDate();
const startDateInput = ref(startDate.toISOString().split('T')[0]);

const generateWeeks = (start: Date, end: Date): number[] => {
  const weeks = [];
  var date = new Date(start);
  while (date <= end) {
    weeks.push(toWeekNumber(date));
    date.setDate(date.getDate() + 1);
  }

  return [...new Set(weeks)];
};

// replace with a click event 
watch(startDateInput, (newValue, _oldValue) => {
  updateCharts();
});

onMounted(async () => {
  workoutsByWeekChart = new ApexCharts(workoutsByWeekChartContainer.value, {
    chart: {
      height: 350,
      type: 'bar',
    },
    theme: {
      palette: 'palette9'
    },
    series: [],
  });

  workoutsByWeekChart.render();
  await updateCharts();
});

const updateCharts = async () => {
  const since = new Date(startDateInput.value);
  const weeks = generateWeeks(since, new Date());
  const workouts = await getWorkoutHistory(since);

  let data: { x: String, y: Number }[] = [];
  const groupedByWeek = groupBy(workouts, (workout) => toWeekNumber(new Date(workout.start)));

  let totalDuration = 0;
  workouts.forEach(workout => {
    totalDuration += new Date(workout.end).getTime() - new Date(workout.start).getTime();
  });

  averageDuration.value = totalDuration / workouts.length;
  averageWorkoutsPerWeek.value = workouts.length / weeks.length;
  totalWorkouts.value = workouts.length;

  weeks.forEach(week => {
    const workouts = groupedByWeek[week]?.length ?? 0;
    
    data.push({
      x: `w.${week}`,
      y: workouts
    });
  });

  workoutsByWeekChart.updateSeries([{
    name: 'Number of workouts',
    type: 'column',
    data: data
  }]);
};
</script>

<style scoped>
.widget {
  background-color: rgb(92, 71, 66);
  color: #fff;
}
</style>