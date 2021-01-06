# 서버 API

- api url : <https://api.interwater.biz>
- header : s-connector-jwt
- 모든 api 는 header(s-connector-jwt) 에 발급받은 key를 등록하여야 정상 동작 합니다.

## 1. License 정보

인증된 License 정보를 조회 합니다

1. path : v1/info
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust samle

```bash
$ curl --location --request GET 'https://api.interwater.biz/v1/info' \
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

1. path : v1/sessions
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust sample

```bash
$ curl --location --request GET 'https://api.interwater.biz/v1/sessions' \
--header 's-connector-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJ0cmlhbCIsImVudiI6InByb2QiLCJpc1RyaWFsIjp0cnVlLCJjb21wYW55X25hbWUiOiJzLWNvbm5lY3RvciIsImlhdCI6MTYwOTA2Nzc3MCwiZXhwIjoxNjA5MTU0MTcwfQ.U7qDLxWGerdc24b3bm6UuS_sh6e2s7R_cI20loivcKk'

```

### response

```json
{
  "status": true,
  "data": [
    {
      "id": "938",
      "domain": "trial",
      "sessionId": "ses_ZB2Y3XJTyU",
      "roomName": "gsda11",
      "status": "OPEN",
      "createdAt": "2021-01-06T16:04:09.000Z",
      "sessionTokens": [
        {
          "id": "1881",
          "connectionId": "con_Gxn95TnZBN",
          "sessionId": "ses_ZB2Y3XJTyU",
          "sessionName": "f61518bc6f7c54738752bb41eb8d513dd93fd5b1e9dcb4dbb1742c6e04e5df26",
          "token": "wss://remote.interwater.biz?sessionId=ses_ZB2Y3XJTyU&token=tok_IxZzOIomwGzJxDHO&role=PUBLISHER&versi",
          "userName": "gdsfagasd",
          "role": "PUBLISHER",
          "location": "Yangcheon-gu, South Korea",
          "platform": "Chrome 87.0.4280.88 on OS X 11.1.0 64-bit",
          "status": "active",
          "createdAt": "2021-01-06T16:04:09.000Z",
          "updatedAt": "2021-01-06T16:04:53.000Z"
        }
      ]
    }
  ]
}
```
