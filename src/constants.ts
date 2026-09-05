export interface Event {
  id: string;
  title: string;
  date: string; // ISO format string
  month: string;
  day: string;
  time: string;
  location: string;
  type: 'In-person' | 'Online' | 'Retreat';
  price: string;
  link: string;
  description: string;
  longDescription?: string;
  image: string;
  whatToBring?: string[];
}

export const EVENTS: Event[] = [
  {
    id: 'lunar-sound-bath-atlanta',
    title: 'New Moon Botanical Sound Immersion',
    date: '2026-09-11T19:00:00',
    month: 'Sep',
    day: '11',
    time: '7:00 PM - 8:30 PM EDT',
    location: 'Candler Park Sanctuary, Atlanta, GA',
    type: 'In-person',
    price: '$35.00',
    link: '/gatherings#book-private',
    description: 'A deep restorative journey with 432Hz frosted crystal singing bowls, botanical aromatherapy, and vagus nerve soothing under the new moon.',
    longDescription: `As the lunar cycle resets, we invite you into a dedicated space of deep restoration and stillness. This 90-minute gathering weaves together 432Hz frosted quartz crystal singing bowls, koshi chimes, gentle breath pacing, and botanical aromatherapy mists.

The vibrational acoustic resonance encourages brainwave entrainment into alpha and theta frequencies—a space of profound parasympathetic rest where somatic tension softens and the body's natural restorative mechanisms engage.

All bodies, identities, and experience levels are warmly welcomed in this trauma-informed, queer-affirming container.`,
    whatToBring: [
      'Yoga mat or comfortable cushion/pad',
      'Cozy blanket & optional eye mask',
      'Refillable water bottle',
      'Personal journal for post-sound grounding'
    ],
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'somatic-nervous-system-reset',
    title: 'Yoga for Nervous System Regulation',
    date: '2026-09-22T10:30:00',
    month: 'Sep',
    day: '22',
    time: '10:30 AM - 12:00 PM EDT',
    location: 'Virtual Sanctuary (Zoom Live & Recorded)',
    type: 'Online',
    price: '$25.00',
    link: '/gatherings#book-private',
    description: 'Evidence-based polyvagal movement, gentle restorative vinyasa, and vagal toning tools for burnout recovery.',
    longDescription: `Rooted in Juls' neuroscience and somatic research and polyvagal theory, this interactive masterclass provides actionable, trauma-informed somatic practices to recalibrate your nervous system.

We will explore gentle spinal mobility, diaphragm release, physiological sighs, and restorative yoga postures designed to signal safety to your ventral vagal complex.

Participants receive access to the live session, digital breathwork guides, and 30-day replay recording.`,
    whatToBring: [
      'Comfortable loose clothing',
      'Two yoga blocks or thick books',
      'A cushion or bolster',
      'Quiet, private space with good internet connection'
    ],
    image: 'https://images.unsplash.com/photo-1545208393-2160295eb44e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'autumn-equinox-retreat',
    title: 'Autumn Equinox Somatic & Sound Retreat',
    date: '2026-10-03T14:00:00',
    month: 'Oct',
    day: '03',
    time: '2:00 PM - 8:00 PM EDT',
    location: 'Blue Ridge Sanctuary & Forest, GA',
    type: 'Retreat',
    price: '$145.00',
    link: '/gatherings#book-private',
    description: 'An immersive half-day equinox ceremony featuring forest bathing, seasonal botanical teas, restorative yoga, and an extended twilight sound bath.',
    longDescription: `Honor the transition into Autumn with an intimate half-day retreat in the foothills of the North Georgia mountains.

Together, we balance light and dark through guided sensory forest walking, somatic boundary exploration, an organic seasonal supper, and a fireside twilight crystal sound bath.

Space is strictly limited to 14 participants to preserve an intimate, reverent container.`,
    whatToBring: [
      'Outdoor walking shoes & indoor slippers',
      'Warm layers for evening twilight practice',
      'Personal journal & water bottle',
      'All yoga mats and organic blankets provided on-site'
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'ancestral-grief-joy-circle',
    title: 'Queer Grief & Joy Somatic Circle',
    date: '2026-10-24T17:00:00',
    month: 'Oct',
    day: '24',
    time: '5:00 PM - 7:00 PM EDT',
    location: 'Inman Park Studio, Atlanta, GA',
    type: 'In-person',
    price: '$30.00',
    link: '/gatherings#book-private',
    description: 'A sacred, consent-forward community container to hold the full spectrum of grief, celebration, and queer reclamation.',
    longDescription: `A community-grounded gathering holding space for the sacred duality of queer grief and queer joy. We engage in gentle vocal toning, heart-opening herbal teas, somatic trembling practices, and deep collective listening.

Sliding scale and BIPOC community sponsorship spots are available upon request.`,
    whatToBring: [
      'Comfortable clothing you can move freely in',
      'An item for the collective botanical altar (flower, stone, photograph)',
      'Journal & pen'
    ],
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200'
  }
];
