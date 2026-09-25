import { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'art-hba1c-explained',
    slug: 'hba1c-explained',
    title: 'HbA1c Explained: Understanding Your 3-Month Glucose Average',
    category: 'Diabetes Basics',
    summary: 'An educational guide to understanding what HbA1c is, why it is evaluated alongside daily readings, and how it reflects average glucose exposure.',
    date: 'Sep 20, 2026',
    readTime: '5 min read',
    imageUrl: '/src/assets/images/hero_pakistani_glucose_app_1790358065352.jpg',
    keyTakeaways: [
      'HbA1c measures hemoglobin coated with glucose over the approximate 90–120 day lifespan of red blood cells.',
      'Unlike single blood tests, HbA1c provides an overarching reflection of average glucose levels.',
      'General diagnostic thresholds reference <5.7% as normal, 5.7%–6.4% as prediabetes, and ≥6.5% as diabetes, which must always be evaluated by a physician.',
      'Personal HbA1c goals vary based on age, duration of diabetes, and overall health status as determined by a doctor.'
    ],
    references: [
      'American Diabetes Association. Classification and Diagnosis of Diabetes: Standards of Care in Diabetes—2024. Diabetes Care 2024;47(Suppl. 1):S20–S42.'
    ],
    content: [
      'When you or a family member discuss diabetes with a healthcare professional, one of the most common lab tests requested is HbA1c (glycated hemoglobin). But what does this percentage reflect, and how does it relate to daily monitoring?',
      'Red blood cells circulate in the bloodstream for roughly 2 to 3 months before being replaced. Glucose naturally attaches to hemoglobin inside these cells. When average blood glucose has been higher over preceding weeks, more hemoglobin carries glucose attachments.',
      'While a spot blood test shows glucose at that specific moment, it does not record how levels fluctuated during meals or while sleeping. HbA1c provides an aggregated picture of overall exposure across weeks.',
      'However, clinicians emphasize that HbA1c is an average: two individuals can have a similar HbA1c of 7.0%, yet one may experience relatively stable glucose throughout the day while another experiences wide swings. Understanding both averages and daily patterns with your healthcare provider offers a more complete perspective.'
    ]
  },
  {
    id: 'art-why-glucose-rises-after-meals',
    slug: 'why-glucose-rises-after-meals',
    title: 'Why Glucose Rises After Meals: Understanding Post-Meal Curves',
    category: 'Food & Lifestyle',
    summary: 'How carbohydrates from daily meals affect post-meal blood sugar, and evidence-based lifestyle concepts for understanding glucose responses.',
    date: 'Sep 18, 2026',
    readTime: '6 min read',
    imageUrl: '/src/assets/images/pakistani_healthy_diet_plate_1790358112322.jpg',
    keyTakeaways: [
      'Carbohydrate digestion produces glucose that enters the bloodstream after eating.',
      'The speed and extent of post-meal glucose rise depends on carbohydrate type, portion size, fiber, and individual insulin response.',
      'Nutritional studies suggest that pairing carbohydrates with fiber, protein, and healthy fats may help moderate post-meal absorption rates.',
      'Light physical activity, such as a gentle post-meal walk, can support muscular glucose uptake.'
    ],
    references: [
      'Shukla AP, et al. Food Order Has a Significant Impact on Postprandial Glucose and Insulin Levels. Diabetes Care 2015;38(7):e98–e99.'
    ],
    content: [
      'In traditional Pakistani culinary culture, meals frequently feature wheat rotis, rice preparations, lentils, and sweetened teas. Understanding how different foods influence blood sugar can help individuals make mindful dietary choices.',
      'During digestion, complex and simple carbohydrates are broken down into glucose. In individuals with altered insulin sensitivity or insufficient insulin response, glucose takes longer to be taken up by cells, resulting in a post-meal rise often referred to as a post-prandial curve.',
      'Nutritional studies examining food order suggest that consuming vegetables or salads first, followed by protein sources, and having carbohydrate staples toward the end of the meal may help moderate the speed of glucose absorption in some people.',
      'Rather than extreme dietary restrictions, working with a clinical dietitian or physician can help tailor portion sizes and meal sequencing to fit cultural food preferences safely.'
    ]
  },
  {
    id: 'art-cgm-vs-traditional-monitoring',
    slug: 'cgm-vs-finger-prick-which-is-better',
    title: 'Continuous Glucose Monitoring & Conventional Testing: An Educational Overview',
    category: 'CGM',
    summary: 'An objective look at how Continuous Glucose Monitors and conventional blood glucose meters function, their physiological differences, and their roles in diabetes care.',
    date: 'Sep 15, 2026',
    readTime: '7 min read',
    imageUrl: '/src/assets/images/cgm_sensor_device_smart_1790358083075.jpg',
    keyTakeaways: [
      'Blood glucose meters sample capillary whole blood to deliver a single point-in-time measurement.',
      'Continuous Glucose Monitors (CGM) sample interstitial fluid beneath the skin to record readings and directional trend arrows throughout the day.',
      'A normal physiological lag of roughly 5 to 10 minutes occurs between blood glucose and interstitial fluid readings during rapid fluctuations.',
      'CGMs do not replace blood glucose meters; finger-prick testing remains essential for calibration, confirmation, or when symptoms do not match sensor readings.'
    ],
    references: [
      'American Diabetes Association. Diabetes Technology: Standards of Care in Diabetes—2024. Diabetes Care 2024;47(Suppl. 1):S111–S125.'
    ],
    content: [
      'Regular glucose monitoring is a cornerstone of diabetes management. Conventional finger-prick glucometers have long served as reliable, widely accessible tools that provide valuable point-in-time capillary blood readings.',
      'Continuous Glucose Monitoring (CGM) systems introduce a different approach. A small sensor is applied to the skin (commonly the upper arm or abdomen, depending on product labeling). A thin, flexible filament sits in the interstitial fluid—the fluid bathing the cells—measuring glucose concentrations day and night.',
      'One key feature of CGM is directional trend arrows, which illustrate whether glucose is stable, rising, or falling. However, it is clinically important to understand the concept of physiological lag time: when glucose levels change rapidly after a meal or during exercise, capillary blood levels change first, and interstitial fluid follows shortly after.',
      'Healthcare professionals emphasize that CGM technology complements, rather than fully replaces, conventional blood glucose meters. Standard meters remain necessary whenever sensor accuracy needs verification or during rapid changes.'
    ]
  },
  {
    id: 'art-diabetes-eye-health',
    slug: 'diabetes-and-eye-health',
    title: 'Diabetes & Eye Health: The Importance of Routine Screening',
    category: 'Diabetes Complications',
    summary: 'An educational overview of how sustained blood glucose levels can affect retinal micro-vessels, and why annual dilated eye exams are recommended.',
    date: 'Sep 12, 2026',
    readTime: '5 min read',
    keyTakeaways: [
      'Prolonged elevated glucose can affect small blood vessels in the retina (diabetic retinopathy).',
      'Early changes in the retina may not cause noticeable visual symptoms initially.',
      'Professional guidelines recommend regular dilated eye evaluations by a qualified eye specialist.',
      'Working with your medical team to manage glucose, blood pressure, and lipids helps support long-term eye health.'
    ],
    references: [
      'American Academy of Ophthalmology. Diabetic Retinopathy Preferred Practice Pattern (2023).'
    ],
    content: [
      'The retina at the back of the eye contains fine micro-vessels sensitive to circulatory changes. When blood glucose and blood pressure remain elevated over prolonged periods, these vessels can experience microvascular changes known as diabetic retinopathy.',
      'In early stages, changes often develop without pain or early vision disturbance. This is why regular comprehensive dilated fundus exams by an ophthalmologist are standard recommendations in clinical guidelines, regardless of current vision clarity.',
      'Managing blood glucose levels, maintaining healthy blood pressure, and keeping regular checkups with your doctor are practical steps that help protect vision health.'
    ]
  },
  {
    id: 'art-diabetes-heart-health',
    slug: 'diabetes-and-heart-health',
    title: 'Diabetes & Cardiovascular Wellness: The Underlying Connection',
    category: 'Diabetes Complications',
    summary: 'Understanding the relationship between metabolic health and cardiovascular wellness, with emphasis on comprehensive care.',
    date: 'Sep 08, 2026',
    readTime: '6 min read',
    imageUrl: '/src/assets/images/about_pakistani_family_health_1790358098847.jpg',
    keyTakeaways: [
      'Cardiometabolic health encompasses blood glucose, blood pressure, and lipid management.',
      'Comprehensive diabetes care focuses on overall cardiovascular risk reduction.',
      'Regular discussions with a physician regarding blood pressure targets and lipid profiles are essential.',
      'Lifestyle factors, such as balanced nutrition and regular movement, complement prescribed medical therapies.'
    ],
    references: [
      'World Health Organization (WHO). Global Report on Diabetes (2022).'
    ],
    content: [
      'Cardiometabolic health reflects the close relationship between glucose regulation, cardiovascular function, and vascular wellness. For people living with diabetes, caring for heart health is an integral part of ongoing care.',
      'Medical organizations highlight comprehensive risk management, frequently summarized as managing glucose (A1c), blood pressure, and cholesterol in coordination with a healthcare team.',
      'Adopting balanced dietary patterns, engaging in physician-approved physical activity, avoiding tobacco use, and following prescribed medical recommendations all contribute to supporting cardiovascular wellness.'
    ]
  },
  {
    id: 'art-understanding-glucose-patterns',
    slug: 'understanding-glucose-patterns',
    title: 'Understanding Glucose Patterns: Variability & Time in Range References',
    category: 'Glucose Monitoring',
    summary: 'Moving beyond single numbers to understand glucose variability, daily circadian rhythms, and standard reference ranges.',
    date: 'Sep 02, 2026',
    readTime: '6 min read',
    keyTakeaways: [
      '70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.',
      'Glucose variability describes the magnitude of fluctuations throughout the day.',
      'Circadian rhythms and early morning hormonal shifts (sometimes called the Dawn Phenomenon) naturally influence hepatic glucose output.',
      'Pattern data enables collaborative, informed discussions with your healthcare provider.'
    ],
    references: [
      'Battelino T, et al. Clinical Targets for Continuous Glucose Monitoring Data Interpretation: Recommendations From the International Consensus on Time in Range. Diabetes Care 2019;42(8):1593–1603.'
    ],
    content: [
      'Blood glucose is naturally dynamic, shifting in response to circadian hormones, physical exertion, stress, and nutrition. In some individuals, early morning rises occur as the body prepares for waking hours, often related to natural cortisol release.',
      'In modern glucose data analysis, "Time in Range" (TIR) evaluates the percentage of time glucose readings stay within designated boundaries. 70–180 mg/dL is a commonly used Time in Range reference for many people with diabetes. Individual targets may vary. Discuss your glucose targets with your healthcare professional.',
      'Observing multi-day trends with your clinician helps identify patterns—such as repeated post-dinner elevations or overnight trends—which can guide personalized adjustments to nutrition, activity, or clinical care.'
    ]
  },
  {
    id: 'art-diabetes-myths-and-facts',
    slug: 'diabetes-myths-and-facts-pakistan',
    title: 'Diabetes Awareness: Addressing Common Misconceptions',
    category: 'Practical Tips',
    summary: 'Separating evidence-based health information from unverified local remedies and misconceptions.',
    date: 'Aug 28, 2026',
    readTime: '5 min read',
    keyTakeaways: [
      'There is no scientifically verified miracle cure for diabetes; effective care relies on personalized lifestyle and medical management.',
      'Insulin is a vital physiological hormone and prescribed therapy when recommended by a doctor, not a punishment.',
      'Whole fruits can often be incorporated into balanced meals with appropriate portion guidance from a clinician.',
      'Consulting certified healthcare professionals protects against harmful or unproven herbal remedies.'
    ],
    references: [
      'International Diabetes Federation (IDF). Clinical Guidelines and Educational Resources.'
    ],
    content: [
      'Misconceptions about diabetes management can sometimes lead individuals to delay proven clinical care in favor of unverified herbal concoctions or extreme diets.',
      'While vegetables like bitter gourd (karela) contain healthy micronutrients, they do not replace medical evaluation, prescribed therapies, or endogenous insulin. Similarly, insulin therapy is a standard medical option that helps maintain glucose control when recommended by an endocrinologist.',
      'Educational awareness helps families approach diabetes with clarity, separating evidence-based facts from word-of-mouth claims.'
    ]
  },
  {
    id: 'art-ramadan-and-diabetes-awareness',
    slug: 'ramadan-fasting-diabetes-awareness',
    title: 'Fasting Awareness: General Guidelines for Diabetes Consideration',
    category: 'Practical Tips',
    summary: 'Educational guidelines from international medical alliances on pre-fasting medical assessments and glucose monitoring.',
    date: 'Aug 20, 2026',
    readTime: '6 min read',
    keyTakeaways: [
      'Medical consensus and Islamic scholars emphasize that individuals at medical risk should consult their doctor regarding fasting exemptions.',
      'A pre-Ramadan medical assessment 4–6 weeks prior allows doctors to review risk categories and adjust regimens if appropriate.',
      'Checking blood glucose with finger pricks or wearing a sensor does not invalidate religious fasts under accepted scholarly consensus.',
      'Consult your doctor on individual safety thresholds for when medical circumstances require breaking a fast.'
    ],
    references: [
      'IDF-DAR Practical Guidelines for Diabetes and Ramadan (2021 update). Diabetes and Ramadan International Alliance.'
    ],
    content: [
      'Fasting during Ramadan holds profound spiritual significance. For individuals with diabetes, medical preparation and risk assessment are critical to prevent complications such as dehydration, hypoglycemia, or severe hyperglycemia.',
      'The Diabetes and Ramadan (DAR) International Alliance and the IDF publish risk stratification tools to help doctors and patients determine individual safety. Anyone intending to fast should seek a personalized medical assessment well before Ramadan.',
      'Religious authorities have widely clarified that checking blood glucose via finger-prick testing or wearing a continuous monitoring sensor does not break the fast. Patients should discuss specific warning signs and glucose parameters with their physician before the fasting month begins.'
    ]
  }
];
