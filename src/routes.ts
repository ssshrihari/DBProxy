import { Router } from "express";
import { DbProxy } from "./db";

const router = Router();


router.post('/:collection', async (request, response) => {
    const app = request.app;
    const collection = request.params.collection;
    const dbProxy: DbProxy = app.get("dbProxy");
    try {
        const row = await dbProxy.createRow(collection, request.body);
        response.send(row);
    } catch (e: any) {
        response.status(400).json({ error: e.message });
    }
});

router.get('/:collection/:id', async (request, response) => {
    const app = request.app;

    const collection = request.params.collection;
    const dbProxy: DbProxy = app.get("dbProxy");
    try {
        response.send(await dbProxy.getRow(collection, request.params.id));
    } catch (e: any) {
        response.status(400).json({ error: e.message });
    }
});

router.post('/:collection/:id', async (request, response) => {
    const app = request.app;

    const collection = request.params.collection;
    const rowId = request.params.id;
    const body = request.body;
    const dbProxy: DbProxy = app.get("dbProxy");
    try {
        response.send(await dbProxy.updateRow(collection, rowId, request.body));
    } catch (e: any) {
        response.status(400).json({ error: e.message });
    }
});

router.delete('/:collection/:id', async (request, response) => {
    const app = request.app;

    const collection = request.params.collection;
    const rowId = request.params.id;
    const dbProxy: DbProxy = app.get("dbProxy");
    try {
        await dbProxy.deleteRow(collection, rowId);
        response.status(200);
    } catch (e: any) {
        response.status(400).json({ error: e.message });
    }
});

export { router };