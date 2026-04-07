import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Pen, Type, RotateCcw } from "lucide-react";
import { Language, t } from "@/lib/i18n";

interface OnboardingSignaturePadProps {
  onSignatureChange: (data: string | null, type: "drawn" | "typed") => void;
  lang: Language;
}

const OnboardingSignaturePad = ({ onSignatureChange, lang }: OnboardingSignaturePadProps) => {
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [typedName, setTypedName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = "hsl(200, 75%, 35%)";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    if (mode === "draw") setTimeout(initCanvas, 50);
  }, [mode, initCanvas]);

  const getPos = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const endDraw = () => {
    setIsDrawing(false);
    if (hasDrawn && canvasRef.current) {
      onSignatureChange(canvasRef.current.toDataURL("image/png"), "drawn");
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
    onSignatureChange(null, "drawn");
    initCanvas();
  };

  useEffect(() => {
    if (mode === "type" && typedName.trim()) {
      onSignatureChange(typedName, "typed");
    } else if (mode === "type") {
      onSignatureChange(null, "typed");
    }
  }, [typedName, mode, onSignatureChange]);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setMode("draw")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
            mode === "draw"
              ? "bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground"
              : "glass-card text-muted-foreground"
          }`}
        >
          <Pen className="w-4 h-4" />
          {t(lang, "drawSignature")}
        </button>
        <button
          onClick={() => setMode("type")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
            mode === "type"
              ? "bg-gradient-to-r from-wavelink-teal to-wavelink-blue text-primary-foreground"
              : "glass-card text-muted-foreground"
          }`}
        >
          <Type className="w-4 h-4" />
          {t(lang, "typeSignature")}
        </button>
      </div>

      {mode === "draw" ? (
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-40 rounded-xl border-2 border-dashed border-wavelink-teal/30 bg-card cursor-crosshair touch-none"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
          />
          <button
            onClick={clearCanvas}
            className="absolute top-2 right-2 p-2 rounded-lg bg-muted/80 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <p className="text-center text-xs text-muted-foreground mt-2">
            {t(lang, "signHere")}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder={t(lang, "fullName")}
            className="w-full px-4 py-4 rounded-xl border-2 border-wavelink-teal/30 bg-card text-center text-xl font-mono focus:outline-none focus:border-wavelink-teal transition-colors"
          />
          {typedName && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl glass-card text-center">
              <p className="text-2xl italic font-display text-wavelink-teal">{typedName}</p>
              <p className="text-xs text-muted-foreground mt-1">Preview</p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnboardingSignaturePad;
