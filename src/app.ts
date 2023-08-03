import express, { Request, Response } from 'express';
import { DbProxy } from './db';
import { startServer } from './express';

const dbProxy = new DbProxy();
dbProxy.loadDatabase().then(()=> {
  startServer(dbProxy);
});

// Gracefully close the database connection when the server is terminated.
process.on('SIGINT', async () => {
  console.log("Closing database connection");
  await dbProxy.closeDatabase();
  console.log("Exiting the process");
  process.exit();
});
