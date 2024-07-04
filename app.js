import express from "express";
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse the body of the request
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new', (req, res) => {
    res.render('new');
});

app.post('/new', (req, res) => {
    const post = { title: req.body.title, content: req.body.content };
    posts.push(post);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    console.log(posts[postId]);
    if (posts[postId]) {
        const post = posts[postId];
        res.render('edit', { post: post, id: postId });
     } else {
         res.status(404).send('Post not found');
     }
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    posts[id].title = req.body.title;
    posts[id].content = req.body.content;
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
