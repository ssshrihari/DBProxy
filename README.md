# DBProxy
Generic Database Proxy
======================

Table of Contents
-----------------

1.  Introduction
2.  Installation
3.  Usage
4.  API Endpoints
5.  Testing
6.  Concurrent Environment Considerations
7.  Future Improvements

Introduction
------------

This project is a Node.js REST API serving as a generic database proxy for CRUD operations on a SQL database. It translates REST language into valid SQL statements, utilizing Seqlite of your choice. It is designed to ingest schema files to construct the database schema at each server startup.

Installation
------------

Before you start, ensure you have installed Node.js, npm and your preferred SQL server.

To install the project, follow these steps:

1.  Clone the repository to your local machine:


`https://github.com/ssshrihari/DBProxy.git`


1.  Install the dependencies:


`npm install`

Usage
-----

To start the server, run:

`npm run start`

You can now access the API on localhost port 3000


API Endpoints
-------------

| Method | URL | Description |
| --- | --- | --- |
| `POST` | `/:collection` | Create a new entry in the specified collection |
| `GET` | `/:collection/:id` | Retrieve an entry by id from the specified collection |
| `POST` | `/:collection/:id` | Update an existing entry by id in the specified collection |
| `DELETE` | `/:collection/:id` | Delete an existing entry by id in the specified collection |

Testing
-------

To run the automated tests, execute the following command:


`npm test`

Concurrent Environment Considerations
-------------------------------------

This project currently doesn't implement specific mechanisms for concurrent environments. If intended to run in such an environment, we would need to consider:

-   Implementing connection pooling for the database to manage and maintain multiple active connections efficiently.
-   Optimizing the CRUD operations for concurrent requests by employing techniques such as transactions or locks to ensure data integrity.
-   Using clustering in Node.js to utilize multiple cores of the machine, which could increase throughput and performance.

Future Improvements
-------------------

-   Extend API to handle more complex queries.
-   Add more comprehensive error handling and logging.
-   Implement an authentication layer for secure data handling.

