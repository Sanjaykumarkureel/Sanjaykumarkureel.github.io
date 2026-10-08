export const person = {
  name: "Sanjay Kumar Kureel",
  shortName: "Sanjay Kureel",
  honorific: "PhD",
  monogram: "SKK",
  title: "Independent Research Scholar",
  disciplines: [
    "Cell Biology",
    "Aging",
    "Mechanobiology",
    "Neurodegeneration",
  ],
  location: "United States",
  phone: "+1-409-974-6156",
  phoneHref: "tel:+14099746156",
  email: "skkureel113@gmail.com",
  statement:
    "My research focuses on the cellular and molecular mechanisms underlying aging, cellular senescence, and neurodegeneration. Integrating cell biology, mechanobiology, and translational neuroscience, I study how mechanical and chemical signals shape age-associated neurodegenerative disorders — and identify biological mechanisms with therapeutic potential.",
  cvHref: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/SKK-CV-08112026.pdf`,
  links: {
    linkedin: "https://www.linkedin.com/in/sanjay-k-98a7b1182",
    scholar: "https://scholar.google.com/citations?user=ZfsiIEUAAAAJ&hl=en",
    orcid: "https://orcid.org/0000-0003-0562-0316",
    researchgate: "https://www.researchgate.net/profile/Sanjay-Kureel",
  },
} as const;

export const scholar = {
  href: "https://scholar.google.com/citations?user=ZfsiIEUAAAAJ&hl=en",
  metrics: [
    { value: "195", label: "Citations" },
    { value: "07", label: "h-index" },
    { value: "06", label: "i10-index" },
  ],
} as const;

export const principles = [
  {
    index: "01",
    title: "Seek clarity.",
    body: "Ask better questions. Focus on what matters.",
  },
  {
    index: "02",
    title: "Stay honest.",
    body: "Honest self-reflection is the foundation of growth.",
  },
  {
    index: "03",
    title: "Give it time.",
    body: "Meaningful work and lasting understanding take patience.",
  },
] as const;

export const stats = [
  { value: "12+", label: "Peer-reviewed papers" },
  { value: "02", label: "U.S. patent applications" },
  { value: "02", label: "Book chapters" },
  { value: "20+", label: "Years across research & teaching" },
] as const;

export const interests = [
  {
    title: "Aging & senescence",
    body: "Cellular and molecular mechanisms of aging, cellular senescence, and age-related cognitive decline.",
  },
  {
    title: "Mechanobiology",
    body: "How force and substrate stiffness regulate stem cell fate, tissue architecture, and hippocampal function.",
  },
  {
    title: "Translational neuroscience",
    body: "Biomarker discovery and interventions that restore synaptic, metabolic, and nuclear integrity in neurodegenerative models.",
  },
  {
    title: "Tissue rejuvenation",
    body: "Methods to rejuvenate senescent cells and regenerate tissues — from low-frequency ultrasound to nuclear YAP1 enrichment.",
  },
  {
    title: "Biology of history",
    body: "How cells remember past events — mechanical memory as a biological history written into living material.",
  },
] as const;

export const otherInterests = [
  {
    title: "Human behaviour & psychology",
    body: "Understanding human and social behaviour, and the psychology that shapes how people adapt, decide, and relate.",
  },
  {
    title: "Writing for thinking",
    body: "Writing as a method: to test ideas, find the question, and make complex work legible.",
  },
] as const;

export const expertise = {
  translational: [
    "Mouse handling, colony maintenance, survival surgery",
    "Behavioral assessments: treadmill, rotarod, grip strength, inverted cling, voluntary wheel running",
    "Functional phenotyping of aging and disease models",
  ],
  molecular: [
    "Primary mammalian cell culture, stem cells, and cancer lines",
    "Stem cell differentiation assays",
    "RT-qPCR; DNA/RNA extraction and purification",
    "Immunofluorescence and immunohistochemistry",
    "Flow cytometry; ELISA; HiBiT reporter assays",
    "Confocal and super-resolution microscopy",
    "Traction force microscopy",
    "Tunable mechanical substrates: polyacrylamide hydrogels and PDMS",
  ],
  computational: [
    "Statistical and transcriptomic analysis (RNA-Seq)",
    "Data visualization in R and Python",
    "GraphPad Prism and ImageJ/Fiji",
    "Scientific figures: BioRender, Adobe Illustrator",
  ],
} as const;

export const career = [
  {
    period: "Aug 2026 — Present",
    role: "Independent Research Scholar",
    org: "United States",
    detail:
      "Preparing review articles and research proposals on cellular senescence and neurodegeneration.",
  },
  {
    period: "Feb 2025 — Jul 2026",
    role: "Postdoctoral Research Fellow",
    org: "UT Health San Antonio",
    detail:
      "Department of Cellular and Integrative Physiology · Sam and Ann Barshop Institute for Longevity and Aging Studies, San Antonio, Texas.",
  },
  {
    period: "Feb 2020 — Feb 2025",
    role: "Postdoctoral Fellow",
    org: "UTMB Galveston",
    detail:
      "Department of Biochemistry and Molecular Biology, The University of Texas Medical Branch, Galveston, Texas.",
  },
  {
    period: "Mar 2019 — Sep 2019",
    role: "Research Assistant",
    org: "IIT Bombay",
    detail: "Department of Chemical Engineering, Indian Institute of Technology Bombay, India.",
  },
  {
    period: "2011 — 2013",
    role: "Assistant Professor",
    org: "ITM Gwalior",
    detail: "Institute of Technology and Management, Gwalior, India.",
  },
  {
    period: "2009 — 2011",
    role: "Assistant Professor",
    org: "AEC Agra",
    detail: "Anand Engineering College, Agra, India.",
  },
] as const;

export const education = [
  {
    period: "2014 — 2019",
    degree: "Ph.D. in Chemical Engineering",
    org: "Indian Institute of Technology Bombay",
    extra: "Advisor: Prof. Abhijit Majumder",
  },
  {
    period: "2006 — 2008",
    degree: "Master of Technology in Chemical Engineering",
    org: "Indian Institute of Technology Kharagpur",
    extra: "Advisor: Prof. J.K. Basu",
  },
  {
    period: "1998 — 2002",
    degree: "Bachelor of Technology in Chemical Engineering",
    org: "Harcourt Butler Technological University, Kanpur",
    extra: "",
  },
] as const;

export const honors = [
  "Best Poster Award, Annual Symposium of Aging, UTMB Galveston (2024)",
  "Best Poster Presentation, ComFlu International Conference, IISER Bhopal (2019)",
  "Best Poster Presentation, ChEmference ’18, IIT Bombay",
  "Best Poster Presentation, International Congress of Cell Biology, NCCS Hyderabad (2018)",
  "Best Poster Presentation, Recent Advances in Chemical Biology, CEBS Mumbai",
  "Best Teacher Award, Institute of Technology & Management, Gwalior (2013)",
] as const;

export const talks = [
  {
    title: "Mechanical Forces in Cellular Rejuvenation and Healthy Aging",
    venue: "Cellular & Integrative Physiology Symposium, UT Health San Antonio",
    year: "2026",
  },
  {
    title: "Mechano-Regulation of Aging and Rejuvenation",
    venue: "Friday at Barshop Seminar Series, UT Health San Antonio",
    year: "2025",
  },
  {
    title: "Low-Frequency Ultrasound Rejuvenation of Senescent Cells In Vitro and In Vivo",
    venue: "Translational Research in Aging & Metabolism, UTMB",
    year: "2022",
  },
  {
    title: "Soft Substrate-Mediated Regulation of Stem Cell Function",
    venue: "Mechanobiology Institute, Singapore",
    year: "2019",
  },
] as const;

export const mentoring = [
  "Mentored research assistants in cell-based and animal studies — experimental design, protocol development, data acquisition, and quantitative analysis (UTMB Galveston, 2020–2025).",
  "Supervised PhD rotation students on project design, experimental execution, and data interpretation (UTMB Galveston, 2020–2022).",
  "Mentored graduate and master’s students on research methodology, experimental rigor, and data analysis (IIT Bombay, 2014–2019).",
] as const;

export const memberships = [
  "Tissue Engineering and Regenerative Medicine International Society (TERMIS)",
  "Biophysical Society (BPS)",
  "American Aging Association",
  "American Physiological Society (APS)",
  "International Cell Senescence Association (ICSA)",
] as const;

export const editorial = [
  "Review Board Member, Stem Cell Research & Therapy",
  "Review Board Member, Bio-Protocol",
  "Managing Editor, Molecular and Cellular Biochemistry",
] as const;

export const journals = [
  "Stem Cell Research & Therapy",
  "Aging and Disease",
  "NPJ Aging",
  "Science Advances",
  "STAR Protocols",
  "Biogerontology",
  "European Journal of Medical Research",
] as const;

export const manuscripts = [
  {
    authors: "Kureel, S.K., et al.",
    title: "Enrichment of nuclear YAP1 rejuvenates senescent cells.",
    status: "In preparation",
  },
  {
    authors: "Kureel, S.K., Rasmussen, B.",
    title:
      "Nicotinamide mononucleotide ameliorates progerin-associated defects and restores nuclear morphology in Hutchinson–Gilford progeria syndrome cells.",
    status: "Under review",
  },
  {
    authors: "Kureel, S.K., et al.",
    title:
      "Low-frequency ultrasound attenuates amyloid-β and tau pathology while enhancing autophagy, synaptic function, and metabolic resilience in 3xTg Alzheimer’s disease mice.",
    status: "In preparation",
  },
] as const;

export const publications = [
  {
    authors: "Kureel, S.K., Maroto, R., Aniqua, M., Powell, S., Singh, E., Margadant, F., et al.",
    title: "Rejuvenation of senescent cells, in vitro and in vivo, by low-frequency ultrasound.",
    venue: "Aging Cell",
    year: "2025",
    extra: "24(6): e70008",
    href: "https://doi.org/10.1111/acel.70008",
  },
  {
    authors: "Kureel, S.K., Rasmussen, B.B.",
    title: "Targeting ferroptosis to eliminate senescent cells: mechanisms and therapeutic potential.",
    venue: "Aging and Disease",
    year: "2025",
    extra: "",
    href: "https://www.aginganddisease.org/",
  },
  {
    authors: "Has, C., Kureel, S.K.",
    title:
      "Advances in microfluidic- and artificial intelligence-assisted design of liposomes for drug-delivery applications.",
    venue: "Journal of Liposome Research",
    year: "Accepted",
    extra: "",
    href: "https://www.tandfonline.com/journals/ilpr20",
  },
  {
    authors: "Marchant, E.D., Singh, E., Kureel, S.K., Blair, B., Kalenta, H., Von Ruff, Z.D., et al.",
    title:
      "Low-frequency ultrasound reverses insulin resistance and diabetes-induced alterations in the muscle transcriptome of aged mice.",
    venue: "American Journal of Physiology – Endocrinology and Metabolism",
    year: "2025",
    extra: "328(6): E899–E910",
    href: "https://doi.org/10.1152/ajpendo.00054.2025",
  },
  {
    authors: "Kureel, S.K., Maroto, R., Davis, K., Sheetz, M.P.",
    title:
      "Cellular mechanical memory: a potential tool for mesenchymal stem cell-based therapy.",
    venue: "Stem Cell Research & Therapy",
    year: "2025",
    extra: "16(1):159",
    href: "https://doi.org/10.1186/s13287-025-04259-9",
  },
  {
    authors: "Kureel, S.K., Blair, B., Sheetz, M.P.",
    title: "Recent advances in elimination strategies and rejuvenation targets of cellular senescence.",
    venue: "Advanced Biology",
    year: "2024",
    extra: "8(1): e2300461",
    href: "https://doi.org/10.1002/adbi.202300461",
  },
  {
    authors: "Kureel, S.K., Sinha, S., Purkayastha, P., Barretto, S., Majumder, A.",
    title: "Substrate stiffness controls the cell cycle of human mesenchymal stem cells via cellular traction.",
    venue: "JOM",
    year: "2022",
    extra: "74(9): 3419–3427",
    href: "https://doi.org/10.1007/s11837-022-05307-y",
  },
  {
    authors: "Kureel, S.K., Mogha, P., Khadpekar, A., Kumar, V., Joshi, R., Das, S., et al.",
    title:
      "Soft substrates preserve proliferative and adipogenic potential of mesenchymal stem cells by delaying senescence.",
    venue: "Biology Open",
    year: "2019",
    extra: "8(4)",
    href: "https://doi.org/10.1242/bio.039453",
  },
  {
    authors: "Mogha, P., Srivastava, A., Kumar, S., Das, S., Kureel, S.K., Dwivedi, A., et al.",
    title:
      "Hydrogel scaffolds with physiologically relevant elasticity promote proliferation of functional keratinocytes.",
    venue: "RSC Advances",
    year: "2019",
    extra: "9(18): 10174–10183",
    href: "https://doi.org/10.1039/C8RA10569C",
  },
] as const;

export const chapters = [
  {
    authors: "Kureel, S.K., Namita.",
    title:
      "Linking Mechanical Memory to Traumatic Brain Injury (TBI)-Induced Persistent Hippocampus Dysfunction.",
    venue:
      "The Hippocampus — Architecture, Cognition, Plasticity and Dysfunction. IntechOpen",
    year: "2026",
    extra: "Published 28 September 2026",
    href: "https://www.intechopen.com/online-first/1257339",
  },
  {
    authors: "Has, C., Kureel, S.K.",
    title: "Adsorption equilibrium.",
    venue: "Adsorption Dynamics: From Technologies to Environmental Solutions. Cambridge Scholars Publishing",
    year: "2026",
    extra: "",
    href: "",
  },
] as const;

export const featuredChapter = chapters[0];

export const patents = [
  {
    title: "Reversal of Senescence by Ultrasound Irradiation",
    inventors: "M. Sheetz, S. K. Kureel, B. Rasmussen, R. Maroto",
    number: "US Patent Application 18/719,116",
  },
  {
    title: "Reversal of Cellular Senescence by Low-Frequency Ultrasound Treatment",
    inventors: "M. Sheetz, S.K. Kureel, F.M. Margadant",
    number: "US Patent Application 18/217,362",
  },
] as const;

export const portfolio = [
  {
    status: "Published",
    index: "01",
    title: "Mechanical memory after TBI",
    field: "IntechOpen · Book chapter · 2026",
    blurb:
      "How cells remember past mechanical events — and why that memory may explain persistent hippocampal dysfunction after traumatic brain injury.",
    href: "https://www.intechopen.com/online-first/1257339",
    cta: "Read the chapter",
  },
  {
    status: "Published",
    index: "02",
    title: "Low-frequency ultrasound rejuvenation",
    field: "Aging Cell · 2025",
    blurb:
      "Senescent cells restored in vitro and in vivo — a physical intervention with systemic implications for healthy aging.",
    href: "https://doi.org/10.1111/acel.70008",
    cta: "Read the paper",
  },
  {
    status: "Published",
    index: "03",
    title: "Cellular mechanical memory",
    field: "Stem Cell Research & Therapy · 2025",
    blurb:
      "How cells remember the forces they have lived through — and why that memory is a tool for MSC-based therapy.",
    href: "https://doi.org/10.1186/s13287-025-04259-9",
    cta: "Read the paper",
  },
  {
    status: "Published",
    index: "04",
    title: "Ferroptosis as a senolytic axis",
    field: "Aging and Disease · 2025",
    blurb:
      "Mechanisms and therapeutic potential of targeting ferroptosis to eliminate senescent cells.",
    href: "https://www.aginganddisease.org/",
    cta: "Journal",
  },
  {
    status: "Reserved",
    index: "05",
    title: "Selected visual studies",
    field: "Figures · protocols · talks",
    blurb:
      "A curated gallery of confocal work, traction maps, and seminar decks will live here.",
    href: "",
    cta: "Coming soon",
  },
  {
    status: "Reserved",
    index: "06",
    title: "Open tools",
    field: "Methods · analysis",
    blurb:
      "Image analysis notebooks, hydrogel recipes, and behavioral pipelines — staged for public release.",
    href: "",
    cta: "Coming soon",
  },
  {
    status: "Reserved",
    index: "07",
    title: "Collaborative briefs",
    field: "Industry · academia",
    blurb:
      "Confidential project summaries and translational briefs will be indexed as they become shareable.",
    href: "",
    cta: "Coming soon",
  },
] as const;

export const nav = [
  { href: "/", label: "Me", index: "01" },
  { href: "/career", label: "Career", index: "02" },
  { href: "/research", label: "Research", index: "03" },
  { href: "/portfolio", label: "Portfolio", index: "04" },
] as const;
