'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registered once per bundle; every GSAP consumer imports from here.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export const NO_REDUCED_MOTION = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
