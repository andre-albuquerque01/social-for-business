export default function apiError(error: unknown): {
  data: null
  error: string
  ok: false
} {
  if (error instanceof Error) {
    return { data: null, error: 'Houve error, tente novamente', ok: false }
  }
  return { data: null, error: 'Error', ok: false }
}
