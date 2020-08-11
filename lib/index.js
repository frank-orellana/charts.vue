import { Chart, Arc, BarController, BubbleController, CategoryScale, Filler, Legend, Line, LineController, LinearScale, PieController, Point, PolarAreaController, RadarController, RadialLinearScale, Rectangle, ScatterController, Title, Tooltip } from 'chart.js';
import { h } from 'vue';
Chart.register(LineController, Line, Point, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend, BarController, Rectangle, RadarController, RadialLinearScale, PieController, Arc, PolarAreaController, BubbleController, ScatterController);
class data {
}
data.canvas = null;
data.chart = null;
const params = {
    type: String,
    labels: Array,
    datasets: Array,
    chartData: Object,
    options: Object,
    width: {
        type: String,
        default: '400'
    },
    height: {
        type: String,
        default: '400'
    },
};
export default {
    props: {
        type: String,
        labels: Array,
        datasets: Array,
        chartData: Object,
        options: Object,
        width: {
            type: String,
            default: '400px'
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
                const _this = this;
                _this.chart.data = _this.chartData;
                _this.update();
            }
        },
        'type': {
            handler() {
                const _this = this;
                _this.chart.config.type = _this.type;
                _this.update();
            }
        },
        'labels': {
            handler() {
                const _this = this;
                _this.chart.data.labels = _this.labels;
                _this.update();
            }
        },
        'datasets': {
            deep: true,
            handler() {
                const _this = this;
                _this.chart.data.datasets = _this.datasets;
                _this.update();
            }
        },
        'options': {
            deep: true,
            handler() {
                const _this = this;
                _this.chart.options = _this.options;
                _this.update();
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
        const _this = this;
        _this.canvas = _this.$el.childNodes[0];
        const ctx = _this.canvas.getContext('2d');
        if (ctx == null) {
            console.error('Could not acquire context from canvas: ', _this.canvas);
            return;
        }
        console.log(_this.canvas, _this.canvas.getContext('2d'), _this.type, _this.chartData, { labels: _this.labels, datasets: _this.datasets }, _this.options);
        if (_this.canvas.getContext('2d') != null)
            _this.chart = new Chart(ctx, {
                type: _this.type,
                data: _this.labels ? { labels: _this.labels, datasets: _this.datasets } : _this.chartData,
                options: _this.options
            });
    },
    render: function () {
        const _this = this;
        return h('div', {
            style: { width: _this.width, height: _this.height }
        }, h('canvas'));
    }
};
//# sourceMappingURL=index.js.map