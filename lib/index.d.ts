import { Chart } from 'chart.js';
declare const _default: {
    props: {
        type: string;
        labels: any;
        datasets: any;
        chartData: ChartData;
        options: ChartOptions;
        width: {
            type: StringConstructor;
            default: string;
        };
        height: {
            type: StringConstructor;
            default: string;
        };
    };
    data(): {
        canvas: HTMLCanvasElement;
        chart: any;
    };
    watch: {
        chartData: {
            deep: boolean;
            handler(): void;
        };
        type: {
            handler(): void;
        };
        labels: {
            handler(): void;
        };
        datasets: {
            deep: boolean;
            handler(): void;
        };
        options: {
            deep: boolean;
            handler(): void;
        };
        width: {
            handler(): void;
        };
        height: {
            handler(): void;
        };
    };
    methods: {
        update(): void;
    };
    mounted: () => void;
    render: () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
};
export default _default;
declare type cdatasets = Chart.ChartDataSets;
export interface ChartDataSets extends cdatasets {
    readonly data: cdatasets["data"];
}
export interface ChartData extends Chart.ChartData {
    readonly labels: Chart.ChartData["labels"];
    readonly datasets: Chart.ChartData["datasets"];
}
export interface ChartOptions extends Chart.ChartOptions {
}
export interface ChartConfiguration extends Chart.ChartConfiguration {
}
//# sourceMappingURL=index.d.ts.map