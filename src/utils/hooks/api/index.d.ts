interface ApiSuccesResponse<T> {
  data: T
  succes: true
}

interface ApiFailureResponse {
  data: { message: string }
  succes: false
}
type ApiResponse<T> = ApiSuccesResponse<T> | ApiFailureResponse
