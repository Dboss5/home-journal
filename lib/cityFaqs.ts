export interface CityFaq {
  q: string;
  a: string;
}

type FaqBuilder = (city: string) => CityFaq[];

const FAQ_EN: Record<string, FaqBuilder> = {
  pool: (city) => [
    {
      q: `How much does weekly pool service cost in ${city}?`,
      a: `Weekly pool service in ${city} typically runs $120–$220 per month for a standard residential pool. Pricing depends on pool size, condition, and whether you want basic chemical-only service or full cleaning and inspection.`,
    },
    {
      q: `How often does my pool need service in ${city}?`,
      a: `Weekly during swim season (May–September), bi-weekly in shoulder months, and monthly in winter if you keep it open. In ${city}'s climate, going more than two weeks without service in summer almost always leads to algae.`,
    },
    {
      q: `Can I do pool service myself instead of hiring someone in ${city}?`,
      a: `You can, but the learning curve on water chemistry is steep. Most DIY pool owners in ${city} spend the first year fighting cloudy water and algae. If your time is worth more than $20/hour, hiring a pro usually nets out ahead.`,
    },
    {
      q: `What's a fair price for pool equipment repair in ${city}?`,
      a: `Pump repairs run $150–$400 in ${city}. Filter repairs $100–$350. Heater repairs $200–$600. Full replacements cost significantly more. Get a written estimate before work begins.`,
    },
    {
      q: `How do I find a vetted pool pro in ${city}?`,
      a: `Ask for three local references, verify CPO certification, confirm general liability insurance, and get a written quote. If a provider won't do any of these, that's a red flag. Or use our quote form and we'll match you with someone vetted.`,
    },
  ],
  hvac: (city) => [
    {
      q: `How much does AC repair cost in ${city}?`,
      a: `Most AC repairs in ${city} run $150–$800 depending on the issue. Capacitors are on the low end ($150–$300); compressor replacements on the high end ($1,200–$2,500). Diagnostic fees are typically $75–$150 and often waived if you book the repair.`,
    },
    {
      q: `How often should I service my HVAC in ${city}?`,
      a: `Twice a year — once in spring before cooling season, once in fall before heating. In ${city}, the spring tune-up is more important because summer heat stress causes most breakdowns.`,
    },
    {
      q: `How long does an HVAC system last in ${city}?`,
      a: `15–20 years with regular maintenance. North Texas heat is harder on systems than cooler climates, so skipping tune-ups can cut lifespan by 5+ years.`,
    },
    {
      q: `Should I repair or replace my HVAC in ${city}?`,
      a: `The industry rule: if the repair costs more than 30% of a new system AND the unit is 12+ years old, replace it. Under 10 years old with a straightforward fix, repair it.`,
    },
    {
      q: `How do I find a vetted HVAC pro in ${city}?`,
      a: `Look for NATE certification, EPA 608 certification for refrigerant handling, and a written estimate before work starts. In ${city}, most quality providers book 1–2 weeks out during peak summer.`,
    },
  ],
  "pest-control": (city) => [
    {
      q: `How much does pest control cost in ${city}?`,
      a: `Quarterly pest control in ${city} runs $80–$150 per visit. One-time treatments cost $150–$400. Termite bonds run $300–$800 per year. Prices vary by pest type and treatment area.`,
    },
    {
      q: `How often do I need pest control in ${city}?`,
      a: `Quarterly is standard for prevention in ${city}. Active infestations may need monthly treatments until controlled. If you've never had service, a one-time perimeter treatment is a good starting point.`,
    },
    {
      q: `What pests are most common in ${city}?`,
      a: `${city} sees year-round activity from roaches, ants, spiders, and rodents. Spring and fall bring mosquitoes and wasps. Summer brings fire ants. Winter drives rodents indoors.`,
    },
    {
      q: `Is pest control safe for pets and kids in ${city}?`,
      a: `Yes, when applied correctly. Ask your provider about pet-safe and child-safe treatment options. Most ${city} providers offer them at no extra cost. For interior treatments, keep pets and kids away for 2–4 hours after application.`,
    },
    {
      q: `How do I find a vetted pest control pro in ${city}?`,
      a: `Look for state licensing, an Integrated Pest Management (IPM) approach, and written follow-up policies. In ${city}, reputable providers include follow-up visits in their pricing rather than charging per trip.`,
    },
  ],
  plumbing: (city) => [
    {
      q: `How much does a plumber cost in ${city}?`,
      a: `Standard service calls in ${city} run $75–$150 just to show up. Common repairs total $150–$500 including parts and labor. Bigger jobs — water heaters, repiping, slab leaks — range from $800 to $15,000+ depending on scope.`,
    },
    {
      q: `How fast can a plumber get to my ${city} home in an emergency?`,
      a: `Most ${city} plumbers offer same-day emergency service. Response times vary by neighborhood — 1–4 hours is typical. Expect 50–100% higher rates for after-hours calls.`,
    },
    {
      q: `How long does a water heater last in ${city}?`,
      a: `Tank water heaters last 8–12 years in ${city}'s water conditions. Tankless units last 20+ with annual descaling. If yours is past 10 years and showing issues, replacement is usually the right call.`,
    },
    {
      q: `What should I do if I have a slab leak in ${city}?`,
      a: `Shut off the water main, call a plumber for leak detection ($200–$500), and get multiple quotes for repair. Slab leak repair in ${city} typically runs $2,000–$6,000 depending on location and pipe material.`,
    },
    {
      q: `How do I find a vetted plumber in ${city}?`,
      a: `Texas requires a master plumber license for most work. Ask for the license number, verify it on the state board's site, confirm insurance, and get a written estimate. Any ${city} plumber who dodges these is one to avoid.`,
    },
  ],
  "holiday-lighting": (city) => [
    {
      q: `How much does holiday light installation cost in ${city}?`,
      a: `Single-story homes in ${city} run $300–$800. Two-story homes run $800–$2,000. Commercial properties start at $2,000. Most quotes include installation, mid-season maintenance, takedown, and storage.`,
    },
    {
      q: `When should I book holiday light installation in ${city}?`,
      a: `October or early November. The best ${city} installers book out by Halloween. If you call in December, expect premium pricing and limited availability.`,
    },
    {
      q: `Do I own the lights after the season?`,
      a: `Depends on the package. Rental packages ($300–$800 typical) include storage and reuse next year. Purchase packages cost more upfront but you keep the lights. Most ${city} providers offer both.`,
    },
    {
      q: `Can I install holiday lights myself in ${city}?`,
      a: `You can for single-story, easily accessible areas. Two-story homes, complex rooflines, and commercial properties are where DIY becomes dangerous and time-consuming. Ladder falls are the #1 holiday decorating injury.`,
    },
    {
      q: `How do I find a vetted lighting pro in ${city}?`,
      a: `Ask for proof of insurance, a written design proposal, and a scheduled takedown date before you commit. Good ${city} providers confirm the takedown window in the initial quote, not after the season ends.`,
    },
  ],
  landscape: (city) => [
    {
      q: `How much does landscaping cost in ${city}?`,
      a: `Bi-weekly mowing in ${city} runs $40–$80 per visit. Spring cleanups cost $250–$600. Tree trimming runs $300–$1,500. Fertilization programs run $300–$600 annually.`,
    },
    {
      q: `How often should I fertilize my lawn in ${city}?`,
      a: `3–4 times per year, timed to ${city}'s growing season. In North Texas, that means early spring, late spring, late summer, and fall. Skip summer applications during heat waves.`,
    },
    {
      q: `When should I prune trees in ${city}?`,
      a: `Late winter for most trees — after the coldest weather passes but before new growth. Flowering trees should be pruned right after they bloom. Avoid pruning oaks in spring due to oak wilt risk.`,
    },
    {
      q: `How much does irrigation repair cost in ${city}?`,
      a: `Sprinkler head replacement runs $50–$150. Valve repair $100–$250. Controller replacement $200–$500. Full system repairs can run higher. Most ${city} landscapers handle irrigation alongside lawn care.`,
    },
    {
      q: `How do I find a vetted landscaper in ${city}?`,
      a: `Look for a licensed landscape contractor with local plant knowledge and year-round availability. Ask for photos of past work in ${city} — plants that thrive in Dallas may not thrive in Fort Worth if the soil or sun exposure differs.`,
    },
  ],
  hardscape: (city) => [
    {
      q: `How much does a paver patio cost in ${city}?`,
      a: `Paver patios in ${city} run $15–$35 per square foot installed. A typical 200 sq ft patio costs $3,000–$7,000. Prices depend on paver type, base prep, and complexity.`,
    },
    {
      q: `How much does a retaining wall cost in ${city}?`,
      a: `Retaining walls run $25–$60 per square foot in ${city}. Walls over 3–4 feet typically require engineering and permits. Expect to pay on the higher end for anything with drainage requirements.`,
    },
    {
      q: `Do I need a permit for hardscaping in ${city}?`,
      a: `For retaining walls over 3–4 feet, yes. For patios and walkways, usually not — but check with ${city}'s permitting office. A good hardscape contractor pulls the permit for you.`,
    },
    {
      q: `What's the best time of year for hardscaping in ${city}?`,
      a: `Spring and fall. Summer is workable but harder on crews and materials. Avoid deep winter — ground conditions make paver and retaining wall installation unreliable.`,
    },
    {
      q: `How do I find a vetted hardscape contractor in ${city}?`,
      a: `Look for a licensed hardscape contractor with a portfolio of similar projects in ${city}. Get a written scope, timeline, and warranty. If they can't show you photos of completed local work, keep looking.`,
    },
  ],
};

const FAQ_ES: Record<string, FaqBuilder> = {
  pool: (city) => [
    {
      q: `¿Cuánto cuesta el servicio semanal de piscina en ${city}?`,
      a: `El servicio semanal de piscina en ${city} cuesta típicamente $120–$220 por mes para una piscina residencial estándar. El precio depende del tamaño, la condición, y si quieres servicio básico solo de químicos o limpieza e inspección completas.`,
    },
    {
      q: `¿Cada cuánto necesita servicio mi piscina en ${city}?`,
      a: `Semanal durante la temporada de natación (mayo–septiembre), quincenal en los meses intermedios, y mensual en invierno si la mantienes abierta. En el clima de ${city}, pasar más de dos semanas sin servicio en verano casi siempre lleva a algas.`,
    },
    {
      q: `¿Puedo hacer el servicio de piscina yo mismo en ${city}?`,
      a: `Puedes, pero la curva de aprendizaje en química del agua es empinada. La mayoría de los propietarios que lo intentan en ${city} pasan el primer año peleando con agua turbia y algas. Si tu tiempo vale más de $20/hora, contratar a un profesional normalmente sale mejor.`,
    },
    {
      q: `¿Cuál es un precio justo para reparar equipos de piscina en ${city}?`,
      a: `Las reparaciones de bombas cuestan $150–$400 en ${city}. Las reparaciones de filtros $100–$350. Las reparaciones de calentadores $200–$600. Los reemplazos completos cuestan mucho más. Pide un presupuesto escrito antes de comenzar.`,
    },
    {
      q: `¿Cómo encuentro un profesional de piscina verificado en ${city}?`,
      a: `Pide tres referencias locales, verifica la certificación CPO, confirma el seguro de responsabilidad general y obtén una cotización escrita. Si un proveedor no hace ninguna de estas, es una señal de alerta. O usa nuestro formulario de cotización y te conectaremos con alguien verificado.`,
    },
  ],
  hvac: (city) => [
    {
      q: `¿Cuánto cuesta reparar el aire acondicionado en ${city}?`,
      a: `La mayoría de las reparaciones de AC en ${city} cuestan $150–$800 dependiendo del problema. Los capacitores están en el extremo bajo ($150–$300); los compresores en el alto ($1,200–$2,500). Las tarifas de diagnóstico típicamente son $75–$150 y a menudo se eximen si reservas la reparación.`,
    },
    {
      q: `¿Cada cuánto debo dar servicio a mi HVAC en ${city}?`,
      a: `Dos veces al año — una en primavera antes de la temporada de enfriamiento, otra en otoño antes de la calefacción. En ${city}, la afinación de primavera es más importante porque el estrés por calor del verano causa la mayoría de las fallas.`,
    },
    {
      q: `¿Cuánto dura un sistema de HVAC en ${city}?`,
      a: `15–20 años con mantenimiento regular. El calor del norte de Texas es más duro para los sistemas que los climas más fríos, así que saltarse las afinaciones puede reducir la vida útil en más de 5 años.`,
    },
    {
      q: `¿Debo reparar o reemplazar mi HVAC en ${city}?`,
      a: `La regla de la industria: si la reparación cuesta más del 30% de un sistema nuevo Y la unidad tiene 12+ años, reemplázala. Si tiene menos de 10 años con una reparación sencilla, repárala.`,
    },
    {
      q: `¿Cómo encuentro un profesional de HVAC verificado en ${city}?`,
      a: `Busca certificación NATE, certificación EPA 608 para manejo de refrigerantes, y un presupuesto escrito antes de que comience el trabajo. En ${city}, la mayoría de los proveedores de calidad se reservan 1–2 semanas de anticipación durante el verano.`,
    },
  ],
  "pest-control": (city) => [
    {
      q: `¿Cuánto cuesta el control de plagas en ${city}?`,
      a: `El control de plagas trimestral en ${city} cuesta $80–$150 por visita. Los tratamientos únicos cuestan $150–$400. Los bonos contra termitas cuestan $300–$800 por año. Los precios varían según el tipo de plaga y el área de tratamiento.`,
    },
    {
      q: `¿Cada cuánto necesito control de plagas en ${city}?`,
      a: `Trimestral es estándar para prevención en ${city}. Las infestaciones activas pueden necesitar tratamientos mensuales hasta controlarlas. Si nunca has tenido servicio, un tratamiento perimetral único es un buen punto de partida.`,
    },
    {
      q: `¿Qué plagas son más comunes en ${city}?`,
      a: `${city} tiene actividad todo el año de cucarachas, hormigas, arañas y roedores. La primavera y el otoño traen mosquitos y avispas. El verano trae hormigas de fuego. El invierno lleva los roedores al interior.`,
    },
    {
      q: `¿Es seguro el control de plagas para mascotas y niños en ${city}?`,
      a: `Sí, cuando se aplica correctamente. Pregunta a tu proveedor sobre opciones seguras para mascotas y niños. La mayoría de los proveedores en ${city} las ofrecen sin costo adicional. Para tratamientos interiores, mantén mascotas y niños alejados 2–4 horas después de la aplicación.`,
    },
    {
      q: `¿Cómo encuentro un profesional de control de plagas verificado en ${city}?`,
      a: `Busca licencia estatal, un enfoque de Manejo Integrado de Plagas (MIP) y políticas escritas de seguimiento. En ${city}, los proveedores de buena reputación incluyen visitas de seguimiento en su precio en lugar de cobrar por viaje.`,
    },
  ],
  plumbing: (city) => [
    {
      q: `¿Cuánto cuesta un plomero en ${city}?`,
      a: `Las llamadas de servicio estándar en ${city} cuestan $75–$150 solo por presentarse. Las reparaciones comunes totalizan $150–$500 incluyendo piezas y mano de obra. Los trabajos más grandes — calentadores de agua, retuberización, fugas en losa — van de $800 a $15,000+ según el alcance.`,
    },
    {
      q: `¿Qué tan rápido puede llegar un plomero a mi casa en ${city} en una emergencia?`,
      a: `La mayoría de los plomeros en ${city} ofrecen servicio de emergencia el mismo día. Los tiempos de respuesta varían por vecindario — 1–4 horas es típico. Espera tarifas 50–100% más altas para llamadas fuera de horario.`,
    },
    {
      q: `¿Cuánto dura un calentador de agua en ${city}?`,
      a: `Los calentadores de tanque duran 8–12 años en las condiciones del agua de ${city}. Las unidades sin tanque duran 20+ con descalcificación anual. Si el tuyo pasa de 10 años y muestra problemas, el reemplazo suele ser la decisión correcta.`,
    },
    {
      q: `¿Qué debo hacer si tengo una fuga en la losa en ${city}?`,
      a: `Cierra la llave principal de agua, llama a un plomero para detección de fugas ($200–$500) y obtén múltiples cotizaciones para la reparación. La reparación de fugas en losa en ${city} típicamente cuesta $2,000–$6,000 dependiendo de la ubicación y el material de la tubería.`,
    },
    {
      q: `¿Cómo encuentro un plomero verificado en ${city}?`,
      a: `Texas requiere licencia de maestro plomero para la mayoría del trabajo. Pide el número de licencia, verifícalo en el sitio del consejo estatal, confirma el seguro y obtén un presupuesto escrito. Cualquier plomero en ${city} que evite esto es uno a evitar.`,
    },
  ],
  "holiday-lighting": (city) => [
    {
      q: `¿Cuánto cuesta la instalación de luces navideñas en ${city}?`,
      a: `Las casas de un piso en ${city} cuestan $300–$800. Las de dos pisos $800–$2,000. Las propiedades comerciales comienzan en $2,000. La mayoría de las cotizaciones incluyen instalación, mantenimiento a mitad de temporada, retiro y almacenamiento.`,
    },
    {
      q: `¿Cuándo debo reservar la instalación de luces navideñas en ${city}?`,
      a: `Octubre o principios de noviembre. Los mejores instaladores de ${city} se reservan para Halloween. Si llamas en diciembre, espera precios premium y disponibilidad limitada.`,
    },
    {
      q: `¿Las luces son mías después de la temporada?`,
      a: `Depende del paquete. Los paquetes de alquiler ($300–$800 típicos) incluyen almacenamiento y reutilización el próximo año. Los paquetes de compra cuestan más por adelantado pero te quedas con las luces. La mayoría de los proveedores en ${city} ofrecen ambos.`,
    },
    {
      q: `¿Puedo instalar luces navideñas yo mismo en ${city}?`,
      a: `Puedes para áreas de un solo piso de fácil acceso. Las casas de dos pisos, las líneas de techo complejas y las propiedades comerciales son donde el DIY se vuelve peligroso y consume tiempo. Las caídas de escalera son la lesión #1 de decoración navideña.`,
    },
    {
      q: `¿Cómo encuentro un profesional de iluminación verificado en ${city}?`,
      a: `Pide prueba de seguro, una propuesta de diseño escrita y una fecha de retiro programada antes de comprometerte. Los buenos proveedores en ${city} confirman la ventana de retiro en la cotización inicial, no después de que termina la temporada.`,
    },
  ],
  landscape: (city) => [
    {
      q: `¿Cuánto cuesta el paisajismo en ${city}?`,
      a: `El corte de césped quincenal en ${city} cuesta $40–$80 por visita. Las limpiezas de primavera cuestan $250–$600. La poda de árboles cuesta $300–$1,500. Los programas de fertilización cuestan $300–$600 anuales.`,
    },
    {
      q: `¿Cada cuánto debo fertilizar mi césped en ${city}?`,
      a: `3–4 veces al año, sincronizado con la temporada de crecimiento de ${city}. En el norte de Texas, eso significa principios de primavera, finales de primavera, finales de verano y otoño. Evita las aplicaciones de verano durante las olas de calor.`,
    },
    {
      q: `¿Cuándo debo podar los árboles en ${city}?`,
      a: `A finales del invierno para la mayoría de los árboles — después de que pase el clima más frío pero antes del crecimiento nuevo. Los árboles con flores deben podarse justo después de florecer. Evita podar robles en primavera debido al riesgo de marchitez del roble.`,
    },
    {
      q: `¿Cuánto cuesta la reparación de riego en ${city}?`,
      a: `El reemplazo de cabezales de aspersor cuesta $50–$150. La reparación de válvulas $100–$250. El reemplazo de controlador $200–$500. Las reparaciones completas del sistema pueden costar más. La mayoría de los paisajistas de ${city} manejan el riego junto con el cuidado del césped.`,
    },
    {
      q: `¿Cómo encuentro un paisajista verificado en ${city}?`,
      a: `Busca un contratista de paisajismo con licencia, conocimiento de plantas locales y disponibilidad todo el año. Pide fotos de trabajos anteriores en ${city} — las plantas que prosperan en Dallas pueden no prosperar en Fort Worth si el suelo o la exposición al sol difieren.`,
    },
  ],
  hardscape: (city) => [
    {
      q: `¿Cuánto cuesta un patio de adoquines en ${city}?`,
      a: `Los patios de adoquines en ${city} cuestan $15–$35 por pie cuadrado instalado. Un patio típico de 200 pies cuadrados cuesta $3,000–$7,000. Los precios dependen del tipo de adoquín, la preparación de la base y la complejidad.`,
    },
    {
      q: `¿Cuánto cuesta un muro de contención en ${city}?`,
      a: `Los muros de contención cuestan $25–$60 por pie cuadrado en ${city}. Los muros de más de 3–4 pies típicamente requieren ingeniería y permisos. Espera pagar en el extremo alto para cualquier cosa con requisitos de drenaje.`,
    },
    {
      q: `¿Necesito un permiso para el paisajismo duro en ${city}?`,
      a: `Para muros de contención de más de 3–4 pies, sí. Para patios y caminos, generalmente no — pero consulta con la oficina de permisos de ${city}. Un buen contratista de paisajismo duro tramita el permiso por ti.`,
    },
    {
      q: `¿Cuál es la mejor época del año para el paisajismo duro en ${city}?`,
      a: `Primavera y otoño. El verano es viable pero más duro para los equipos y materiales. Evita el invierno profundo — las condiciones del suelo hacen que la instalación de adoquines y muros de contención sea poco confiable.`,
    },
    {
      q: `¿Cómo encuentro un contratista de paisajismo duro verificado en ${city}?`,
      a: `Busca un contratista de paisajismo duro con licencia y un portafolio de proyectos similares en ${city}. Obtén un alcance, cronograma y garantía por escrito. Si no pueden mostrarte fotos de trabajos locales completados, sigue buscando.`,
    },
  ],
};

const FAQ_FR: Record<string, FaqBuilder> = {
  pool: (city) => [
    {
      q: `Combien coûte l'entretien hebdomadaire de piscine à ${city} ?`,
      a: `L'entretien hebdomadaire de piscine à ${city} coûte généralement 120–220 $ par mois pour une piscine résidentielle standard. Le prix dépend de la taille, de l'état, et si vous voulez un service de produits chimiques de base ou un nettoyage et une inspection complets.`,
    },
    {
      q: `À quelle fréquence ma piscine a-t-elle besoin d'entretien à ${city} ?`,
      a: `Hebdomadaire pendant la saison de baignade (mai–septembre), bimensuelle pendant les mois intermédiaires, et mensuelle en hiver si vous la gardez ouverte. Dans le climat de ${city}, plus de deux semaines sans entretien en été entraîne presque toujours des algues.`,
    },
    {
      q: `Puis-je entretenir ma piscine moi-même à ${city} ?`,
      a: `Vous pouvez, mais la courbe d'apprentissage de la chimie de l'eau est raide. La plupart des propriétaires qui essaient à ${city} passent la première année à lutter contre l'eau trouble et les algues. Si votre temps vaut plus de 20 $/heure, engager un pro est généralement plus rentable.`,
    },
    {
      q: `Quel est un prix juste pour la réparation d'équipement de piscine à ${city} ?`,
      a: `Les réparations de pompe coûtent 150–400 $ à ${city}. Les réparations de filtre 100–350 $. Les réparations de chauffe-eau 200–600 $. Les remplacements complets coûtent beaucoup plus. Obtenez un devis écrit avant de commencer.`,
    },
    {
      q: `Comment trouver un pro de piscine vérifié à ${city} ?`,
      a: `Demandez trois références locales, vérifiez la certification CPO, confirmez l'assurance responsabilité civile, et obtenez un devis écrit. Si un prestataire refuse tout cela, c'est un signal d'alarme. Ou utilisez notre formulaire de devis et nous vous mettrons en relation avec quelqu'un de vérifié.`,
    },
  ],
  hvac: (city) => [
    {
      q: `Combien coûte la réparation de climatisation à ${city} ?`,
      a: `La plupart des réparations de climatisation à ${city} coûtent 150–800 $ selon le problème. Les condensateurs sont dans le bas de la fourchette (150–300 $) ; les remplacements de compresseur dans le haut (1 200–2 500 $). Les frais de diagnostic sont généralement de 75–150 $ et souvent offerts si vous réservez la réparation.`,
    },
    {
      q: `À quelle fréquence dois-je entretenir mon CVC à ${city} ?`,
      a: `Deux fois par an — une au printemps avant la saison de refroidissement, une à l'automne avant le chauffage. À ${city}, l'entretien de printemps est plus important car le stress thermique estival cause la plupart des pannes.`,
    },
    {
      q: `Combien de temps dure un système CVC à ${city} ?`,
      a: `15–20 ans avec un entretien régulier. La chaleur du nord du Texas est plus dure pour les systèmes que les climats plus frais, donc sauter les entretiens peut réduire la durée de vie de plus de 5 ans.`,
    },
    {
      q: `Dois-je réparer ou remplacer mon CVC à ${city} ?`,
      a: `La règle de l'industrie : si la réparation coûte plus de 30 % d'un nouveau système ET que l'unité a 12+ ans, remplacez-la. Moins de 10 ans avec une réparation simple, réparez-la.`,
    },
    {
      q: `Comment trouver un pro CVC vérifié à ${city} ?`,
      a: `Recherchez la certification NATE, la certification EPA 608 pour la manipulation des réfrigérants, et un devis écrit avant le début des travaux. À ${city}, la plupart des prestataires de qualité réservent 1–2 semaines à l'avance pendant le pic estival.`,
    },
  ],
  "pest-control": (city) => [
    {
      q: `Combien coûte la lutte antiparasitaire à ${city} ?`,
      a: `La lutte antiparasitaire trimestrielle à ${city} coûte 80–150 $ par visite. Les traitements ponctuels coûtent 150–400 $. Les garanties anti-termites coûtent 300–800 $ par an. Les prix varient selon le type de nuisible et la zone de traitement.`,
    },
    {
      q: `À quelle fréquence ai-je besoin de la lutte antiparasitaire à ${city} ?`,
      a: `Trimestrielle est la norme pour la prévention à ${city}. Les infestations actives peuvent nécessiter des traitements mensuels jusqu'à contrôle. Si vous n'avez jamais eu de service, un traitement périmétrique ponctuel est un bon point de départ.`,
    },
    {
      q: `Quels nuisibles sont les plus courants à ${city} ?`,
      a: `${city} connaît une activité toute l'année de cafards, fourmis, araignées et rongeurs. Le printemps et l'automne apportent moustiques et guêpes. L'été apporte des fourmis de feu. L'hiver pousse les rongeurs à l'intérieur.`,
    },
    {
      q: `La lutte antiparasitaire est-elle sûre pour les animaux et les enfants à ${city} ?`,
      a: `Oui, lorsqu'elle est appliquée correctement. Demandez à votre prestataire des options sûres pour les animaux et les enfants. La plupart des prestataires à ${city} les proposent sans frais supplémentaires. Pour les traitements intérieurs, gardez animaux et enfants à l'écart 2–4 heures après l'application.`,
    },
    {
      q: `Comment trouver un pro de lutte antiparasitaire vérifié à ${city} ?`,
      a: `Recherchez une licence d'État, une approche de lutte intégrée (IPM), et des politiques de suivi écrites. À ${city}, les prestataires réputés incluent les visites de suivi dans leur tarif plutôt que de facturer par déplacement.`,
    },
  ],
  plumbing: (city) => [
    {
      q: `Combien coûte un plombier à ${city} ?`,
      a: `Les appels de service standard à ${city} coûtent 75–150 $ juste pour se présenter. Les réparations courantes totalisent 150–500 $ incluant pièces et main-d'œuvre. Les travaux plus importants — chauffe-eau, remplacement de tuyauterie, fuites de dalle — vont de 800 $ à 15 000 $+ selon la portée.`,
    },
    {
      q: `À quelle vitesse un plombier peut-il venir chez moi à ${city} en urgence ?`,
      a: `La plupart des plombiers à ${city} offrent un service d'urgence le jour même. Les temps de réponse varient selon le quartier — 1 à 4 heures est typique. Prévoyez des tarifs 50 à 100 % plus élevés pour les appels hors heures.`,
    },
    {
      q: `Combien de temps dure un chauffe-eau à ${city} ?`,
      a: `Les chauffe-eau à réservoir durent 8–12 ans dans les conditions d'eau de ${city}. Les unités sans réservoir durent 20+ avec un détartrage annuel. Si le vôtre a plus de 10 ans et montre des problèmes, le remplacement est généralement la bonne décision.`,
    },
    {
      q: `Que dois-je faire si j'ai une fuite de dalle à ${city} ?`,
      a: `Coupez l'eau au compteur, appelez un plombier pour la détection de fuite (200–500 $), et obtenez plusieurs devis pour la réparation. La réparation de fuite de dalle à ${city} coûte généralement 2 000–6 000 $ selon l'emplacement et le matériau du tuyau.`,
    },
    {
      q: `Comment trouver un plombier vérifié à ${city} ?`,
      a: `Le Texas exige une licence de maître plombier pour la plupart des travaux. Demandez le numéro de licence, vérifiez-le sur le site du conseil d'État, confirmez l'assurance, et obtenez un devis écrit. Tout plombier à ${city} qui esquive cela est à éviter.`,
    },
  ],
  "holiday-lighting": (city) => [
    {
      q: `Combien coûte l'installation de lumières de fêtes à ${city} ?`,
      a: `Les maisons plain-pied à ${city} coûtent 300–800 $. Les maisons à étage 800–2 000 $. Les propriétés commerciales commencent à 2 000 $. La plupart des devis incluent l'installation, l'entretien en cours de saison, le démontage et le stockage.`,
    },
    {
      q: `Quand dois-je réserver l'installation de lumières de fêtes à ${city} ?`,
      a: `Octobre ou début novembre. Les meilleurs installateurs de ${city} affichent complet à Halloween. Si vous appelez en décembre, prévoyez des tarifs premium et une disponibilité limitée.`,
    },
    {
      q: `Les lumières m'appartiennent-elles après la saison ?`,
      a: `Cela dépend du forfait. Les forfaits de location (300–800 $ typiques) incluent le stockage et la réutilisation l'année suivante. Les forfaits d'achat coûtent plus cher au départ mais vous gardez les lumières. La plupart des prestataires à ${city} proposent les deux.`,
    },
    {
      q: `Puis-je installer les lumières de fêtes moi-même à ${city} ?`,
      a: `Vous pouvez pour les zones de plain-pied facilement accessibles. Les maisons à étage, les lignes de toit complexes et les propriétés commerciales sont là où le DIY devient dangereux et chronophage. Les chutes d'échelle sont la blessure #1 de décoration de fêtes.`,
    },
    {
      q: `Comment trouver un pro d'éclairage vérifié à ${city} ?`,
      a: `Demandez une preuve d'assurance, une proposition de conception écrite, et une date de démontage programmée avant de vous engager. Les bons prestataires à ${city} confirment la fenêtre de démontage dans le devis initial, pas après la fin de la saison.`,
    },
  ],
  landscape: (city) => [
    {
      q: `Combien coûte l'aménagement paysager à ${city} ?`,
      a: `La tonte bimensuelle à ${city} coûte 40–80 $ par visite. Les nettoyages de printemps coûtent 250–600 $. La taille d'arbres coûte 300–1 500 $. Les programmes de fertilisation coûtent 300–600 $ par an.`,
    },
    {
      q: `À quelle fréquence dois-je fertiliser ma pelouse à ${city} ?`,
      a: `3 à 4 fois par an, en phase avec la saison de croissance de ${city}. Dans le nord du Texas, cela signifie début printemps, fin printemps, fin été et automne. Évitez les applications estivales pendant les vagues de chaleur.`,
    },
    {
      q: `Quand dois-je tailler les arbres à ${city} ?`,
      a: `Fin hiver pour la plupart des arbres — après le passage du froid le plus intense mais avant la nouvelle croissance. Les arbres à fleurs doivent être taillés juste après leur floraison. Évitez de tailler les chênes au printemps en raison du risque de flétrissement du chêne.`,
    },
    {
      q: `Combien coûte la réparation d'irrigation à ${city} ?`,
      a: `Le remplacement de tête d'arrosage coûte 50–150 $. La réparation de valve 100–250 $. Le remplacement de contrôleur 200–500 $. Les réparations complètes du système peuvent coûter plus. La plupart des paysagistes de ${city} gèrent l'irrigation avec l'entretien de la pelouse.`,
    },
    {
      q: `Comment trouver un paysagiste vérifié à ${city} ?`,
      a: `Recherchez un entrepreneur paysagiste licencié avec une connaissance des plantes locales et une disponibilité toute l'année. Demandez des photos de travaux passés à ${city} — les plantes qui prospèrent à Dallas peuvent ne pas prospérer à Fort Worth si le sol ou l'exposition au soleil diffèrent.`,
    },
  ],
  hardscape: (city) => [
    {
      q: `Combien coûte un patio en pavés à ${city} ?`,
      a: `Les patios en pavés à ${city} coûtent 15–35 $ par pied carré installé. Un patio typique de 200 pieds carrés coûte 3 000–7 000 $. Les prix dépendent du type de pavé, de la préparation de la base et de la complexité.`,
    },
    {
      q: `Combien coûte un mur de soutènement à ${city} ?`,
      a: `Les murs de soutènement coûtent 25–60 $ par pied carré à ${city}. Les murs de plus de 3–4 pieds nécessitent généralement une ingénierie et des permis. Prévoyez de payer dans le haut de la fourchette pour tout ce qui a des exigences de drainage.`,
    },
    {
      q: `Ai-je besoin d'un permis pour l'aménagement minéral à ${city} ?`,
      a: `Pour les murs de soutènement de plus de 3–4 pieds, oui. Pour les patios et allées, généralement non — mais vérifiez auprès du bureau des permis de ${city}. Un bon entrepreneur d'aménagement minéral s'occupe du permis pour vous.`,
    },
    {
      q: `Quelle est la meilleure période de l'année pour l'aménagement minéral à ${city} ?`,
      a: `Printemps et automne. L'été est faisable mais plus dur pour les équipes et les matériaux. Évitez le plein hiver — les conditions du sol rendent l'installation de pavés et de murs de soutènement peu fiable.`,
    },
    {
      q: `Comment trouver un entrepreneur d'aménagement minéral vérifié à ${city} ?`,
      a: `Recherchez un entrepreneur d'aménagement minéral licencié avec un portfolio de projets similaires à ${city}. Obtenez une portée, un calendrier et une garantie écrits. S'ils ne peuvent pas vous montrer de photos de travaux locaux terminés, continuez à chercher.`,
    },
  ],
};

const FAQ_BY_LOCALE: Record<string, Record<string, FaqBuilder>> = {
  en: FAQ_EN,
  es: FAQ_ES,
  fr: FAQ_FR,
};

export function getCityFaqs(
  serviceKey: string,
  cityName: string,
  locale: string
): CityFaq[] {
  const dict = FAQ_BY_LOCALE[locale] ?? FAQ_BY_LOCALE.en;
  const builder = dict[serviceKey] ?? FAQ_BY_LOCALE.en[serviceKey];
  return builder ? builder(cityName) : [];
}