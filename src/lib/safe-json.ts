// Sanitiza JSON para uso seguro dentro de <script type="application/ld+json">.
// Escapa "<" para evitar quebra de tag (</script>) e os separadores de linha
// U+2028/U+2029 que algumas engines tratam como terminadores de string.
const LS = String.fromCharCode(0x2028);
const PS = String.fromCharCode(0x2029);

export function safeJsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .split(LS)
    .join("\\u2028")
    .split(PS)
    .join("\\u2029");
}
