// Copy single code block
function copyTextFrom(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.innerText;
  navigator.clipboard.writeText(text)
    .then(() => toast('Copied!'))
    .catch(async () => {
      // Fallback: create a textarea
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Copied!'); } catch(e){ toast('Copy failed'); }
      ta.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => copyTextFrom(btn.dataset.target));
  });

  // Copy ALL code blocks merged
  const copyAllBtn = document.getElementById('copy-all');
  if (copyAllBtn) {
    copyAllBtn.addEventListener('click', () => {
      const all = Array.from(document.querySelectorAll('pre > code')).map(c => c.innerText).join('\n\n');
      navigator.clipboard.writeText(all).then(() => toast('All code copied!'));
    });
  }

  // Download this page as .html
  const downloadBtn = document.getElementById('download-html');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'OS_Lab_Practicals_Ravi_Copyable.html'; a.click();
      URL.revokeObjectURL(url);
      toast('Download started');
    });
  }
});

// Tiny toast
function toast(msg){
  const t = document.createElement('div');
  t.textContent = msg; t.className = 'toast';
  Object.assign(t.style, { position:'fixed', left:'50%', bottom:'28px', transform:'translateX(-50%)', background:'rgba(17,24,39,.95)', color:'#e5e7eb', padding:'10px 14px', borderRadius:'10px', border:'1px solid #22314d', zIndex:9999, fontWeight:700 });
  document.body.appendChild(t); setTimeout(()=> t.remove(), 1400);
}
