export default async function handler(req: any, res: any) {
  try {
    const { app } = await import('../api-server');
    return app(req, res);
  } catch (err: any) {
    console.error('VERCEL BOOT/RUNTIME ERROR:', err);
    res.status(500).json({ 
      success: false,
      error: 'Vercel Serverless Boot/Runtime Error', 
      details: err.message || String(err),
      stack: err.stack 
    });
  }
}
