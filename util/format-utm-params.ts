interface UTMComponentsType {
  source: string;
  medium: string;
  campaign: string;
  term: string | null;
  content: string | null;
  userUrlId: number;
}

export function getFormattedUTM({
  source,
  medium,
  campaign,
  term,
  content,
  userUrlId,
}: UTMComponentsType) {
  const params = {
    source,
    medium,
    campaign,
    ...(term ? { term: term } : {}),
    ...(content ? { content: content } : {}),
    uid: userUrlId.toString(),
  };

  return new URLSearchParams(params).toString();
}
