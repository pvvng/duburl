"use server";

export async function createUtm(_: any, formData: FormData) {
  const data = {
    utm_source: formData.get("utm_source"),
    utm_medium: formData.get("utm_medium"),
    utm_campaign: formData.get("utm_campaign"),
    utm_term: formData.get("utm_term"),
    utm_content: formData.get("utm_content"),
  };

  console.log(data);
}
