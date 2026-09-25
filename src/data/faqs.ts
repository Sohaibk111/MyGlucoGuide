import { FaqItem } from '../types';

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'CGM',
    question: 'What is Continuous Glucose Monitoring (CGM) and how does it work?',
    answer: 'A Continuous Glucose Monitor (CGM) is a compact, wearable sensor typically worn on the upper arm or abdomen (depending on product indications). It uses a thin, flexible filament placed just beneath the skin to measure glucose concentrations in the interstitial fluid throughout the day and night. The sensor wirelessly transmits glucose data, directional trend arrows, and customizable threshold alerts to a compatible smartphone application.'
  },
  {
    id: 'faq-2',
    category: 'CGM',
    question: 'Does applying or wearing a CGM sensor hurt?',
    answer: 'CGM applicators are engineered for quick and straightforward application. Individual sensation varies from person to person; many people describe the application as comparable to a light prick or quick pinch. Once applied, the flexible filament rests in the interstitial layer. Individual skin sensitivity varies, and manufacturer application guidelines should be followed.'
  },
  {
    id: 'faq-3',
    category: 'CGM',
    question: 'Is CGM available in Pakistan and what smartphones are compatible?',
    answer: 'Leading CGM systems are increasingly available in Pakistan through specialized medical distributors, authorized healthcare providers, and accredited pharmacy channels. Compatibility depends on the specific system; most modern iOS and Android smartphones with Bluetooth or NFC support companion monitoring applications. Check your specific smartphone model against manufacturer compatibility lists.'
  },
  {
    id: 'faq-4',
    category: 'CGM',
    question: 'How long does a CGM sensor typically last?',
    answer: 'Sensor wear duration is product-dependent, commonly ranging between 10 to 14 days according to the manufacturer’s approved labeling and specifications. After the designated operating window, the sensor stops recording and can be removed and replaced according to user instructions.'
  },
  {
    id: 'faq-5',
    category: 'CGM',
    question: 'Can I shower, swim, or exercise while wearing a CGM sensor?',
    answer: 'Most CGM sensors feature water-resistance ratings specified by their manufacturers (refer to product specifications for depth and immersion time limits). Users can generally shower and perform regular exercise. In humid environments or during heavy perspiration, supplemental medical overpatches or breathable tapes are often used to help keep the sensor secure.'
  },
  {
    id: 'faq-6',
    category: 'Monitoring',
    question: 'Why does my CGM reading sometimes differ from my finger-prick glucometer?',
    answer: 'CGM devices sample interstitial fluid (between cells), whereas traditional glucometers test capillary blood. When glucose levels are changing rapidly—such as after meals or during exercise—a normal biological lag time of roughly 5 to 10 minutes occurs before interstitial glucose reflects blood glucose shifts. Blood glucose meters remain the clinical reference standard whenever symptoms differ from sensor readings or when calibration is required.'
  },
  {
    id: 'faq-7',
    category: 'General',
    question: 'What is the purpose of MyGlucoGuide?',
    answer: 'MyGlucoGuide is an educational and patient-focused diabetes and glucose awareness platform. Our purpose is to provide clear educational information, help individuals and families across Pakistan understand glucose patterns and modern monitoring options, and support informed conversations with qualified medical practitioners.'
  },
  {
    id: 'faq-8',
    category: 'Diet & Lifestyle',
    question: 'Do I have to eliminate traditional foods like roti and rice to manage glucose?',
    answer: 'Severe dietary restriction is often difficult to sustain and should only be undertaken under clinical guidance. Nutritional awareness emphasizes grain quality (such as stone-ground whole wheat or multigrain atta), mindful portion sizes, and meal composition. Consuming fiber-rich vegetables and protein sources before carbohydrates can help moderate post-meal glucose absorption.'
  },
  {
    id: 'faq-9',
    category: 'General',
    question: 'How can I connect with MyGlucoGuide for educational questions?',
    answer: 'You can connect directly with our health communication team via WhatsApp. We assist with educational inquiries, help you explore whether CGM monitoring aligns with your routine, and guide you on discussing modern monitoring options with your physician.'
  }
];
