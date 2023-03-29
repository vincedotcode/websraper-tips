const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { scrapeTable } = require('./scraper');

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Website Scraper API',
      version: '1.0.0',
      description: 'An API to scrape the table data from a specific website',
    },
  },
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /scrape:
 *   get:
 *     summary: Scrape the table data from the specified website
 *     description: Scrape the table data from the specified website and return it as JSON
 *     responses:
 *       200:
 *         description: Successfully scraped data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 */
app.get('/scrape', async (req, res) => {
  const tableData = await scrapeTable();
  if (tableData) {
    res.json(tableData);
  } else {
    res.status(500).json({ error: 'Failed to scrape the table data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
