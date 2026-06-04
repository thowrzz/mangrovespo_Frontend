/**
 * lib/blog-data.ts
 * Static blog post content for MangroveSpot.
 * All posts are stored here as structured data — no CMS required.
 * Each post targets a distinct local SEO keyword cluster and
 * includes internal links to drive users toward bookings.
 */

export interface BlogPost {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  publishedAt: string
  readTime: string
  category: string
  categoryColor: string
  excerpt: string
  coverImage: string
  coverAlt: string
  tags: string[]
  content: BlogSection[]
}

export interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "ol" | "callout" | "cta" | "divider"
  text?: string
  items?: string[]
  calloutType?: "tip" | "info" | "warning"
  ctaLabel?: string
  ctaHref?: string
}

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────
  // POST 1: Best time to visit
  // ─────────────────────────────────────────────────────────────
  {
    slug: "best-time-to-visit-mangroves-kerala",
    title: "Best Time to Visit the Kerala Mangroves for Kayaking and Boat Tours",
    metaTitle: "Best Time to Visit Kerala Mangroves for Kayaking – MangroveSpot, Kollam",
    metaDescription:
      "When is the best time to kayak Kerala's mangroves? A month-by-month guide covering weather, tides, birdwatching windows, and what to expect at MangroveSpot, Nedungolam, Kollam.",
    publishedAt: "2025-12-10",
    readTime: "7 min",
    category: "Travel Guide",
    categoryColor: "emerald",
    excerpt:
      "Kerala's mangroves look different in every season. Here's an honest, month-by-month breakdown of when to come — and why some visitors prefer the monsoon over peak season.",
    coverImage: "/Mangrove-Kayaking.jpg",
    coverAlt:
      "Kayakers paddling through Kerala mangrove canals at golden hour, MangroveSpot, Nedungolam, Kollam",
    tags: ["kayaking Kerala", "best time to visit", "mangrove tour", "Kollam backwaters"],
    content: [
      {
        type: "p",
        text: "If you've been trying to figure out when to visit the mangroves in Kollam, the honest answer is: most months work, but each season gives you a different experience. Here's what to expect across the year at MangroveSpot, Nedungolam, Paravur.",
      },
      { type: "h2", text: "October to February — The Classic Window" },
      {
        type: "p",
        text: "This is the dry season in Kerala. The skies are clear, the water is calm, and the mangrove canals have good visibility. Mornings between 6:30 AM and 8:30 AM are especially good — the light is low, the air is cool, and bird activity peaks in this window. You'll see kingfishers, grey herons, egrets, and occasionally brahminy kites resting on the root systems.",
      },
      {
        type: "p",
        text: "October and November bring post-monsoon freshness — the mangroves are still lush green from the rains, and the water is typically cleaner than peak summer. December and January are the busiest months because holiday travel aligns with good weather. If you're planning a weekend trip during these months, pre-booking your activity online is especially important — slots fill up fast on Saturdays.",
      },
      {
        type: "callout",
        calloutType: "tip",
        text: "For birdwatching, arrive as close to 6:30 AM as possible. Bird activity drops significantly after 9 AM when temperatures rise and visitors arrive in larger numbers.",
      },
      { type: "h2", text: "March to May — Hot, But Still Worth It" },
      {
        type: "p",
        text: "Kerala summer is warm — temperatures in the Kollam district can reach 35°C by afternoon. But the mangrove waterways are shaded by the canopy, which makes a meaningful difference. Kayaking through the canal system stays comfortable until about 11 AM. After that, the open water sections of a high-speed boat or country boat ride are better suited to those who don't mind the heat.",
      },
      {
        type: "p",
        text: "March and early April are less crowded than the December–January peak. You'll often get a more relaxed session with fewer boats on the water. If you're a family with school-age children and can only travel during the April–May school holidays, this is still a good time to come — just start early.",
      },
      { type: "h2", text: "June to September — Monsoon, and Why It's Underrated" },
      {
        type: "p",
        text: "The southwest monsoon hits Kerala around the first week of June and withdraws in late September. Rainfall is heaviest in July and August. MangroveSpot operates year-round, and we reschedule or refund if conditions are genuinely unsafe — but we don't cancel for light or moderate rain.",
      },
      {
        type: "p",
        text: "Monsoon kayaking through the mangroves is a different experience to dry-season touring. The vegetation is at peak density and colour — every shade of green is brighter, the roots are partially submerged, and the light through the rain clouds is soft and even. Some guests specifically prefer this season because the crowd is minimal, the air is cooler, and the ecosystem is visibly more active.",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "During heavy rain, water-based activities like kayaking and the coracle ride are paused for safety. ATV rides and archery are less affected. We always recommend calling ahead or checking WhatsApp before a monsoon visit.",
      },
      { type: "h2", text: "Month-by-Month Summary" },
      {
        type: "ul",
        items: [
          "October – November: Excellent. Post-monsoon green, clear water, low crowds.",
          "December – January: Peak season. Best weather, most visitors. Pre-book well in advance.",
          "February – March: Very good. Weather is comfortable, birdwatching remains active.",
          "April – May: Good if you start early (before 10 AM). School holiday crowds.",
          "June – July: Monsoon. Dramatic scenery, low crowds. Activity availability depends on daily conditions.",
          "August – September: Heaviest rainfall. Best for adventurous visitors who don't mind rain.",
        ],
      },
      { type: "h2", text: "What to Bring, Whatever Month You Visit" },
      {
        type: "ul",
        items: [
          "Light, quick-dry clothing — cotton gets heavy when wet",
          "Sandals or old trainers you don't mind getting wet",
          "A small dry bag for your phone if kayaking",
          "Sunscreen and a hat for March–May visits",
          "A waterproof jacket or light poncho for monsoon visits",
        ],
      },
      {
        type: "callout",
        calloutType: "tip",
        text: "Life jackets are provided to every guest at no extra charge. You don't need to bring your own or have any swimming ability.",
      },
      {
        type: "cta",
        ctaLabel: "Check Availability & Book Your Slot",
        ctaHref: "/booking",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POST 2: Kollam day trip guide
  // ─────────────────────────────────────────────────────────────
  {
    slug: "kollam-day-trip-guide-backwaters",
    title: "Kollam Day Trip: 7 Things to Do Near the Backwaters (With Timings)",
    metaTitle: "Kollam Day Trip Guide – 7 Things to Do Near the Backwaters | MangroveSpot",
    metaDescription:
      "Planning a day trip to Kollam from Thiruvananthapuram, Varkala, or Kochi? Here are 7 things to do near the backwaters — including the best mangrove activity in the district.",
    publishedAt: "2025-11-22",
    readTime: "8 min",
    category: "Day Trip Guide",
    categoryColor: "blue",
    excerpt:
      "Kollam is one of Kerala's most underrated districts for day trips. This guide covers 7 things to do near the backwaters — with timings, distances, and honest advice on what's worth your time.",
    coverImage: "/Country-Boat.jpg",
    coverAlt:
      "Traditional country boat on Kollam backwaters surrounded by coconut palms, Kerala",
    tags: ["Kollam day trip", "things to do in Kollam", "Kerala backwaters", "Paravur"],
    content: [
      {
        type: "p",
        text: "Kollam doesn't always make it onto Kerala travel itineraries the way Alappuzha or Munnar do. That's partly what makes it good. The crowds are smaller, the prices are more honest, and the backwater experience here is less packaged and more real. Here are 7 things worth doing on a day trip to the Kollam district.",
      },
      { type: "h2", text: "1. Mangrove Kayaking at Nedungolam (MangroveSpot)" },
      {
        type: "p",
        text: "This is the standout activity in the district for anyone who wants an active, nature-immersive experience. MangroveSpot is located at Nedungolam, Paravur — about 30 km from Kollam city and 45 km from Varkala. The kayaking route takes you through narrow mangrove canals where the tree canopy forms a tunnel overhead. The session runs about 45 minutes and is guided throughout.",
      },
      {
        type: "p",
        text: "Best timing: Arrive by 7 AM for the quietest water and best bird activity. The site opens at 6:30 AM. You can also combine kayaking with the coracle ride or country boat for a fuller half-day at the water.",
      },
      { type: "h2", text: "2. Ashtamudi Lake Boat Cruise" },
      {
        type: "p",
        text: "Ashtamudi is one of Kerala's largest lakes — the second largest wetland in the state. A basic boat cruise from Kollam jetty takes about 2 hours and gives you views of the lake's multiple arms, coconut groves, and fishing activity. This is a more passive experience than kayaking — you're a passenger rather than a participant — but it's good for families with younger children or older travellers.",
      },
      { type: "h2", text: "3. Thangassery Lighthouse and Fort" },
      {
        type: "p",
        text: "The Thangassery Lighthouse dates to 1902 and still operates. The climb gives you a 360-degree view over the Arabian Sea, the river mouth, and the town. The ruins of the Dutch and British forts nearby are worth a short walk. The whole stop takes about 45 minutes and costs very little.",
      },
      { type: "h2", text: "4. Coracle Ride at MangroveSpot" },
      {
        type: "p",
        text: "If you're already at MangroveSpot for kayaking, add the coracle ride. A coracle is a traditional round boat used by Kerala's river fishing communities — not a tourist novelty, an actual working vessel that has been used here for generations. The ride takes about 20 minutes on the calm backwater section and is genuinely unlike anything you'll find at most tourist sites.",
      },
      { type: "h2", text: "5. Kottukkal Caves (Oachira)" },
      {
        type: "p",
        text: "About 30 km north of Kollam city, Kottukkal has a series of rock-cut cave structures dating back over 2,000 years. They're not heavily promoted, which means you'll often have them almost entirely to yourself. Combine with a visit to Oachira Parabrahma Temple if you're interested in Kerala's unusual non-idol temple traditions.",
      },
      { type: "h2", text: "6. Alumkadavu Mangrove Reserve" },
      {
        type: "p",
        text: "A smaller mangrove reserve than Nedungolam, Alumkadavu is accessible by local boat. This is a good option if you want a quieter, self-guided walk along mangrove boardwalks rather than a guided activity session. The two sites complement each other well if you have a full day.",
      },
      { type: "h2", text: "7. Seafood Lunch at a Local Restaurant in Paravur" },
      {
        type: "p",
        text: "Paravur town has several small local restaurants that serve fresh catch from the Ashtamudi backwaters. Kerala-style fish curry with red rice, karimeen (pearl spot) fry, and prawn mappas are the dishes to try. Avoid the large tourist-facing restaurants near the jetty — the smaller places a few streets inland are usually better and cheaper.",
      },
      { type: "h2", text: "Sample Day Trip Itinerary from Varkala or Thiruvananthapuram" },
      {
        type: "ol",
        items: [
          "6:15 AM — Depart from Thiruvananthapuram or Varkala",
          "7:30 AM — Arrive at MangroveSpot, Nedungolam. Kayaking session.",
          "9:00 AM — Coracle ride or country boat add-on",
          "10:30 AM — Drive to Thangassery Lighthouse (25 km, 35 min)",
          "12:30 PM — Lunch in Paravur or Kollam town",
          "2:00 PM — Ashtamudi lake cruise from Kollam jetty",
          "4:30 PM — Return journey",
        ],
      },
      {
        type: "callout",
        calloutType: "tip",
        text: "Pre-book your MangroveSpot slot online before travelling — it saves 25% and confirms your time slot so the rest of the day's timing works out.",
      },
      {
        type: "cta",
        ctaLabel: "Book MangroveSpot Activities",
        ctaHref: "/booking",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POST 3: Families & children
  // ─────────────────────────────────────────────────────────────
  {
    slug: "mangrovespot-families-children-kollam",
    title: "Is MangroveSpot Safe for Families with Children? Honest Answer.",
    metaTitle: "MangroveSpot for Families with Children – Kollam Kerala | Safety & Activities",
    metaDescription:
      "Is MangroveSpot in Kollam suitable for kids? Which activities work for families, what age is safe, and what should you bring. An honest guide for parents planning a visit.",
    publishedAt: "2025-10-15",
    readTime: "6 min",
    category: "Family Travel",
    categoryColor: "orange",
    excerpt:
      "Parents ask us this every week. Here's the honest answer: yes, with some activity-specific context about age, swimming ability, and what to expect on the water.",
    coverImage: "/Coracle-Ride.jpg",
    coverAlt:
      "Family on a coracle ride at MangroveSpot, Nedungolam, Kollam — calm water, life jackets provided",
    tags: ["family activities Kollam", "kids Kerala travel", "safe water activities", "mangrove family tour"],
    content: [
      {
        type: "p",
        text: "This is the most common question we get from families planning a visit: is it safe for children, what age is appropriate, and which activities actually work for a mixed group of adults and kids. Here is an honest breakdown.",
      },
      { type: "h2", text: "The Short Answer" },
      {
        type: "p",
        text: "MangroveSpot is well-suited for family visits. We regularly host families with children from age 5 upward. The waterways at Nedungolam are calm — there is no tidal surge, no ocean swell, and no fast-moving current. Life jackets are provided to every participant before any water activity, including children. Your child does not need to be able to swim.",
      },
      { type: "h2", text: "Activity-by-Activity Guide for Families" },
      { type: "h3", text: "Coracle Ride — Best for young children" },
      {
        type: "p",
        text: "The coracle is the most family-friendly activity we offer. It's a round, stable traditional boat operated by a trained guide. The ride is gentle, takes about 20 minutes, and stays on the calm open-water section of the backwaters. Children from age 3 upward are comfortable on this. It's a good starting point for families with younger children who have no water experience.",
      },
      { type: "h3", text: "Country Boat Ride — Good for all ages" },
      {
        type: "p",
        text: "The country boat is a traditional wooden vessel — longer and more stable than a kayak. It holds multiple passengers and is operated by a guide. The ride goes through the backwater channels and takes 30–40 minutes. This is very suitable for families including elderly grandparents and children of any age. There's nothing physically demanding about it.",
      },
      { type: "h3", text: "Kayaking — From age 8 upward, with a parent" },
      {
        type: "p",
        text: "Kayaking requires some basic coordination and the ability to hold a paddle. We use both single and double kayaks. Children from about age 8 upward can share a double kayak with a parent comfortably. Children below this age are welcome at the site but would typically be on the coracle or country boat rather than kayaking independently.",
      },
      { type: "h3", text: "ATV Ride — Age restriction applies" },
      {
        type: "p",
        text: "The ATV ride has a minimum age requirement — typically 12 years upward, and children must be accompanied by an adult. The track is controlled and not high-speed, but the ATV itself is not suitable for young children. Teenagers generally love this activity.",
      },
      { type: "h3", text: "Stand-Up Paddleboarding (SUP) — Age 10 upward" },
      {
        type: "p",
        text: "SUP requires balance and some core strength. Children from about age 10 upward can usually manage this with guidance. Our instructors adjust the session to the participant's ability — there's no requirement to stand on the first attempt.",
      },
      { type: "h2", text: "What About Non-Swimmers?" },
      {
        type: "p",
        text: "Non-swimmers are welcome at MangroveSpot. ISI-approved life jackets are provided to every participant for every water-based activity. The waterway depths in the activity zones are generally 1–3 metres, and guides are present at all times. In over 5,000 reviewed visits, we have not had a safety incident involving a guest.",
      },
      { type: "h2", text: "Practical Tips for Families" },
      {
        type: "ul",
        items: [
          "Book online in advance — slots fill up fast on weekends and the 25% discount helps with group costs",
          "Arrive early (7–8 AM) — children are more energetic and it's cooler",
          "Bring a change of clothes — everyone gets splashed at some point",
          "Wear sandals or old shoes you don't mind getting wet",
          "Leave valuables in the car — there's secure parking on-site",
          "The site has basic toilet facilities",
        ],
      },
      {
        type: "callout",
        calloutType: "info",
        text: "We recommend calling or WhatsApp-ing us before your visit if you have a child with specific needs or a very young child. We'll advise on the best activity and make arrangements.",
      },
      {
        type: "cta",
        ctaLabel: "Book a Family Visit",
        ctaHref: "/booking",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POST 4: Monsoon kayaking
  // ─────────────────────────────────────────────────────────────
  {
    slug: "monsoon-kayaking-kerala-mangroves",
    title: "Monsoon Kayaking in Kerala Mangroves: What to Expect at MangroveSpot",
    metaTitle: "Monsoon Kayaking Kerala Mangroves – MangroveSpot, Kollam | Is It Worth It?",
    metaDescription:
      "Thinking about kayaking the Kerala mangroves during monsoon season? Here's what the experience is actually like at MangroveSpot in June, July, August — and whether it's worth your trip.",
    publishedAt: "2025-09-02",
    readTime: "5 min",
    category: "Seasonal Guide",
    categoryColor: "cyan",
    excerpt:
      "Most people assume the mangroves close during monsoon. They don't. Here's what a June or July kayaking session actually feels like — and why some of our best reviews come from monsoon visitors.",
    coverImage: "/con1.png",
    coverAlt:
      "Kayaking through dense green mangrove canals during Kerala monsoon, MangroveSpot, Paravur, Kollam",
    tags: ["monsoon kayaking Kerala", "mangrove tour rain season", "Kollam monsoon travel"],
    content: [
      {
        type: "p",
        text: "Kerala's monsoon season runs roughly from early June to late September. It's the time most people avoid for travel, especially anything water-related. But the Nedungolam mangroves during monsoon are genuinely worth considering — if you understand what you're getting into.",
      },
      { type: "h2", text: "What the Mangroves Look Like in Monsoon" },
      {
        type: "p",
        text: "The mangroves are at peak growth during and immediately after the monsoon. Every shade of green is more saturated. The canopy is denser, which creates a darker, more enclosed feeling as you paddle through the canal sections. The water level is higher, which means you're paddling slightly closer to the root level — the visual effect is striking.",
      },
      {
        type: "p",
        text: "Birdlife is also active in this season, though you'll see different species than in winter. Kingfishers are abundant year-round. Waders and herons are more common in the drier months, but monsoon visitors often spot different egret species and occasional purple herons.",
      },
      { type: "h2", text: "What Actually Changes During Monsoon" },
      {
        type: "ul",
        items: [
          "You will get wet — not just from rain but from paddling. Embrace it.",
          "Visibility is lower on overcast days — the light through the clouds is soft and even, which some photographers prefer",
          "The site is significantly less crowded — weekend visits in monsoon have far fewer guests than December or January",
          "Activity timing depends on daily weather. Heavy rain can pause kayaking temporarily.",
          "The ATV ride and archery are less affected by rain than water activities",
        ],
      },
      { type: "h2", text: "When We Pause Activities" },
      {
        type: "p",
        text: "We operate year-round but we do not run water activities during heavy rain with strong wind. If conditions improve within a few hours, we resume. If they don't, we reschedule the booking to another date or offer a full refund. We don't leave visitors stranded — if you've pre-booked and we can't run your session, we make it right.",
      },
      {
        type: "callout",
        calloutType: "warning",
        text: "Before a monsoon visit, WhatsApp or call us on the morning of your trip to confirm conditions. We're responsive and will give you an honest update.",
      },
      { type: "h2", text: "What to Bring for a Monsoon Visit" },
      {
        type: "ul",
        items: [
          "A light waterproof jacket or poncho",
          "Quick-dry clothing — synthetics rather than cotton",
          "A dry bag or ziplock bags for your phone and wallet",
          "Old sandals or shoes — not your best footwear",
          "A small towel to dry off afterward",
        ],
      },
      { type: "h2", text: "Is It Worth the Trip?" },
      {
        type: "p",
        text: "If you can handle getting wet and you're not coming from a long distance on a tight schedule, yes. The monsoon MangroveSpot is quieter, greener, and in some ways more atmospheric than the dry-season version. Several of our most positive Google reviews have been written by guests who visited in June or July. The experience is different — not lesser.",
      },
      {
        type: "cta",
        ctaLabel: "Check Availability for Monsoon Visit",
        ctaHref: "/booking",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POST 5: First-time kayaker guide
  // ─────────────────────────────────────────────────────────────
  {
    slug: "first-time-kayaking-kerala-guide",
    title: "First-Time Kayaking in Kerala: What to Expect at MangroveSpot",
    metaTitle: "First Time Kayaking in Kerala – MangroveSpot, Nedungolam, Kollam | Beginner Guide",
    metaDescription:
      "Never kayaked before? This guide covers exactly what happens during a MangroveSpot kayaking session — from briefing to paddling technique — so you can arrive prepared and relaxed.",
    publishedAt: "2025-08-18",
    readTime: "6 min",
    category: "Beginner Guide",
    categoryColor: "violet",
    excerpt:
      "The most common question from first-timers: 'Do I need experience?' No. Here's what a MangroveSpot kayaking session looks like from start to finish, so nothing surprises you.",
    coverImage: "/Mangrove-Kayaking.jpg",
    coverAlt:
      "First-time kayaker receiving instruction at MangroveSpot, Nedungolam, Paravur, Kollam, Kerala",
    tags: ["beginner kayaking Kerala", "first time kayak", "mangrove kayaking guide", "Kollam kayak"],
    content: [
      {
        type: "p",
        text: "If you've never kayaked before, the idea of sitting in a small boat and paddling through a mangrove forest can feel more intimidating than it should. The reality is calmer. Here's exactly what happens from the moment you arrive at MangroveSpot.",
      },
      { type: "h2", text: "Before You Get on the Water" },
      {
        type: "p",
        text: "When you arrive at MangroveSpot, your guide will meet you at the jetty. You'll be given a life jacket — ISI-approved, properly fitted — before anything else happens. No life jacket, no water. This is non-negotiable and applies to every guest, regardless of swimming ability.",
      },
      {
        type: "p",
        text: "The briefing takes about 5–10 minutes. Your guide will show you how to hold the paddle (most first-timers hold it backwards), how to do a basic forward stroke, and how to turn. You don't need to be strong or particularly coordinated to do this — the technique is simple once someone shows you correctly.",
      },
      { type: "h2", text: "The First Five Minutes" },
      {
        type: "p",
        text: "Getting into a kayak from a jetty is the moment most first-timers feel nervous about. The guide holds the kayak steady while you lower yourself in — it's more like sitting on a bench than balancing on a beam. Single kayaks feel slightly more tippy than double kayaks, and if you're unsure, we recommend starting in a double.",
      },
      {
        type: "p",
        text: "Once you're on the water and moving, the nervousness usually disappears within two or three minutes. The canals at Nedungolam have no current and no wind fetch — the water is genuinely still. Beginners find their rhythm faster than they expect.",
      },
      { type: "h2", text: "The Route" },
      {
        type: "p",
        text: "The standard kayaking session covers roughly 2 km of waterway over about 45 minutes. The route goes from the main jetty into the narrower mangrove canal system, where the canopy closes overhead, then back out into the open water section and back to the jetty. Your guide leads the group, sets a comfortable pace, and narrates along the way — explaining the mangrove species, pointing out birds, and talking through the ecology of the system.",
      },
      { type: "h2", text: "Common First-Timer Mistakes (And How to Avoid Them)" },
      {
        type: "ul",
        items: [
          "Gripping the paddle too tightly — relax your hands, the paddle doesn't need to be strangled",
          "Looking down at the water instead of ahead — look where you want to go, the kayak follows your body",
          "Using only your arms to paddle — your core and torso should be doing most of the work",
          "Panicking if the kayak wobbles — small rocks are normal and self-correcting. Stay calm and sit upright.",
          "Wearing their best clothes — old clothes and sandals are the right choice",
        ],
      },
      { type: "h2", text: "What If I Tip Over?" },
      {
        type: "p",
        text: "Capsizing on the MangroveSpot route is uncommon — the water is calm and the kayaks are stable. If it does happen, your life jacket will keep you afloat. The guide is always nearby. You'll be helped back into the kayak or onto the jetty. It is not an emergency, and it happens to experienced kayakers occasionally too.",
      },
      {
        type: "callout",
        calloutType: "tip",
        text: "Wear clothes you're comfortable getting wet. Even if you don't capsize, your hands and arms get splashed throughout the session.",
      },
      { type: "h2", text: "After Your Session" },
      {
        type: "p",
        text: "Most first-time kayakers finish their session wanting more — the 45 minutes passes quickly. If you want to extend your time on the water, the country boat ride or coracle ride can be added on the same visit. Many guests combine two or three activities into a half-day.",
      },
      {
        type: "cta",
        ctaLabel: "Book Your First Kayaking Session",
        ctaHref: "/booking",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // POST 6: School trips
  // ─────────────────────────────────────────────────────────────
  {
    slug: "school-nature-trips-kerala-mangroves",
    title: "Why the Mangroves Are Kerala's Best Destination for School Nature Trips",
    metaTitle: "School Nature Trips Kerala – MangroveSpot Mangrove Excursions, Kollam | Groups Welcome",
    metaDescription:
      "Planning a school excursion to a nature destination in Kerala? MangroveSpot at Nedungolam, Kollam handles groups of 10–100 students with guided mangrove education sessions, kayaking, and safety.",
    publishedAt: "2025-07-30",
    readTime: "7 min",
    category: "Group Trips",
    categoryColor: "green",
    excerpt:
      "Kerala schools have limited options for genuine nature education trips. Here's why the Nedungolam mangroves — and MangroveSpot specifically — work better than most alternatives for student groups.",
    coverImage: "/student-offer.jpg",
    coverAlt:
      "School students group activity at MangroveSpot mangrove site, Nedungolam, Paravur, Kollam, Kerala",
    tags: ["school trip Kerala", "mangrove education", "student excursion Kollam", "group activities Kerala"],
    content: [
      {
        type: "p",
        text: "School excursions to 'nature destinations' in Kerala often end up being long bus rides to an amusement park or a crowded waterfall. The Nedungolam mangroves offer something different — a functioning ecosystem that students can actually interact with, guided by someone who knows what they're talking about.",
      },
      { type: "h2", text: "What Makes Mangroves an Education Destination" },
      {
        type: "p",
        text: "Mangrove forests are one of the most productive ecosystems on earth. They trap carbon, protect coastlines from erosion, serve as breeding grounds for dozens of fish species, and support a distinct set of bird and invertebrate communities. This makes them directly relevant to Kerala secondary school curriculum topics including ecology, climate adaptation, and coastal geography.",
      },
      {
        type: "p",
        text: "At MangroveSpot, guided sessions on the water give students direct access to the root system, the tidal zone, the fish nursery areas, and the bird communities — observations that are difficult to replicate in a classroom or on a nature walk.",
      },
      { type: "h2", text: "How MangroveSpot Handles School Groups" },
      {
        type: "p",
        text: "We have handled school and college groups ranging from 15 to over 80 participants. Larger groups are split into batches for water activities — typically 8–12 per batch for kayaking, with multiple boats running simultaneously. This keeps wait times manageable.",
      },
      {
        type: "p",
        text: "We provide a structured guide briefing at the start of each group session. The guide covers mangrove ecology, the species present in the Nedungolam waterway system, and basic water safety before any activity begins. For schools with a specific curriculum focus, we can adapt the briefing content on request.",
      },
      { type: "h2", text: "Activities Suitable for Student Groups" },
      {
        type: "ul",
        items: [
          "Guided kayaking through the mangrove canal system (from age 10)",
          "Coracle ride on the open backwater section (all ages)",
          "Country boat ride through the channels (all ages)",
          "Nature observation session — bird identification, mangrove species, ecology briefing",
          "Archery (from age 10, supervised)",
          "ATV ride (from age 12, supervised)",
        ],
      },
      { type: "h2", text: "Safety for Groups" },
      {
        type: "p",
        text: "Every student receives an ISI-approved life jacket before entering the water. Our guides are certified and experienced with large groups. We do not exceed capacity on any vessel. Teachers and chaperones are welcome on the water and counted toward group numbers.",
      },
      {
        type: "callout",
        calloutType: "info",
        text: "For groups of 20 or more, we recommend booking at least 2 weeks in advance to ensure enough slots and guide availability. Contact us on WhatsApp or call to discuss your group's specific requirements.",
      },
      { type: "h2", text: "Logistics for Schools" },
      {
        type: "ul",
        items: [
          "Location: MangroveSpot, Nedungolam, Paravur, Kollam — 30 km from Kollam city",
          "Bus parking: Available on-site for up to 3 full-size buses",
          "Session duration: Typically 2–4 hours depending on activities selected",
          "Timing: Opens 6:30 AM — early morning slots recommended for student groups",
          "Toilet facilities: Available on-site",
          "Catering: Not provided, but nearby restaurants and hotels can be arranged",
        ],
      },
      { type: "h2", text: "Why Mangroves Over Other Kerala Excursion Destinations" },
      {
        type: "ul",
        items: [
          "Active ecosystem — students observe real ecology, not a display",
          "Physical participation — kayaking and coracle riding are more engaging than passive bus tours",
          "Curriculum relevance — directly maps to ecology, geography, and environmental science topics",
          "Safety — calm water, life jackets, licensed guides, controlled environment",
          "Accessibility — 30–90 km from most Kollam and Thiruvananthapuram schools",
          "Honest pricing — group rates available, no hidden charges",
        ],
      },
      {
        type: "cta",
        ctaLabel: "Contact Us for Group Booking",
        ctaHref: "/booking",
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
