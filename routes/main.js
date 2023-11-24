// Exporting a function that sets up routes for the provided Express app and shop data
module.exports = function(app, shopData) {

    // Route to display a list of all books
    app.get('/list', function(req, res) {
        let sqlquery = "SELECT * FROM books"; // SQL query to retrieve all books from the database
        // Execute SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); // Redirect to the home page if there is an error
            }
            let newData = Object.assign({}, shopData, {availableBooks:result});
            console.log(newData);
            res.render("list.ejs", newData); // Render the 'list.ejs' template with the retrieved data
         });
    });

    // Route to display the home page
    app.get('/',function(req,res){
        res.render('index.ejs', shopData);
    });

    // Route to display the about page
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });

    // Route to display the search page
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
    });

    // Route to display the registration page
    app.get('/register', function (req,res) {
        res.render('register.ejs', shopData);
    });

    // Route to handle registration form submission
    app.post('/registered', function (req,res) {
        // Saving data in the database (Note: Database interaction code is assumed to be elsewhere)
        res.send('Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);
    });

    // Route to display the add book page
    app.get('/addbook', function (req,res) {
        res.render('addbook.ejs', shopData);
    });

    // Route to handle adding a new book to the database
    app.post('/bookadded', function (req,res) {
        // Saving data in the database
        let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)";
        // Execute SQL query
        let newrecord = [req.body.name, req.body.price];
        db.query(sqlquery, newrecord, (err, result) => {
          if (err) {
            return console.error(err.message);
          } else {
            res.send('This book is added to database, name: '
                      + req.body.name + ' price '+ req.body.price);
          }
        });
    });

    // Route to display a list of bargain books
    app.get('/bargainbooks', function(req, res) {
        let sqlquery = "SELECT * FROM books WHERE price < 20"; // SQL query to retrieve bargain books
        // Execute SQL query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./'); 
            }
            res.render('bargainbooks.ejs', { books: result }); // Render the 'bargainbooks.ejs' template and pass the query result as data
         });
    });

    // Route to display search results based on a keyword
    app.get('/search-result', function (req, res) {
        const keyword = req.query.keyword; // Assuming the search keyword is passed as a query parameter

        // Use a single SQL query with a conditional WHERE clause for exact and partial matches
        let sqlquery = "SELECT * FROM books WHERE name = ? OR name LIKE ?";

        // Execute SQL query with both exact and partial match conditions
        db.query(sqlquery, [keyword, '%' + keyword + '%'], (err, result) => {
            if (err) {
                res.redirect('./');
            }
            res.render('search-result.ejs', { books: result, keyword: keyword });
        });
    });

}
