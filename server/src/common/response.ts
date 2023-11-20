export type Response = {
  success: boolean;
  statusCode: number;
  data: any;
}

export default function(success: boolean, statusCode: number, data: any) {
  return Object.freeze({
    success,
    statusCode,
    data
  })
}