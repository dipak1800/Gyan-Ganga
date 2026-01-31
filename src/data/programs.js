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
      { titleKey: 'value1_title', descriptionKey: 'value1_desc' },
      { titleKey: 'value2_title', descriptionKey: 'value2_desc' },
      { titleKey: 'value3_title', descriptionKey: 'value3_desc' },
      { titleKey: 'value4_title', descriptionKey: 'value4_desc' },
      { titleKey: 'value5_title', descriptionKey: 'value5_desc' },
      { titleKey: 'value6_title', descriptionKey: 'value6_desc' }
    ],
    ctaLabel: "I'm Interested",
    ctaLink: '/apply'
  }
]

export function getProgramBySlug(slug) {
  return programs.find(program => program.slug === slug)
}

