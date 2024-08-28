import express, { Express, Request, Response } from 'express';

export const router = express.Router();

router.get('/', (_req, res) => {
    res.send('server is up and running');
});