# 서버 API

- api url : <https://api.interwater.biz>
- header : s-connector-jwt
- 모든 api 는 header(s-connector-jwt) 에 발급받은 key를 등록하여야 정상 동작 합니다.

## 1. License 정보

인증된 License 정보를 조회 합니다

1. path : license/info
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust samle

```bash
$ curl --location --request GET 'https://api.interwater.biz/license/info' \
--header 's-connector-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJ0cmlhbCIsImVudiI6InByb2QiLCJpc1RyaWFsIjp0cnVlLCJjb21wYW55X25hbWUiOiJzLWNvbm5lY3RvciIsImlhdCI6MTYwOTA2Nzc3MCwiZXhwIjoxNjA5MTU0MTcwfQ.U7qDLxWGerdc24b3bm6UuS_sh6e2s7R_cI20loivcKk'

```

### response

```json
{
  "status": true, // 상태
  "data": {
    "domain": "trial", // license 도메인
    "roomLimit": 10, // 회의실 제한 갯수
    "enabled": 1,
    "createdAt": "2020-12-22T15:00:00.000Z"
  }
}
```

## 2. session 정보

현재 회의 중인 회의실 정보를 조회합니다.

1. path : video/sessions
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust samle

```bash
$ curl --location --request GET 'https://api.interwater.biz/video/sessions' \
--header 's-connector-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJ0cmlhbCIsImVudiI6InByb2QiLCJpc1RyaWFsIjp0cnVlLCJjb21wYW55X25hbWUiOiJzLWNvbm5lY3RvciIsImlhdCI6MTYwOTA2Nzc3MCwiZXhwIjoxNjA5MTU0MTcwfQ.U7qDLxWGerdc24b3bm6UuS_sh6e2s7R_cI20loivcKk'

```

### response

```json
{
  "status": true,
  "data": [
    {
      "id": "892",
      "domain": "trial", // license 기반 사용 domain
      "sessionId": "ses_I1a162q01o",
      "roomName": "샘플",
      "status": "OPEN",
      "createdAt": "2020-12-27T11:24:44.000Z"
    }
  ]
}
```
