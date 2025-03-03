type Tracking = {
  id: number;
  ip: string;
  language: string;
  platform: string;
  os: string;
  browser: string;
  device: string;
}[];

export type ChartData = {
  name: string;
  value: number;
}[];

export function getFormattedTracking(tracking: Tracking) {
  // init map
  const browser: Map<string, number> = new Map();
  const device: Map<string, number> = new Map();
  const platform: Map<string, number> = new Map();
  const language: Map<string, number> = new Map();
  const os: Map<string, number> = new Map();

  tracking.forEach((v) => {
    browser.set(v.browser, (browser.get(v.browser) || 0) + 1);
    device.set(v.device, (browser.get(v.device) || 0) + 1);
    platform.set(v.platform, (browser.get(v.platform) || 0) + 1);
    language.set(v.language, (browser.get(v.language) || 0) + 1);
    os.set(v.os, (browser.get(v.os) || 0) + 1);
  });

  // Map을 객체 배열로 변환
  const formatMapToArray = (map: Map<string, number>) => {
    return Array.from(map, ([name, value]) => ({ name, value }));
  };

  const browserData = formatMapToArray(browser);
  const deviceData = formatMapToArray(device);
  const platformData = formatMapToArray(platform);
  const languageData = formatMapToArray(language);
  const osData = formatMapToArray(os);

  return {
    browserData,
    deviceData,
    platformData,
    languageData,
    osData,
  };
}
