# DUBURL
긴 url 단축 웹서비스 

## 1. 웹사이트
[바로가기](https://www.duburl.site/)

## 2. 개요
- 개발 환경
  - FE : Next.js, Typescript, Tailwind CSS
  - BE : Prisma, Postgresql, Neon DB
    
- 형상 관리 : Git, Github
- 배포 : Vercel
- #### installed Library
      "@prisma/client": "^6.4.1",
      "iron-session": "^8.0.4",
      "nanoid": "^5.1.2",
      "next": "15.1.7",
      "prisma": "^6.4.1",
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "validator": "^13.12.0",
      "zod": "^3.24.2"
      "@heroicons/react": "^2.2.0", // svg icon

## 3. 웹사이트 핵심 동작 방식

- 긴 URL을 입력하면 6자리의 영어, 숫자, 특수문자로 구성된 `짧은 키`가 생성.
- 해당 키를 이용해 `duburl.site/[짧은키]`로 접속하면 원래의 긴 URL로 자동 리디렉션.
- 예시: `https://long-long-website-url-link.com <-> duburl.site/abc123`

## 4. 기타 구현 방식

- zod, validator를 이용하여 변환할 url, url 별명 등 검증
- iron-session을 이용하여 http-only 쿠키로 사용자 세션 관리
- OAuth2를 이용하여 kakao, google 소셜 로그인
