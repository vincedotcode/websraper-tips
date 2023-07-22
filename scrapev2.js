const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeVitibet() {
    const url = 'https://www.vitibet.com/index.php?clanek=quicktips&sekce=fotbal&lang=en';

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(response.data);
        const rows = $('table tr').slice(2);  // Skip the first two non-match rows

        const data = [];

        rows.each((index, row) => {
            const date = $(row).find('td').eq(0).text().trim();
            const homeTeam = $(row).find('td').eq(1).text().trim();
            const awayTeam = $(row).find('td').eq(2).text().trim();
            let tip = $(row).find('td').eq(9).text().trim();  // Get the tip from the tenth column

            // Translate the tip
            switch (tip) {
                case '1':
                    tip = 'Home win';
                    break;
                case '2':
                    tip = 'Away win';
                    break;
                case '10':
                    tip = 'Double chance home win or draw';
                    break;
                case '02':
                    tip = 'Double chance away win or draw';
                    break;
                default:
                    tip = 'N/A';
                    break;
            }

            data.push({
                date,
                homeTeam,
                awayTeam,
                tip
            });
        });

        // Filter out rows with invalid or missing data
        return data.filter(row => row.homeTeam && row.awayTeam);
    } catch (error) {
        console.error(`Error while scraping ${url}:`, error.message);
        return null;
    }
}

module.exports = {
    scrapeVitibet
};
