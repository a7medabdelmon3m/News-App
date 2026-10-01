import { ApiCall } from "@/utils/dynamicApi";
import { NewsApiResponseType } from "./newServices";

export type NewsSortBy = "relevancy" | "popularity" | "publishedAt";
export type NewsLanguage =
  | "ar"
  | "de"
  | "en"
  | "es"
  | "fr"
  | "he"
  | "it"
  | "nl"
  | "no"
  | "pt"
  | "ru"
  | "sv"
  | "ud"
  | "zh";
export type SearchInField = "title" | "description" | "content";
export interface EverythingParams {
  q?: string;

  searchIn?: SearchInField | string;

  sources?: string;

  domains?: string;

  excludeDomains?: string;

  from?: string;

  to?: string;

  language?: NewsLanguage;

  sortBy?: NewsSortBy;

  pageSize?: number;

  page?: number;
}
export const getSearch = (params?: EverythingParams) => {
  const apiKey = "df20dd2a228a446c9718d791ecb0d799";
  const searchParams = new URLSearchParams();
  if (params?.q) searchParams.append("q", params.q);
  if (params?.searchIn) searchParams.append("searchIn", params.searchIn);
  if (params?.sources) searchParams.append("sources", params.sources);
  if (params?.domains) searchParams.append("domains", params.domains);
  if (params?.excludeDomains)
    searchParams.append("excludeDomains", params.excludeDomains);
  if (params?.from) searchParams.append("from", params.from);
  if (params?.to) searchParams.append("to", params.to);
  if (params?.language) searchParams.append("language", params.language);
  if (params?.sortBy) searchParams.append("sortBy", params.sortBy);
  if (params?.pageSize)
    searchParams.append("pageSize", String(params.pageSize));
  if (params?.page) searchParams.append("page", String(params.page));

  searchParams.append("apiKey", apiKey);

  return ApiCall<NewsApiResponseType>({
    endpoint: `everything?${searchParams.toString()}`,
    method: "GET",
  });
};
