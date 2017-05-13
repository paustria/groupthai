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
// */
// app.get('/api/jobs', async function (req, res) {
//     const { name, email, message } = req.body;
//     try {
//         const jobs = await JobPosting.find();
//         res.status(200).send(jobs);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });
