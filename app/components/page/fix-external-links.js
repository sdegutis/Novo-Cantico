for (const a of document.querySelectorAll('a')) {
  if (!a.href.startsWith('BASE_URL') && !a.target) {
    a.target = '_blank';
  }
}
