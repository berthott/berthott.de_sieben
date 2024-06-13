export function log(context: string, message: string, ...args: any[]) {
  if (process.env.NEXT_PUBLIC_DEBUG && process.env.NEXT_PUBLIC_DEBUG !== 'false' && process.env.NEXT_PUBLIC_DEBUG !== '0') {
    console.log(`[${context}] ${message}`, ...args);
  }
}