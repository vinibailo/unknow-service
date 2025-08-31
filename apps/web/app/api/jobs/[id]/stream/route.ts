import { QueueEvents } from 'bullmq';
import type { NextRequest } from 'next/server';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT || 6379),
};

const names = ['pdf', 'image', 'video', 'ai'] as const;

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const events = names.map((name) => new QueueEvents(name, { connection }));

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const ev of events) {
        await ev.waitUntilReady();
        ev.on('progress', (data) => {
          if (data.jobId === id) {
            const payload = `data: ${JSON.stringify({ progress: data.data })}\n\n`;
            controller.enqueue(new TextEncoder().encode(payload));
          }
        });
        ev.on('completed', (data) => {
          if (data.jobId === id) {
            const payload = `data: ${JSON.stringify({ status: 'completed' })}\n\n`;
            controller.enqueue(new TextEncoder().encode(payload));
          }
        });
      }
    },
    async cancel() {
      for (const ev of events) {
        await ev.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
