import { app } from '../api-server.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: any, res: any) {
  try {
    return app(req, res);
  } catch (err: any) {
    console.error('VERCEL RUNTIME ERROR:', err);
    res.status(500).json({ 
      success: false,
      error: 'Vercel Serverless Runtime Error', 
      details: err.message || String(err),
      stack: err.stack 
    });
  }
}
