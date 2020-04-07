import { CountryInfo } from "../models/CountryInfo";

// helper: add comma to number
export const numberWithComma = (x: number): string =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//helper: string convert to number 
export const toNumber = (str: string): number =>
    parseInt(str.replace(/,/g, ''));

export const getTopOf = (arr: Array<CountryInfo>, info: string, top: number): Array<CountryInfo> =>
    arr.sort((a, b) => parseInt(b[info].replace(/,/g, '')) - parseInt(a[info].replace(/,/g, ''))).slice(0, top);

// helper: get list of countries names 
/* private getNames(arry: CountryInfo[]): string[] {
  let names: string[];
  arry.forEach((c) => names.push(c.country_name))
  return names;
} */

// helper: get the total
export const totalOf = (arr: Array<CountryInfo>, str: string): number =>
    arr.map((c) => parseInt(c[str].replace(/,/g, ''))).reduce((pValue, cValue) => pValue + cValue, 0);

