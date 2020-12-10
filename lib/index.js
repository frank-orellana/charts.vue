import { Chart, LineElement, BarController, BarElement, BubbleController, CategoryScale, Filler, Legend, LineController, LinearScale, PieController, PolarAreaController, RadarController, RadialLinearScale, ScatterController, Title, Tooltip, PointElement } from 'chart.js';
import { h, defineComponent } from 'vue';
Chart.register(LineController, LineElement, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend, BarController, BarElement, RadarController, RadialLinearScale, PieController, PointElement, PolarAreaController, BubbleController, ScatterController);
export default defineComponent({
    props: {
        type: { type: String, default: 'line' },
        labels: { type: Array },
        datasets: { type: Array },
        chartData: { type: Object },
        options: { type: Object },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '400px'
        },
    },
    data() {
        return {
            canvas: null,
            chart: null
        };
    },
    watch: {
        'chartData': {
            deep: true,
            handler() {
                this.chart.data = this.chartData;
                this.update();
            }
        },
        'type': {
            handler() {
                this.chart.config.type = this.type;
                this.update();
            }
        },
        'labels': {
            handler() {
                this.chart.data.labels = this.labels;
                this.update();
            }
        },
        'datasets': {
            deep: true,
            handler() {
                this.chart.data.datasets = this.datasets;
                this.update();
            }
        },
        'options': {
            deep: true,
            handler() {
                this.chart.options = this.options;
                this.update();
            }
        },
        'width': { handler() { this.update(); } },
        'height': { handler() { this.update(); } }
    },
    methods: {
        update() {
            this.chart.update();
        }
    },
    mounted: function () {
        this.canvas = this.$el.childNodes[0];
        const ctx = this.canvas.getContext('2d');
        if (ctx == null) {
            console.error('Could not acquire context from canvas: ', this.canvas);
            return;
        }
        //console.log(this.canvas, this.canvas.getContext('2d'), this.type, this.chartData, { labels: this.labels, datasets: this.datasets }, this.options);
        if (this.canvas.getContext('2d') != null)
            this.chart = new Chart(ctx, {
                type: this.type,
                data: (this.labels ? { labels: this.labels, datasets: this.datasets } : this.chartData),
                options: this.options
            });
    },
    render: function () {
        return h('div', {
            style: { width: this.width, height: this.height }
        }, h('canvas'));
    }
});
//# sourceMappingURL=index.js.map