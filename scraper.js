const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeTable() {
  const url = 'https://xbetting.co.uk/free-betting-tips/';

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const tableRows = $('#table-2 tbody tr');

    const data = [];

    tableRows.each((index, row) => {
      const rowData = {};

      const time = $(row).find('td:nth-child(1)').text().trim();
      const sport = $(row).find('td:nth-child(2) img').attr('title') || '';
      const competition = $(row).find('td:nth-child(3)').text().trim();
      const teams = $(row).find('td:nth-child(4)').text().trim();
      const tips = $(row).find('td:nth-child(5)').text().trim();
      const odds = $(row).find('td:nth-child(6)').text().trim();

      rowData.time = time;
      rowData.sport = sport;
      rowData.competition = competition;
      rowData.teams = teams;
      rowData.tips = tips;
      rowData.odds = odds;

      data.push(rowData);
    });

    return data;
  } catch (error) {
    console.error(`Error while scraping ${url}:`, error.message);
    return null;
  }
}

module.exports = {
  scrapeTable
};
