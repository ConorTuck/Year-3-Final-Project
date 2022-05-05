# Year-3-Final-Project
The repository for my year 3 project.

# About this project
For my finaly year project at university, i decided to create a web application that that is able to chart sentiment data for multiple low market capitalisation assets. This project can be reused for all types of assets if necessary. 

![image](https://user-images.githubusercontent.com/59373724/166870623-1e53ac8c-79cb-4f21-86b4-7799853f60b7.png)


# Getting Started
This project was made using nodeJS as the runtime environment, in order to get this to execute please ensure you have installed the latest version - https://nodejs.org/en/

## Option 1.
This is the easiest method of getting this project up and running. Just change your terminals directory into the backend folder and type "npm start". This is a custom node script i implemented and should start the backend server. From here you should be able to see two new lines appear. 

![image](https://user-images.githubusercontent.com/59373724/166869984-15c88de2-a749-4054-a7f8-ec7b71f274c4.png)

If the port number is displayed and the database is connected then move to a browser and use the URL - http://localhost:8000/.

## Option 2.
Precede with the beggining of option 1 where you start the backend server. From here open a new directory into the frontend folder and type "npm start". This should automaticaly run reacts development server that should force open the web app on your current browser. If for some reason react's development server doesnt open the web app immediately please use this URL - http://localhost:3000/.

# Final Note
Its very important that the dataCollection JS file is not executed. This ensures that the current dataCollection file running on the server doesnt get rate limited and the database doesnt end up with duplicate results. 

If you must run this file please ensure that it is not left running on each hour mark. Each hour, data is uploaded to the cloud so please ensure to watch out for the time!
