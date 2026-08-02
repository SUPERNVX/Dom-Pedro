import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsap';
import { splitTextToChars } from '../utils/splitText';
import { asset } from '../utils/asset';

const HERO_IMAGE = asset('optimized/exterior.webp');
const BG_IMAGE = asset('optimized/interior.webp');

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const revealRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ease = gsap.parseEase('power1.inOut');

    const heroST = ScrollTrigger.create({
      trigger: '.hero-container',
      start: 'top top',
      end: '+=150%',
      pin: true,
      onUpdate: ({ progress }) => {
        const ep = ease(progress);
        gsap.set('.hero-full__content', { '--cr': `${ep * 150}vh` });
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            scale: 0.5 + ep * 0.5,
            xPercent: -50,
            yPercent: -50,
            opacity: ep,
            filter: `blur(${(1 - ep) * 10}px)`,
          });
        }
      },
    });

    let quoteTL: gsap.core.Timeline | null = null;

    if (revealRef.current) {
      const chars = splitTextToChars(revealRef.current);
      gsap.set(chars, { opacity: 0.2, y: 0 });

      quoteTL = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-quote',
          pin: true,
          start: 'center center',
          end: '+=1500',
          scrub: 1,
        },
      })
      .to(chars, { opacity: 1, duration: 1, ease: 'none', stagger: 1 })
      .to({}, { duration: 10 })
      .to('.hero-quote p', { opacity: 0, scale: 1.2, duration: 50 });
    }

    return () => {
      heroST.kill();
      quoteTL?.scrollTrigger?.kill();
      quoteTL?.kill();
    };
  }, []);

  return (
    <div>
      <div className="hero-container">
        <section className="hero-full">
          <div className="hero-full__content">
            <div className="hero-full__exterior">
              <img src={HERO_IMAGE} alt="Dom Pedro" />
            </div>
            <img
              className="hero-full__reveal-img"
              src={BG_IMAGE}
              alt="Interiores Dom Pedro"
            />
            <h1 ref={titleRef} className="hero-full__title">
              Dom Pedro
              <span className="hero-full__subtitle">Cortinas & Persianas</span>
            </h1>
          </div>
        </section>
      </div>

      <section className="hero-quote">
        <p ref={revealRef} className="hero-quote__text">
          Transformamos suas janelas com elegância artesanal — cada cortina, cada persiana, feita com o cuidado de quem entende de conforto e beleza.
        </p>
      </section>

      <section className="hero-showcase">
        <img
          className="hero-showcase__img"
          src={BG_IMAGE}
          alt="Interiores Dom Pedro"
          loading="lazy"
        />
      </section>
    </div>
  );
}
