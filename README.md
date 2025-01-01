This project uses Selenium WebDriver to scrape trending topics from the X (formerly Twitter) website and stores them in a MongoDB database. It also provides an API server to fetch the scraped trends from the database and display them in a React frontend.

The project demonstrates the integration of backend automation (with Selenium), a database for persistence (MongoDB), and a frontend to showcase the results.

# Twitter login credentials
USERNAME=your_x_username
PASSWORD=your_x_password

# MongoDB configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/trendsDB?retryWrites=true&w=majority

# Port configuration for the backend server
PORT=3000
