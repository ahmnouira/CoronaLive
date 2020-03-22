const API = 'coronavirus-monitor.p.rapidapi.com'
const KEY = 'ad52b86c33mshca1e9a04685f047p18c453jsn382f736f82be'

export const getAffectedCountries = async () => {
    const response = await fetch(
        `https://https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php`, {
        headers: {
            'x-rapidapi-host': API,
            'x-rapidapi-key': KEY,
            Accpet: 'application/json',
            'Content-Type': 'application/json'
        },
    }
    )
    const data = await response.json().catch(err => console.log(err));
    return data;
};


export const casesByCountry = async () => {
    const response = await fetch(
        `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php`, {
        headers: {
            'x-rapidapi-host': API,
            'x-rapidapi-key': KEY,
            Accpet: 'application/json',
            'Content-Type': 'application/json'
        },
    }
    );
    const data = await response.json().catch(err => console.log(err));
    return data;
}


/* export const fetchWeather = async woeid => {
    const response = await fetch(
        `https://www.metaweather.com/api/location/${woeid}/`,
    );
    const { title, consolidated_weather } = await response.json();
    const { weather_state_name, the_temp } = consolidated_weather[0];

    return {
        location: title,
        weather: weather_state_name,
        temperature: the_temp,
    };
};

*/