import app from '../app';
import Job from '../models/job';

app.post('/api/job', async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).send(job);
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
      title: 'Job Title 1',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        zip: '90002',
      },
      contact: {
        phone: null, // Must have at least phone or email.
        email: null,
        website: null,
        name: 'Alex',
      },
      status: 'active', // ENUM
      type: 'restaurant', // ENUM
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312, // User ID
    },
    {
      title: 'Job Title 2',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        zip: '90002',
      },
      contact: {
        phone: null,
        email: null,
        website: null,
        name: 'Phil',
      },
      status: 'inactive',
      type: 'restaurant',
      description: 'Job description 2',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312,
    },
    {
      title: 'Job Title 3',
      location: {
        city: 'Encino',
        state: 'CA',
        zip: '91316',
      },
      contact: {
        phone: null, // Must have at least phone or email.
        email: null,
        website: null,
        name: 'Ashley',
      },
      status: 'active',
      type: 'nursing', // ENUM
      description: 'description 3',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312, // User ID
    },
    {
      title: 'Job Title 4',
      location: {
        city: 'Beverly Hills',
        state: 'CA',
        zip: '92134',
      },
      contact: {
        phone: null, // Must have at least phone or email.
        email: null,
        website: null,
        name: 'Bob',
      },
      status: 'active',
      type: 'massage', // ENUM
      description: 'description 4',
      created_date: 1495514492,
      start_date: 1495514492,
      expired_date: 1498192891,
      created_by: 12312, // User ID
    },
  ];

  res.status(200).json({ jobs });
    // const { name, email, message } = req.body;
    // try {
    //     const jobs = await Job.find();
    //     res.status(200).send(jobs);
    // } catch (err) {
    //     res.status(500).send(err.message);
    // }
});
