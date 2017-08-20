import mongoose from 'mongoose';
import Promise from 'bluebird';
import User from 'server/models/user';
import config from '../../../../config';
import { connectDB } from '../utils';

mongoose.Promise = Promise;

test('user should be invalid if name is empty', done => {
  connectDB();

  const u = new User();
  u.validate(function(err) {
    expect(err.errors.name).not.toBeNull();
    done();
  });
});
