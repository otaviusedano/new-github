import { Repository } from "src/app/repo/repo.model"

export interface Search {
  name: string
}

export interface QueryParams {
  page: number
  per_page: number
}

export interface Response {
  incomplete_results: boolean
  items: Repository[]
  total_count: number
}
