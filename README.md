# My Schedule
> 이 프로젝트는 스케쥴을 관리하기 위하여 개발된 **일정 관리 앱**입니다.  
사용자는 본인의 일정을 캘린더에 추가하거나 수정하여, 쉽게 스케쥴을 관리할 수 있습니다.

<br>

## 사용 기술 

|   Next.js  | TypeScript |   React  |  React-Query | Emotion.js | Github Actions |  Vercel |  
| :--------: | :--------: | :------: |    :-----:   |  :-----:   |    :-----:     | :-----: |  
|  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566879300/noticon/fvty9lnsbjol5lq9u3by.svg" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557331/noticon/d5hqar2idkoefh6fjtpu.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1669720599/noticon/xg13hlex6bu8mu182b5y.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1606640723/noticon/ahdafbo604qrqaw3tcbf.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1673248072/noticon/uj1sljza7nnsj0lpilwk.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1679312641/noticon/rx8rni4npifrbo9ckxmt.png" width="60" height="60" /> |

<br>

## 기능 소개
- 달력을 사용하여 일정을 표시하고 추가, 수정, 삭제할 수 있습니다.
- 각 일정은 제목, 시작 시간, 종료 시간, 일정 색상을 설정할 수 있습니다.
- 일정을 날짜별로 필터링하여 볼 수 있습니다.
- 로그인을 통해 자신의 스케쥴을 관리할 수 있습니다. (**게스트 로그인**으로 서비스를 체험할 수 있습니다.)

<br>

## 시작하기
1. 다음 명령어를 사용하여 로컬 환경에 repository를 클론합니다.

```sh
git clone https://github.com/munolee/my-schedule.git
```

2. 프로젝트 디렉토리에서 다음 명령을 실행하여 패키지 종속 항목을 설치합니다.

```sh
yarn install
```

3. 프로젝트를 실행하려면 프로젝트 디렉토리에서 다음 명령을 사용할 수 있습니다.

```sh
yarn dev
```

<br>

## 서버 Repository

> [my-schedule-server](https://github.com/munolee/my-schedule-server)

<details>
<summary>자세히보기</summary>
<div markdown="1">




## 사용 기술 

|   Node.js  |  Express   |  MongoDB  |  Swagger | Typescript |  Vercel  |  
| :--------: | :--------: | :------:  | :-----:  |  :-----:   |  :-----: |    
|  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566557264/noticon/eyhvbmh82nhdoydl4j2a.png" width="60" height="60" /> | <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1597622806/noticon/avedhz3pvaij65k3ztar.png" width="70" height="70" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1581824691/noticon/hmvqgvug8zl7etwmabuq.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566914780/noticon/k2zbemz0azdzoihurrvj.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566913457/noticon/eh4d0dnic4n1neth3fui.png" width="60" height="60" /> |  <img src="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1679312641/noticon/rx8rni4npifrbo9ckxmt.png" width="60" height="60" /> |

<br>

## 서버 기능 소개
- (**CRUD**) 일정을 조회하고 추가, 수정, 삭제할 수 있습니다.
- 공공데이터포털 오픈 API를 활용해 **공휴일 데이터**를 클라이언트에게 전달합니다. ([한국천문연구원 특일 정보](https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012690))
- Passport와 jsonwebtoken, session을 통해 **로그인/로그아웃**을 처리하며, **JWT Token**을 발급합니다.

<br>

</div>
</details>

