# QR 코드 생성기

Next.js + Supabase 인증 기반 QR 코드 생성 웹 앱입니다. Vercel에 배포할 수 있습니다.

## 기능

- **회원가입 / 로그인 / 로그아웃** (Supabase Auth)
- **QR 코드 생성** (URL 또는 텍스트 입력 → PNG 다운로드)
- **Twitter 테마** (tweakcn Twitter 스타일)

## 보안

- Supabase **Anon Key**만 클라이언트에 노출 (Service Role Key 사용 금지)
- 인증은 서버 세션(쿠키)으로 관리 (`@supabase/ssr`)
- 비밀번호는 Supabase에서 해시·저장
- 환경 변수는 `.env.local`에만 저장하고 저장소에 커밋하지 않음
- Supabase MCP를 통해 보안 어드바이저 확인 완료 (RLS 활성화, 보안 이슈 없음)

## 로컬 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수

`.env.local.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

```bash
cp .env.local.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL`: `https://kqjpbweqqeozmhbkncmx.supabase.co` (Supabase MCP로 확인됨)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 
  - Supabase MCP 또는 대시보드 > Project Settings > API에서 확인
  - Legacy anon key 또는 Modern publishable key (`sb_publishable_...`) 사용 가능
- `NEXT_PUBLIC_SITE_URL`: 로컬은 `http://localhost:3000`, 배포 시에는 Vercel URL

### 3. Supabase Auth 설정

Supabase 대시보드에서:

1. **Authentication > URL Configuration**
   - Site URL: `http://localhost:3000` (개발) 또는 `https://your-app.vercel.app` (배포)
   - Redirect URLs에 `http://localhost:3000/auth/callback`, `https://your-app.vercel.app/auth/callback` 추가

2. **Authentication > Providers**: Email 사용 설정

### 4. 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속 후 로그인/회원가입하여 QR 생성기를 사용할 수 있습니다.

## Vercel 배포

1. 저장소를 GitHub 등에 푸시
2. Vercel에서 프로젝트 임포트
3. Environment Variables에 다음 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-project.vercel.app`
4. Supabase Redirect URLs에 `https://your-project.vercel.app/auth/callback` 추가 후 배포

## 테마

Twitter 테마는 [tweakcn Twitter](https://tweakcn.com/r/themes/twitter.json)를 기준으로 `src/app/globals.css`에 적용되어 있습니다.
