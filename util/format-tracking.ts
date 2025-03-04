type Tracking = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  ip: string;
  language: string;
  platform: string;
  os: string;
  browser: string;
  browserVersion: string;
  device: string;
  utmId: number;
}[];

export type ChartData = {
  name: string;
  value: number;
}[];

export function getFormattedTracking(tracking: Tracking) {
  // 공통 로직을 처리하는 함수
  const getAggregatedData = (key: keyof Tracking[0]) => {
    const map = new Map<string, number>();
    tracking.forEach((v) => {
      const value = v[key];
      const keyString =
        value instanceof Date
          ? value.toISOString().split("T")[0]
          : String(value);
      map.set(keyString, (map.get(keyString) || 0) + 1);
    });
    return Array.from(map, ([name, value]) => ({ name, value }));
  };

  return {
    browserData: getAggregatedData("browser"),
    deviceData: getAggregatedData("device"),
    platformData: getAggregatedData("platform"),
    languageData: getAggregatedData("language"),
    osData: getAggregatedData("os"),
    traffic: getAggregatedData("createdAt"),
  };
}
