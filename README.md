# Discom

<img width="1440" alt="image" src="https://github.com/Zakeriya23/Discom/assets/87618816/4b932454-36ba-413a-b5e8-cf894384fdbf">

<img width="1440" alt="image" src="https://github.com/Zakeriya23/Discom/assets/87618816/b4c6a523-7854-43df-9ca1-c5b8c5872386">

# Project Documents
These documents detail planned features, the architecture, and tests for the Discom project. All documents authored by Ryan Sharma
## Feature Doc
https://docs.google.com/document/d/16YSElNFSWz8nKkKqTConXC1f5BQUMiB4dfku7QSQWI8/edit?usp=sharing

## Architecture Doc
https://docs.google.com/document/d/1RPzxg4W7CiDWTBJH-xaIu1Ea5ivEdKBtpUsNiKV-F4I/edit?usp=sharing

## Testing Plan Doc
https://docs.google.com/document/d/1EA6ZdBJdSoSdXg_ELWxdklLAcqgO2U1Zf8kVm-Oeq3g/edit?usp=sharing

# Project 
This section will detail how Discom was implemented.

Overview: This project was implemented using the MERN stack method, with the front end being powered by React, with communications from Axios. Node and React for Javascript were used to implement the backend, and hosted the server, which communicated and fetched resources from and via MongoDB
## Frontend
The client side of this application was implemented using Node and React for Javascript. The frontend can be described as a the webpage, (designed in App.css) with other Javascript 'interactables'. To accomplish a HTTP client that will communicate with the backend, we used Axios in conjunction with React. Other items for the general user interface such as icons and transportation of user authentication information can be found under client/src.
## Backend
The server of Discom is powered by Express, and connects to a database provided by MongoDB (this was customized via Mongoose). The server first connects to MongoDB to acquire authentication information for user logins. Most importantly, the server hosts and creates the web socket through which users communicate. Other conncection based features are communicated to the frontend in real-time via Express such as user connection messages. Discom currently runs only on a machine' localhost.
