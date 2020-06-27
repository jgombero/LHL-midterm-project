# User Routes (/user)
Login
* app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

Logout*
* router.post('/logout)

Create User
* router.post('/', (req, res) => {  })
* insert user into db
* assign cookie
* reload header with information

Load user details / profile
* Don't think we need for MVD


# API Routes (/api)
Load main page
* router.get('/') OR ('/products')
getAllListings function
pass back to Ajax
Render to the page w/ jquery function

Filter results
* router.get('/')
* includes search results

Search items 
* router.get('/')
* includes search results


Clear Filter
* router.get('/')
* includes search results (none)

View item details
* router.get('/product/:productID)

Save item*
* router.post('/product/:productID/save')
- [ ] Ask mentor

Delete Item*
* router.post('/product/:id/delete)
- [ ] Add deleted colunn to db


Send message OR reply*
* router.post('/product/:id/new-message')

Create Item*
* router.post('/product) {
}

Load Messages*
* router.get('/messages)

<!-- Respond to message* -->
<!-- * router.post('/messages/:id/reply) -->


(*) - must be logged in 
