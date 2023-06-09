export interface PaginationParams {
  _limit: number;
  _page: number;
  _total: number;
}

export interface ListResponse<T> {
  data: [T];
  pagination: PaginationParams;
}

export interface ListParam {
  _limit: number;
  _page: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}
