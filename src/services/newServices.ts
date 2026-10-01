import { ApiCall } from "@/utils/dynamicApi";

export type ArticleSourceType = {
  id: string | null;
  name: string;
};

export type ArticleType = {
  source: ArticleSourceType;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export type NewsApiResponseType = {
  status: string;
  totalResults: number;
  articles: ArticleType[];
};

export type GetHeadLinesParams = {
  source?: string;
  country?: string;
  category?: string;
  q?: string;
  pageSize?: number;
  page?: number;
};

export const getHeadLines = (params?: GetHeadLinesParams) => {
  const apiKey = "df20dd2a228a446c9718d791ecb0d799";
  const searchParams = new URLSearchParams();

  
  if (params?.source) searchParams.append("sources", params.source);
  if (params?.country && !params?.source) searchParams.append("country", params.country);
  if (params?.category && !params?.source ) searchParams.append("category", params.category);
  if (params?.q) searchParams.append("q", params.q);
  if (params?.pageSize) searchParams.append("pageSize", params.pageSize.toString());
  if (params?.page) searchParams.append("page", params.page.toString());

  searchParams.append("apiKey", apiKey);

    // console.log('our url : ' ,`top-headlines?${searchParams.toString()}` );

  return ApiCall<NewsApiResponseType>({
    endpoint: `top-headlines?${searchParams.toString()}`,
    method: "GET",
  });
};