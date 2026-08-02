import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from '../utils/gsap';
import { getLenis } from '../hooks/useSmoothScroll';
import { asset } from '../utils/asset';

const galleryItems = [
  { image: asset('optimized/IMG_7648.webp'), span: 'wide' },
  { image: asset('optimized/IMG_7737.webp'), span: 'tall' },
  { image: asset('optimized/IMG_7736.webp'), span: 'normal' },
  { image: asset('optimized/IMG_7664.webp'), span: 'normal' },
  { image: asset('optimized/IMG_7650.webp'), span: 'tall' },
  { image: asset('optimized/IMG_7651.webp'), span: 'wide' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = sectionRef.current?.querySelectorAll('.gallery__item');

      items?.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 80,
          opacity: 0,
          scale: 0.92,
          duration: 1,
          delay: i * 0.08,
          ease: 'power3.out',
        });

        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery__overlay');

        item.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.1, duration: 0.8, ease: 'power3.out' });
          gsap.to(overlay, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out' });
          gsap.to(overlay, { opacity: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const open = useCallback((index: number) => {
    setSelected(index);
  }, []);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const lenis = getLenis();
    lenis?.start();
    document.body.style.overflow = '';

    const overlay = overlayRef.current;
    const figure = figureRef.current;
    if (overlay && figure) {
      gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.inOut' });
      gsap.to(figure, {
        opacity: 0,
        scale: 0.85,
        y: 30,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          closingRef.current = false;
          setSelected(null);
        },
      });
    } else {
      closingRef.current = false;
      setSelected(null);
    }
  }, []);

  const next = useCallback(() => {
    setSelected(prev =>
      prev === null ? null : (prev + 1) % galleryItems.length,
    );
  }, []);

  const prev = useCallback(() => {
    setSelected(prev =>
      prev === null ? null : (prev - 1 + galleryItems.length) % galleryItems.length,
    );
  }, []);

  useEffect(() => {
    if (selected === null) return;

    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';

    const overlay = overlayRef.current;
    const figure = figureRef.current;
    if (overlay) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.inOut' });
    }
    if (figure) {
      gsap.fromTo(
        figure,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      );
    }
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close, next, prev]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      const lenis = getLenis();
      lenis?.start();
    };
  }, []);

  return (
    <section ref={sectionRef} className="gallery" id="galeria">
      <div className="gallery__header">
        <span className="section-tag">Galeria</span>
        <h2 className="gallery__title">
          Nossos <em>Projetos</em>
        </h2>
      </div>

      <div className="gallery__grid">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            className={`gallery__item gallery__item--${item.span}`}
            onClick={() => open(index)}
          >
            <img
              src={item.image}
              alt={`Projeto Dom Pedro ${index + 1}`}
              loading="lazy"
            />
            <div className="gallery__overlay">
              <button type="button" className="gallery__view">
                Ver projeto →
              </button>
            </div>
          </div>
        ))}
      </div>

      {selected !== null && (
        <div
          ref={overlayRef}
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visualização do projeto"
          onClick={(e) => {
            if (e.target === overlayRef.current) close();
          }}
        >
          <button
            type="button"
            className="gallery__lightbox-close"
            onClick={close}
            aria-label="Fechar"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M2 2l18 18M20 2L2 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className="gallery__lightbox-nav gallery__lightbox-nav--prev"
            onClick={prev}
            aria-label="Projeto anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure ref={figureRef} className="gallery__lightbox-figure">
            <img
              key={selected}
              className="gallery__lightbox-img"
              src={galleryItems[selected].image}
              alt={`Projeto Dom Pedro ${selected + 1}`}
            />
          </figure>

          <button
            type="button"
            className="gallery__lightbox-nav gallery__lightbox-nav--next"
            onClick={next}
            aria-label="Próximo projeto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
