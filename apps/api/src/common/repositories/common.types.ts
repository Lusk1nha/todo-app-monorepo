export interface GetPrismaParams<W> {
  skip?: number;
  take?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  searchBy?: string;
  search?: string;
  where?: W;
}
