export const programs = [
  {
    id: 'gyan-ganga',
    name: 'Chhatrapati Shivaji Maharaj Gyan-Ganga',
    slug: 'gyan-ganga',
    description: 'A holistic education, skill, and empowerment campus inspired by leadership, courage, discipline, and nation-building values.',
    focusAreas: [
      'Modern Library & Study Centre',
      'Digital E-Learning & Computer Facilities',
      'Skill Development & Employment-Oriented Training',
      'Women Empowerment & Entrepreneurship',
      'Career Counselling & Competitive Exam Guidance',
      'Farmer Training for Modern & Sustainable Agriculture'
    ],
    inauguration: {
      event: 'Bhoomipujan Ceremony',
      date: '21st February 2026',
      location: 'Jaunpur District, Uttar Pradesh',
      dignitary: 'Honourable Chhatrapati Rajarshi Shahu Maharaj Saheb of Kolhapur'
    },
    values: [
      'Leadership',
      'Courage',
      'Discipline',
      'Self-Respect',
      'National Duty'
    ],
    ctaLabel: "I'm Interested",
    ctaLink: '/apply'
  }
]

export function getProgramBySlug(slug) {
  return programs.find(program => program.slug === slug)
}

