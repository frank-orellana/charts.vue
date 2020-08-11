import Chart from 'chart.js';
import { h } from 'vue';
class data {
}
data.ctx = null;
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
            ctx: null,
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
        _this.ctx = _this.$el;
        console.log(_this.ctx, _this.type, _this.chartData, _this.options);
        _this.chart = new Chart(_this.ctx, {
            type: _this.type,
            data: _this.labels ? { labels: _this.labels, datasets: _this.datasets } : _this.chartData,
            options: _this.options
        });
    },
    render: function () {
        const _this = this;
        return h('canvas', {
            style: { width: _this.width, height: _this.height }
        });
    }
};
//# sourceMappingURL=index.js.map