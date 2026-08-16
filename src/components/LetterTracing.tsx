import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { CheckCircleIcon, RepeatIcon } from './icons'

interface LetterTracingProps {
  char: string
}

// Taille CSS du canevas (carré) ; la résolution interne suit le devicePixelRatio pour rester net
// sur écrans rétina.
const CANVAS_SIZE = 280
// Grille basse résolution utilisée pour comparer tracé et repère : la moyenne opérée en
// sous-échantillonnant (drawImage vers une petite surface) tolère naturellement les petits écarts
// de précision, sans avoir à coder une dilatation de masque pixel par pixel.
const SCORE_SAMPLE_SIZE = 40
const ARABIC_FONT_STACK = '"Noto Naskh Arabic", "Amiri", serif'

function setupCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1
  canvas.width = CANVAS_SIZE * dpr
  canvas.height = CANVAS_SIZE * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
  return ctx
}

function drawGuide(ctx: CanvasRenderingContext2D, char: string) {
  ctx.font = `${CANVAS_SIZE * 0.7}px ${ARABIC_FONT_STACK}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(15, 118, 110, 0.22)' // brand-600 très atténué, lisible en clair comme en sombre
  ctx.fillText(char, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + CANVAS_SIZE * 0.05)
}

/** Compare le tracé de l'utilisateur au repère et renvoie un score 0-100. */
function scoreTrace(guideCanvas: HTMLCanvasElement, drawCanvas: HTMLCanvasElement): number {
  const sample = document.createElement('canvas')
  sample.width = SCORE_SAMPLE_SIZE
  sample.height = SCORE_SAMPLE_SIZE
  const sctx = sample.getContext('2d')!

  sctx.clearRect(0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE)
  sctx.drawImage(guideCanvas, 0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE)
  const guideData = sctx.getImageData(0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE).data

  sctx.clearRect(0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE)
  sctx.drawImage(drawCanvas, 0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE)
  const userData = sctx.getImageData(0, 0, SCORE_SAMPLE_SIZE, SCORE_SAMPLE_SIZE).data

  let guideCount = 0
  let userCount = 0
  let overlapCount = 0
  for (let i = 3; i < guideData.length; i += 4) {
    const isGuide = guideData[i] > 20
    const isUser = userData[i] > 20
    if (isGuide) guideCount++
    if (isUser) userCount++
    if (isGuide && isUser) overlapCount++
  }

  if (guideCount === 0) return 0
  const coverage = overlapCount / guideCount // part du repère effectivement recouverte
  const precision = userCount > 0 ? overlapCount / userCount : 0 // part du tracé qui reste "dans les clous"
  return Math.round(100 * (coverage * 0.7 + precision * 0.3))
}

// Exercice de traçage : le repère (lettre en très légère transparence) et le tracé de
// l'utilisateur vivent sur deux <canvas> empilés plutôt qu'un seul, pour pouvoir comparer les deux
// indépendamment lors de la vérification (voir scoreTrace) sans confusion de couleurs.
export default function LetterTracing({ char }: LetterTracingProps) {
  const guideCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const drawingRef = useRef(false)
  const lastPointRef = useRef<{ x: number; y: number } | null>(null)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    const guideCanvas = guideCanvasRef.current
    const drawCanvas = drawCanvasRef.current
    if (!guideCanvas || !drawCanvas) return
    drawGuide(setupCanvas(guideCanvas), char)
    setupCanvas(drawCanvas)
    setScore(null)
  }, [char])

  function getPoint(e: PointerEvent<HTMLCanvasElement>): { x: number; y: number } {
    const rect = drawCanvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function handlePointerDown(e: PointerEvent<HTMLCanvasElement>) {
    drawingRef.current = true
    lastPointRef.current = getPoint(e)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return
    const ctx = drawCanvasRef.current?.getContext('2d')
    const last = lastPointRef.current
    if (!ctx || !last) return
    const point = getPoint(e)
    ctx.strokeStyle = '#0f766e' // brand-600, choisi indépendamment du thème clair/sombre
    ctx.lineWidth = 14
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(point.x, point.y)
    ctx.stroke()
    lastPointRef.current = point
  }

  function handlePointerUp() {
    drawingRef.current = false
    lastPointRef.current = null
  }

  function clear() {
    if (!drawCanvasRef.current) return
    setupCanvas(drawCanvasRef.current)
    setScore(null)
  }

  function check() {
    if (!guideCanvasRef.current || !drawCanvasRef.current) return
    setScore(scoreTrace(guideCanvasRef.current, drawCanvasRef.current))
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative touch-none overflow-hidden rounded-2xl border-2 border-dashed border-brand-200 bg-sand-50 dark:border-slate-600 dark:bg-slate-900"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      >
        <canvas ref={guideCanvasRef} className="absolute inset-0" style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }} />
        <canvas
          ref={drawCanvasRef}
          className="absolute inset-0 touch-none"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      <p className="mt-3 text-center text-xs text-brand-500 dark:text-slate-400">
        Trace la lettre par-dessus le repère, au doigt ou à la souris.
      </p>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={clear}
          className="flex items-center gap-1.5 rounded-full bg-brand-100 px-4 py-2 text-xs font-semibold text-brand-700 hover:bg-brand-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
        >
          <RepeatIcon className="h-3.5 w-3.5" /> Effacer
        </button>
        <button
          onClick={check}
          className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
        >
          Vérifier mon tracé
        </button>
      </div>

      {score !== null && (
        <p
          className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${
            score >= 70
              ? 'text-emerald-600 dark:text-emerald-400'
              : score >= 40
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-red-500 dark:text-red-400'
          }`}
        >
          {score >= 70 && <CheckCircleIcon className="h-4 w-4" />}
          Score : {score}/100 —{' '}
          {score >= 70 ? 'Bien tracé !' : score >= 40 ? 'Pas mal, réessaie pour affiner.' : 'Essaie encore, suis bien le repère.'}
        </p>
      )}
    </div>
  )
}
