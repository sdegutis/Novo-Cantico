for (const a of document.querySelectorAll('a')) {
  if (!a.href.startsWith('https://www.novocantico.org') && !a.target) {
    a.target = '_blank';
  }
}
