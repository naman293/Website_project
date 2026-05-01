import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Instagram, Facebook, ChevronDown, Star, Menu, X, MessageCircle } from "lucide-react";
import { menuItems } from "@/data/menu";
import type { MenuCategory, IndicatorType } from "@/data/menu";

const PHONE_NUMBER = "+91-9876543210";
const PHONE_HREF = "tel:+919876543210";
const WHATSAPP_HREF = "https://wa.me/919876543210";

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

function Navbar({ mobileMenuOpen, setMobileMenuOpen }: { mobileMenuOpen: boolean; setMobileMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Directions", href: "#directions" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      data-testid="navbar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(230,57,70,0.15)" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.5rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
        <a href="#home" style={{ textDecoration: "none" }} data-testid="nav-logo">
          <span
            className="font-display neon-red"
            style={{ fontSize: "2rem", letterSpacing: "0.05em" }}
          >
            CHING CHONG
          </span>
        </a>

        <nav style={{ display: "none", gap: "2rem" }} className="md-nav" data-testid="nav-desktop">
          <style>{`@media (min-width: 768px) { .md-nav { display: flex !important; } .mobile-menu-btn { display: none !important; } }`}</style>
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

        <button
          className="mobile-menu-btn"
          data-testid="nav-mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(10,10,10,0.98)",
              borderTop: "1px solid rgba(230,57,70,0.2)",
              overflow: "hidden",
            }}
            data-testid="nav-mobile-menu"
          >
            <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                  style={{
                    color: "#ccc",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
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
                  padding: "12px 20px",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  marginTop: "0.5rem",
                }}
                data-testid="mobile-nav-call-btn"
              >
                <Phone size={16} />
                CALL NOW — {PHONE_NUMBER}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
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
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.35)",
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
        style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem 1.5rem", maxWidth: "900px", opacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            color: "#F77F00",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Jaipur's Finest — Since 2018
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display neon-red"
          style={{ fontSize: "clamp(4rem, 15vw, 10rem)", lineHeight: 0.9, marginBottom: "1.5rem" }}
          data-testid="hero-title"
        >
          CHING CHONG
        </motion.h1>

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
              padding: "16px 36px",
              borderRadius: "6px",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Phone size={20} />
            CALL NOW
          </a>
          <a
            href="#menu"
            className="btn-neon-outline"
            data-testid="hero-menu-btn"
            style={{
              textDecoration: "none",
              padding: "16px 36px",
              borderRadius: "6px",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            VIEW MENU
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{ marginTop: "4rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          {[
            { icon: <Star size={16} style={{ color: "#FCCA46" }} />, text: "Rated Jaipur's Best Chinese" },
            { icon: <MapPin size={16} style={{ color: "#E63946" }} />, text: "Near Rajapark Main Circle" },
            { icon: <Clock size={16} style={{ color: "#F77F00" }} />, text: "Open 7 Days a Week" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", color: "#aaa", fontSize: "0.85rem" }}>
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
      style={{ background: "#0d0d0d", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}
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
            BORN IN JAIPUR
          </h2>
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
              <div className="font-display" style={{ fontSize: "1.5rem", color: "#fff" }}>RAJAPARK</div>
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

  const filters: { key: "all" | MenuCategory; label: string }[] = [
    { key: "all", label: "All Items" },
    { key: "veg", label: "Veg" },
    { key: "non-veg", label: "Non-Veg" },
    { key: "combo", label: "Combos" },
  ];

  const filtered = activeFilter === "all" ? menuItems : menuItems.filter((i) => i.category === activeFilter);

  return (
    <section
      id="menu"
      data-testid="menu-section"
      style={{ background: "#0a0a0a", padding: "6rem 1.5rem", position: "relative" }}
    >
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

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {filters.map((f) => (
            <button
              key={f.key}
              data-testid={`menu-filter-${f.key}`}
              onClick={() => setActiveFilter(f.key)}
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
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
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
          </AnimatePresence>
        </motion.div>

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

function DirectionsSection() {
  return (
    <section
      id="directions"
      data-testid="directions-section"
      style={{ background: "#0d0d0d", padding: "6rem 1.5rem" }}
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
                    Near Rajapark Main Circle<br />
                    Rajapark, Jaipur, Rajasthan 302004<br />
                    India
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
              href="https://maps.google.com/?q=Rajapark,Jaipur,Rajasthan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-red"
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
              GET DIRECTIONS
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(230,57,70,0.2)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(230,57,70,0.08)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.7!2d75.8!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5b1e6d0b0b7%3A0x0!2sRajapark%2C%20Jaipur%2C%20Rajasthan%20302004!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ching Chong Restaurant location map - Rajapark, Jaipur"
                data-testid="map-embed"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      style={{ background: "#080808", padding: "6rem 1.5rem", position: "relative", overflow: "hidden" }}
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

          <div style={{ marginBottom: "3rem" }}>
            <a
              href={PHONE_HREF}
              className="btn-neon-red pulse-glow"
              data-testid="contact-call-btn"
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "20px 48px",
                borderRadius: "8px",
                fontSize: "1.3rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <Phone size={24} />
              {PHONE_NUMBER}
            </a>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            {[
              {
                label: "Instagram",
                icon: <Instagram size={20} />,
                href: "https://instagram.com/chingchongjaipur",
                color: "#E63946",
                testId: "contact-instagram",
              },
              {
                label: "Facebook",
                icon: <Facebook size={20} />,
                href: "https://facebook.com/chingchongjaipur",
                color: "#F77F00",
                testId: "contact-facebook",
              },
              {
                label: "WhatsApp",
                icon: <MessageCircle size={20} />,
                href: WHATSAPP_HREF,
                color: "#25D366",
                testId: "contact-whatsapp",
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={social.testId}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: `1px solid ${social.color}40`,
                  background: `${social.color}10`,
                  color: social.color,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${social.color}20`;
                  e.currentTarget.style.boxShadow = `0 0 15px ${social.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${social.color}10`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {social.icon}
                {social.label}
              </a>
            ))}
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
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              <div>
                <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Hours
                </p>
                <p style={{ color: "#F77F00", fontWeight: 700 }}>11:00 AM – 11:00 PM</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Mon – Sun</p>
              </div>
              <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
              <div>
                <p style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.25rem" }}>
                  Location
                </p>
                <p style={{ color: "#e0e0e0", fontWeight: 700 }}>Rajapark, Jaipur</p>
                <p style={{ color: "#666", fontSize: "0.8rem" }}>Rajasthan 302004</p>
              </div>
              <div style={{ width: "1px", background: "rgba(255,255,255,0.08)" }} />
              <div>
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
          <div>
            <span className="font-display neon-red" style={{ fontSize: "1.8rem" }}>CHING CHONG</span>
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
            Near Rajapark Main Circle, Jaipur, Rajasthan 302004
          </p>
        </div>
      </div>
    </footer>
  );
}

function StickyCallBar() {
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
        borderTop: "1px solid rgba(230,57,70,0.3)",
        backdropFilter: "blur(12px)",
      }}
      className="md-hidden"
    >
      <style>{`@media (min-width: 768px) { .md-hidden { display: none !important; } }`}</style>
      <a
        href={PHONE_HREF}
        className="btn-neon-red pulse-glow"
        data-testid="sticky-call-btn"
        style={{
          color: "#fff",
          textDecoration: "none",
          padding: "14px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <Phone size={20} />
        CALL NOW — {PHONE_NUMBER}
      </a>
    </div>
  );
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", paddingBottom: "70px" }}>
      <style>{`@media (min-width: 768px) { .mobile-pb { padding-bottom: 0 !important; } }`}</style>
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <DirectionsSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
