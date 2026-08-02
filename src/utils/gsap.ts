import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once at the app level
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
