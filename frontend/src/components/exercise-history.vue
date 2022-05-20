<template>
    <div ref="chart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useHistory } from "@/composables/useHistory";
import { toPrettyDate, toWeekNumber } from "@/utilities/date";
import ApexCharts from "apexcharts";

const props = defineProps({
  exerciseId: {
    type: String,
    required: true,
  },
});

const { getExerciseHistory } = useHistory();
const chart = ref(null);

onMounted(() => {
    getExerciseHistory(props.exerciseId).then((results) => {
        const exerciseHistories = results.reverse().map(x => {
            return {
                x: `w.${toWeekNumber(new Date(x.date))}`,
                y: x.totalWeight,
                entry: x,
            }
        });

        var options = {
            chart: {
                height: 350,
                type: 'bar',
            },
            title: {
                text: 'Total weight by week',
                align: 'left'
            },
            series: [
                {
                    name: 'Total weight',
                    data: exerciseHistories
                },
            ],
            tooltip: {
                custom: function(tooltip: any) {
                var data = exerciseHistories[tooltip.dataPointIndex];
                
                return '<div class="box">' +
                    '<label class="label"><b>' + toPrettyDate(new Date(data.entry.date)) + '</b></label>' +
                    '<label class="label">' + `${data.entry.totalSets} X ${(+data.entry.totalRepititions / +data.entry.totalSets)} X ${(+data.entry.totalWeight / +data.entry.totalRepititions)} ${data.entry.unit}` + '</label>' +
                    '<label class="label">' + `${data.entry.totalWeight} ${data.entry.unit}` + '</label>' +
                    '<label class="label">' + `x${data.entry.totalSets} sets` + '</label>' +
                    '<label class="label">' + `x${data.entry.totalRepititions} repititions` + '</label>' +
                    '<label class="label"><b>Notes</b>: ' + data.entry.notes.join('<br>') + '</label>' +
                    '</div>';
                }
            }
        };

        var apexChart = new ApexCharts(chart.value, options);
        apexChart.render();
    });
});
</script>