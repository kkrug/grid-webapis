const moment = require("moment");
const forEach = require("lodash/forEach");

const { countUsers, bookmarkStatsDB } = require("../models/admin-stats");

exports.getBookmarkStats = async () => {
  let bookmarkStats;

  let uires = {};
  let userRes = [];
  const dates = [];
  let counts = [];

  try {
    bookmarkStats = await bookmarkStatsDB();

    const total_bookmarks = bookmarkStats.total_bookmarks;
    const users = bookmarkStats.users;

    forEach(users, (user) => {
      console.log("user", user);
      userRes.push({ uid: user.id, bookmarks_count: user.bookmarks.length });
      counts.push(user.bookmarks.length);

      forEach(user.bookmarks, (bookmark) => {
        dates.push(moment(bookmark.added_date));
      });
    });

    dates.sort((a, b) => a - b);

    const max = Math.max(...counts);

    // uires.dates = dates;

    var currentDate = moment();
    var startDate = moment("2022-01-01T00:00:00");

    const bookmarks_per_month = [];
    let minCount = 0;
    let maxCount = 0;
    let minCountMonth = null;
    let maxCountMonth = null;
    const highLowBookmarksMonth = {};

    for (i = startDate; i <= currentDate; i = moment(i).add(1, "M")) {
      let monthCount = 0;
      forEach(dates, (date) => {
        if (date.isBetween(i, moment(i).add(1, "M"), "days", "[)")) {
          monthCount++;
        }
      });

      if (i == startDate) {
        minCount = monthCount;
        maxCount = monthCount;
        minCountMonth = i.month() + 1 + "/" + i.year();
        maxCountMonth = i.month() + 1 + "/" + i.year();
      } else if (monthCount < minCount) {
        minCount = monthCount;
        minCountMonth = i.month() + 1 + "/" + i.year();
      } else if (monthCount > maxCount) {
        maxCount = monthCount;
        maxCountMonth = i.month() + 1 + "/" + i.year();
      }

      bookmarks_per_month.push({
        month: i.month() + 1 + "/" + i.year(),
        count: monthCount,
      });

      highLowBookmarksMonth.low = { month: minCountMonth, count: minCount };
      highLowBookmarksMonth.high = { month: maxCountMonth, count: maxCount };
    }

    uires.total_bookmarks = total_bookmarks;
    uires.max_bookmarks_single_user = max;
    uires.high_low_bookmarks_month = highLowBookmarksMonth;

    uires.bookmarks_per_month = bookmarks_per_month;
    uires.users = userRes;
  } catch (error) {
    console.log("Error in getting documents from DB :", error);
    throw error;
  }
  return uires;
};

exports.getFBAuthStats = async () => {
  let users;
  let result = {};
  try {
    users = await countUsers([], 0);
    result.total_users = users.length;
    result.signup_per_month = [];

    var currentDate = moment();
    var startDate = moment("2021-08-01T00:00:00");

    for (i = startDate; i <= currentDate; i = moment(i).add(1, "M")) {
      let monthCount = 0;
      let permonthlogbackinCount = 0;

      users.map((user) => {
        let signupDate = moment(user.metadata.creationTime);
        let lastSignInDate = moment(user.metadata.lastSignInTime);

        if (signupDate.isBetween(i, moment(i).add(1, "M"), "days", "[)")) {
          monthCount++;

          if (lastSignInDate.isAfter(signupDate)) {
            // console.log(signupDate.format() + " : " + lastSignInDate.format());
            permonthlogbackinCount++;
          }
        }
      });

      result.signup_per_month.push({
        month: i.month() + 1 + "/" + i.year(),
        count: monthCount,
        users_logged_back_in: permonthlogbackinCount,
      });

      console.log(
        "Total users signed up for %s/%s = %s",
        i.month() + 1,
        i.year(),
        monthCount
      );

      let loginAfterSignUpCount = 0;
      let signup_signin_delta = [];
      users.map((user) => {
        let signupDate = moment(user.metadata.creationTime);
        let lastSignInDate = moment(user.metadata.lastSignInTime);

        if (lastSignInDate.isAfter(signupDate)) {
          // console.log(signupDate.format() + " : " + lastSignInDate.format());
          loginAfterSignUpCount++;

          const deltaAccurate = moment
            .duration(lastSignInDate.diff(signupDate))
            .asDays();
          //.toFixed(2);
          const delta = Math.trunc(deltaAccurate);

          signup_signin_delta.push(delta + " days");
        }
      });

      result.loggedin_after_signiup_count = loginAfterSignUpCount;
      result.signup_signin_delta = signup_signin_delta;
      console.log("loginAfterSignUpCount = %s", loginAfterSignUpCount);
    }
  } catch (error) {
    console.log("Error in users from DB :", error);
    throw error;
  }
  return result;
};
