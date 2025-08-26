export function hintAITrigger(text){
  return text.startsWith('/ai') || /(^|\s)@bot(\s|$)/i.test(text)
}
