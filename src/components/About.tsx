import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';
import { asset } from '../utils/asset';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        filter: 'blur(8px)',
      });

      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        filter: 'blur(4px)',
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power4.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="sobre">
      <div className="about__grid">
        <div className="about__content">
          <span className="section-tag">Nossa História</span>
          <h2 ref={titleRef} className="about__title">
            Artesanato que <em>transforma</em> espaços
          </h2>
          <div ref={contentRef} className="about__text">
            <p>
              Há mais de <strong>30 anos</strong>, a Dom Pedro tece tradição e inovação em cada peça que cria. 
              Nossos mestres artesãos combinam técnicas seculares com design contemporâneo para produzir 
              cortinas e persianas que são verdadeiras obras de arte.
            </p>
            <p>
              Cada medida é tomada com precisão, cada tecido é selecionado à mão, cada costura é feita 
              com o cuidado que só o trabalho artesanal pode oferecer. Não fazemos apenas cortinas — 
              criamos a moldura perfeita para os seus momentos.
            </p>
            <a href="#contato" className="about__cta">
              Conheça nosso trabalho
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
        <div ref={imageRef} className="about__image">
          <div className="about__image-inner">
            <img
              src={asset('optimized/IMG_7664.webp')}
              alt="Loja Dom Pedro — Cortinas e Persianas Artesanais"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
