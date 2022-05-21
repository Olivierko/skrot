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
        const exercises = results.reverse();

        const byTotalWeight = exercises.map(x => {
            return {
                x: `w.${toWeekNumber(new Date(x.date))}`,
                y: x.totalWeight,
                entry: x,
            }
        });

        const byTotalRepititions = exercises.map(x => {
            return {
                x: `w.${toWeekNumber(new Date(x.date))}`,
                y: x.totalRepititions,
                entry: x,
            }
        });

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
            title: {
                text: 'Exercise history by week',
                align: 'left'
            },
            series: [
                {
                    name: 'Total weight',
                    type: 'column',
                    data: byTotalWeight
                },
                {
                    name: 'Total repititions',
                    type: 'line',
                    data: byTotalRepititions
                },
            ],
            yaxis: [
                {
                    title: {
                        text: 'Weight',
                        style: {
                            fontSize:  '14px',
                            fontWeight:  '0',
                            fontFamily:  undefined,
                            color:  '#5C4742'
                        }
                    },
                }, 
                {
                    opposite: true,
                    title: {
                        text: 'Repititions',
                        style: {
                            fontSize:  '14px',
                            fontWeight:  '0',
                            fontFamily:  undefined,
                            color:  '#A5978B'
                        }
                    }
                }
            ],
            tooltip: {
                custom: function(tooltip: any) {
                var data = exercises[tooltip.dataPointIndex];
                
                return '<div class="box">' +
                    '<label class="label"><b>' + toPrettyDate(new Date(data.date)) + '</b></label>' +
                    '<label class="label">' + `${data.totalSets} X ${(+data.totalRepititions / +data.totalSets)} X ${(+data.totalWeight / +data.totalRepititions)} ${data.unit}` + '</label>' +
                    '<label class="label">' + `${data.totalWeight} ${data.unit}` + '</label>' +
                    '<label class="label">' + `x${data.totalSets} sets` + '</label>' +
                    '<label class="label">' + `x${data.totalRepititions} repititions` + '</label>' +
                    '<label class="label"><b>Notes</b>: ' + data.notes.join('<br>') + '</label>' +
                    '</div>';
                }
            }
        };

        var apexChart = new ApexCharts(chart.value, options);
        apexChart.render();
    });
});
</script>