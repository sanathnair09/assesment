export type ImageData = {
  url: string;
  width: number;
  height: number;
  id: string;
};

type GiphyDataType = {
  images: { original: ImageData };
  id: string;
};

export type GiphySearchType = {
  data: GiphyDataType[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
};

export type fetchType = {
  search: string;
  page: number;
};
