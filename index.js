// 유틸리티
function getTextWidth(text, fontSize = 15) {
  let width = 0;
  if (!text) return 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(char)) { width += fontSize; }
    else if (/[A-Z]/.test(char)) { width += fontSize * 0.75; }
    else if (/[a-z0-9]/.test(char)) { width += fontSize * 0.55; }
    else if (/\s/.test(char)) { width += fontSize * 0.3; }
    else if (/[?!.,]/.test(char)) { width += fontSize * 0.3; }
    else { width += fontSize * 0.5; }
  }
  return width;
}
function wrapText(text, maxWidth, fontSize = 15) { if (!text) return [' ']; const words = text.split(' '); const lines = []; let currentLine = words[0] || ''; for (let i = 1; i < words.length; i++) { const word = words[i]; const testLine = currentLine + ' ' + word; if (getTextWidth(testLine, fontSize) < maxWidth) { currentLine = testLine; } else { lines.push(currentLine); currentLine = word; } } lines.push(currentLine); return lines; }
function escapeHtml(unsafe) { if (!unsafe) return ''; return unsafe.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">").replace(/"/g, """).replace(/'/g, "&#039;"); }

// 설정
const IMAGE_KEYWORDS = {
    '랜덤': 'https://picsum.photos/900/300';,
    '주의': 'https://i.imgur.com/dJ8vU52.png';,
    '하트': 'https://i.imgur.com/bY2a3y4.png';,
};

// 이미지 처리
async function getImageDataUri(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || 'image/png';
    const buffer = await response.arrayBuffer();
    const base64 = ((arr) => {
        let a = "", b, c, d, e, f, g, i = 0;
        const h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        do { b = arr[i++]; c = arr[i++]; d = arr[i++]; e = b >> 2; f = (b & 3) << 4 | c >> 4; g = (c & 15) << 2 | d >> 6; a += h.charAt(e) + h.charAt(f) + h.charAt(g) + h.charAt(d & 63); } while (i < arr.length);
        if (isNaN(c)) { a = a.slice(0, -2) + "=="; } else if (isNaN(d)) { a = a.slice(0, -1) + "="; }
        return a;
    })(new Uint8Array(buffer));
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    return null;
  }
}
