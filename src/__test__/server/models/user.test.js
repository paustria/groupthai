import config from '../../../../config';
import User from 'server/models/user';
import { connectDB } from '../utils';

test('user should be invalid if name is empty', done => {
  connectDB();

  const u = new User();
  u.validate(function(err) {
    expect(err.errors.name).not.toBeNull();
    done();
  });
});
