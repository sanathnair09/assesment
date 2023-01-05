export type ImageData = {
  url: string;
  width: number;
  height: number;
};

type GiphyDataType = {
  images: { original: ImageData };
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
