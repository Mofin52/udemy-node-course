exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First post", content: "This is a first post!" }],
  });
};

exports.createPost = (req, res, next) => {
  // Create post in database
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  res.status(201).json({
    message: "Post created successfully",
    post: { id: Date.now(), title, content },
  });
};
