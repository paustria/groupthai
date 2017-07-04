import app from '../app';
import Job from '../models/job';

app.post('/api/job', (req, res) => {
  const { title } = req.body;
  console.log(`Job's title is ${title}.`);

  try {
    // await User.create(
    Job.create(
      {
        title: `${title}`,
      },
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/**
* Return a list of jobs.
* TODO: Flag features to report that the job might not available.
*/
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find({}, {}, { limit: 10000, skip: 0 }).lean();
    res.status(200).json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});
