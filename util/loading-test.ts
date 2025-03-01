export default async function LoadingTest(time: number) {
  return await new Promise((r) => setTimeout(r, time));
}
