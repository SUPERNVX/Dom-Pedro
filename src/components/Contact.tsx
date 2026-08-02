import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsap';

const PHONE_DISPLAY = '(19) 99819-9029';
const PHONE_TEL = '+5519998199029';
const WHATSAPP_URL = 'https://wa.me/5519998199029';
const INSTAGRAM_URL = 'https://instagram.com/persianas_dompedro';

const whatsappSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="WhatsApp">
<style>
svg{overflow:visible}
.wa-ring{fill:none;stroke:#25D366;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:waRipple calc(2.6s/(var(--speed,1)*var(--boost,1))) cubic-bezier(.2,.55,.3,1) infinite}
.wa-ring.r2{animation-delay:calc(-1.3s/(var(--speed,1)*var(--boost,1)))}
@keyframes waRipple{0%{transform:scale(.78);opacity:.9}70%{opacity:.25}100%{transform:scale(1.42);opacity:0}}
.wa-float{animation:waFloat calc(3.4s/(var(--speed,1)*var(--boost,1))) ease-in-out infinite alternate}
@keyframes waFloat{from{transform:translateY(-3px)}to{transform:translateY(3px)}}
.wa-tail{transform-box:fill-box;transform-origin:80% 10%;animation:waWag calc(3.4s/(var(--speed,1)*var(--boost,1))) ease-in-out infinite alternate}
@keyframes waWag{from{transform:rotate(-2deg)}to{transform:rotate(7deg)}}
.wa-ping{transform-box:fill-box;transform-origin:center;animation:waPing calc(2.6s/(var(--speed,1)*var(--boost,1))) ease-out infinite}
@keyframes waPing{0%{transform:scale(.5);opacity:0}25%{opacity:1}70%,100%{transform:scale(1.6);opacity:0}}
.wa-core{transform-box:fill-box;transform-origin:center}
svg:hover .wa-core{animation:waPop .5s cubic-bezier(.34,1.56,.44,1)}
@keyframes waPop{0%{transform:scale(1)}45%{transform:scale(1.1)}100%{transform:scale(1)}}
</style>
<defs>
<radialGradient id="waG" cx="35%" cy="26%" r="85%">
<stop offset="0" stop-color="#6FF59B"/><stop offset=".5" stop-color="#25D366"/><stop offset="1" stop-color="#0C8F45"/>
</radialGradient>
</defs>
<circle class="wa-ring" cx="60" cy="60" r="46"/>
<circle class="wa-ring r2" cx="60" cy="60" r="46"/>
<g class="wa-float">
<path class="wa-tail" d="M34 84C28 93 21 98 13 100c5-7 8-13 9-21z" fill="#16AE55"/>
<circle cx="60" cy="60" r="40" fill="url(#waG)"/>
<circle cx="60" cy="60" r="39.4" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="1.2"/>
<g class="wa-core"><path fill="#fff" transform="translate(35 35) scale(2.08)" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></g>
<circle class="wa-ping" cx="90" cy="29" r="9" fill="none" stroke="#2BE371" stroke-width="2"/>
<circle cx="90" cy="29" r="5.5" fill="#2BE371" stroke="#0B1512" stroke-width="2.5"/>
</g>
</svg>`;

const instagramSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Instagram">
<style>
svg{overflow:visible}
.ig-shine{animation:igShine calc(3.8s/(var(--speed,1)*var(--boost,1))) ease-in-out infinite}
@keyframes igShine{0%{transform:translateX(-75px);opacity:0}10%{opacity:.55}45%{opacity:.55}55%{transform:translateX(150px);opacity:0}100%{transform:translateX(150px);opacity:0}}
.ig-glow{animation:igGlow calc(2.4s/(var(--speed,1)*var(--boost,1))) ease-in-out infinite}
@keyframes igGlow{0%,100%{opacity:.15}50%{opacity:.8}}
.ig-glyph{transform-box:fill-box;transform-origin:center}
svg:hover .ig-glyph{animation:igPop .55s cubic-bezier(.34,1.56,.44,1)}
@keyframes igPop{0%{transform:scale(1)}45%{transform:scale(1.08)}100%{transform:scale(1)}}
</style>
<defs>
<linearGradient id="igG" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#FEDA75"/><stop offset=".25" stop-color="#FA7E1E"/><stop offset=".5" stop-color="#D62976"/><stop offset=".75" stop-color="#962FBF"/><stop offset="1" stop-color="#4F5BD5"/>
<animateTransform attributeName="gradientTransform" type="rotate" from="0 .5 .5" to="360 .5 .5" dur="6s" repeatCount="indefinite"/>
</linearGradient>
<linearGradient id="igShineG" x1="0" y1="0" x2="1" y2="0">
<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
</linearGradient>
<radialGradient id="igDotG"><stop offset="0" stop-color="#FEDA75" stop-opacity=".9"/><stop offset="1" stop-color="#FEDA75" stop-opacity="0"/></radialGradient>
<clipPath id="igClip"><rect x="33.6" y="33.6" width="52.8" height="52.8" rx="12"/></clipPath>
</defs>
<circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="1" stroke-dasharray="2 7"/>
<g>
<animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="9s" repeatCount="indefinite"/>
<path d="M60 3.5l1.9 4.6 4.6 1.9-4.6 1.9-1.9 4.6-1.9-4.6-4.6-1.9 4.6-1.9Z" fill="#FEDA75"/>
<path d="M60 103.5l1.5 3.6 3.6 1.5-3.6 1.5-1.5 3.6-1.5-3.6-3.6-1.5 3.6-1.5Z" fill="#D62976"/>
</g>
<circle cx="60" cy="60" r="46" fill="none" stroke="url(#igG)" stroke-width="3.5"/>
<circle class="ig-glow" cx="74.1" cy="45.9" r="8" fill="url(#igDotG)"/>
<g class="ig-glyph"><path fill="#fff" transform="translate(33.6 33.6) scale(2.2)" d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></g>
<g clip-path="url(#igClip)"><g transform="rotate(24 60 60)"><rect class="ig-shine" x="20" y="-10" width="16" height="140" fill="url(#igShineG)"/></g></g>
</svg>`;

const phoneSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" role="img" aria-label="Telefone">
<style>
svg{overflow:visible}
.ph-swing{transform-box:fill-box;transform-origin:center;animation:phRing calc(2.8s/(var(--speed,1)*var(--boost,1))) ease-in-out infinite}
@keyframes phRing{0%,26%,100%{transform:rotate(0deg)}4%{transform:rotate(-10deg)}9%{transform:rotate(9deg)}14%{transform:rotate(-7deg)}19%{transform:rotate(5deg)}23%{transform:rotate(-2deg)}}
.ph-wave{fill:none;stroke:#FFB23E;stroke-width:3.2;stroke-linecap:round;opacity:0;animation:phWave calc(1.4s/(var(--speed,1)*var(--boost,1))) ease-out infinite}
.ph-wave.w2{animation-delay:calc(.35s/(var(--speed,1)*var(--boost,1)))}
.ph-wave.wr{animation-name:phWaveR}
@keyframes phWave{0%{opacity:0;transform:translateX(5px)}30%{opacity:.95}100%{opacity:0;transform:translateX(-7px)}}
@keyframes phWaveR{0%{opacity:0;transform:translateX(-5px)}30%{opacity:.95}100%{opacity:0;transform:translateX(7px)}}
svg:hover .ph-wave{stroke-width:4.4}
</style>
<defs>
<radialGradient id="phG" cx="35%" cy="26%" r="85%">
<stop offset="0" stop-color="#FFD980"/><stop offset=".5" stop-color="#FFAA33"/><stop offset="1" stop-color="#E96D0D"/>
</radialGradient>
</defs>
<ellipse cx="60" cy="106" rx="24" ry="4.5" fill="rgba(0,0,0,.35)"/>
<path class="ph-wave" d="M24 45q-9 15 0 30"/>
<path class="ph-wave w2" d="M15 39q-13 21 0 42"/>
<path class="ph-wave wr" d="M96 45q9 15 0 30"/>
<path class="ph-wave wr w2" d="M105 39q13 21 0 42"/>
<g class="ph-swing">
<circle cx="60" cy="58" r="38" fill="url(#phG)"/>
<circle cx="60" cy="58" r="37.4" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1.2"/>
<path fill="#fff" transform="translate(35.5 33.5) scale(2.04)" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
</g>
</svg>`;

const contactCards = [
  {
    label: 'WhatsApp',
    value: PHONE_DISPLAY,
    href: WHATSAPP_URL,
    target: '_blank' as const,
    svg: whatsappSvg,
  },
  {
    label: 'Telefone',
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
    svg: phoneSvg,
  },
  {
    label: 'Instagram',
    value: '@persianas_dompedro',
    href: INSTAGRAM_URL,
    target: '_blank' as const,
    svg: instagramSvg,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact__info > *', {
        scrollTrigger: {
          trigger: '.contact__info',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        filter: 'blur(4px)',
      });

      gsap.from('.contact__card', {
        scrollTrigger: {
          trigger: '.contact__cards',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        scale: 0.92,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        filter: 'blur(4px)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contato">
      <div className="contact__inner">
        <div className="contact__info">
          <span className="section-tag">Contato</span>
          <h2 className="contact__title">
            Vamos <em>transformar</em> seu espaço
          </h2>
          <p className="contact__description">
            Agende uma visita gratuita. Nossos especialistas vão até você para
            tirar medidas e apresentar as melhores opções para cada ambiente.
          </p>
        </div>

        <div className="contact__cards">
          {contactCards.map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="contact__card"
              target={card.target}
              rel={card.target === '_blank' ? 'noopener noreferrer' : undefined}
            >
              <div
                className="contact__card-icon"
                dangerouslySetInnerHTML={{ __html: card.svg }}
              />
              <strong className="contact__card-label">{card.label}</strong>
              <span className="contact__card-value">{card.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
