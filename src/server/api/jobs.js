import {app} from '../';
import JobPosting from '../models/jobposting';

app.post('/api/job', (req, res) => {
  const { title } = req.body;
  console.log(`Job's title is ${title}.`);

  try {
    // await User.create(
    JobPosting.create(
      {
        title : `${title}`
      }
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
app.get('/api/jobs', (req, res) => {
  const jobs = [
    {
      title: 'Title 1',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        zip: '90002'
      },
      contact: {
        phone: null, // Must have at least phone or email.
        email: null,
        website: null,
        name: 'Alex'
      },
      status: 'active', // ENUM
      type: 'restaurant', // ENUM
      description: 'สุภาพสตรี ผู้ช่วยในครัว',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312 // User ID
    },
    {
      title: 'Title 2',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        zip: '90002'
      },
      contact: {
        phone: null,
        email: null,
        website: null,
        name: 'Phil'
      },
      status: 'inactive',
      type: 'restaurant',
      description: 'สุภาพสตรี ผู้ช่วยในครัว sss',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312
    },
    {
      title: 'Title 3',
      location: {
        city: 'Encino',
        state: 'CA',
        zip: '91316'
      },
      contact: {
        phone: null, //Must have at least phone or email.
        email: null,
        website: null,
        name: 'Ashley'
      },
      status: 'active',
      type: 'nursing', //ENUM
      description: 'description 3',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312 //User ID
    }
  ];

  res.status(200).json({ jobs: jobs });
    // const { name, email, message } = req.body;
    // try {
    //     const jobs = await JobPosting.find();
    //     res.status(200).send(jobs);
    // } catch (err) {
    //     res.status(500).send(err.message);
    // }
});
