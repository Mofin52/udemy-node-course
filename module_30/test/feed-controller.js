const expect = require("chai").expect;
const mongoose = require("mongoose");

const User = require("../models/user");
const FeedController = require("../controllers/feed");
const mongoTestConnect = require("../sensitive").mongoTestConnect;

describe("Feed controller", function () {
  before(function (done) {
    mongoose
      .connect(mongoTestConnect)
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "123456",
          name: "Tester",
          posts: [],
          _id: "5c0f66b979af55031b34728a",
        });
        return user.save();
      })
      .then(() => done());
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => mongoose.disconnect())
      .then(() => done());
  });

  it("should add a created post to the posts of the creator", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "A test Post",
      },
      file: {
        path: "Test image path",
      },
      userId: "5c0f66b979af55031b34728a",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done(); // gets called at the end of async test
    });
  });
});
