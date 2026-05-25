export function haptic(type: 'light' | 'medium' | 'heavy' = 'light') {
  if (navigator.vibrate) {
    navigator.vibrate(type === 'light' ? 5 : type === 'medium' ? 10 : 15);
  }
}
