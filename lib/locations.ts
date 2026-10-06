export interface CityText {
  intro: string;
  pricingNote: string;
  localIssue: string;
}

export interface City {
  slug: string;
  name: string;
  state: string;
  population: string;
  lat: number;
  lng: number;
  /** Localized text per locale */
  text: {
    en: CityText;
    es: CityText;
    fr: CityText;
  };
}

export const CITIES: City[] = [
  {
    slug: "dallas",
    name: "Dallas",
    state: "TX",
    population: "1.3M",
    lat: 32.7767,
    lng: -96.797,
    text: {
      en: {
        intro:
          "Dallas is the largest home-services market in North Texas, with older housing stock in areas like Oak Cliff and East Dallas mixed with newer construction in the north. What works in one part of the city often doesn't work in another.",
        pricingNote:
          "Dallas runs right at the DFW average, though prices swing street-to-street based on neighborhood age and pool/equipment types.",
        localIssue:
          "Older homes mean aging pipes, dated HVAC systems, and pool equipment past its expected life. Repair-focused jobs dominate over new installs.",
      },
      es: {
        intro:
          "Dallas es el mercado de servicios para el hogar más grande del norte de Texas, con viviendas más antiguas en zonas como Oak Cliff y East Dallas mezcladas con construcción nueva al norte. Lo que funciona en una parte de la ciudad a menudo no funciona en otra.",
        pricingNote:
          "Dallas está justo en el promedio de DFW, aunque los precios varían calle por calle según la antigüedad del vecindario y los tipos de piscina/equipo.",
        localIssue:
          "Las casas más antiguas significan tuberías envejecidas, sistemas de HVAC desactualizados y equipos de piscina más allá de su vida útil. Los trabajos de reparación dominan sobre las instalaciones nuevas.",
      },
      fr: {
        intro:
          "Dallas est le plus grand marché de services à domicile du nord du Texas, avec un parc immobilier ancien dans des quartiers comme Oak Cliff et East Dallas mêlé à des constructions récentes au nord. Ce qui fonctionne dans une partie de la ville ne fonctionne souvent pas dans une autre.",
        pricingNote:
          "Dallas se situe exactement dans la moyenne de DFW, bien que les prix varient de rue en rue selon l'âge du quartier et les types de piscine/équipement.",
        localIssue:
          "Les maisons anciennes signifient des tuyaux vieillissants, des systèmes CVC datés et du matériel de piscine au-delà de sa durée de vie prévue. Les travaux de réparation dominent sur les installations neuves.",
      },
    },
  },
  {
    slug: "plano",
    name: "Plano",
    state: "TX",
    population: "285K",
    lat: 33.0198,
    lng: -96.6989,
    text: {
      en: {
        intro:
          "Plano has some of the highest concentrations of family homes in DFW — plenty of pools, well-maintained yards, and HVAC systems running near year-round. Homeowners here tend to be informed buyers, which means quality matters more than the lowest price.",
        pricingNote:
          "Plano runs about 5–10% above the DFW average for most services. Demand is steady year-round.",
        localIssue:
          "Heavy summer AC usage and older pools from the 1990s–2000s boom mean equipment replacements are more common than in newer suburbs.",
      },
      es: {
        intro:
          "Plano tiene algunas de las concentraciones más altas de casas familiares en DFW — muchas piscinas, jardines bien mantenidos y sistemas de HVAC funcionando casi todo el año. Los propietarios aquí tienden a ser compradores informados, lo que significa que la calidad importa más que el precio más bajo.",
        pricingNote:
          "Plano está aproximadamente 5–10% por encima del promedio de DFW en la mayoría de servicios. La demanda es constante todo el año.",
        localIssue:
          "El alto uso del aire acondicionado en verano y las piscinas más antiguas del auge de los 90 y 2000 significan que los reemplazos de equipos son más comunes que en suburbios más nuevos.",
      },
      fr: {
        intro:
          "Plano compte certaines des plus fortes concentrations de maisons familiales du DFW — beaucoup de piscines, des jardins bien entretenus et des systèmes CVC fonctionnant presque toute l'année. Les propriétaires ici sont des acheteurs informés, ce qui signifie que la qualité compte plus que le prix le plus bas.",
        pricingNote:
          "Plano est environ 5 à 10 % au-dessus de la moyenne du DFW pour la plupart des services. La demande est stable toute l'année.",
        localIssue:
          "La forte utilisation de la climatisation en été et les piscines plus anciennes du boom des années 1990–2000 signifient que les remplacements d'équipement sont plus fréquents que dans les banlieues plus récentes.",
      },
    },
  },
  {
    slug: "frisco",
    name: "Frisco",
    state: "TX",
    population: "220K",
    lat: 33.1507,
    lng: -96.8236,
    text: {
      en: {
        intro:
          "Frisco is one of the fastest-growing cities in the country, with a mix of brand-new construction and 10–15 year-old subdivisions. Systems are modern on average, but the sheer volume of homes means service demand is high and good providers book out fast.",
        pricingNote:
          "Frisco runs 10–20% above the DFW average. Premium service tier pricing is common.",
        localIssue:
          "Newer homes have manufacturer warranties that should be used first — and builder-grade equipment that often hits its first major repair around years 8–12.",
      },
      es: {
        intro:
          "Frisco es una de las ciudades de más rápido crecimiento del país, con una mezcla de construcción nueva y subdivisiones de 10–15 años. Los sistemas son modernos en promedio, pero el gran volumen de casas significa que la demanda de servicio es alta y los buenos proveedores se reservan rápido.",
        pricingNote:
          "Frisco está 10–20% por encima del promedio de DFW. Los precios premium son comunes.",
        localIssue:
          "Las casas más nuevas tienen garantías del fabricante que deben usarse primero — y equipos de nivel constructor que a menudo llegan a su primera reparación mayor entre los años 8 y 12.",
      },
      fr: {
        intro:
          "Frisco est l'une des villes à la croissance la plus rapide du pays, avec un mélange de constructions neuves et de lotissements de 10 à 15 ans. Les systèmes sont modernes en moyenne, mais le volume même des maisons signifie que la demande de service est élevée et que les bons prestataires réservent vite.",
        pricingNote:
          "Frisco est 10 à 20 % au-dessus de la moyenne du DFW. Les tarifs de service premium sont courants.",
        localIssue:
          "Les maisons plus récentes ont des garanties du fabricant à utiliser en priorité — et un équipement de qualité constructeur qui atteint souvent sa première réparation majeure vers les années 8 à 12.",
      },
    },
  },
  {
    slug: "mckinney",
    name: "McKinney",
    state: "TX",
    population: "210K",
    lat: 33.1972,
    lng: -96.6397,
    text: {
      en: {
        intro:
          "McKinney has a blend of historic downtown homes and newer master-planned communities to the west and north. The housing age gap is wide — some homes are 100+ years old, others just built — and service needs reflect that spread.",
        pricingNote:
          "McKinney is roughly 5% above the DFW average. Prices vary depending on which side of town you're in.",
        localIssue:
          "Mixed-age housing stock means providers who can handle both older plumbing/HVAC and modern smart-home systems are the most valuable.",
      },
      es: {
        intro:
          "McKinney tiene una mezcla de casas históricas en el centro y comunidades nuevas planificadas al oeste y norte. La diferencia de antigüedad es amplia — algunas casas tienen más de 100 años, otras recién construidas — y las necesidades de servicio reflejan esa dispersión.",
        pricingNote:
          "McKinney está aproximadamente 5% por encima del promedio de DFW. Los precios varían según el lado de la ciudad.",
        localIssue:
          "El parque inmobiliario de edades mixtas significa que los proveedores que pueden manejar tanto plomería/HVAC antiguos como sistemas modernos de casa inteligente son los más valiosos.",
      },
      fr: {
        intro:
          "McKinney présente un mélange de maisons historiques du centre-ville et de communautés planifiées récentes à l'ouest et au nord. L'écart d'âge des logements est important — certaines maisons ont 100 ans et plus, d'autres viennent d'être construites — et les besoins en services reflètent cette diversité.",
        pricingNote:
          "McKinney est environ 5 % au-dessus de la moyenne du DFW. Les prix varient selon le côté de la ville.",
        localIssue:
          "Un parc immobilier d'âges mixtes signifie que les prestataires capables de gérer à la fois la plomberie/CVC ancienne et les systèmes modernes de maison connectée sont les plus précieux.",
      },
    },
  },
  {
    slug: "fort-worth",
    name: "Fort Worth",
    state: "TX",
    population: "960K",
    lat: 32.7555,
    lng: -97.3308,
    text: {
      en: {
        intro:
          "Fort Worth covers a huge geographic area with distinct neighborhoods — from historic districts near downtown to newer developments in the north and west. Service pricing here is often 5–15% below Dallas proper.",
        pricingNote:
          "Fort Worth runs 5–15% below the DFW average — the best value in the metro for most services.",
        localIssue:
          "Wide geographic spread means some neighborhoods are underserved. Finding a provider who reliably serves your specific area is the main challenge.",
      },
      es: {
        intro:
          "Fort Worth cubre un área geográfica enorme con vecindarios distintos — desde distritos históricos cerca del centro hasta desarrollos más nuevos al norte y oeste. Los precios de servicio aquí suelen ser 5–15% más bajos que en Dallas propiamente.",
        pricingNote:
          "Fort Worth está 5–15% por debajo del promedio de DFW — el mejor valor en el área metropolitana para la mayoría de servicios.",
        localIssue:
          "La amplia dispersión geográfica significa que algunos vecindarios están desatendidos. Encontrar un proveedor que sirva de manera confiable tu área específica es el desafío principal.",
      },
      fr: {
        intro:
          "Fort Worth couvre une immense zone géographique avec des quartiers distincts — des districts historiques près du centre-ville aux développements plus récents au nord et à l'ouest. Les tarifs de service ici sont souvent 5 à 15 % inférieurs à ceux de Dallas même.",
        pricingNote:
          "Fort Worth est 5 à 15 % en dessous de la moyenne du DFW — le meilleur rapport qualité-prix de la métropole pour la plupart des services.",
        localIssue:
          "La vaste étendue géographique signifie que certains quartiers sont mal desservis. Trouver un prestataire qui dessert de manière fiable votre zone spécifique est le principal défi.",
      },
    },
  },
  {
    slug: "arlington",
    name: "Arlington",
    state: "TX",
    population: "395K",
    lat: 32.7357,
    lng: -97.1081,
    text: {
      en: {
        intro:
          "Arlington sits between Dallas and Fort Worth and covers a large, diverse housing market. Prices sit in the middle of the metro, and service availability is strong — you're rarely more than 10 minutes from a good provider.",
        pricingNote:
          "Arlington is right at the DFW average — no premium, no discount.",
        localIssue:
          "Heavy storm seasons bring roof, landscape, and electrical damage. Post-storm repair demand spikes every spring.",
      },
      es: {
        intro:
          "Arlington se encuentra entre Dallas y Fort Worth y cubre un mercado inmobiliario grande y diverso. Los precios están en el medio del área metropolitana, y la disponibilidad de servicios es sólida — rara vez estás a más de 10 minutos de un buen proveedor.",
        pricingNote:
          "Arlington está justo en el promedio de DFW — sin prima, sin descuento.",
        localIssue:
          "Las fuertes temporadas de tormentas traen daños en techos, jardines y electricidad. La demanda de reparaciones después de tormentas aumenta cada primavera.",
      },
      fr: {
        intro:
          "Arlington se situe entre Dallas et Fort Worth et couvre un marché immobilier vaste et diversifié. Les prix se situent au milieu de la métropole, et la disponibilité des services est forte — vous êtes rarement à plus de 10 minutes d'un bon prestataire.",
        pricingNote:
          "Arlington est exactement dans la moyenne du DFW — ni prime, ni remise.",
        localIssue:
          "Les fortes saisons d'orages entraînent des dommages aux toits, aux aménagements paysagers et à l'électricité. La demande de réparation après tempête grimpe chaque printemps.",
      },
    },
  },
];

export type ServiceKey =
  | "pool"
  | "hvac"
  | "pest-control"
  | "plumbing"
  | "holiday-lighting"
  | "landscape"
  | "hardscape";

export interface ServiceForCity {
  key: ServiceKey;
  labelKey: string;
  icon: "Waves" | "Wind" | "Bug" | "Wrench" | "Sparkles" | "Trees" | "BrickWall";
  siblingUrls: Partial<Record<string, string>>;
  siblingFallback: string;
}

export const CITY_SERVICES: ServiceForCity[] = [
  {
    key: "pool",
    labelKey: "pool",
    icon: "Waves",
    siblingUrls: {
      dallas: "https://poolburg.com/pool-cleaning-dallas/",
      plano: "https://poolburg.com/pool-cleaning-plano/",
      frisco: "https://poolburg.com/pool-cleaning-frisco/",
      mckinney: "https://poolburg.com/pool-cleaning-mckinney/",
    },
    siblingFallback: "https://poolburg.com/services/",
  },
  {
    key: "hvac",
    labelKey: "hvac",
    icon: "Wind",
    siblingUrls: {},
    siblingFallback:
      "https://supremacyservice.com/hvac-repair-in-dallas-texas/",
  },
  {
    key: "pest-control",
    labelKey: "pest",
    icon: "Bug",
    siblingUrls: {
      dallas: "https://supremacyservice.com/locations/pest-control-dallas-tx/",
      plano: "https://supremacyservice.com/locations/pest-control-plano-tx/",
      frisco: "https://supremacyservice.com/locations/pest-control-frisco-tx/",
      mckinney:
        "https://supremacyservice.com/locations/pest-control-mckinney-tx/",
      "fort-worth":
        "https://supremacyservice.com/locations/pest-control-fort-worth-tx/",
    },
    siblingFallback: "https://supremacyservice.com/pest-control/",
  },
  {
    key: "plumbing",
    labelKey: "plumbing",
    icon: "Wrench",
    siblingUrls: {
      dallas:
        "https://supremacyservice.com/locations/residential-plumbing-dallas/",
      plano:
        "https://supremacyservice.com/locations/residential-plumbing-plano/",
      frisco:
        "https://supremacyservice.com/locations/residential-plumbing-frisco/",
      mckinney:
        "https://supremacyservice.com/locations/residential-plumbing-mckinney/",
      "fort-worth":
        "https://supremacyservice.com/locations/residential-plumbing-fort-worth/",
    },
    siblingFallback: "https://supremacyservice.com/plumbing-repair/",
  },
  {
    key: "holiday-lighting",
    labelKey: "lighting",
    icon: "Sparkles",
    siblingUrls: {},
    siblingFallback:
      "https://supremacyservice.com/christmas-light-installation/",
  },
  {
    key: "landscape",
    labelKey: "landscape",
    icon: "Trees",
    siblingUrls: {},
    siblingFallback:
      "https://supremacyservice.com/landscape-and-outdoor-accents-dfw/",
  },
  {
    key: "hardscape",
    labelKey: "hardscape",
    icon: "BrickWall",
    siblingUrls: {},
    siblingFallback:
      "https://supremacyservice.com/landscape-and-outdoor-accents-dfw/",
  },
];

export function getCity(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getService(key: string): ServiceForCity | undefined {
  return CITY_SERVICES.find((s) => s.key === key);
}

export function resolveSiblingUrl(
  service: ServiceForCity,
  citySlug: string
): string {
  return service.siblingUrls[citySlug] ?? service.siblingFallback;
}

export function getAllCityServiceCombos(): {
  service: ServiceForCity;
  city: City;
}[] {
  const combos: { service: ServiceForCity; city: City }[] = [];
  for (const service of CITY_SERVICES) {
    for (const city of CITIES) {
      combos.push({ service, city });
    }
  }
  return combos;
}

/** Get city text for a specific locale */
export function getCityText(city: City, locale: string): CityText {
  const key = (locale === "es" || locale === "fr" ? locale : "en") as
    | "en"
    | "es"
    | "fr";
  return city.text[key];
}