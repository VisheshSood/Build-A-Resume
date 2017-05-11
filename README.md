##Build A Resume##
Our project allows users to enter job links from any website, to allow us to parse the job description to create a suited resume for the job application.



## Architecture ##
This project is divided into 2 distinct parts.

#### Server  ####
Our server runs on Node's express environment. We use Python to crawl website entered by the user to search for keywords, and returns a list of keywords that the job is looking for. We also have a user database stored using MongoDB allowing resumes and user data to be securely stored.

#### Frontend ####
We use Angular JS as our front end.

