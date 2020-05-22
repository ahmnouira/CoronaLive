/**
 * cases: Confirmed per country
 * 
 * deaths: deaths per country
 * 
 * total_recovered:  recoverd per country
 */

export class CountryInfo {

    active_cases?: string;   // active nows
    cases?: string;          // confirmed
    country_name?: string;
    deaths?: string;
    total_recovered?: string;
    key?: string;
    new_cases?: string;     // new cases
    new_deaths?: string;
    region?: string;
    serious_critical?: string;
    total_cases_per_1m_population?: string;


    constructor() {

    }

}