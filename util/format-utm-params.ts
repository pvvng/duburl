interface UTMComponentsType {
  source: string;
  medium: string;
  campaign: string;
  term: string | null;
  content: string | null;
}

export function getFormattedUTM({
  source,
  medium,
  campaign,
  term,
  content,
}: UTMComponentsType) {
  const params = {
    source,
    medium,
    campaign,
    ...(term ? { term: term } : {}),
    ...(content ? { content: content } : {}),
  };

  return new URLSearchParams(params).toString();
}
