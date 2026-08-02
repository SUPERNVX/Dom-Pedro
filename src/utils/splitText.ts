/**
 * Splits text content of an element into individual character spans
 * for GSAP animation (replaces SplitText premium plugin)
 */
export function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  element.textContent = '';
  
  const chars: HTMLSpanElement[] = [];
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
    span.style.display = 'inline-block';
    element.appendChild(span);
    chars.push(span);
  }
  
  return chars;
}
