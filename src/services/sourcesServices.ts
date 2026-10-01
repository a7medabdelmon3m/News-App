import { ApiCall } from "@/utils/dynamicApi";

export type sourceType = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

export type sourceApiResponceType = {
  status: string;
  sources: sourceType[];
};
export type paramsType = {
  category?: string;
  language?: string;
  country?: string;
};

export const getSources = (params?: paramsType) => {
  const searchParams = new URLSearchParams();
  const apiKey = `df20dd2a228a446c9718d791ecb0d799`;
  if (params?.category) searchParams.append("category", params.category);
  if (params?.country) searchParams.append("category", params.country);
  if (params?.language) searchParams.append("category", params.language);

  searchParams.append("apiKey", apiKey);

  return ApiCall<sourceApiResponceType>({
    endpoint: `top-headlines/sources?${searchParams.toString()}`,
    method: "GET",
  });
};
