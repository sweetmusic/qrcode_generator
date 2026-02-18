import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function Header({ userEmail }: { userEmail?: string }) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link href="/" className="font-semibold text-primary">
          QR 코드 생성기
        </Link>
        <div className="flex items-center gap-2">
          {userEmail && (
            <span className="hidden text-sm text-muted-foreground sm:inline">
              {userEmail}
            </span>
          )}
          <form action={signOut}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="size-4" />
              로그아웃
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
