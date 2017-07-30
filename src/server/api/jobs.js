import app from '../app';
import Job from '../models/job';

const validateJob = async (req) => {
  const job = req.body;
  req.checkBody('title', 'Title is required.').notEmpty();
  req.checkBody('address.city', 'City is required.').notEmpty();
  req.checkBody('address.state', 'State is required.').notEmpty();
  req.checkBody('address.zipcode', 'Invalid zipcode.').notEmpty().isInt();
  req.checkBody('contact.name', 'Contact name is required.').notEmpty();
  req.checkBody('businessCategories', 'Business Category is required.').notEmpty();
  if (job.contact.phone.length > 0) {
    req.checkBody('contact.phone', 'Invalid phone number.').isInt();
  }
  if (job.contact.email) {
    req.checkBody('contact.email', 'Invalid email address.').isEmail();
  }


  let errors = '';
  await req.getValidationResult().then((result) => {
    errors = result.useFirstErrorOnly().array();
  });

  // Additional validationErrors
  if (!job.contact.email && job.contact.phone.length === 0) {
    errors.push({
    //  param: '',
      msg: 'Contact phone or email address is required.',
    });
  }
  return errors;
};

app.post('/api/job', async (req, res) => {
  try {
    const errors = await validateJob(req);
    if (errors.length > 0) {
      console.log(`Invalid job, err=${errors}`);
      res.status(409).send(errors);
      return;
    }
    const job = await Job.create(req.body);
    console.log(`Created valid job, id=${job.id}`);
    res.status(200).send(job);
  } catch (err) {
    // if (err.code === 'INVALID') {
    //   res.status(409).send(err.message);
    // }
    console.log(`Error when create job, err=${err}`);
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
