



const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.get('/api/scrape', async (req, res) => {
  console.log('Scrape endpoint called');
console.log(req.query.q)
  try {
    const query = req.query.q || 'golang';
    const maxPages = 3;
    let page = 1;
    const courses = [];

    while (page <= maxPages) {
      const searchUrl = `https://www.classcentral.com/search?q=${encodeURIComponent(query)}&page=${page}`;
      console.log(`Fetching: ${searchUrl}`);

      const response = await axios.get(searchUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });

      const $ = cheerio.load(response.data);
      const items = $('a.color-charcoal.course-name[data-track-click*="course_click"]');


      if (items.length === 0) {
        console.log('No more courses found. Stopping at page', page);
        break;
      }

      items.each((i, el) => {
        const dataTrack = $(el).attr('data-track-props');
        const link=$(el).attr('href');
        console.log('the course link is',link)
        overalllink='https://www.classcentral.com'+link
        console.log('the url to be put in the object',overalllink)
        try {
          const parsed = JSON.parse(dataTrack || '{}');
          parsed['link']=overalllink
          console.log('the object after adding the link',parsed)
          console.log('items element inside items for this specific course' ,dataTrack)
          console.log('req value, item value ',req.query.level,parsed.course_level)
          if (parsed.course_level==req.query.level && req.query.level!=''){
          courses.push(parsed);
        }
        else if(req.query.level==''){
          courses.push(parsed)
        }
        } catch (err) {
          console.warn('Failed to parse course data:', err.message);
        }
      });

      page++;
      await new Promise(resolve => setTimeout(resolve, 1500)); // polite delay
    }

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



