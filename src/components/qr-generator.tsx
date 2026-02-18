"use client";

import { useCallback, useState } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MAX_INPUT_LENGTH = 2000;
const DEFAULT_SIZE = 256;

export function QRGenerator() {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async () => {
    setError(null);
    const trimmed = text.trim();
    if (!trimmed) {
      setError("내용을 입력해 주세요.");
      return;
    }
    if (trimmed.length > MAX_INPUT_LENGTH) {
      setError(`내용은 ${MAX_INPUT_LENGTH}자 이내로 입력해 주세요.`);
      return;
    }
    try {
      // 1. Generate QR code on a hidden canvas
      const canvas = document.createElement("canvas");
      await QRCode.toCanvas(canvas, trimmed, {
        width: DEFAULT_SIZE,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: 'H' // High error correction to allow for logo overlay
      });

      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      // 2. Load and draw the logo
      const logo = new Image();
      logo.src = "/logo.png";

      await new Promise((resolve, reject) => {
        logo.onload = resolve;
        logo.onerror = reject;
      });

      // 3. Calculate logo position and size (approx 20% of QR size)
      const logoSize = DEFAULT_SIZE * 0.22;
      const x = (DEFAULT_SIZE - logoSize) / 2;
      const y = (DEFAULT_SIZE - logoSize) / 2;

      // Draw a white background for the logo to make it stand out
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      const padding = 4;
      ctx.roundRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2, 8);
      ctx.fill();

      // Draw the logo clipped with rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(x, y, logoSize, logoSize, 6);
      ctx.clip();
      ctx.drawImage(logo, x, y, logoSize, logoSize);
      ctx.restore();

      setDataUrl(canvas.toDataURL("image/png"));
    } catch (e) {
      console.error(e);
      setError("QR 코드 생성에 실패했습니다.");
    }
  }, [text]);

  const download = useCallback(() => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "qrcode-with-logo.png";
    a.click();
  }, [dataUrl]);

  return (
    <Card className="overflow-hidden border-2 transition-all hover:border-primary/50 shadow-lg">
      <CardHeader className="bg-muted/30 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight">QR 코드 만들기</CardTitle>
        <CardDescription className="text-base">
          URL이나 텍스트를 입력하면 나만의 고품질 QR 코드가 즉시 생성됩니다.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-3">
          <Label htmlFor="qr-input" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            내용 입력
          </Label>
          <div className="relative">
            <Input
              id="qr-input"
              placeholder="https://google.com 또는 전달하고 싶은 메시지"
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX_INPUT_LENGTH}
              className="h-12 border-2 bg-background px-4 text-base transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
          <div className="flex justify-end">
            <span className={`text-xs font-medium ${text.length > MAX_INPUT_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'}`}>
              {text.length.toLocaleString()} / {MAX_INPUT_LENGTH.toLocaleString()}자
            </span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        <Button
          onClick={generate}
          size="lg"
          className="group w-full gap-2 text-lg font-bold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-primary/20"
        >
          무료 QR 코드 생성하기
        </Button>

        {dataUrl && (
          <div className="mt-8 space-y-6 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-bold uppercase tracking-widest text-primary">생성 완료</span>
              <div className="group relative rounded-2xl bg-white p-4 shadow-xl transition-all hover:shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={dataUrl}
                  alt="Generated QR code"
                  className="size-48 object-contain sm:size-64"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={download} size="lg" className="h-12 flex-1 gap-2 font-bold shadow-sm transition-all hover:bg-primary/90">
                고화질 PNG 저장
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
                className="h-12 flex-1 border-2 font-bold transition-all hover:bg-background"
              >
                텍스트 복사
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
