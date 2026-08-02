import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';
import { asset } from '../utils/asset';

const cortinas = [
  {
    title: 'Cortinas Romanas',
    description: 'Elegância clássica com linhas limpas. Perfeitas para salas e escritórios, disponíveis em algodão, linho e seda natural.',
    image: asset('optimized/IMG_7740.webp'),
    tags: ['Linho', 'Algodão', 'Seda'],
  },
  {
    title: 'Cortinas de Dobra',
    description: 'Tecidos que dançam com a luz. Nossa especialidade em pregas francesas, twin pleat e ondas perfeitas.',
    image: asset('optimized/IMG_7742.webp'),
    tags: ['Pregas Francesas', 'Twin Pleat', 'Ondas'],
  },
];

const persianas = [
  {
    title: 'Persianas Roller',
    description: 'Minimalismo funcional. Controle total de luz com tecidos blackout, telas solares e opções translúcidas.',
    image: asset('optimized/IMG_7741.webp'),
    tags: ['Blackout', 'Screen', 'Translúcido'],
  },
  {
    title: 'Persianas Horizontais',
    description: 'Sofisticação em alumínio e madeira. Design atemporal para ambientes corporativos e residenciais.',
    image: asset('optimized/IMG_7738.webp'),
    tags: ['Alumínio', 'Madeira', 'Minimalista'],
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.product-card');

      cards?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 60,
          opacity: 0,
          scale: 0.95,
          filter: 'blur(6px)',
          duration: 0.9,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="products" id="produtos">
      <div className="products__header">
        <span className="section-tag">Nossos Produtos</span>
        <h2 className="products__title">
          Cortinas & <em>Persianas</em>
        </h2>
        <p className="products__subtitle">
          Cada peça é selecionada e confeccionada para transformar seu espaço com a qualidade que só o handmade oferece.
        </p>
      </div>

      <div className="products__groups">
        <div className="products__group" id="cortinas">
          <h3 className="products__group-title">Cortinas</h3>
          <div className="products__group-list">
            {cortinas.map((product) => (
              <article key={product.title} className="product-card">
                <div className="product-card__image">
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <div className="product-card__overlay"></div>
                </div>
                <div className="product-card__content">
                  <h4 className="product-card__title">{product.title}</h4>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__tags">
                    {product.tags.map((tag) => (
                      <span key={tag} className="product-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="products__group" id="persianas">
          <h3 className="products__group-title">Persianas</h3>
          <div className="products__group-list">
            {persianas.map((product) => (
              <article key={product.title} className="product-card">
                <div className="product-card__image">
                  <img src={product.image} alt={product.title} loading="lazy" />
                  <div className="product-card__overlay"></div>
                </div>
                <div className="product-card__content">
                  <h4 className="product-card__title">{product.title}</h4>
                  <p className="product-card__description">{product.description}</p>
                  <div className="product-card__tags">
                    {product.tags.map((tag) => (
                      <span key={tag} className="product-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
