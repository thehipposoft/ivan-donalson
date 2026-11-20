/**
 * Señal "fin de la intro del isotipo".
 * El hero y el header esperan a esta señal para su animación de entrada.
 * Es idempotente: si la intro ya terminó, el callback corre de inmediato.
 */
type Listener = () => void;

let done = false;
const listeners = new Set<Listener>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((listener) => listener());
  listeners.clear();
}

export function onIntroDone(listener: Listener, fallbackMs = 6000): () => void {
  if (done) {
    listener();
    return () => {};
  }

  listeners.add(listener);
  // Red de seguridad: si la intro nunca avisa (WebGL no disponible, etc.)
  const timeout = window.setTimeout(markIntroDone, fallbackMs);

  return () => {
    listeners.delete(listener);
    window.clearTimeout(timeout);
  };
}

/**
 * Vuelve a armar la señal. Se llama al desmontar el isotipo para que, al
 * regresar al home con navegación del cliente, la intro se sincronice de nuevo.
 */
export function resetIntro() {
  done = false;
}
