export const epochToDate = (epoch) => {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  return d.setUTCSeconds(epoch);
};

/**
 * date = "2016-02-21T02:14:39.000000"
 */
export const dateToEpoch = date =>
  ((new Date(date)).getTime()) / 1000;
