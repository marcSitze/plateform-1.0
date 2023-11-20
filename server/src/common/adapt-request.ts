export type AdaptRequest = {
  path: string;
  method: string;
  params: typeof Object;
  query: typeof Object;
  body: typeof Object;
  ip: string;
  headers: typeof Object;
  get: Function;
}

export default function adaptRequest (req: AdaptRequest) {
  return Object.freeze({
    path: req.path,
    method: req.method,
    pathParams: req.params,
    queryParams: req.query,
    body: req.body,
    ip: req.ip,
    headers: {
      'Content-Type': req.get('Content-Type'),
      Referer: req.get('referer'),
      'User-Agent': req.get('User-Agent')
    }
  })
}