---
description: Vercel에 Next.js 프로젝트를 배포하는 단계별 가이드
---

# Vercel 배포 가이드

이 프로젝트를 Vercel에 배포하려면 다음 단계를 따르세요.

## 1. GitHub 저장소 만들기
1. [GitHub](https://github.com)에서 새로운 저장소를 생성합니다.
2. 로컬 프로젝트를 GitHub에 푸시합니다.
   ```bash
   git init
   git add .
   git commit -m "Initialize project"
   git branch -M main
   git remote add origin [저장소-URL]
   git push -u origin main
   ```

## 2. Vercel 프로젝트 생성
1. [Vercel Dashboard](https://vercel.com/new)에서 생성한 GitHub 저장소를 Import합니다.

## 3. 환경 변수 설정
Vercel 설정 화면의 **Environment Variables** 섹션에서 다음 변수들을 추가합니다. `.env.local`의 값을 그대로 입력하세요.
- `NEXT_PUBLIC_SUPABASE_URL`: `https://kqjpbweqqeozmhbkncmx.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (제공해주신 Anon Key)
- `NEXT_PUBLIC_SITE_URL`: `https://[당신의-배포-도메인].vercel.app`

## 4. Supabase Redirect URL 업데이트
배포 후 생성된 URL을 Supabase 대시보드에 등록해야 로그인이 작동합니다.
1. [Supabase Dashboard](https://supabase.com) > Authentication > URL Configuration > Redirect URLs에 `https://[당신의-배포-도메인].vercel.app/auth/callback`를 추가합니다.
2. `Site URL` 역시 배포된 주소로 변경합니다.

## 5. 배포 완료
- 이제 소스 코드를 push할 때마다 Vercel에서 자동으로 빌드 및 배포를 수행합니다.
