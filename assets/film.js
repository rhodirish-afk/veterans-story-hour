/* Click-to-load YouTube: shows a thumbnail link until the visitor chooses to play. */
document.addEventListener('click', function (e) {
  var link = e.target.closest ? e.target.closest('a[data-yt]') : null;
  if (!link) return;
  e.preventDefault();
  var id = link.getAttribute('data-yt');
  var frame = document.createElement('iframe');
  frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
  frame.title = link.getAttribute('data-title') || 'YouTube video';
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  var box = link.parentNode;
  box.replaceChild(frame, link);
  frame.focus();
});
