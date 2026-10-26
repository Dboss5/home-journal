export interface ServiceGuide {
 kicker: string; intro: string;
 scenarios: {title: string; body: string}[];
 scope: {title: string; body: string}[];
 drivers: string[]; prepare: string[]; questions: string[];
 faqs: {q: string; a: string}[];
 source: {label: string; url: string}; article: string | null;
}

// Editorial guidance, not a provider contract or a verified local price survey.
export const SERVICE_GUIDES: Record<string, ServiceGuide> = {
  "pool": {
    "kicker": "Clear water starts with a clear plan.",
    "intro": "Compare recurring care, a one-time recovery, and equipment work on the same scope. A monthly fee is only useful when you know what each visit includes.",
    "scenarios": [
      {
        "title": "Keep it consistent",
        "body": "For ongoing care, compare visit frequency, cleaning tasks, water testing, and reports. Agree on what happens when weather or access interrupts a visit."
      },
      {
        "title": "Get back on track",
        "body": "For a pool that needs recovery, ask for a separate assessment and a plan for follow-up visits before moving onto recurring service."
      },
      {
        "title": "Understand equipment trouble",
        "body": "Describe unusual noise, loss of circulation, or a change in operation. Ask the provider to diagnose the cause before approving parts."
      }
    ],
    "scope": [
      {
        "title": "Water testing & treatment",
        "body": "Confirm which readings are recorded, which chemicals are included, and what you should monitor between visits. A service visit does not replace regular water checks."
      },
      {
        "title": "Cleaning & circulation",
        "body": "Ask whether brushing, skimming, vacuuming, baskets, and equipment observations are included. Filter cleaning may be priced separately."
      },
      {
        "title": "Equipment & repairs",
        "body": "Separate inspection from repair. A replacement proposal should identify the model, installation work, controls, and warranty."
      }
    ],
    "drivers": [
      "Pool size, attached spas, and access",
      "Debris load and the starting water condition",
      "Included chemicals and filter maintenance",
      "Repair parts, additional visits, and approval limits"
    ],
    "prepare": [
      "Share pool and equipment photos with model labels if accessible.",
      "Explain the current problem and recent treatment or repairs.",
      "Confirm gate access and keep pets secured for the visit."
    ],
    "questions": [
      "How many visits are included, and what happens after a missed visit?",
      "Which chemicals and cleaning tasks are outside the fee?",
      "Will you ask before carrying out extra work?"
    ],
    "faqs": [
      {
        "q": "Do I need to be home?",
        "a": "Confirm the access arrangement with your provider. Discuss gates, pets, equipment access, and how the visit report will be delivered."
      },
      {
        "q": "Does weekly service cover every water check?",
        "a": "No. Ask what you need to monitor between visits. CDC guidance recommends regular disinfectant and pH testing; follow product instructions and the provider’s property-specific advice."
      },
      {
        "q": "Can a repair be added to a routine visit?",
        "a": "Ask whether diagnosis and repairs are separately charged and require approval. A service plan should explain the boundary."
      }
    ],
    "source": {
      "label": "CDC: Home pool treatment and testing",
      "url": "https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html"
    },
    "article": "pool-service-cost-dfw"
  },
  "hvac": {
    "kicker": "Comfort begins with the diagnosis.",
    "intro": "A maintenance visit, a repair, and a system replacement solve different problems. Start with the symptoms, then compare the work proposed for your home.",
    "scenarios": [
      {
        "title": "A change in comfort",
        "body": "Record which rooms are affected, when the issue occurs, and any thermostat messages. These details help the technician investigate."
      },
      {
        "title": "Plan maintenance",
        "body": "Compare the inspection checklist, number of visits, reporting, and exclusions rather than choosing an agreement from its discount alone."
      },
      {
        "title": "Consider replacement",
        "body": "Ask for a home evaluation and a written proposal. Equipment size, installation work, and comfort needs matter alongside the purchase price."
      }
    ],
    "scope": [
      {
        "title": "Inspection & diagnosis",
        "body": "Ask what was tested, what failed, and how the finding explains your complaint. A symptom alone does not establish which part needs replacement."
      },
      {
        "title": "Repair & verification",
        "body": "Request a total for parts, labor, and follow-up checks. Ask how warranty coverage applies and whether the diagnostic fee is credited."
      },
      {
        "title": "Replacement planning",
        "body": "Compare equipment model numbers, sizing calculations, ductwork assumptions, drainage, controls, removal, and completion testing."
      }
    ],
    "drivers": [
      "The diagnosed fault and warranty coverage",
      "Access to equipment and existing installation condition",
      "Equipment selection and installation scope",
      "After-hours charges and additional work"
    ],
    "prepare": [
      "Write down symptoms and when they started.",
      "Have maintenance records and warranty details available.",
      "Provide safe access to the thermostat and equipment."
    ],
    "questions": [
      "What evidence supports this diagnosis?",
      "What is included in repair versus replacement?",
      "What tests will confirm the work is complete?"
    ],
    "faqs": [
      {
        "q": "Should I replace a system because of its age?",
        "a": "Age is one consideration, alongside repair history, condition, warranty, and comfort. Ask for the actual repair option and a complete replacement proposal rather than relying on a fixed percentage rule."
      },
      {
        "q": "Can the new system be sized by floor area alone?",
        "a": "Ask for a proper home evaluation and load calculation. ENERGY STAR recommends considering insulation, windows, and the duct system as well as size."
      },
      {
        "q": "Is duct cleaning part of a tune-up?",
        "a": "Do not assume it is. Ask for the maintenance checklist and a reason for any separately proposed duct work."
      }
    ],
    "source": {
      "label": "ENERGY STAR: Hiring an HVAC contractor",
      "url": "https://www.energystar.gov/saveathome/heating-cooling/10-tips-hiring"
    },
    "article": "hvac-repair-cost-dfw"
  },
  "pest": {
    "kicker": "Find the source. Build a plan.",
    "intro": "Identify the pest, the activity, and the conditions supporting it before comparing treatments. A general prevention plan may not include rodents, termites, bed bugs, or wildlife.",
    "scenarios": [
      {
        "title": "Recurring activity",
        "body": "Describe where pests appear and how often. Ask whether inspection, prevention, and monitoring fit the problem better than a single application."
      },
      {
        "title": "A specific infestation",
        "body": "Ask which pest has been identified, which areas need attention, and what follow-up and preparation the treatment requires."
      },
      {
        "title": "Possible entry points",
        "body": "For noises or repeated entry, ask about inspection and exclusion as a separate scope. Sealing, monitoring, and cleanup may be different charges."
      }
    ],
    "scope": [
      {
        "title": "Inspection & identification",
        "body": "Share photos where possible and ask what evidence supports the identification. The plan should address the pest actually present."
      },
      {
        "title": "Prevention & treatment",
        "body": "Discuss food, water, shelter, and entry points as well as any product application. EPA recommends prevention and correcting the source of the problem."
      },
      {
        "title": "Monitoring & follow-up",
        "body": "Agree on signs of progress, review timing, return-visit terms, and what happens if activity persists."
      }
    ],
    "drivers": [
      "The identified pest and affected areas",
      "Inspection, treatment, and exclusion scope",
      "Follow-up visits and recurring agreement terms",
      "Preparation, cleanup, and structural repairs"
    ],
    "prepare": [
      "Record where and when activity appears.",
      "Tell the provider about children, pets, and sensitive areas.",
      "Get written preparation and re-entry instructions for the actual treatment."
    ],
    "questions": [
      "Which pests and areas does this agreement cover?",
      "What products or methods are proposed, and why?",
      "What follow-up is included if activity continues?"
    ],
    "faqs": [
      {
        "q": "Is treatment safe around children and pets?",
        "a": "Do not rely on a blanket “pet-safe” promise. Ask for the product name, label precautions, preparation, and re-entry instructions. Follow the specific directions for the treatment used."
      },
      {
        "q": "Do I need to leave the property?",
        "a": "That depends on the method and product. Obtain the provider’s written instructions in advance rather than assuming a standard number of hours."
      },
      {
        "q": "Does a general plan include termite or rodent work?",
        "a": "Ask explicitly. Specialized inspection, treatment, exclusion, and repairs can have separate scopes and agreement terms."
      }
    ],
    "source": {
      "label": "EPA: Pest control do’s and don’ts",
      "url": "https://www.epa.gov/safepestcontrol/dos-and-donts-pest-control"
    },
    "article": null
  },
  "plumbing": {
    "kicker": "Understand the whole repair.",
    "intro": "A plumbing quote can include diagnosis, access, the repair itself, and restoration—or only some of them. Make those boundaries clear before comparing totals.",
    "scenarios": [
      {
        "title": "A fixture problem",
        "body": "Describe the fixture, when the problem happens, and any previous repair. Identify whether you or the provider supplies replacement products."
      },
      {
        "title": "A hidden problem",
        "body": "For unexplained water use or concealed leakage, ask what investigation is proposed and what will need a separate approval."
      },
      {
        "title": "A larger upgrade",
        "body": "For water heaters, sewer work, or repiping, compare the complete installation and the work needed to reach and restore the area."
      }
    ],
    "scope": [
      {
        "title": "Diagnosis & access",
        "body": "Establish what the visit can determine and whether opening a wall, floor, or ground area is included in that stage."
      },
      {
        "title": "Repair & replacement",
        "body": "Ask for the affected location, proposed materials or model, labor, and completion testing. Separate optional upgrades from the immediate repair."
      },
      {
        "title": "Cleanup & restoration",
        "body": "Clarify waste removal and who restores drywall, flooring, paint, or landscaping. Document exclusions before work starts."
      }
    ],
    "drivers": [
      "The finding and how accessible it is",
      "Parts, fixtures, or equipment selection",
      "Access work and restoration exclusions",
      "Timing, additional findings, and approval terms"
    ],
    "prepare": [
      "Describe the symptoms and affected fixtures.",
      "Share relevant model details and previous repair history.",
      "Ask what access is required and what should be moved before arrival."
    ],
    "questions": [
      "Is the visit charge applied toward the repair?",
      "Does the total include access and restoration?",
      "How will additional work and warranty claims be handled?"
    ],
    "faqs": [
      {
        "q": "Does a high water bill prove a slab leak?",
        "a": "No. Unexpected use needs investigation. EPA describes checking usage and the meter, but those checks do not locate the leak or establish the repair method."
      },
      {
        "q": "Are permits included?",
        "a": "Have the provider confirm the requirements for your address and scope, along with responsibility for applications and inspections. Do not assume they are included."
      },
      {
        "q": "Will a drain clearing permanently fix the problem?",
        "a": "Clearing and repairing a cause are different services. Ask what was found, whether further investigation is proposed, and what the return-visit terms cover."
      }
    ],
    "source": {
      "label": "EPA WaterSense: Home maintenance",
      "url": "https://www.epa.gov/watersense/home-maintenance"
    },
    "article": "plumbing-cost-dfw"
  },
  "lighting": {
    "kicker": "Plan the glow—and everything after it.",
    "intro": "Holiday lighting is a seasonal service with more than an installation date. Compare the design, equipment ownership, maintenance, removal, and storage as one package.",
    "scenarios": [
      {
        "title": "A simple roofline",
        "body": "Share a property photo and the areas you want outlined. Confirm the color, style, and extent before installation."
      },
      {
        "title": "Trees & outdoor features",
        "body": "Identify the features and access involved. Ask how the design will be installed and removed without avoidable damage."
      },
      {
        "title": "A complete seasonal package",
        "body": "Compare what happens throughout the season, including outages, changes, takedown scheduling, and next year’s reuse."
      }
    ],
    "scope": [
      {
        "title": "Design & equipment",
        "body": "Get a marked-up image or written description showing included areas. Confirm whether lights are rented, purchased, or customer-supplied."
      },
      {
        "title": "Installation & operation",
        "body": "Discuss attachment methods, outdoor-rated equipment, power access, timers, and the handover of operating instructions."
      },
      {
        "title": "Maintenance & removal",
        "body": "Clarify response arrangements for failures, removal windows, storage location, and any separate fees."
      }
    ],
    "drivers": [
      "The areas and features in the approved design",
      "Height, access, and attachment requirements",
      "Ownership or rental of equipment",
      "Maintenance, removal, and storage terms"
    ],
    "prepare": [
      "Gather exterior photos and a short design brief.",
      "Identify existing decorations and accessible power locations.",
      "Ask about scheduling and any property or HOA approval you need."
    ],
    "questions": [
      "Do I own the lights, and can they be reused next season?",
      "What happens if part of the display stops working?",
      "Are removal and storage in the total?"
    ],
    "faqs": [
      {
        "q": "Can my existing lights be used?",
        "a": "Ask the installer to assess compatibility and condition. Confirm whether customer-supplied equipment changes the maintenance agreement."
      },
      {
        "q": "When should I book?",
        "a": "Discuss your preferred display dates early and confirm availability directly. Installation and removal dates depend on the provider’s schedule and conditions."
      },
      {
        "q": "What equipment should be used outside?",
        "a": "CPSC advises using safety-tested lights and checking their condition. Ask the installer to confirm equipment is suitable for the intended location and follow its instructions."
      }
    ],
    "source": {
      "label": "CPSC: Holiday decoration safety",
      "url": "https://www.cpsc.gov/s3fs-public/611.pdf"
    },
    "article": "real-cost-holiday-lighting"
  },
  "landscape": {
    "kicker": "A landscape plan that fits the property.",
    "intro": "Routine mowing, bed renovation, plant care, and irrigation work need different scopes. Start with how you use the space and what you want to improve.",
    "scenarios": [
      {
        "title": "Keep the yard maintained",
        "body": "Compare visit frequency, mowing, edging, debris handling, and seasonal changes rather than treating “lawn care” as a complete scope."
      },
      {
        "title": "Refresh planting areas",
        "body": "Describe your goals, sunlight, existing plants, and upkeep preferences. Ask what preparation and follow-up the proposal includes."
      },
      {
        "title": "Investigate an ongoing problem",
        "body": "Photograph recurring bare areas, runoff, or irrigation concerns. Ask for an assessment before adding products or replacing plants."
      }
    ],
    "scope": [
      {
        "title": "Routine maintenance",
        "body": "Agree on the exact areas, tasks, visit schedule, weather policy, and how clippings or other waste are handled."
      },
      {
        "title": "Beds & planting",
        "body": "Ask for plant names, quantities, sizes, preparation, mulch, and establishment responsibilities. Clarify any replacement terms."
      },
      {
        "title": "Irrigation & soil",
        "body": "Separate an inspection from repairs. Texas A&M AgriLife identifies soil testing as a way to inform nutrient decisions rather than guessing a universal schedule."
      }
    ],
    "drivers": [
      "Maintained area and visit frequency",
      "Existing condition and preparation work",
      "Plant sizes, quantities, and material choices",
      "Waste disposal and follow-up responsibilities"
    ],
    "prepare": [
      "List what you want to keep, change, or stop maintaining.",
      "Photograph problem areas and note sunlight or watering concerns.",
      "Discuss access, pets, irrigation controls, and upkeep expectations."
    ],
    "questions": [
      "Which tasks are included on each visit?",
      "What preparation is needed before planting?",
      "Who is responsible for establishment care and replacements?"
    ],
    "faqs": [
      {
        "q": "Should every lawn follow the same fertilizer schedule?",
        "a": "No single schedule suits every property. Identify the grass and conditions and consider soil-test guidance before choosing nutrients or timing."
      },
      {
        "q": "Is irrigation repair included in landscape maintenance?",
        "a": "Ask specifically. Inspection, adjustments, repairs, and installation can be separately scoped work."
      },
      {
        "q": "Will plants be guaranteed?",
        "a": "Request the actual written terms, including exclusions and your watering and care responsibilities. Do not assume every plant has identical coverage."
      }
    ],
    "source": {
      "label": "Texas A&M AgriLife: Soil testing",
      "url": "https://agrilifeextension.tamu.edu/assets/environment-natural-resources/soil/soil-testing/"
    },
    "article": null
  },
  "hardscape": {
    "kicker": "Build the plan beneath the finish.",
    "intro": "A patio or walkway proposal should explain the preparation and water management as carefully as the surface materials. Compare the full build, not just its appearance.",
    "scenarios": [
      {
        "title": "A patio or walkway",
        "body": "Define the intended use, dimensions, access, and connections to existing spaces. Compare finishes with the underlying work included."
      },
      {
        "title": "A drainage concern",
        "body": "Show where water collects or moves after rain. Ask how the proposed layout addresses it before choosing materials."
      },
      {
        "title": "A larger outdoor project",
        "body": "For walls, kitchens, or multiple trades, establish design responsibilities and the sequence of work before scheduling construction."
      }
    ],
    "scope": [
      {
        "title": "Layout & preparation",
        "body": "Confirm dimensions, excavation, removal, base preparation, and transitions to existing surfaces in the written proposal."
      },
      {
        "title": "Materials & drainage",
        "body": "Identify the product, finish, pattern, edge details, and water-management approach. Ask what assumptions need site verification."
      },
      {
        "title": "Completion & care",
        "body": "Agree on cleanup, access restoration, handover, maintenance instructions, and warranty terms. Clarify any work by other trades."
      }
    ],
    "drivers": [
      "Dimensions, access, excavation, and disposal",
      "Base condition and water-management needs",
      "Material, finish, pattern, and edge details",
      "Design, approvals, trade coordination, and restoration"
    ],
    "prepare": [
      "Collect measurements, photos, and examples of the intended use.",
      "Point out drainage concerns and existing utility or irrigation locations.",
      "Ask who confirms local approvals and utility-location arrangements before excavation."
    ],
    "questions": [
      "What base and drainage work is included?",
      "Which design decisions and site conditions could change the total?",
      "Who handles approvals, other trades, cleanup, and restoration?"
    ],
    "faqs": [
      {
        "q": "Can I compare projects using only a square-foot price?",
        "a": "Use the same area and scope. Excavation, base work, edges, access, drainage, and disposal can make otherwise similar proposals very different."
      },
      {
        "q": "Does a wall or patio need approval?",
        "a": "Confirm with the relevant local authority and your HOA where applicable. Requirements depend on the property and project; obtain the answer before construction."
      },
      {
        "q": "How long will the project take?",
        "a": "Ask for a project-specific sequence, access restrictions, and weather contingencies. Material delivery, inspections, and other trades can affect completion."
      }
    ],
    "source": {
      "label": "Texas A&M AgriLife: Landscape water management",
      "url": "https://agrilifeextension.tamu.edu/assets/plants-crops/lawn-garden/irrigation-lawns-gardens/"
    },
    "article": null
  }
};
