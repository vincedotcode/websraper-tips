const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { scrapeTable } = require('./scraper');
const { sendEmail } = require('./email');
const cors = require('cors');
const { scrapeVitibet } = require('./scrapev2');

const app = express();
app.use(express.json());
// Enable CORS for all origins
app.use(cors());
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

/**
 * @swagger
 * /scrape-vitibet:
 *   get:
 *     summary: Scrape the table data from the vitibet website
 *     description: Scrape the table data from the vitibet website and return it as JSON
 *     responses:
 *       200:
 *         description: Successfully scraped data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                   homeTeam:
 *                     type: string
 *                   awayTeam:
 *                     type: string
 *                   prediction:
 *                     type: string
 *                   odds1:
 *                     type: number
 *                   oddsX:
 *                     type: number
 *                   odds2:
 *                     type: number
 */
app.get('/scrape-vitibet', async (req, res) => {
  const data = await scrapeVitibet();
  if (data) {
      res.json(data);
  } else {
      res.status(500).json({ error: 'Failed to scrape the vitibet data' });
  }
});

/**
 * @swagger
 * /send-email:
 *   post:
 *     summary: Send an email with contact form data
 *     description: Send an email with contact form data to the specified email address
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Error sending email
 */
app.post('/send-email', async (req, res) => {
  try {
    const result = await sendEmail(req.body);

    if (result) {
      res.status(200).send('Email sent successfully');
    } else {
      res.status(500).send('Error sending email');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
