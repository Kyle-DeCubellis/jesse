import { useState, useEffect, useRef } from "react";

function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0);
  const [viewH, setViewH] = useState(800);
  useEffect(() => {
    const onScroll = () => { setScrollY(window.scrollY); setViewH(window.innerHeight); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return { scrollY, viewH };
}

function useWindowWidth() {
  const [width, setWidth] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1200));
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Colors ───
const C = {
  bg: "#080808", bgAlt: "#0f0f0f", surface: "#1a1a1a", surfaceLight: "#222222",
  gold: "#c9a84c", goldLight: "#dfc06a", cream: "#f2ece0", white: "#fafafa",
  muted: "#777777", text: "#b8b8b8",
};

// ─── Images: curated Unsplash to match Jesse's portfolio ───
// HERO: beach wedding (matches the veil-blowing-in-wind shot)
// WEDDING FEATURED: ballroom/grand venue (matches the ballroom lift)
// EVENT: stage/comedy (matches Lil Rhody/Laugh Boston)
// TRAVEL: coastal/overlook (matches Azores)
// HEADSHOT: Jesse Dufault portrait
const IMG = {
  // Hero - dramatic beach wedding (matches Jesse's beach veil kiss shot)
  hero: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=1920&q=85",
  // Wedding featured - elegant ballroom/first dance (matches ballroom lift)
  weddingFeat: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80",
  // Event featured - concert/stage energy (matches comedy stage work)
  eventFeat: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1400&q=80",
  // Travel featured - dramatic coastal overlook (matches Azores shot)
  travelFeat: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=80",
  // Parallax quote bg - sailboats at golden hour (matches IG sailboat)
  parallax: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80",
  // About headshot
  headshot: "https://media.themoviedb.org/t/p/w375_and_h375_face/c9YwsLZk5wpkTwWbEeiHjKVqBjZ.jpg",
  // Gallery items
  g1: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=700&q=80",
  g2: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=700&q=80",
  g3: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80",
  g4: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700&q=80",
  g5: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=700&q=80",
  g6: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80",
  g7: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=700&q=80",
  g8: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700&q=80",
  g9: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=700&q=80",
  g10: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&q=80",
  g11: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80",
  g12: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=80",
};

// ─── Nav ───
function Nav({ scrollY }) {
  const show = scrollY > 80;
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useWindowWidth() < 768;
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: isMobile ? "0 24px" : "0 48px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
      background: show || menuOpen ? "rgba(8,8,8,0.97)" : "transparent",
      backdropFilter: show || menuOpen ? "blur(16px)" : "none",
      borderBottom: show || menuOpen ? `1px solid rgba(255,255,255,0.05)` : "none",
      transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <a href="#" style={{ textDecoration: "none" }}>
        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? 16 : 20, fontWeight: 400, letterSpacing: 4, color: C.cream, textTransform: "uppercase" }}>
          Jesse Dufault
        </div>
      </a>
      {isMobile ? (
        <>
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", gap: 5,
          }}>
            <span style={{ display: "block", width: 22, height: 1, background: menuOpen ? C.gold : C.cream, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 1, background: C.cream, opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <span style={{ display: "block", width: 22, height: 1, background: menuOpen ? C.gold : C.cream, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
          {menuOpen && (
            <div style={{
              position: "absolute", top: 68, left: 0, right: 0,
              background: "rgba(8,8,8,0.97)", borderBottom: `1px solid ${C.surface}`,
              display: "flex", flexDirection: "column", padding: "24px 24px",
            }}>
              {["Work", "Film", "About", "Contact"].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
                  color: C.muted, fontSize: 12, letterSpacing: 4, textTransform: "uppercase",
                  textDecoration: "none", fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  padding: "16px 0", borderBottom: `1px solid ${C.surface}`,
                }}>{item}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} style={{
                display: "inline-block", marginTop: 20, padding: "14px 28px", border: `1px solid ${C.gold}`,
                color: C.gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none",
                fontFamily: "'Inter', sans-serif", fontWeight: 500, textAlign: "center",
              }}>Inquire</a>
            </div>
          )}
        </>
      ) : (
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Work", "Film", "About", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: C.muted, fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
              textDecoration: "none", fontFamily: "'Inter', sans-serif", fontWeight: 400,
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = C.gold}
            onMouseLeave={e => e.target.style.color = C.muted}
            >{item}</a>
          ))}
          <a href="#contact" style={{
            padding: "10px 28px", border: `1px solid ${C.gold}`, color: C.gold,
            fontSize: 10, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none",
            fontFamily: "'Inter', sans-serif", fontWeight: 500, transition: "all 0.3s",
          }}
          onMouseEnter={e => { e.target.style.background = C.gold; e.target.style.color = C.bg; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = C.gold; }}
          >Inquire</a>
        </div>
      )}
    </nav>
  );
}

// ─── HERO: Power image that depletes as you scroll ───
function Hero({ scrollY, viewH }) {
  const isMobile = useWindowWidth() < 768;
  const p = Math.min(scrollY / (viewH * 1.2), 1);
  const scale = 1.2 - p * 0.2;
  const imgOpacity = 1 - p * 0.8;
  const overlayDark = 0.25 + p * 0.5;
  const textY = p * -80;
  const textOpacity = 1 - p * 1.5;
  const clipPath = `inset(0 0 ${p * 30}% 0)`;

  return (
    <section style={{ position: "relative", height: "110vh", overflow: "hidden", background: C.bg }}>
      {/* Background image that scales down and fades */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${IMG.hero})`,
        backgroundSize: "cover", backgroundPosition: "center 25%",
        transform: `scale(${scale})`,
        opacity: imgOpacity,
        clipPath,
        willChange: "transform, opacity",
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, rgba(8,8,8,${overlayDark * 0.4}) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,${overlayDark}) 100%)`,
      }} />
      {/* Vignette edges */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(8,8,8,0.6) 100%)",
      }} />
      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: isMobile ? "0 24px 80px" : "0 64px 120px",
        transform: `translateY(${textY}px)`, opacity: Math.max(textOpacity, 0),
      }}>
        <div style={{ maxWidth: 800 }}>
          <div style={{
            display: "flex", gap: 16, alignItems: "center", marginBottom: 28,
          }}>
            <div style={{ width: 40, height: 1, background: C.gold }} />
            <span style={{
              fontSize: 10, letterSpacing: 6, textTransform: "uppercase", color: C.gold,
              fontFamily: "'Inter', sans-serif", fontWeight: 500,
            }}>
              RI / NYC
            </span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(44px, 7vw, 88px)",
            fontWeight: 400, lineHeight: 1.05, color: C.cream, margin: 0, letterSpacing: -1,
          }}>
            Photographer.<br />
            Cinematographer.<br />
            <span style={{ color: C.gold }}>Director.</span>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)", maxWidth: 480, marginTop: 32, fontWeight: 300,
          }}>
            Weddings. Live events. Comedy. Film.<br />
            17 countries. One vision. Your story, told right.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 44 }}>
            <a href="#work" style={{
              padding: "16px 44px", background: C.gold, color: C.bg,
              fontSize: 10, letterSpacing: 4, textTransform: "uppercase", textDecoration: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, transition: "all 0.3s",
            }}
            onMouseEnter={e => e.target.style.background = C.goldLight}
            onMouseLeave={e => e.target.style.background = C.gold}
            >View Work</a>
            <a href="#film" style={{
              padding: "16px 44px", border: "1px solid rgba(255,255,255,0.15)", color: C.cream,
              fontSize: 10, letterSpacing: 4, textTransform: "uppercase", textDecoration: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 300, transition: "all 0.3s",
            }}
            onMouseEnter={e => e.target.style.borderColor = C.gold}
            onMouseLeave={e => e.target.style.borderColor = "rgba(255,255,255,0.15)"}
            >Watch Reel</a>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", zIndex: 3,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
        opacity: Math.max(1 - p * 4, 0),
      }}>
        <div style={{ width: 1, height: 56, background: `linear-gradient(to bottom, transparent, ${C.gold})` }} />
        <span style={{ fontSize: 8, letterSpacing: 5, color: C.muted, textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>Scroll</span>
      </div>
    </section>
  );
}

// ─── Credential / Trust Bar ───
function TrustBar() {
  const [ref, visible] = useInView(0.3);
  const isMobile = useWindowWidth() < 768;
  return (
    <section ref={ref} style={{
      padding: isMobile ? "40px 24px" : "48px 64px", background: C.bg,
      borderTop: `1px solid ${C.surface}`, borderBottom: `1px solid ${C.surface}`,
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: isMobile ? "32px 40px" : 0,
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)",
        transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {[
          { big: "500+", small: "Events" },
          { big: "17", small: "Countries" },
          { big: "4K", small: "Cinema" },
          { big: "IMDb", small: "Credited" },
          { big: "HGTV", small: "Featured" },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: "center", flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 400, color: C.gold, lineHeight: 1 }}>{item.big}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: 4, color: C.muted, textTransform: "uppercase", marginTop: 8 }}>{item.small}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured Work Blocks ───
function FeaturedBlock({ image, title, subtitle, desc, index }) {
  const [ref, visible] = useInView(0.08);
  const isEven = index % 2 === 0;
  const [hovered, setHovered] = useState(false);
  const isMobile = useWindowWidth() < 768;

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: isMobile ? "1fr" : isEven ? "1.5fr 1fr" : "1fr 1.5fr",
        minHeight: isMobile ? "auto" : "75vh", gap: 0, overflow: "hidden",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(50px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
      <div style={{
        order: isMobile ? 0 : isEven ? 0 : 1, position: "relative", overflow: "hidden", minHeight: isMobile ? 280 : 500,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(8,8,8,0) 60%, rgba(8,8,8,0.3) 100%)",
        }} />
      </div>
      <div style={{
        order: isMobile ? 1 : isEven ? 1 : 0,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: isMobile ? "48px 24px" : "72px 72px", background: C.bgAlt,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <div style={{ width: 28, height: 1, background: C.gold }} />
          <span style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{subtitle}</span>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 48px)",
          fontWeight: 400, color: C.cream, lineHeight: 1.2, margin: 0,
        }}>{title}</h2>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.8,
          fontWeight: 300, marginTop: 24, maxWidth: 400,
        }}>{desc}</p>
        <div style={{ width: 40, height: 1, background: C.surface, marginTop: 36, marginBottom: 36 }} />
        <a href="#work" style={{
          fontSize: 10, letterSpacing: 4, color: C.gold, textDecoration: "none",
          textTransform: "uppercase", fontFamily: "'Inter', sans-serif", fontWeight: 500,
          display: "inline-flex", alignItems: "center", gap: 12, transition: "gap 0.3s",
        }}
        onMouseEnter={e => e.target.style.gap = "20px"}
        onMouseLeave={e => e.target.style.gap = "12px"}
        >
          View Gallery <span style={{ fontSize: 16 }}>&rarr;</span>
        </a>
      </div>
    </div>
  );
}

// ─── Film Credits Section (IMDb differentiator) ───
function FilmCredits() {
  const [ref, visible] = useInView(0.15);
  const isMobile = useWindowWidth() < 768;
  const credits = [
    { title: "Noble Savages", role: "Music Department", year: "2016" },
    { title: "Normal", role: "Camera & Electrical", year: "2013" },
    { title: "Wander My Friends", role: "Camera & Electrical", year: "2014" },
    { title: "Murder University", role: "Actor", year: "2012" },
  ];

  return (
    <section id="film" ref={ref} style={{
      padding: isMobile ? "80px 24px" : "120px 64px", background: C.bg,
      borderTop: `1px solid ${C.surface}`,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
          <div style={{ width: 28, height: 1, background: C.gold }} />
          <span style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif" }}>Film & Television</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 400, color: C.cream, margin: "0 0 16px" }}>Beyond the Lens</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.8, fontWeight: 300, maxWidth: 600, marginBottom: 56 }}>
          Before the wedding films and comedy shows, Jesse cut his teeth in independent film.
          Actor, camera operator, musician - a true multi-hyphenate creative.
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {credits.map((c, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: isMobile ? "1fr auto" : "1fr 1fr auto",
              padding: "24px 0", borderBottom: `1px solid ${C.surface}`,
              alignItems: "center", gap: isMobile ? "4px 16px" : 0,
            }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: C.cream, fontWeight: 400 }}>{c.title}</span>
              {!isMobile && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.muted, letterSpacing: 1 }}>{c.role}</span>}
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.gold, letterSpacing: 2 }}>{c.year}</span>
              {isMobile && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.muted, letterSpacing: 1, gridColumn: "1 / -1" }}>{c.role}</span>}
            </div>
          ))}
        </div>
        <a href="https://www.imdb.com/name/nm4668944/" target="_blank" rel="noopener" style={{
          display: "inline-flex", alignItems: "center", gap: 8, marginTop: 40,
          fontSize: 10, letterSpacing: 4, color: C.gold, textDecoration: "none",
          textTransform: "uppercase", fontFamily: "'Inter', sans-serif", fontWeight: 500,
        }}>View on IMDb <span style={{ fontSize: 16 }}>&rarr;</span></a>
      </div>
    </section>
  );
}

// ─── Gallery Grid ───
function GalleryGrid() {
  const [filter, setFilter] = useState("all");
  const [ref, visible] = useInView(0.05);
  const isMobile = useWindowWidth() < 768;
  const items = [
    { src: IMG.g1, cat: "weddings", label: "Newport Ceremony" },
    { src: IMG.g2, cat: "events", label: "Laugh Boston" },
    { src: IMG.g3, cat: "portraits", label: "Floral Session" },
    { src: IMG.g4, cat: "adventure", label: "Coastal Escape" },
    { src: IMG.g5, cat: "weddings", label: "Rose Island" },
    { src: IMG.g6, cat: "events", label: "Festival Energy" },
    { src: IMG.g7, cat: "portraits", label: "Editorial" },
    { src: IMG.g8, cat: "weddings", label: "First Dance" },
    { src: IMG.g9, cat: "events", label: "Sold Out" },
    { src: IMG.g10, cat: "adventure", label: "Road Trip" },
    { src: IMG.g11, cat: "weddings", label: "The Moment" },
    { src: IMG.g12, cat: "events", label: "Lil Rhody Laugh" },
  ];
  const filtered = filter === "all" ? items : items.filter(i => i.cat === filter);
  const cats = ["all", "weddings", "events", "portraits", "adventure"];

  return (
    <section id="work" ref={ref} style={{ padding: isMobile ? "80px 16px" : "120px 48px", background: C.bgAlt }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 400, color: C.cream, margin: 0 }}>Selected Work</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: isMobile ? "12px 20px" : 36, marginBottom: 48 }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 10, letterSpacing: 3, textTransform: "uppercase",
              fontFamily: "'Inter', sans-serif", fontWeight: filter === cat ? 500 : 400,
              color: filter === cat ? C.gold : C.muted,
              borderBottom: filter === cat ? `1px solid ${C.gold}` : "1px solid transparent",
              paddingBottom: 8, transition: "all 0.3s",
            }}>{cat}</button>
          ))}
        </div>
        <div style={{
          columns: isMobile ? 2 : 3, columnGap: 4,
          opacity: visible ? 1 : 0, transition: "opacity 0.8s",
        }}>
          {filtered.map((item, i) => {
            const heights = ["55vh", "70vh", "45vh", "65vh", "50vh", "60vh", "55vh", "70vh", "48vh", "62vh", "58vh", "52vh"];
            return (
              <div key={`${item.label}-${filter}-${i}`} style={{
                position: "relative", marginBottom: 4, overflow: "hidden",
                height: heights[i % heights.length], breakInside: "avoid", cursor: "pointer",
              }}
              onMouseEnter={e => {
                const ov = e.currentTarget.querySelector("[data-ov]");
                const im = e.currentTarget.querySelector("img");
                if (ov) ov.style.opacity = "1";
                if (im) im.style.transform = "scale(1.06)";
              }}
              onMouseLeave={e => {
                const ov = e.currentTarget.querySelector("[data-ov]");
                const im = e.currentTarget.querySelector("img");
                if (ov) ov.style.opacity = "0";
                if (im) im.style.transform = "scale(1)";
              }}>
                <img src={item.src} alt={item.label} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                }} />
                <div data-ov="true" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)",
                  display: "flex", alignItems: "flex-end", padding: 24,
                  opacity: 0, transition: "opacity 0.4s",
                }}>
                  <div>
                    <div style={{ fontSize: 8, letterSpacing: 3, color: C.gold, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>{item.cat}</div>
                    <div style={{ fontSize: 16, color: C.cream, fontFamily: "'Playfair Display', serif", fontWeight: 400 }}>{item.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Parallax Quote ───
function CinematicQuote() {
  const [ref, visible] = useInView(0.25);
  const isMobile = useWindowWidth() < 768;
  return (
    <section ref={ref} style={{
      position: "relative", padding: isMobile ? "100px 32px" : "180px 64px", overflow: "hidden",
      backgroundImage: `url(${IMG.parallax})`, backgroundSize: "cover",
      backgroundPosition: "center", backgroundAttachment: "fixed",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.75)" }} />
      <div style={{
        position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto", textAlign: "center",
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
        transition: "all 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ fontSize: 72, color: C.gold, fontFamily: "'Playfair Display', serif", lineHeight: 1, marginBottom: 24, fontStyle: "italic" }}>&ldquo;</div>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 32px)",
          fontWeight: 400, fontStyle: "italic", color: C.cream, lineHeight: 1.7, margin: 0,
        }}>
          Jesse captured moments we didn't even know were happening.
          Every photo takes us right back to that feeling.
        </p>
        <div style={{ width: 40, height: 1, background: C.gold, margin: "40px auto 20px" }} />
        <div style={{ fontSize: 10, letterSpacing: 5, color: C.gold, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Sarah & Michael</div>
        <div style={{ fontSize: 12, color: C.muted, fontFamily: "'Inter', sans-serif", marginTop: 6 }}>Newport, Rhode Island</div>
      </div>
    </section>
  );
}

// ─── Services ───
function Services() {
  const [ref, visible] = useInView(0.1);
  const isMobile = useWindowWidth() < 768;
  const services = [
    { title: "Wedding Film & Photo", desc: "Full-day multi-camera coverage, 4K cinematic highlights, drone aerial, and a delivered gallery that makes you relive every moment.", features: ["8-12 Hour Coverage", "Second Shooter", "4K Highlight Reel", "Drone Aerial", "Online Gallery"] },
    { title: "Live Events & Comedy", desc: "From Laugh Boston to Lil Rhody. Dynamic stage photography and recap video that captures the raw energy of a live performance.", features: ["Multi-Camera Setup", "Low-Light Expert", "Same-Day Edits", "Social-Ready Deliverables", "Video & Photo"] },
    { title: "Portraits & Editorial", desc: "Headshots, branding sessions, creative direction. Whether it's for your next role or your Instagram, you'll look like you belong on a billboard.", features: ["On-Location", "Creative Direction", "Retouching Included", "Commercial License", "Quick Turnaround"] },
  ];

  return (
    <section id="services" ref={ref} style={{ padding: isMobile ? "80px 24px" : "120px 64px", background: C.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <div style={{ width: 28, height: 1, background: C.gold }} />
            <span style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif" }}>Services</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 400, color: C.cream, margin: 0 }}>What I Offer</h2>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 16 : 1,
          opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: C.surface, padding: "52px 36px",
              borderTop: `2px solid ${C.gold}`,
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: C.cream, margin: "0 0 16px" }}>{s.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.text, lineHeight: 1.7, fontWeight: 300, margin: "0 0 28px" }}>{s.desc}</p>
              {s.features.map((f, j) => (
                <div key={j} style={{
                  padding: "10px 0", borderBottom: `1px solid rgba(255,255,255,0.04)`,
                  fontSize: 11, color: C.muted, fontFamily: "'Inter', sans-serif",
                  letterSpacing: 1, display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ color: C.gold, fontSize: 6 }}>&#9670;</span> {f}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ───
function About() {
  const [ref, visible] = useInView(0.1);
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="about" ref={ref} style={{
      display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr", minHeight: isMobile ? "auto" : "80vh",
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(40px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        backgroundImage: `url(${IMG.headshot})`,
        backgroundSize: "cover", backgroundPosition: "center top", minHeight: isMobile ? 360 : 600,
      }} />
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: isMobile ? "56px 24px" : "80px 80px", background: C.bgAlt,
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
          <div style={{ width: 28, height: 1, background: C.gold }} />
          <span style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif" }}>About</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.cream, margin: "0 0 28px", lineHeight: 1.2 }}>Jesse Dufault</h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.9, fontWeight: 300, margin: "0 0 18px" }}>
          Based between Rhode Island and New York City, Jesse is a photographer,
          cinematographer, and director with IMDb credits, an HGTV feature, and a
          portfolio that spans 17 countries.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.9, fontWeight: 300, margin: "0 0 18px" }}>
          From intimate elopements at Rose Island Lighthouse to sold-out comedy
          shows at Laugh Boston, Jesse brings a filmmaker's eye to everything he
          captures. His work lives at the intersection of cinematic storytelling
          and authentic, unscripted moments.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.9, fontWeight: 300, margin: "0 0 36px" }}>
          When he's not behind the camera, you'll find him sailing Narragansett
          Bay with his wife Nora and their dog Lily, or tinkering with their
          160 sq. ft. tiny house (yes, the one from HGTV).
        </p>
        <div style={{ display: "flex", gap: 28 }}>
          {[
            { label: "Instagram", href: "https://www.instagram.com/jessedufault/" },
            { label: "IMDb", href: "https://www.imdb.com/name/nm4668944/" },
            { label: "Inquire", href: "#contact" },
          ].map(link => (
            <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener" style={{
              fontSize: 10, letterSpacing: 3, color: C.gold, textDecoration: "none",
              fontFamily: "'Inter', sans-serif", fontWeight: 500, textTransform: "uppercase",
              transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = C.goldLight}
            onMouseLeave={e => e.target.style.color = C.gold}
            >{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ───
function Testimonials() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView(0.2);
  const isMobile = useWindowWidth() < 768;
  const t = [
    { text: "Jesse has an incredible ability to be everywhere at once while being completely invisible. Our wedding photos feel candid, emotional, and cinematic all at the same time.", name: "Amanda & Chris", loc: "Newport, RI" },
    { text: "We've worked with dozens of photographers for our comedy shows. Jesse is the only one who truly captures the energy of a live performance. His work makes our artists look like rock stars.", name: "Laugh Boston", loc: "Boston, MA" },
    { text: "The highlight film Jesse created for our wedding still makes us cry every single time. It's not just a video - it's a piece of art.", name: "Rachel & Tom", loc: "Block Island, RI" },
  ];
  return (
    <section ref={ref} style={{ padding: isMobile ? "80px 24px" : "120px 64px", background: C.bg }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s" }}>
        <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>Testimonials</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.cream, margin: "0 0 60px" }}>Kind Words</h2>
        <div style={{ minHeight: 180 }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 400, fontStyle: "italic", color: C.text, lineHeight: 1.8, margin: "0 0 28px" }}>
            &ldquo;{t[active].text}&rdquo;
          </p>
          <div style={{ fontSize: 10, letterSpacing: 5, color: C.gold, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{t[active].name}</div>
          <div style={{ fontSize: 12, color: C.muted, fontFamily: "'Inter', sans-serif", marginTop: 4 }}>{t[active].loc}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 44 }}>
          {t.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 36 : 8, height: 3,
              background: i === active ? C.gold : C.surface,
              border: "none", cursor: "pointer", transition: "all 0.5s",
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───
function Contact() {
  const [ref, visible] = useInView(0.1);
  const isMobile = useWindowWidth() < 768;
  return (
    <section id="contact" ref={ref} style={{
      padding: isMobile ? "80px 24px" : "120px 64px", background: C.bgAlt,
      opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)",
      transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, textTransform: "uppercase", color: C.gold, fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>Contact</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 400, color: C.cream, margin: "0 0 16px" }}>Let's Create Together</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.text, lineHeight: 1.7, fontWeight: 300 }}>
            Whether it's your wedding, a comedy tour, or a creative project - I'd love to hear about it. Currently booking 2026.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            {[{ l: "Name", p: "Your name" }, { l: "Email", p: "you@email.com" }].map((f, i) => (
              <div key={i}>
                <label style={{ display: "block", fontSize: 9, letterSpacing: 3, color: C.muted, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>{f.l}</label>
                <input placeholder={f.p} style={{
                  width: "100%", padding: "14px 16px", background: C.surface, border: `1px solid ${C.surface}`,
                  color: C.cream, fontFamily: "'Inter', sans-serif", fontSize: 13, outline: "none",
                  transition: "border 0.3s", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = C.gold}
                onBlur={e => e.target.style.borderColor = C.surface} />
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
            {[{ l: "Event Type", p: "Wedding, Event, Portrait..." }, { l: "Date", p: "Approximate date" }].map((f, i) => (
              <div key={i}>
                <label style={{ display: "block", fontSize: 9, letterSpacing: 3, color: C.muted, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>{f.l}</label>
                <input placeholder={f.p} style={{
                  width: "100%", padding: "14px 16px", background: C.surface, border: `1px solid ${C.surface}`,
                  color: C.cream, fontFamily: "'Inter', sans-serif", fontSize: 13, outline: "none",
                  transition: "border 0.3s", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = C.gold}
                onBlur={e => e.target.style.borderColor = C.surface} />
              </div>
            ))}
          </div>
          <div>
            <label style={{ display: "block", fontSize: 9, letterSpacing: 3, color: C.muted, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Message</label>
            <textarea rows={4} placeholder="Tell me about your vision..." style={{
              width: "100%", padding: "14px 16px", background: C.surface, border: `1px solid ${C.surface}`,
              color: C.cream, fontFamily: "'Inter', sans-serif", fontSize: 13, resize: "vertical",
              outline: "none", transition: "border 0.3s", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = C.gold}
            onBlur={e => e.target.style.borderColor = C.surface} />
          </div>
          <button style={{
            padding: "18px 48px", background: C.gold, color: C.bg, border: "none",
            fontSize: 10, letterSpacing: 4, textTransform: "uppercase", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontWeight: 600, marginTop: 8, transition: "background 0.3s",
          }}
          onMouseEnter={e => e.target.style.background = C.goldLight}
          onMouseLeave={e => e.target.style.background = C.gold}
          >Send Inquiry</button>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  const isMobile = useWindowWidth() < 768;
  return (
    <footer style={{ padding: isMobile ? "48px 24px 28px" : "56px 64px 36px", background: C.bg, borderTop: `1px solid ${C.surface}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: isMobile ? 28 : 0 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: C.cream, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Jesse Dufault</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
            Photographer &middot; Cinematographer &middot; Director<br />
            Rhode Island &middot; New York City &middot; Worldwide
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "12px 20px" : 28 }}>
          {[
            { label: "Instagram", href: "https://www.instagram.com/jessedufault/" },
            { label: "IMDb", href: "https://www.imdb.com/name/nm4668944/" },
            { label: "Threads", href: "#" },
            { label: "Email", href: "mailto:jesse@jessedufault.com" },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener" style={{
              fontSize: 10, letterSpacing: 2, color: C.muted, textDecoration: "none",
              fontFamily: "'Inter', sans-serif", textTransform: "uppercase", transition: "color 0.3s",
            }}
            onMouseEnter={e => e.target.style.color = C.gold}
            onMouseLeave={e => e.target.style.color = C.muted}
            >{link.label}</a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "28px auto 0", paddingTop: 20, borderTop: `1px solid ${C.surface}`, textAlign: "center" }}>
        <span style={{ fontSize: 10, color: C.muted, fontFamily: "'Inter', sans-serif", letterSpacing: 1 }}>&copy; 2026 Jesse Dufault. All rights reserved.</span>
      </div>
    </footer>
  );
}

// ─── App ───
export default function App() {
  const { scrollY, viewH } = useScrollProgress();

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.cream, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        body { background: ${C.bg}; overflow-x: hidden; }
        ::selection { background: ${C.gold}; color: ${C.bg}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.surface}; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.gold}; }
        img { display: block; }
        input, textarea { font-family: inherit; }
      `}</style>

      <Nav scrollY={scrollY} />
      <Hero scrollY={scrollY} viewH={viewH} />
      <TrustBar />

      <FeaturedBlock image={IMG.weddingFeat}
        title="Your Day, Told Cinematically"
        subtitle="Weddings" index={0}
        desc="From beach elopements in Costa Rica to grand Newport estates. Multi-camera, drone, and a highlight film that will make you relive every moment." />

      <FeaturedBlock image={IMG.eventFeat}
        title="The Energy of the Stage"
        subtitle="Live Events & Comedy" index={1}
        desc="Laugh Boston. Lil Rhody Comedy. National touring acts. Jesse captures the electricity of live performance in a way that makes every artist look legendary." />

      <FeaturedBlock image={IMG.travelFeat}
        title="Stories Worth Telling"
        subtitle="Adventure & Lifestyle" index={2}
        desc="From the Azores to Narragansett Bay. Elopements, editorials, and adventures across 17 countries and counting." />

      <CinematicQuote />
      <GalleryGrid />
      <FilmCredits />
      <Services />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
