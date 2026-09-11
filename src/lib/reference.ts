// Référence courte affichée après l'envoi et écrite en tête du message,
// pour retrouver la demande dans contact_submissions et dans l'email.
export function makeReference() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `F6-${ymd}-${rand}`;
}
