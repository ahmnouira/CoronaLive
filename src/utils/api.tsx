const API = 'coronavirus-monitor.p.rapidapi.com'
const KEY = 'ad52b86c33mshca1e9a04685f047p18c453jsn382f736f82be'

export const casesByCountry = async () => {
    
    try {
        const res = await fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php
        `, {
            headers: {
                'x-rapidapi-host': API,
                'x-rapidapi-key': KEY,
                Accpet: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const resJson = await res.json();
        return resJson;
    }
    catch (err) {
        return console.error(err);
    }
}
