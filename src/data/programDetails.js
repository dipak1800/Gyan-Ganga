export const programDetails = {
  'library': {
    id: 'library',
    titleKey: 'prog1_title',
    icon: 'library',
    content: {
      overview: 'library_overview',
      objectives: 'library_objectives',
      facilities: 'library_facilities',
      programs: 'library_programs',
      impact: 'library_impact',
      belief: 'library_belief',
      cta: 'library_cta'
    }
  },
  'digital': {
    id: 'digital',
    titleKey: 'prog2_title',
    icon: 'digital',
    content: {
      overview: 'digital_overview',
      objectives: 'digital_objectives',
      components: 'digital_components',
      facility: 'digital_facility',
      impact: 'digital_impact',
      belief: 'digital_belief',
      cta: 'digital_cta'
    }
  },
  'textile': {
    id: 'textile',
    titleKey: 'prog3_title',
    icon: 'textile',
    content: {
      overview: 'textile_overview',
      objective: 'textile_objective',
      highlights: 'textile_highlights',
      structure: 'textile_structure',
      modules: 'textile_modules',
      certification: 'textile_certification',
      outcomes: 'textile_outcomes',
      approach: 'textile_approach'
    }
  },
  'women': {
    id: 'women',
    titleKey: 'prog4_title',
    icon: 'women',
    content: {
      overview: 'women_overview',
      foundation: 'women_foundation',
      livelihood: 'women_livelihood',
      food: 'women_food',
      shg: 'women_shg',
      enterprise: 'women_enterprise',
      growth: 'women_growth',
      environment: 'women_environment',
      beneficiaries: 'women_beneficiaries',
      impact: 'women_impact',
      belief: 'women_belief',
      cta: 'women_cta'
    }
  },
  'career': {
    id: 'career',
    titleKey: 'prog5_title',
    icon: 'career',
    content: {
      overview: 'career_overview',
      purpose: 'career_purpose',
      counselling: 'career_counselling',
      awareness: 'career_awareness',
      exam_guidance: 'career_exam_guidance',
      planning: 'career_planning',
      resources: 'career_resources',
      mentorship: 'career_mentorship',
      environment: 'career_environment',
      impact: 'career_impact',
      belief: 'career_belief',
      cta: 'career_cta'
    }
  },
  'farmer': {
    id: 'farmer',
    titleKey: 'prog6_title',
    icon: 'farmer',
    content: {
      overview: 'farmer_overview',
      structure: 'farmer_structure',
      modules: 'farmer_modules',
      methodology: 'farmer_methodology',
      beneficiaries: 'farmer_beneficiaries',
      impact: 'farmer_impact',
      belief: 'farmer_belief',
      cta: 'farmer_cta'
    }
  }
}

export function getProgramDetail(id) {
  return programDetails[id]
}

