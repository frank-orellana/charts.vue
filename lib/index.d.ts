import { Chart } from 'chart.js';
import * as chart from 'chart.js';
declare type ChartType = "line" | "bar" | "bubble" | "doughnut" | "pie" | "polarArea" | "radar" | "scatter";
declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    labels: {
        type: ArrayConstructor;
    };
    datasets: {
        type: ArrayConstructor;
    };
    chartData: {
        type: ObjectConstructor;
    };
    options: {
        type: ObjectConstructor;
    };
    width: {
        type: StringConstructor;
        default: string;
    };
    height: {
        type: StringConstructor;
        default: string;
    };
}, unknown, {
    canvas: HTMLCanvasElement;
    chart: Chart<ChartType, unknown[], unknown>;
}, {}, {
    update(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: string;
    width: string;
    height: string;
} & {
    labels?: unknown[] | undefined;
    datasets?: unknown[] | undefined;
    chartData?: Record<string, any> | undefined;
    options?: Record<string, any> | undefined;
}>, {
    type: string;
    width: string;
    height: string;
}>;
export default _default;
export interface ChartData extends chart.ChartData {
    readonly labels: chart.ChartData["labels"];
    readonly datasets: chart.ChartData["datasets"];
}
export interface ChartConfiguration extends chart.ChartConfiguration {
}
//# sourceMappingURL=index.d.ts.map