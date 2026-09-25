import { SourceReference } from '../types';

export const MEDICAL_SOURCES: SourceReference[] = [
  {
    id: 'idf-pakistan-prevalence',
    topic: 'Diabetes in Pakistan',
    claimOrContext: 'Estimated 33 million adults (aged 20–79) living with diabetes in Pakistan, representing approximately 26.7% adult prevalence.',
    organization: 'International Diabetes Federation (IDF)',
    citation: 'IDF Diabetes Atlas, 10th Edition (2021). Brussels, Belgium: International Diabetes Federation.',
    year: '2021',
  },
  {
    id: 'ada-time-in-range',
    topic: 'Time in Range (TIR)',
    claimOrContext: '70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.',
    organization: 'American Diabetes Association (ADA)',
    citation: 'Standards of Care in Diabetes—2024: Diabetes Technology. Diabetes Care 2024;47(Suppl. 1):S111–S125.',
    year: '2024',
  },
  {
    id: 'atdc-cgm-consensus',
    topic: 'Continuous Glucose Monitoring Clinical Guidance',
    claimOrContext: 'Clinical targets for Continuous Glucose Monitoring data interpretation and Time in Range consensus.',
    organization: 'Advanced Technologies & Treatments for Diabetes (ATTD)',
    citation: 'Battelino T, et al. Clinical Targets for Continuous Glucose Monitoring Data Interpretation: Recommendations From the International Consensus on Time in Range. Diabetes Care 2019;42(8):1593–1603.',
    year: '2019',
  },
  {
    id: 'dar-ramadan-guidelines',
    topic: 'Ramadan Fasting & Diabetes',
    claimOrContext: 'Risk stratification and educational guidance for individuals fasting during Ramadan.',
    organization: 'Diabetes and Ramadan (DAR) International Alliance & IDF',
    citation: 'IDF-DAR Practical Guidelines for Diabetes and Ramadan (2021 update).',
    year: '2021',
  },
];
