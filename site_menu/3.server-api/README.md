# 서버 API

- api url : <https://api.interwater.biz>
- header : s-connector-jwt
- 모든 api 는 header(s-connector-jwt) 에 발급받은 access token 를 등록하여야 정상 동작 합니다.

## 0. access token 받아 오기

acceskey + secretkey 를 통하여 인증 토근을 받아 온다.

1. path: v1/auth
2. method: POST
3. body : appication/json

| property  | type    | require | comments                                                                 |
| --------- | ------- | ------- | ------------------------------------------------------------------------ |
| accessKey | string  | true    |                                                                          |
| secretKey | string  | true    |                                                                          |
| expires   | number  | false   | 분 단위 60 이면 1시간                                                    |
| isOwner   | boolean | false   | true 로 발급 받은 jwt 로 회의실 생성시 어드민 권환을 가지게 된다(개발중) |

### reqeust sample

```bash
$ // 60분 session 을 가지는 token

$ curl --location --request POST 'http://localhost:5000/v1/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "accessKey": "foziz2mdywm",
    "secretKey": "5bfdabd106fbd8c7ac14935c4e3ce98c4a84c79de697a777809c533f3b9232d116b697bf682ea43fca3a88ee6da62fb14e0f9e7805cf54feb0d38451de24eb333b368b155199272a96289bb70b21fa80bf418af5defe54d771443b80e2fb70beaeba8c59c1aa07aa298ea16c6696f3fd876ae7339adb1c349d14668458651e2a78a7f9094ad52a2ad86b01",
    "expires": 60
}'
```

### response

```json
{
  "status": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJkb21haW4iOiJodHRwczovL3JlYWRtZS5pbnRlcndhdGVyLmJpeiIsImFjY2Vzc0tleSI6ImZveml6Mm1keXdtIiwiaWF0IjoxNjEwMjU5NDUzLCJleHAiOjE2MTAyNjMwNTN9.bI3YamUjo3MZ_443Hj31nwOEkD_f16XLAuIVCtXlyzY"
  }
}
```

## 1. License 정보

인증된 License 정보를 조회 합니다

1. path : v1/info
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust sample

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
            "status": "WAIT",
            "user": 1,
            "roomName": "gfds"
        }
    ]
}
```

## 2. 개별 session 상태

현재 회의 중인 특정 회의실 정보를 조회합니다.

1. path : v1/sessions/:room_name
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.

### reqeust sample

```bash
$ curl --location --request GET 'https://api.interwater.biz/v1/sessions/room_name' \
--header 's-connector-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJ0cmlhbCIsImVudiI6InByb2QiLCJpc1RyaWFsIjp0cnVlLCJjb21wYW55X25hbWUiOiJzLWNvbm5lY3RvciIsImlhdCI6MTYwOTA2Nzc3MCwiZXhwIjoxNjA5MTU0MTcwfQ.U7qDLxWGerdc24b3bm6UuS_sh6e2s7R_cI20loivcKk'

```

### response

```json
{
    "status": true,
    "data": {
        "status": "ON_GOING",
        "user": 2,
        "roomName": "gsdagd"
    }
}
```

## 3. 사용량 조회

s-connector 에 정보에 따른 s-connector 사용량을 조회 합니다.
만약 endTime paramter 가 존재 하지 않을경우 시작일부터 현재까지의 데이터를 조회합니다.

1. path : v1/static
2. method : GET
3. header parameter : s-connector-jwt
   @ 발급 받은 key키를 입력합니다.


| param     | type   | required | comment   |
| --------- | ------ | -------- | --------- |
| startTime | string | true     | 시작 일자 |
| endTime   | string | false    | 종료 일자 |


### reqeust sample



```bash
$ curl --location --request GET 'https://api.interwater.biz/v1/static?startTime=2021-02-20&endTime=2021-02-25' \
--header 's-connector-jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJkb21haW4iOiJodHRwczovL3JlYWRtZS5pbnRlcndhdGVyLmJpeiIsImFjY2Vzc0tleSI6ImZveml6Mm1keXdtIiwiaWF0IjoxNjEzOTk2NTg5LCJleHAiOjE2MTQwMDI1ODl9.Tj9sIE09hljud-WWjOksy2a97TkoJK4BWDMVH-Fh2yM'

```

### response

```json
{
    "status": true,
    "data": {
        "domain": "https://readme.interwater.biz",
        "totalSecond": 49951,
        "detail": [
            {
                "roomName": "gsdagd",
                "sessionTimeSecond": 42936,
                "createdAt": "2021-02-22T12:39:26.000Z"
            },
            {
                "roomName": "test",
                "sessionTimeSecond": 1481,
                "createdAt": "2021-02-22T04:45:20.000Z"
            },
            {
                "roomName": "test",
                "sessionTimeSecond": 4924,
                "createdAt": "2021-02-22T00:12:58.000Z"
            },
            {
                "roomName": "12312",
                "sessionTimeSecond": 610,
                "createdAt": "2021-02-21T02:34:52.000Z"
            }
        ]
    }
}
```
