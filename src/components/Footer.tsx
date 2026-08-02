import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src="/optimized/logo.webp" alt="Persianas Dom Pedro" className="footer__logo-img" />
          <p className="footer__tagline">
            Cortinas & Persianas — Tradição artesanal desde 1992.
          </p>
        </div>
        <div className="footer__links">
          <h4>Navegação</h4>
          <a href="#cortinas">Cortinas</a>
          <a href="#persianas">Persianas</a>
          <a href="#galeria">Galeria</a>
          <a href="#contato">Contato</a>
        </div>
        <div className="footer__links">
          <h4>Horários</h4>
          <span>Seg–Sex: 8h–18h</span>
          <span>Sáb: 9h–13h</span>
          <span>Dom: Fechado</span>
        </div>
        <div className="footer__links">
          <h4>Redes</h4>
          <a href="https://instagram.com/persianas_dompedro" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Dom Pedro Cortinas & Persianas. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
