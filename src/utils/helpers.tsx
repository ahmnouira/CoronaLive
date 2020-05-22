import { CountryInfo } from "../models/CountryInfo";

// helper: add comma to number
export const numberWithComma = (x: number): string =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

//helper: string convert to number 
export const toNumber = (str: string): number =>
    parseInt(str.replace(/,/g, ''));

export const getTopOf = (arr: Array<CountryInfo>, info: string, top: number): Array<CountryInfo> =>
    arr.sort((a, b) => toNumber(b[info]) - toNumber(a[info])).slice(0, top);

// helper: get list of countries names 
/* private getNames(arry: CountryInfo[]): string[] {
  let names: string[];
  arry.forEach((c) => names.push(c.country_name))
  return names;
} */

// helper: get the total
export const totalOf = (arr: Array<CountryInfo>, str: string): number => {
    return arr.map((c) => toNumber(c[str])).reduce((pValue, cValue) => pValue + cValue, 0);
}

