export default class PieData {

    name: string;
    data: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;

    constructor(name: string, data: number, color: string) {
        this.name = name;
        this.data = data;
        this.color = color;
        this.legendFontColor = '#f7f1e3';
        this.legendFontSize = 15;
    }
}
