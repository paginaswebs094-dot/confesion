(() => {
  const hearts = document.querySelector(".floating-hearts");
  if (hearts) {
    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 576 ? 6 : 12;

    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.textContent = "♥";
      el.setAttribute("aria-hidden", "true");
      el.style.cssText = [
        "position:absolute",
        `left:${Math.random() * 100}%`,
        `top:${Math.random() * 100}%`,
        `font-size:${10 + Math.random() * 14}px`,
        `opacity:${0.08 + Math.random() * 0.12}`,
        `animation: float ${18 + Math.random() * 16}s ease-in-out infinite`,
        `animation-delay: -${Math.random() * 20}s`,
        "color:#c75b7a",
        "pointer-events:none",
      ].join(";");
      fragment.appendChild(el);
    }
    hearts.appendChild(fragment);
  }

  const musica = document.getElementById("musica");
  if (musica) {
    const spRaw = (musica.getAttribute("data-spotify-path") || "").trim();
    const spRaw2 = (musica.getAttribute("data-spotify-path-2") || "").trim();
    const coverRaw = (musica.getAttribute("data-cover") || "").trim();
    const coverRaw2 = (musica.getAttribute("data-cover-2") || "").trim();
    const spWrap1 = document.getElementById("spotify-wrap-1");
    const spWrap2 = document.getElementById("spotify-wrap-2");
    const placeholder1 = document.getElementById("embed-placeholder-1");
    const placeholder2 = document.getElementById("embed-placeholder-2");
    const coverArt1 = document.getElementById("cover-art-1");
    const coverArt2 = document.getElementById("cover-art-2");

    const normalizeSpotifyPath = (input) => {
      if (!input) return "";
      const s = String(input).trim();
      if (!s) return "";
      if (/^(track|playlist|album|artist)\/[A-Za-z0-9]+/.test(s)) return s.replace(/^\/+|\/+$/g, "");
      try {
        const u = new URL(s);
        if (u.hostname.includes("open.spotify.com")) {
          return (u.pathname || "").replace(/^\/+|\/+$/g, "");
        }
      } catch {
        // no-op
      }
      return s.replace(/^\/+|\/+$/g, "");
    };

    const renderSpotify = (raw, wrap, placeholder) => {
      const spPath = normalizeSpotifyPath(raw);
      if (!wrap || !spPath) return;
      const src = `https://open.spotify.com/embed/${spPath}?utm_source=generator&theme=0`;
      wrap.classList.remove("d-none");
      wrap.innerHTML = "";
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "152";
      iframe.title = "Spotify";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      iframe.src = src;
      wrap.appendChild(iframe);
      if (placeholder) placeholder.classList.add("d-none");
    };

    renderSpotify(spRaw, spWrap1, placeholder1);
    renderSpotify(spRaw2, spWrap2, placeholder2);

    const setCoverFallback = (img) => {
      if (!img) return;
      img.addEventListener(
        "error",
        () => {
          img.src =
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(
              `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#c75b7a'/><stop offset='1' stop-color='#8b3a52'/></linearGradient></defs><rect width='100%' height='100%' fill='url(#g)'/><text x='50%' y='52%' font-family='Outfit,Arial' font-size='28' fill='rgba(255,255,255,0.92)' text-anchor='middle'>Tu canción</text></svg>`
            );
        },
        { once: true }
      );
    };

    if (coverArt1 && coverRaw) {
      coverArt1.src = coverRaw;
    }
    if (coverArt2 && coverRaw2) {
      coverArt2.src = coverRaw2;
    }
    setCoverFallback(coverArt1);
    setCoverFallback(coverArt2);
  }

  const bindVinylPlayer = (audioId, vinylId) => {
    const audio = document.getElementById(audioId);
    const vinyl = document.getElementById(vinylId);
    if (!audio || !vinyl) return;
    audio.addEventListener("play", () => vinyl.classList.add("is-playing"));
    audio.addEventListener("pause", () => vinyl.classList.remove("is-playing"));
    audio.addEventListener("ended", () => vinyl.classList.remove("is-playing"));
  };

  bindVinylPlayer("dedicatoria-audio-1", "vinyl-1");
  bindVinylPlayer("dedicatoria-audio-2", "vinyl-2");

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
