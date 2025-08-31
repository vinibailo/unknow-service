import { Worker } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import { exec as _exec } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT || 6379),
};

const prisma = new PrismaClient();

async function handlePdf(job: any) {
  const files: string[] = job.data.files;
  const output = `/tmp/${job.id}.pdf`;
  await prisma.job.update({ where: { id: job.id }, data: { status: 'IN_PROGRESS', progress: 0 } });
  await job.updateProgress(50);
  await exec(`gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -sOutputFile=${output} ${files.join(' ')}`);
  await job.updateProgress(100);
  await prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED', progress: 100, outputFileId: output } });
  return { output };
}

async function handleImage(job: any) {
  const { file, width, height } = job.data;
  const output = `/tmp/${job.id}.jpg`;
  await prisma.job.update({ where: { id: job.id }, data: { status: 'IN_PROGRESS', progress: 0 } });
  await job.updateProgress(50);
  const size = `${width || ''}x${height || ''}`;
  await exec(`convert ${file} -resize ${size} ${output}`);
  await job.updateProgress(100);
  await prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED', progress: 100, outputFileId: output } });
  return { output };
}

async function handleVideo(job: any) {
  const { file, bitrate } = job.data;
  const output = `/tmp/${job.id}.mp4`;
  await prisma.job.update({ where: { id: job.id }, data: { status: 'IN_PROGRESS', progress: 0 } });
  await job.updateProgress(50);
  await exec(`ffmpeg -i ${file} -b:v ${bitrate || '1000k'} ${output}`);
  await job.updateProgress(100);
  await prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED', progress: 100, outputFileId: output } });
  return { output };
}

async function handleAi(job: any) {
  await prisma.job.update({ where: { id: job.id }, data: { status: 'COMPLETED', progress: 100 } });
  await job.updateProgress(100);
  return {};
}

export function main() {
  new Worker('pdf', handlePdf, { connection });
  new Worker('image', handleImage, { connection });
  new Worker('video', handleVideo, { connection });
  new Worker('ai', handleAi, { connection });
  console.log('Worker ready');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
