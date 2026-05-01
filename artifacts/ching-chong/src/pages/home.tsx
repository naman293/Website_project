import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, animate } from "framer-motion";
import { Phone, MapPin, Clock, ChevronDown, ChevronUp, Star, Menu, X, MessageCircle, Download } from "lucide-react";
import { menuItems } from "@/data/menu";
import type { MenuCategory, IndicatorType } from "@/data/menu";

const PHONE_NUMBER = "+91-8000344293";
const PHONE_HREF = "tel:+918000344293";
const WHATSAPP_HREF_1 = "https://wa.me/917791802353";
const WHATSAPP_HREF_2 = "https://wa.me/919799426648";

/* ─── Loading Screen ─────────────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -50, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } 
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050505",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.25rem",
      }}
    >
      {/* Atmospheric Glow */}
      <div style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "radial-gradient(circle, rgba(230,57,70,0.1) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none"
      }} />

      {/* Animated Icon (Stylized Lantern/Steam) */}
      {/* "Bulb Effect" Mascot */}
      {/* Animated Icon (Original Lantern SVG) */}
      <motion.div
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }}
        style={{ position: "relative", marginBottom: "0" }}
      >
        <div style={{
          width: "80px",
          height: "80px",
          background: "radial-gradient(circle, #E63946 0%, transparent 70%)",
          filter: "blur(20px)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.3
        }} />
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0 0 10px #E63946)" }}>
           {/* Modern Wok Silhouette */}
           <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10" />
           <path d="M2 12h20" />
           <path d="M18 12V10a2 2 0 0 0-2-2M6 12V10a2 2 0 0 1 2-2" />
           {/* Steam Lines */}
           <motion.path 
             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
             transition={{ duration: 2, repeat: Infinity, delay: 0 }}
             d="M12 6V3" 
           />
           <motion.path 
             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
             transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
             d="M9 7V5" 
           />
           <motion.path 
             animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
             transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
             d="M15 7V5" 
           />
        </svg>
      </motion.div>



      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ 
          color: "#E63946", 
          fontSize: "0.7rem", 
          fontWeight: 700, 
          letterSpacing: "0.5em", 
          textTransform: "uppercase",
          marginTop: "0.5rem"
        }}
      >
        Preparing your food...
      </motion.p>

      {/* Minimalist Progress Line */}
      <div style={{ width: "160px", height: "1px", background: "rgba(255,255,255,0.1)", marginTop: "1rem", position: "relative", overflow: "hidden" }}>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ 
            width: "100%", 
            height: "100%", 
            background: "linear-gradient(90deg, transparent, #E63946, transparent)" 
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Animated Section Divider ─────────────────────────────────────────── */
function AnimatedDivider({ color = "red" }: { color?: "red" | "orange" | "both" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-10% 0px -10% 0px", once: false });

  const gradient =
    color === "both"
      ? "linear-gradient(90deg, transparent 0%, #E63946 30%, #F77F00 50%, #E63946 70%, transparent 100%)"
      : color === "orange"
      ? "linear-gradient(90deg, transparent 0%, #F77F00 40%, #FCCA46 50%, #F77F00 60%, transparent 100%)"
      : "linear-gradient(90deg, transparent 0%, #E63946 40%, #ff6b7a 50%, #E63946 60%, transparent 100%)";

  const glowColor =
    color === "orange" ? "rgba(247,127,0,0.5)" : "rgba(230,57,70,0.5)";

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{
          scaleX: isInView ? 1 : 0,
          opacity: isInView ? 1 : 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "2px",
          background: gradient,
          boxShadow: `0 0 12px ${glowColor}, 0 0 30px ${glowColor.replace("0.5", "0.2")}`,
          transformOrigin: "center",
        }}
      />
      {/* Center sparkle */}
      <motion.div
        animate={{
          opacity: isInView ? 1 : 0,
          scale: isInView ? 1 : 0,
        }}
        transition={{ duration: 0.4, delay: isInView ? 0.5 : 0 }}
        style={{
          position: "relative",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: color === "orange" ? "#F77F00" : "#E63946",
          boxShadow: `0 0 8px ${glowColor}, 0 0 16px ${glowColor}`,
          zIndex: 1,
        }}
      />
    </div>
  );
}

function VegIndicator({ indicator }: { indicator: IndicatorType }) {
  if (indicator === "mixed") {
    return (
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: 3 }}
        aria-label="contains both veg and non-veg"
      >
        <span className="veg-indicator" aria-label="veg" />
        <span className="nonveg-indicator" aria-label="non-veg" />
      </span>
    );
  }
  if (indicator === "veg") {
    return <span className="veg-indicator" aria-label="vegetarian" />;
  }
  return <span className="nonveg-indicator" aria-label="non-vegetarian" />;
}

function TypeBadge({ type }: { type: string }) {
  if (!type) return null;
  const colors: Record<string, string> = {
    dry: "rgba(247,127,0,0.15)",
    gravy: "rgba(230,57,70,0.15)",
    "dry/gravy": "rgba(252,202,70,0.12)",
    "steamed/fried": "rgba(100,180,255,0.12)",
  };
  const textColors: Record<string, string> = {
    dry: "#F77F00",
    gravy: "#E63946",
    "dry/gravy": "#FCCA46",
    "steamed/fried": "#60b4ff",
  };
  return (
    <span
      style={{
        background: colors[type] || "rgba(255,255,255,0.05)",
        color: textColors[type] || "#aaa",
        border: `1px solid ${textColors[type] || "#aaa"}40`,
        padding: "1px 8px",
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {type}
    </span>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Directions", href: "#directions" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      data-testid="navbar"
      initial={false}
      animate={{
        y: scrolled ? 0 : -80,
        opacity: scrolled ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(10,10,10,0.6)",
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderBottom: "1px solid rgba(230,57,70,0.15)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        pointerEvents: scrolled ? "auto" : "none",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px", padding: "0 1.5rem" }}>
        <a href="#home" style={{ textDecoration: "none" }} data-testid="nav-logo">
          <img 
            src="/ching_chong_wordmark.png" 
            alt="Ching Chong Logo" 
            style={{ 
              height: "40px", 
              display: "block", 
              objectFit: "contain",
              opacity: 0.9,
              mixBlendMode: "screen",
              filter: "brightness(1.1) drop-shadow(0 0 8px rgba(230,57,70,0.2))"
            }} 
          />
        </a>

        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: "2rem" }} data-testid="nav-desktop">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E63946")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              data-testid="nav-call-btn"
              className="btn-neon-red"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "8px 20px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Phone size={14} />
              CALL NOW
            </a>
          </nav>
        )}

        {isMobile && (
          <button
            data-testid="nav-mobile-menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}
      </div>

      {isMobile && (
        <div
          data-testid="nav-mobile-menu"
          style={{
            overflow: "hidden",
            maxHeight: open ? "500px" : "0px",
            transition: "max-height 0.35s ease",
            background: "rgba(10,10,10,0.98)",
            borderTop: open ? "1px solid rgba(230,57,70,0.2)" : "none",
          }}
        >
          <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                style={{
                  color: "#ccc",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "block",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={PHONE_HREF}
              className="btn-neon-red"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "14px 20px",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginTop: "0.75rem",
                marginBottom: "0.5rem",
              }}
              data-testid="mobile-nav-call-btn"
              onClick={() => setOpen(false)}
            >
              <Phone size={16} />
              CALL NOW — {PHONE_NUMBER}
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      data-testid="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      <motion.div
        className="hero-responsive-bg"
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          filter: "brightness(0.4) contrast(1.1)",
          opacity: 0.7,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center bottom, rgba(230,57,70,0.12) 0%, transparent 60%), linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <motion.div
        style={{ 
          position: "relative", 
          zIndex: 2, 
          textAlign: "center", 
          padding: isMobile ? "8vh 1.5rem 4vh" : "2rem 1.5rem", 
          maxWidth: "900px", 
          height: isMobile ? "80vh" : "auto",
          display: isMobile ? "flex" : "block",
          flexDirection: "column",
          justifyContent: isMobile ? "space-between" : "center"
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              color: "#F77F00",
              fontSize: isMobile ? "0.7rem" : "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Jaipur's Finest — Since 2018
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ 
              marginBottom: isMobile ? "1rem" : "2rem", 
              width: "100%", 
              display: "flex", 
              justifyContent: "center" 
            }}
            data-testid="hero-title"
          >
            <img 
              src="/ching_chong_wordmark.png" 
              alt="CHING CHONG" 
              style={{ 
                width: isMobile ? "min(85vw, 600px)" : "min(90vw, 750px)", 
                height: "auto", 
                display: "block",
                opacity: 0.85,
                mixBlendMode: "screen",
                filter: "brightness(1.05) contrast(1.1) drop-shadow(0 0 20px rgba(0,0,0,0.8))"
              }} 
            />
          </motion.div>
        </div>

        {!isMobile && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{
              color: "#e0e0e0",
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              fontWeight: 300,
              letterSpacing: "0.08em",
              marginBottom: "2.5rem",
              lineHeight: 1.5,
            }}
          >
            Jaipur's Boldest Indo-Chinese Experience
            <br />
            <span style={{ color: "#FCCA46", fontWeight: 500 }}>Near Rajapark — Open Daily 11am to 11pm</span>
          </motion.p>
        )}

        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href={PHONE_HREF}
              className="btn-neon-red pulse-glow"
              data-testid="hero-call-btn"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 36px)",
                borderRadius: "6px",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Phone size={18} />
              CALL NOW
            </a>
            <a
              href="#menu"
              className="btn-neon-outline"
              data-testid="hero-menu-btn"
              style={{
                textDecoration: "none",
                padding: "clamp(12px, 2.5vw, 16px) clamp(24px, 5vw, 36px)",
                borderRadius: "6px",
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              VIEW MENU
            </a>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ 
            marginTop: isMobile ? "1rem" : "4rem", 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "0.6rem" : "2rem", 
            justifyContent: "center", 
            alignItems: "center",
            flexWrap: "wrap" 
          }}
        >
          {[
            { icon: <Star size={16} style={{ color: "#FCCA46" }} />, text: "Rated Jaipur's Best Chinese" },
            { icon: <MapPin size={16} style={{ color: "#E63946" }} />, text: "Near Rajapark Main Circle" },
            { icon: <Clock size={16} style={{ color: "#F77F00" }} />, text: "Open 7 Days a Week" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#aaa", fontSize: isMobile ? "0.8rem" : "0.85rem", textAlign: "center" }}>
              {item.icon}
              {item.text}
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255,255,255,0.4)",
          zIndex: 2,
        }}
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      data-testid="about-section"
      style={{ 
        background: "linear-gradient(to bottom, #0a0a0a 0%, #0d0d0d 10%, #0d0d0d 90%, #0a0a0a 100%)", 
        padding: "6rem 1.5rem", 
        position: "relative", 
        overflow: "hidden" 
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(247,127,0,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p style={{ color: "#F77F00", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Our Story
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", lineHeight: 1 }}>
            BEST CHINESE IN RAJA PARK
          </h2>
          <p className="sr-only">
            Ching Chong is the top-rated Chinese restaurant in Raja Park, Jaipur, offering authentic Indo-Chinese flavors.
          </p>
          <div className="section-divider" style={{ margin: "1rem auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ color: "#ccc", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Born in Jaipur, perfected on the streets. Ching Chong blends the fiery soul of Sichuan street food with the bold spices of Rajasthan.
            </p>
            <p style={{ color: "#aaa", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Since 2018, we've been serving Jaipur's most crave-worthy Indo-Chinese dishes — smoky, spicy, and absolutely unforgettable. Every dish is cooked fresh, every day, in our blazing hot woks.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                { stat: "6+", label: "Years Serving Jaipur" },
                { stat: "50+", label: "Menu Items" },
                { stat: "100%", label: "Fresh Daily" },
              ].map((item) => (
                <div
                  key={item.stat}
                  data-testid={`stat-${item.stat}`}
                  style={{
                    textAlign: "center",
                    padding: "1.25rem 0.75rem",
                    background: "rgba(230,57,70,0.05)",
                    border: "1px solid rgba(230,57,70,0.15)",
                    borderRadius: "8px",
                  }}
                >
                  <div className="font-display neon-red" style={{ fontSize: "2.2rem", lineHeight: 1 }}>{item.stat}</div>
                  <div style={{ color: "#888", fontSize: "0.75rem", marginTop: "0.4rem", lineHeight: 1.3 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: "relative" }}
          >
            <img
              src="/about-food.png"
              alt="Delicious Indo-Chinese food at Ching Chong restaurant in Jaipur"
              width={600}
              height={400}
              loading="lazy"
              style={{
                width: "100%",
                borderRadius: "12px",
                border: "1px solid rgba(230,57,70,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(230,57,70,0.1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-1rem",
                left: "-1rem",
                background: "linear-gradient(135deg, #E63946, #F77F00)",
                borderRadius: "8px",
                padding: "1rem 1.5rem",
                boxShadow: "0 8px 30px rgba(230,57,70,0.4)",
              }}
            >
              <div className="font-display" style={{ fontSize: "1.5rem", color: "#fff" }}>RAJA PARK</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}>Jaipur, Rajasthan</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | MenuCategory>("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const menuTopRef = useRef<HTMLDivElement>(null);

  const filters: { key: "all" | MenuCategory; label: string }[] = [
    { key: "all", label: "All Items" },
    { key: "veg", label: "Veg" },
    { key: "non-veg", label: "Non-Veg" },
    { key: "combo", label: "Combos" },
  ];

  const filtered = activeFilter === "all" ? menuItems : menuItems.filter((i) => i.category === activeFilter);
  const itemsToShow = isExpanded ? filtered : filtered.slice(0, 8);

  const toggleExpansion = () => {
    if (isExpanded) {
      // Calculate target: the filter switching section
      const filterElement = filterRef.current;
      if (!filterElement) return;
      
      const targetY = filterElement.getBoundingClientRect().top + window.scrollY - 100;
      const startY = window.scrollY;
      
      // 1. Collapse instantly
      setIsExpanded(false);
      
      // 2. Instant jump to filters (0 seconds)
      window.scrollTo(0, targetY);
    } else {
      setIsExpanded(true);
    }
  };



  return (
    <section
      id="menu"
      data-testid="menu-section"
      style={{ 
        background: "linear-gradient(to bottom, #0a0a0a 0%, #0a0a0a 90%, #0d0d0d 100%)", 
        padding: "6rem 1.5rem", 
        position: "relative" 
      }}
    >
      <div ref={menuTopRef} style={{ position: "absolute", top: "100px" }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(230,57,70,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(247,127,0,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p style={{ color: "#E63946", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Explore Our Flavours
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", lineHeight: 1 }}>
            THE MENU
          </h2>
          <div className="section-divider" style={{ margin: "1rem auto" }} />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
            <a 
              href="/Ching_Chong_Menu.pdf" 
              download 
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(230,57,70,0.1)",
                color: "#E63946",
                border: "1px solid rgba(230,57,70,0.3)",
                padding: "8px 20px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(230,57,70,0.2)";
                e.currentTarget.style.borderColor = "rgba(230,57,70,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(230,57,70,0.1)";
                e.currentTarget.style.borderColor = "rgba(230,57,70,0.3)";
              }}
            >
              <Download size={16} /> Download Full Menu
            </a>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#888", fontSize: "0.8rem" }}>
              <span className="veg-indicator" /> Veg
            </span>
            <span style={{ color: "#444", margin: "0 0.25rem" }}>|</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#888", fontSize: "0.8rem" }}>
              <span className="nonveg-indicator" /> Non-Veg
            </span>
          </div>
        </motion.div>

        <div 
          ref={filterRef}
          style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              data-testid={`menu-filter-${f.key}`}
              onClick={() => {
                setActiveFilter(f.key);
                setIsExpanded(false);
              }}
              style={{
                padding: "10px 24px",
                borderRadius: "6px",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border: activeFilter === f.key ? "1px solid #E63946" : "1px solid rgba(255,255,255,0.1)",
                background: activeFilter === f.key ? "rgba(230,57,70,0.15)" : "rgba(255,255,255,0.03)",
                color: activeFilter === f.key ? "#E63946" : "#888",
                boxShadow: activeFilter === f.key ? "0 0 15px rgba(230,57,70,0.2)" : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {itemsToShow.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="menu-card"
              data-testid={`menu-item-${item.id}`}
              style={{ borderRadius: "10px", padding: "1.25rem" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  <VegIndicator indicator={item.indicator} />
                  <h3 style={{ color: "#f0f0f0", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.3, margin: 0 }}>
                    {item.name}
                  </h3>
                </div>
                <span
                  className="font-display neon-orange"
                  style={{ fontSize: "1.1rem", whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.06em" }}
                >
                  {item.price}
                </span>
              </div>
              <p style={{ color: "#777", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: "0.75rem", marginLeft: "22px" }}>
                {item.description}
              </p>
              {item.foodType && (
                <div style={{ marginLeft: "22px" }}>
                  <TypeBadge type={item.foodType} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {filtered.length > 8 && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button
              onClick={toggleExpansion}
              style={{
                background: "transparent",
                border: "1px solid rgba(230,57,70,0.5)",
                color: "#E63946",
                padding: "10px 24px",
                borderRadius: "30px",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(230,57,70,0.1)";
                e.currentTarget.style.boxShadow = "0 0 15px rgba(230,57,70,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {isExpanded ? (
                <>View Less <ChevronUp size={16} /></>
              ) : (
                <>View Full Menu <ChevronDown size={16} /></>
              )}
            </button>
          </div>
        )}



        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            Prices may vary. Call us for daily specials and bulk orders.
          </p>
          <a
            href={PHONE_HREF}
            className="btn-neon-red"
            data-testid="menu-call-btn"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "14px 32px",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Phone size={18} />
            ORDER BY CALL
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function OrderSection() {
  const ZOMATO_LINK = "https://www.zomato.com/jaipur/ching-chong-raja-park/order";
  const SWIGGY_LINK = "https://www.swiggy.com/city/jaipur/ching-chong-lajpat-park-raja-park-rest394124?utm_source=GooglePlaceOrder&utm_campaign=GoogleMap&is_retargeting=true&media_source=GooglePlaceOrder";

  return (
    <section
      id="order"
      style={{
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >


      <div style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
        padding: "5rem 1.5rem",
        position: "relative",
      }}>
        {/* Floating food images — decorative */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            overflow: "hidden",
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=400&fit=crop"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 0.15, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            position: "absolute",
            bottom: "5%",
            right: "-5%",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            overflow: "hidden",
            pointerEvents: "none",
            filter: "blur(1px)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=400&fit=crop"
            alt=""
            aria-hidden="true"
            width={400}
            height={400}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        {/* Subtle radial glow behind content */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p style={{ color: "#F77F00", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Craving Something?
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
              ORDER <span className="neon-red">ONLINE</span>
            </h2>
            <div className="section-divider" style={{ margin: "1rem auto 1.5rem" }} />
            <p style={{ color: "#888", fontSize: "1.05rem", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.6 }}>
              Get your favourite Indo-Chinese dishes delivered hot to your doorstep via Zomato or Swiggy.
            </p>
          </motion.div>

          {/* Order cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}
          >
            {/* Zomato Card */}
            <a
              href={ZOMATO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "2rem 2.5rem",
                borderRadius: "16px",
                textDecoration: "none",
                minWidth: "220px",
                flex: "1",
                maxWidth: "320px",
                cursor: "pointer",
                borderColor: "rgba(226, 55, 68, 0.3)",
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #E23744, #bd1b26)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(226,55,68,0.4)",
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "#fff",
              }}>
                Z
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "0.03em" }}>
                Order on Zomato
              </span>
              <span style={{ color: "#777", fontSize: "0.8rem" }}>
                zomato.com
              </span>
            </a>

            {/* Swiggy Card */}
            <a
              href={SWIGGY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="menu-card"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
                padding: "2rem 2.5rem",
                borderRadius: "16px",
                textDecoration: "none",
                minWidth: "220px",
                flex: "1",
                maxWidth: "320px",
                cursor: "pointer",
                borderColor: "rgba(252, 128, 25, 0.3)",
              }}
            >
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #FC8019, #d66408)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(252,128,25,0.4)",
                fontSize: "1.6rem",
                fontWeight: 900,
                color: "#fff",
              }}>
                S
              </div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "0.03em" }}>
                Order on Swiggy
              </span>
              <span style={{ color: "#777", fontSize: "0.8rem" }}>
                swiggy.com
              </span>
            </a>
          </motion.div>

          {/* Free Delivery Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="glow-red"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "20px",
              background: "linear-gradient(135deg, rgba(20,20,20,0.95), rgba(15,15,15,0.98))",
              border: "1px solid rgba(230,57,70,0.3)",
              borderRadius: "16px",
              padding: "1.25rem 2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <Star size={18} style={{ color: "#22c55e" }} />
              </div>
              <span style={{ color: "#22c55e", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Free Delivery
              </span>
            </div>
            <div style={{ width: "1px", height: "28px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ color: "#aaa", fontSize: "0.95rem", fontWeight: 500 }}>
              Within <span style={{ color: "#fff", fontWeight: 700 }}>2 Km</span> &bull; Min. Order <span style={{ color: "#fff", fontWeight: 700 }}>₹400</span>
            </span>
          </motion.div>
        </div>
      </div>


    </section>
  );
}

function DirectionsSection() {
  return (
    <section
      id="directions"
      data-testid="directions-section"
      style={{ 
        background: "linear-gradient(to bottom, #0d0d0d 0%, #0d0d0d 90%, #080808 100%)", 
        padding: "6rem 1.5rem" 
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p style={{ color: "#F77F00", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Find Us
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", lineHeight: 1 }}>
            DIRECTIONS
          </h2>
          <div className="section-divider" style={{ margin: "1rem auto" }} />
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FCCA46", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Address
              </h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <MapPin size={20} style={{ color: "#E63946", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#e0e0e0", fontWeight: 600, fontSize: "1rem", margin: "0 0 0.25rem" }}>
                    Ching Chong Restaurant
                  </p>
                  <p style={{ color: "#999", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
                    Shop No.3, Plot no. 516, Lane No. 5,<br />
                    Vyas Marg, Raja Park, Jaipur
                  </p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ color: "#FCCA46", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Opening Hours
              </h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <Clock size={20} style={{ color: "#F77F00", flexShrink: 0, marginTop: "2px" }} />
                <div>
                  <p style={{ color: "#e0e0e0", fontWeight: 600, margin: "0 0 0.25rem" }}>Monday – Sunday</p>
                  <p style={{ color: "#F77F00", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>11:00 AM – 11:00 PM</p>
                  <p style={{ color: "#666", fontSize: "0.8rem", marginTop: "0.25rem" }}>Open all 7 days</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=26.8927142%2C75.8278899&destination_place_id=ChIJr6SatrfbDTkRFI67lIjwvDs&travelmode=driving"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-red pulse-glow"
              data-testid="directions-btn"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "14px 28px",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <MapPin size={16} />
              DIRECTIONS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Map container with custom "Open in Maps" overlay */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(230,57,70,0.2)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(230,57,70,0.08)",
                }}
              >
                <iframe
                  src="https://maps.google.com/maps?q=26.8927142,75.8278899&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="350"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ching Chong Restaurant - Shop No.3, Plot 516, Lane 5, Vyas Marg, Raja Park, Jaipur"
                  data-testid="map-embed"
                />
              </div>
              {/* Custom "Open in Maps" overlay — replaces auto-generated iframe button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=26.8927142%2C75.8278899&travelmode=driving"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "max-content",
                  background: "rgba(10,10,10,0.95)",
                  border: "2px solid #E63946",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  color: "#E63946",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 10px rgba(230,57,70,0.3)",
                  letterSpacing: "0.04em",
                  zIndex: 10,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(230,57,70,0.15)";
                  e.currentTarget.style.boxShadow = "0 0 18px rgba(230,57,70,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(10,10,10,0.92)";
                  e.currentTarget.style.boxShadow = "0 0 10px rgba(230,57,70,0.3)";
                }}
              >
                <MapPin size={12} />
                OPEN IN MAPS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Closed by default

  const faqs = [
    {
      q: "Where is the best Chinese restaurant in Raja Park, Jaipur?",
      a: "Ching Chong is the most popular destination for authentic Chinese and Indo-Chinese food in Raja Park, Jaipur, known for its smoky wok-tossed dishes and premium street-style experience."
    },
    {
      q: "What makes Ching Chong the top Chinese place near Raja Park?",
      a: "Our unique blend of Sichuan street food style with local Jaipur spices, combined with fresh daily ingredients and authentic wok-cooking techniques, makes us the top-rated Chinese restaurant in the area."
    },
    {
      q: "Is parking available at Ching Chong Raja Park?",
      a: "Yes, being centrally located in Raja Park, there is ample street parking available for our dine-in and takeaway customers directly near the restaurant."
    },
    {
      q: "Do you offer home delivery in Raja Park?",
      a: "Absolutely! We offer lightning-fast delivery across Raja Park and nearby areas via Zomato and Swiggy. You can also call us directly for bulk orders."
    }
  ];

  return (
    <section id="faq" style={{ background: "#0a0a0a", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ 
          color: "#F77F00", 
          fontSize: "0.85rem", 
          fontWeight: 700, 
          letterSpacing: "0.4em", 
          textTransform: "uppercase", 
          marginBottom: "0.75rem", 
          textAlign: "center" 
        }}>
          Common Queries
        </p>
        <h2 className="font-display" style={{ 
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)", 
          color: "#fff", 
          marginBottom: "3rem", 
          textAlign: "center", 
          lineHeight: 1 
        }}>
          FREQUENTLY ASKED QUESTIONS
        </h2>

        <div style={{ display: "grid", gap: "1.5rem" }}>
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              style={{ 
                background: "rgba(255,255,255,0.02)", 
                borderRadius: "12px", 
                border: "1px solid rgba(255,255,255,0.06)",
                overflow: "hidden",
                transition: "all 0.3s ease"
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: openIndex === i ? "rgba(230,57,70,0.1)" : "transparent",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#fff",
                  transition: "background 0.3s ease"
                }}
              >
                <span style={{ 
                  fontSize: "1.25rem", 
                  fontWeight: 700, 
                  color: openIndex === i ? "#E63946" : "#fff",
                  letterSpacing: "0.01em",
                  paddingRight: "1rem"
                }}>
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ flexShrink: 0 }}
                >
                  <ChevronDown size={22} color={openIndex === i ? "#E63946" : "#666"} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div style={{ 
                      padding: "1.5rem 1.75rem", 
                      color: "#aaa", 
                      lineHeight: 1.7, 
                      fontSize: "1.05rem",
                      background: "rgba(0,0,0,0.2)"
                    }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="contact"
      data-testid="contact-section"
      style={{ 
        background: "linear-gradient(to bottom, #080808 0%, #080808 90%, #050505 100%)", 
        padding: "6rem 1.5rem", 
        position: "relative", 
        overflow: "hidden" 
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(230,57,70,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ color: "#E63946", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Get In Touch
          </p>
          <h2 className="font-display" style={{ fontSize: "clamp(3rem, 8vw, 5rem)", color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
            CONTACT US
          </h2>
          <div className="section-divider" style={{ margin: "1rem auto 2rem" }} />

          <p style={{ color: "#999", fontSize: "1rem", lineHeight: 1.7, marginBottom: "3rem" }}>
            Ready to order or have a question? Just give us a call. We're open 7 days a week,
            11am to 11pm. For large orders or reservations, call ahead.
          </p>

          <div style={{ 
            display: "flex", 
            gap: "2rem", 
            justifyContent: "center", 
            alignItems: "center", 
            flexWrap: "wrap", 
            marginBottom: "3rem" 
          }}>
            <a
              href={WHATSAPP_HREF_1}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(37, 211, 102, 0.05)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                color: "#25D366",
                padding: "12px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37, 211, 102, 0.1)";
                e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(37, 211, 102, 0.05)";
                e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.3)";
              }}
            >
              <MessageCircle size={20} />
              WhatsApp no. 1
            </a>

            <a
              href={PHONE_HREF}
              className="pulse-glow"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#E63946",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#fff",
                padding: "12px 32px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "1.1rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#FF4D5A";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#E63946";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Phone size={20} />
              CALL
            </a>

            <a
              href={WHATSAPP_HREF_2}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(37, 211, 102, 0.05)",
                border: "1px solid rgba(37, 211, 102, 0.3)",
                color: "#25D366",
                padding: "12px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37, 211, 102, 0.1)";
                e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(37, 211, 102, 0.05)";
                e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.3)";
              }}
            >
              <MessageCircle size={20} />
              WhatsApp no. 2
            </a>
          </div>

          <div
            style={{
              background: "rgba(230,57,70,0.05)",
              border: "1px solid rgba(230,57,70,0.15)",
              borderRadius: "10px",
              padding: "1.5rem",
              display: "inline-block",
            }}
          >
            <div style={{ 
              display: "flex", 
              gap: isMobile ? "1.5rem" : "2.5rem", 
              justifyContent: "center", 
              flexWrap: "wrap",
              textAlign: isMobile ? "center" : "left"
            }}>
              <div style={{ flex: isMobile ? "1 1 100%" : "none" }}>
                <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Hours
                </p>
                <p style={{ color: "#F77F00", fontWeight: 700 }}>11:00 AM – 11:00 PM</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Mon – Sun</p>
              </div>
              {!isMobile && <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />}
              <div style={{ flex: isMobile ? "1 1 100%" : "none" }}>
                <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Location
                </p>
                <p style={{ color: "#e0e0e0", fontWeight: 700 }}>Shop No.3, Plot no. 516, Lane No. 5,</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Vyas Marg, Raja Park, Jaipur</p>
              </div>
              {!isMobile && <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />}
              <div style={{ flex: isMobile ? "1 1 100%" : "none" }}>
                <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Phone
                </p>
                <p style={{ color: "#E63946", fontWeight: 700 }}>{PHONE_NUMBER}</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Call to order</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      data-testid="footer"
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(230,57,70,0.15)",
        padding: "2.5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <img 
              src="/ching_chong_wordmark.png" 
              alt="Ching Chong Logo" 
              style={{ height: "40px", display: "block", marginBottom: "0.5rem" }} 
            />
            <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.25rem" }}>
              Jaipur's Boldest Indo-Chinese Experience
            </p>
          </div>

          <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            {["#home", "#about", "#menu", "#directions", "#contact"].map((href) => {
              const label = href.replace("#", "").replace(/^\w/, (c) => c.toUpperCase());
              return (
                <a
                  key={href}
                  href={href}
                  style={{ color: "#555", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#E63946")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "1.5rem", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ color: "#444", fontSize: "0.78rem" }}>
            &copy; 2025 Ching Chong Restaurant. All rights reserved.
          </p>
          <p style={{ color: "#333", fontSize: "0.75rem" }}>
            Shop No.3, Plot no. 516, Lane No. 5, Vyas Marg, Raja Park, Jaipur
          </p>
        </div>
      </div>
    </footer>
  );
}

function StickyCallBar() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return (
    <div
      data-testid="sticky-call-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        padding: "0.75rem 1rem",
        background: "rgba(10,10,10,0.98)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        display: "flex",
        gap: "1rem",
      }}
    >
      <a
        href={WHATSAPP_HREF_1}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "rgba(37, 211, 102, 0.1)",
          border: "1px solid rgba(37, 211, 102, 0.4)",
          color: "#25D366",
          padding: "12px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 700,
        }}
      >
        <MessageCircle size={18} />
        WA 1
      </a>

      <a
        href={PHONE_HREF}
        className="pulse-glow"
        style={{
          flex: 1.2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "#E63946",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          color: "#fff",
          padding: "12px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          transition: "all 0.3s ease",
        }}
      >
        <Phone size={18} />
        CALL
      </a>

      <a
        href={WHATSAPP_HREF_2}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          background: "rgba(37, 211, 102, 0.1)",
          border: "1px solid rgba(37, 211, 102, 0.4)",
          color: "#25D366",
          padding: "12px",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: 700,
        }}
      >
        <MessageCircle size={18} />
        WA 2
      </a>
    </div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2.2s for a premium presentation
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const } 
    }
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />

            <main>
              <HeroSection />
              
              <motion.div variants={itemVariants}>
                <AnimatedDivider color="both" />
                <AboutSection />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedDivider color="both" />
                <MenuSection />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedDivider color="both" />
                <OrderSection />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedDivider color="both" />
                <DirectionsSection />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <AnimatedDivider color="both" />
                <ContactSection />
              </motion.div>
              
              <FAQSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
