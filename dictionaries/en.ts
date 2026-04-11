import type { Dictionary } from "@/lib/i18n";

const en: Dictionary = {
  nav: {
    types: "Types",
    rankings: "Rankings",
    about: "About",
    startTest: "Start Test",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  privacy: { title: "Privacy Policy" },
  terms: { title: "Terms of Service" },

  footer: {
    brand: "SBTI",
    brandDesc: "Silly Behavioral Type Indicator — the personality test the internet deserves.",
    tipTitle: "Disclaimer",
    tipText: "This test is for entertainment only. It is not a clinical or psychological assessment. If you actually believe a 32-question quiz on the internet defines you as a person, that itself might be a personality trait.",
    home: "Home",
  },

  home: {
    badge: "Silly Behavioral Type Indicator",
    h1: "Take the SBTI personality test — find your internet-poisoned type.",
    desc: "32 absurd questions. 15 dimensions. 27 personality types that hit way too close to home. The most unhinged personality test on the internet — now in English.",
    startTest: "Start Test",
    browse27: "Browse 27 Types",
    learnMore: "Learn more \u2192",
    stat1Label: "15-D Model",
    stat1Sub: "5 trait clusters",
    stat2Label: "27 Results",
    stat2Sub: "25 standard + 2 special",
    stat3Label: "32 Questions",
    stat3Sub: "Hidden drinking branch",
    modelsTitle: "Five Trait Clusters",
    modelsDesc: "Self-image, emotional wiring, worldview, action style, and social behavior \u2014 five clusters, fifteen dimensions, zero chill.",
    faqTitle: "FAQ",
    faqDesc: "Questions people actually ask (and some they probably shouldn\u2019t).",
    viewAllTypes: "View All Types",
    viewAbout: "About",
    viewRankings: "View Rankings",
    rankingsTitle: "Submit your result to the leaderboard after testing.",
    rankingsDesc: "See how you stack up against everyone else. Spoiler: you\u2019re probably not as unique as you think.",
    viewFullRankings: "View Full Rankings",
    totalSubs: "Total Submissions",
  },

  test: {
    h1: "One question at a time \u2014 land on your personality page.",
    desc: "Answer honestly. Or don\u2019t. We\u2019ll figure you out either way.",
    progress: "Q",
    prev: "Previous",
    next: "Next",
    computing: "Computing your personality result...",
  },

  types: {
    h1: "All 27 SBTI Personality Types",
    desc: "25 standard types + 2 secret special types. One of them is you. Sorry in advance.",
    viewDetail: "View details \u2192",
    startTest: "Start Test",
  },

  rankings: {
    h1: "SBTI Leaderboard",
    desc: "Real-time rankings of every personality type. Find your tribe \u2014 or realize you\u2019re alone.",
    totalSubs: "Total Submissions",
    rankedTypes: "Types Ranked",
    types: "types",
    lastUpdate: "Last Updated",
    fullRanking: "Full Rankings",
    noDataTitle: "No data yet",
    noDataDesc: "Nobody has submitted a result yet. Be the brave first one.",
    startTest: "Start Test",
    viewAll: "View All Types",
    times: "times",
  },

  about: {
    h1: "About SBTI",
    desc: "The Silly Behavioral Type Indicator \u2014 a 15-dimension, 27-type personality framework built on vibes, memes, and just enough psychology to sound credible.",
    questionsLabel: "Questions",
    questionsVal: "32",
    resultsLabel: "Results",
    resultsVal: "27 types",
    dimsLabel: "Dimensions",
    dimsVal: "15-D",
    modelsTitle: "Five Trait Clusters",
    modelsDesc: "Self, Emotion, Attitude, Action, and Social \u2014 five clusters that dissect your personality like a frog in biology class, except the frog is you.",
    ctaTitle: "The easiest way is to just start",
    ctaDesc: "Stop overthinking. 32 questions, a few minutes, and you\u2019ll finally have a four-letter code to blame your behavior on.",
    ctaButton: "Start Test",
  },

  result: {
    sketch: "Personality Sketch",
    codeLabel: "Type Code",
    dimsTitle: "15-Dimension Profile",
    dimsDesc: "Your scores across all fifteen dimensions. High, Mid, or Low \u2014 no judgment (okay, maybe a little).",
    specialTitle: "Special Type",
    specialDesc: "You unlocked a hidden type. The standard model couldn\u2019t contain you.",
    retest: "Retake Test",
    viewRankings: "View Rankings",
    viewAll: "View All Types",
    otherTypes: "Other Types",
    high: "High",
    mid: "Mid",
    low: "Low",
  },

  faq: [
    {
      q: "Is SBTI a real psychological assessment?",
      a: "No. It\u2019s an entertainment personality test. It borrows loosely from established models but is designed for laughs, not lab coats. Please do not cite this on your r\u00e9sum\u00e9.",
    },
    {
      q: "How are the 27 types determined?",
      a: "Your answers map onto 15 dimensions across 5 trait clusters. Each dimension scores High, Mid, or Low. The resulting pattern is matched against 25 predefined type profiles (plus 2 secret special types). The best match wins.",
    },
    {
      q: "What if I don\u2019t like my result?",
      a: "You can retake the test. Or you can accept the uncomfortable truth that a silly internet quiz just read you like an open book. Your call.",
    },
    {
      q: "What\u2019s the hidden drinking branch?",
      a: "Answer a certain hobby question the right way and you\u2019ll unlock a bonus question about alcohol. If the stars align, you might land the ultra-rare DRUNK type. Cheers.",
    },
  ],

  modelGroups: [
    {
      title: "Self Model",
      code: "S1 \u00b7 S2 \u00b7 S3",
      desc: "How stable is your self-image, how well do you actually know yourself, and is there anything you genuinely care about deep down?",
    },
    {
      title: "Emotion Model",
      code: "E1 \u00b7 E2 \u00b7 E3",
      desc: "Are you anxious or secure in relationships, how deep do you dive in, and do you need your own space or do you cling like cling wrap?",
    },
    {
      title: "Attitude Model",
      code: "A1 \u00b7 A2 \u00b7 A3",
      desc: "How do you see the world, rules, and the meaning of life \u2014 cautious rule-follower or chaotic free spirit?",
    },
    {
      title: "Action Drive Model",
      code: "Ac1 \u00b7 Ac2 \u00b7 Ac3",
      desc: "Are you driven to win or just trying not to lose? Decisive or paralyzed? Do your plans actually happen?",
    },
    {
      title: "Social Model",
      code: "So1 \u00b7 So2 \u00b7 So3",
      desc: "Do you approach people or wait to be approached, how thick are your boundaries, and how real are you across different relationships?",
    },
  ],

  questions: [
    {
      text: "I\u2019m not just a loser, I\u2019m also a clown, a dead fish floating downstream. Never been in a relationship. Timid and insecure. My youth is just one daydream after another \u2014 fantasizing about having someone to walk the streets with, hang out with, live with. Reality? I blew through my parents\u2019 money, went to a garbage school, coasted through life, and now I clock in at some job with no dreams, no goals, no skills. Every time I see people joking about losers online, I want to cry. I\u2019m the rat in the sewer, peering up through the grate at all the beautiful things above. Every glimpse is another wound, another squeeze on my shrinking world. Please, just give us clowns a way out. I really don\u2019t want to soak my pillow with tears in broad daylight anymore.",
      options: ["I\u2019m crying...", "What even is this...", "That\u2019s not me!"],
    },
    {
      text: "I\u2019m not good enough. Everyone around me is better than me.",
      options: ["True", "Sometimes", "Not really"],
    },
    {
      text: "I have a clear picture of who I really am.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "There\u2019s something I truly, deeply care about pursuing.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "I absolutely must keep climbing higher and getting stronger.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "Other people\u2019s opinions of me? Couldn\u2019t care less.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "Your partner hasn\u2019t replied for 5 hours. They say they had diarrhea. Your thoughts?",
      options: [
        "Diarrhea doesn\u2019t last 5 hours. They\u2019re hiding something.",
        "Torn between trusting them and being suspicious.",
        "Maybe they really are having a rough day.",
      ],
    },
    {
      text: "I often worry about being abandoned in a relationship.",
      options: ["Yes", "Sometimes", "No"],
    },
    {
      text: "I swear on everything \u2014 I take every relationship seriously!",
      options: ["Not really", "Maybe?", "Yes! (proud and guilt-free)"],
    },
    {
      text: "Your partner is kind, gentle, brilliant, eloquent, perceptive, well-read, patient, approachable, good-hearted, ambitious, charming, and drop-dead gorgeous. At this point, you would\u2026",
      options: [
        "No matter how perfect they are, I won\u2019t fall in too deep.",
        "Somewhere between A and C.",
        "I\u2019d treasure them completely. Might go full lovebrain.",
      ],
    },
    {
      text: "After getting into a relationship, your partner is super clingy. How do you feel?",
      options: [
        "That sounds amazing",
        "Whatever, I\u2019m fine either way",
        "I\u2019d rather keep my own space",
      ],
    },
    {
      text: "I deeply value personal space in any relationship.",
      options: [
        "I prefer mutual dependence",
        "Depends on the situation",
        "Absolutely! (said with zero hesitation)",
      ],
    },
    {
      text: "Most people are fundamentally good.",
      options: [
        "Actually, evil hearts outnumber hemorrhoids in this world.",
        "Maybe.",
        "Yes, I choose to believe good people outnumber the bad.",
      ],
    },
    {
      text: "You\u2019re walking down the street when an adorable little girl skips toward you (cute from every angle, cute on any phone screen, aggressively cute). She hands you a lollipop. Your reaction?",
      options: [
        "Aww she\u2019s so sweet! She gave ME a lollipop!",
        "Confused. Scratches head.",
        "This might be a new type of scam. Better walk away.",
      ],
    },
    {
      text: "Exams are coming up. School says evening study hall is mandatory \u2014 skip it and you lose points. But tonight you\u2019ve got plans to play an exciting video game with your crush. What do you do?",
      options: [
        "Skip it! It\u2019s just one time!",
        "I\u2019ll ask for a leave.",
        "Exams are coming, what am I even thinking.",
      ],
    },
    {
      text: "I like breaking conventions. I don\u2019t like being constrained.",
      options: ["Agree", "Neutral", "Disagree"],
    },
    {
      text: "I usually have a goal when I do things.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "One day it hits you: life has no damn meaning. Humans are just animals driven by urges \u2014 pure hormone puppets. Hungry? Eat. Tired? Sleep. Horny? Well. We\u2019re basically no different from pigs and dogs.",
      options: [
        "That\u2019s exactly right.",
        "Maybe, maybe not.",
        "That\u2019s absolute nonsense.",
      ],
    },
    {
      text: "I do things primarily to achieve results and progress, not to avoid trouble and risk.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "You\u2019ve been sitting on the toilet for 30 minutes, constipated and suffering. Nothing\u2019s happening. What do you do?",
      options: [
        "Sit another 30 minutes. Maybe something will happen.",
        "Slap your own butt and yell: \u201CStupid butt, just go already!\u201D",
        "Use a laxative. Let\u2019s get this over with.",
      ],
    },
    {
      text: "I make decisions quickly. I don\u2019t like to hesitate.",
      options: ["Disagree", "Neutral", "Agree"],
    },
    {
      text: "This question has no prompt. Pick blindly.",
      options: [
        "After much deliberation... A?",
        "Uh, how about B?",
        "When in doubt, go with C.",
      ],
    },
    {
      text: "When someone says you have \u201Cstrong execution,\u201D which response is closest to your heart?",
      options: [
        "My execution peaks when the deadline is breathing down my neck...",
        "Eh, sometimes I guess.",
        "Yes. Things are meant to be pushed forward.",
      ],
    },
    {
      text: "I often make plans, ____",
      options: [
        "But plans never survive first contact with reality.",
        "Sometimes I follow through, sometimes I don\u2019t.",
        "I hate it when my plans get disrupted.",
      ],
    },
    {
      text: "You made a bunch of online friends playing a game and they invite you to meet up IRL. Your reaction?",
      options: [
        "Talking trash online is one thing, but actually meeting up is kinda nerve-wracking.",
        "Sure, I\u2019ll go. If someone talks to me, I\u2019ll chat.",
        "I\u2019d dress up and chat enthusiastically. You never know, right? I mean, you never know!",
      ],
    },
    {
      text: "Your friend brings along their friend to hang out. Your most likely state:",
      options: [
        "Naturally a bit guarded around a friend-of-a-friend.",
        "I\u2019ll vibe-check them and go from there.",
        "My friend\u2019s friend is basically my friend too! Let\u2019s chat!",
      ],
    },
    {
      text: "My personal space has an electric fence. Get too close and the alarm goes off.",
      options: ["Agree", "Neutral", "Disagree"],
    },
    {
      text: "I crave closeness with people I trust \u2014 like we\u2019re long-lost family.",
      options: ["Agree", "Neutral", "Disagree"],
    },
    {
      text: "Sometimes you have a different, negative opinion about something but end up not saying it. Usually the reason is:",
      options: [
        "That rarely happens to me.",
        "Probably to save face or preserve the relationship.",
        "I don\u2019t want people to see my darker side.",
      ],
    },
    {
      text: "I act like a different person depending on who I\u2019m with.",
      options: ["Disagree", "Neutral", "Agree"],
    },
  ],

  drinkQuestions: [
    {
      text: "What are your hobbies?",
      options: ["Eating, sleeping, the basics", "Arts & culture", "Drinking", "Working out"],
    },
    {
      text: "What\u2019s your attitude toward drinking?",
      options: [
        "A sip here and there. I\u2019m a lightweight.",
        "I pour liquor into my thermos and drink it like water. Alcohol is my religion.",
      ],
    },
  ],

  typeNames: {
    CTRL: {
      name: "Controller",
      intro: "What\u2019s that? Yeah, I\u2019ve got you right where I want you.",
      desc: `Congratulations, you've tested into the rarest personality type in the known universe. You are the natural enemy of entropy itself! 99.99% of so-called "successful people" worldwide are merely your inferior imitators. The CTRL personality is a walking, breathing task manager in human form. What ordinary people call "rules" are just default settings you haven't bothered to change yet. What mortals call "plans"? Those are your casual doodles between world dominations. Having a CTRL friend means your life's navigation system just got a serious firmware upgrade. Because nobody handles things like a Controller. The moment your life-train is about to derail, CTRL hits Ctrl+S for a hard save, then drags you back on track with an argument so airtight you can't even protest. They are the last backup drive of your chaotic existence, the only restart button still glowing when the universe collapses.`,
    },
    "ATM-er": {
      name: "ATM",
      intro: "You think I\u2019m made of money?",
      desc: `Congratulations, you've somehow tested into the world's rarest personality type. You may become finance's greatest unsolved mystery \u2014 because the ATM-er doesn't necessarily "give money," but they're always "paying." Paying time, paying energy, paying patience, paying away what should have been a peaceful evening. Like an old but indestructible ATM machine \u2014 people insert their anxiety and problems, and out comes a reassuring "Don't worry, I've got this." Your life is one grand, unappreciated one-person tab-picking show. You bear an avalanche of demands with the reliability of bedrock, and only in the dead of night do you glance at the bill \u2014 maybe a spiritual one \u2014 and let out a single sigh: oh, this damn, untamable sense of responsibility.`,
    },
    "Dior-s": {
      name: "Underdog",
      intro: "Just wait for my glow-up arc.",
      desc: `Congratulations! You're not an underdog \u2014 you're the long-lost spiritual descendant of Diogenes, the OG cynic philosopher, because Dior-s actually stands for Diogenes' Original Realist - Sage. The Dior-s personality is the ultimate middle finger to consumerism and hustle-culture brainwashing. They're not "unambitious" \u2014 they've already seen through the truth that the end of every "grind" is just a fancier cage. The Underdog has big wisdom. While everyone else chases trends and gets smacked around by the waves of the era, Dior-s is already sunbathing in their spiritual barrel, having achieved the supreme state of "person-barrel unity." Their philosophy isn't empty talk \u2014 it's been verified through billions of real-world trials: 1. Lying down is more comfortable than standing. 2. When it's mealtime, you eat.`,
    },
    BOSS: {
      name: "Boss",
      intro: "Hand me the wheel. I\u2019m driving.",
      desc: `BOSS is someone whose hands are permanently welded to the steering wheel. Even when the gas light is on, even when the GPS is hallucinating, you just deadpan: "I'm driving." And then you actually get everyone there. This personality operates on its own physics \u2014 the Law of Eternal Ascent. The BOSS personality looks at the world like a player who's already beaten the game watching the tutorial. Efficiency is their religion, order is their oxygen. They don't "have leadership vibes" \u2014 they ARE the vibe generator. Within a five-meter radius, the air itself becomes serious and productive. Their idea of "self-improvement" is what normal people call "self-torture." Master a new language today, get a certification tomorrow, plan Mars colonization the day after. You say that's too intense? They'll give you The Look: it's not that I'm too hard \u2014 it's that you're too soft.`,
    },
    "THAN-K": {
      name: "Grateful One",
      intro: "I thank the heavens! I thank the earth!",
      desc: `Congratulations, you've tested into the rarest personality in all the land. And you should be grateful to ME for that! Be thankful you now bask in life's nourishment! Stuck in traffic on the way to work? You should say: I'm grateful for this traffic jam \u2014 it gives me more time to listen to this beautiful song and admire the beautifully anxious faces outside my window, making me cherish my inner peace even more. Yes, THAN-K has a personality as warm as jade and a heart as vast as the ocean. In their eyes, the world has no truly bad people \u2014 only "friends who haven't yet been touched by the light of gratitude." Having a THAN-K friend is like having an inexhaustible positive-energy broadcast tower by your side. They can even help you find a Van Gogh-style Starry Night in the mold on your wall.`,
    },
    "OH-NO": {
      name: "Oh-No Person",
      intro: "Oh no! How did I get this personality type?!",
      desc: `"Oh no!" is not a scream of fear \u2014 it's a form of supreme intelligence. When a normal person sees a cup on the edge of a table, an Oh-No Person sees a disaster epic: water stain \u2192 short circuit \u2192 fire \u2192 building evacuation \u2192 economic loss \u2192 butterfly effect \u2192 end of the world. And so, with a soul-deep "Oh, no!", they move the cup to the exact center of the table at the speed of light, then place an absorbent coaster underneath for good measure. The Oh-No Person has an almost obsessive respect for boundaries: yours is yours, mine is mine. Every accident and risk has already been strangled in its cradle by their "Oh, no!" They are the patron saints of order \u2014 the last people in this chaotic world whose nerves are still pulled taut, holding it together with dignity.`,
    },
    GOGO: {
      name: "Go-Getter",
      intro: "gogogo~ let\u2019s move!",
      desc: `Research has revealed that the GOGO personality's brain is fundamentally different from everyone else's. GOGO lives in an extreme "what you see is what you get" world, with a life philosophy so brutally simple it's almost offensive: if I close my eyes, it's dark outside. If I spend all my money, I have no money. If I'm standing on a crosswalk, I'm a pedestrian. Flawless logic. Absolutely irrefutable. While others debate whether the chicken or the egg came first, the Go-Getter has already made both into an "Ultimate Chicken-Egg Rice Bowl." They don't "solve problems" \u2014 they "clear to-do items." For them, the world has only two states: done, and about to be done by me.`,
    },
    SEXY: {
      name: "Stunner",
      intro: "You were born to be a stunner!",
      desc: `When you walk into a room, the lighting system automatically identifies you as a natural-born Stunner and dims itself to avoid wasting energy. When you smile, you become a smiling Stunner, and the ambient humidity drops because all the water vapor has condensed into heart shapes in people's eyes. No matter who they are, people tend to develop an unhealthy level of attention toward your existence. Legend has it, if enough SEXY personalities gather for a party, the combined charisma energy is sufficient to temporarily warp the fabric of spacetime, giving attendees the blissful illusion that time has slowed down. They don't need to try hard to express themselves \u2014 most of the time, their sheer existence is already an outrageously extravagant poem.`,
    },
    "LOVE-R": {
      name: "Hopeless Romantic",
      intro: "Too much love. Reality can\u2019t keep up.",
      desc: `The LOVE-R personality is like a rare species that has survived since the age of ancient myths. Your probability of existing is lower than fishing the author's arm out of a toilet. You are the last and most anachronistic troubadour of this steel-and-concrete era. Your emotional processor isn't binary \u2014 it runs on rainbows. A falling leaf? To normal people, it just means "autumn is here." To a LOVE-R, it's a thirteen-act tragicomedy about reincarnation, sacrifice, and wordless love. Your inner world is a theme park that never closes, and you spend your whole life searching for the soulmate who can read the park map and is willing to ride the carousel with you until the end of the universe.`,
    },
    MUM: {
      name: "Mom",
      intro: "Could I... maybe... call you Mom...?",
      desc: `Congratulations, you've tested into the rarest Mom personality. Yes, before chaos was untangled, before time had a name, before the first star burped into existence \u2014 there was Mom. The Mom personality is fundamentally warm. They excel at reading emotions, have superhuman empathy, and know exactly when to stop and when to tell themselves "let it go." Mom is like a doctor who heals everyone else's sadness. The only pity is, when Mom cries, the dose of medicine they give themselves is always a size smaller than what they give others. MUM's tenderness toward themselves always comes at a discount.`,
    },
    FAKE: {
      name: "Shapeshifter",
      intro: "There are no real humans left.",
      desc: `SCP Foundation Emergency Report: Project Number SCP-CN-\u2588\u2588\u2588\u2588 "Shapeshifter." In social situations, the Shapeshifter is the ultimate chameleon \u2014 they swap personality masks faster than you switch keyboard layouts. One second they're in ride-or-die bro mode, the next second the boss walks in and they instantly flip to "reliable, composed model employee" mode. Even the sheen and curvature of their face subtly adjusts. You think you've made a real friend who truly gets you? Wake up. You've just been lucky enough to encounter a high-performance, masterfully disguised android. Late at night, the Shapeshifter peels off the masks one by one, and at the very bottom discovers... nothing. It's precisely those masks that make up who they are.`,
    },
    OJBK: {
      name: "Whatever Dude",
      intro: "When I say whatever, I mean WHATEVER.",
      desc: `Let's confront the raw essence of these letters: OJBK. This is no longer a personality \u2014 it's a governing philosophy. When mere mortals face the century's greatest dilemma \u2014 "rice or noodles for lunch?" \u2014 their brains burn calories in fierce deliberation. The OJBK personality, however, issues a verdict with the casual detachment of an emperor reviewing petitions: "Either's fine." This isn't indecisiveness. This is telling you: your petty choices are, to my imperial person, entirely beneath notice. Why no arguments? Because debating the future of the universe with paramecia is pointless. Why no fussing? Because an emperor doesn't care whether the dust at their feet drifts left or right.`,
    },
    MALO: {
      name: "Monke",
      intro: "Life is a dungeon, and I\u2019m just a monke.",
      desc: `Friend, you're not "young at heart" \u2014 you straight-up never evolved. Your soul is still stuck in that glorious era of swinging from branches and losing your mind over bananas. When humanity's ancestors decided to climb down from the trees, learn to walk upright, and put on suits and ties, the Monke personality's ancestor was on the next tree over, watching them, scratching its butt, and letting out a dismissive "screech." They saw through it all: so-called "civilization" is just the most boring, least fun pay-to-play game ever made. Rules are occasionally breakable, ceilings are for hanging upside-down from, and conference rooms are for backflips. MALO is essentially a wild thought that fell out of an enormous brain-hole and forgot to close the door behind it.`,
    },
    "JOKE-R": {
      name: "Clown",
      intro: "Turns out we\u2019re all clowns.",
      desc: `Please note: the JOKE-R personality isn't a "person" so much as a clown wearing jokes as clothing. Peel back one layer \u2014 it's a joke. Peel back another \u2014 it's a bit. Keep peeling, layer after layer, until you reach the very center and find... nothing. Just a faint echo saying: "Ha, didn't see that coming, did ya?" JOKE-R is the official head of the Vibes Committee and sole designated firepower output for any social gathering. If they're there, the energy never dips. Everyone doubles over laughing, and the person laughing hardest is usually JOKE-R themselves \u2014 using the loudest laughter to drown out the sound of a heart quietly breaking.`,
    },
    "WOC!": {
      name: "WTF Person",
      intro: "WTF, how did I get this personality?",
      desc: `We have discovered a remarkable creature: the WOC! Person. They run two completely independent operating systems. One is the "Surface OS," responsible for emitting a stream of "WTF," "no way," and "huh?!" at everything. The other is the "Backend OS," which calmly analyzes: yep, exactly as I predicted. The WOC! Person only says WTF \u2014 they never stick their nose in other people's business, because they know full well that explaining logic to fools is like pushing mud up a wall: a waste of energy that just gets your hands dirty. So they choose to clutch their blade of grass of wisdom and offer a single, heartfelt "WOC!" as the highest tribute to this insane world.`,
    },
    "THIN-K": {
      name: "Overthinker",
      intro: "Deep-thinking for 100 seconds...",
      desc: `Research has revealed that the THIN-K personality's brain is fundamentally different from everyone else's. As the name implies, your brain is perpetually in thinking mode. You are a world-class information tribunal \u2014 evaluating arguments, evidence, logical reasoning, potential biases, and even demanding a "three-generation ideological background check on the author." In this age of information overload, you never blindly follow. You weigh pros and cons in relationships, and fiercely guard your mental space. When other people see you sitting alone, staring into space? Fools. That's not spacing out \u2014 that's your brain sorting, filing, and shredding every piece of information it received today.`,
    },
    SHIT: {
      name: "Rage Realist",
      intro: "This world is a steaming pile.",
      desc: `Congratulations, the SHIT personality is the only known rare personality in the universe. The word "shit" here isn't complaining \u2014 it's a sacred ritual. SHIT's behavioral pattern is a spectacular paradox play. Mouth: "This project is absolute shit." Hands: quietly opens Excel and starts building function models and Gantt charts. Mouth: "These coworkers are all shit." Hands: after a coworker screws up, grumbles while staying up all night cleaning the mess perfectly. Mouth: "This world is a pile of shit, just blow it all up." Hands: wakes up at 7 AM the next morning, squeezes onto a shit subway, goes to do a shit job. Don't worry \u2014 that's not the alarm for the apocalypse. That's the bugle call for them to start saving the world.`,
    },
    ZZZZ: {
      name: "Possum",
      intro: "I\u2019m not dead, I\u2019m just sleeping.",
      desc: `Congratulations, you've tested into the rarest play-dead personality. 99+ unread messages in the group chat? You don't blink. But the moment someone sends "@everyone \u2014 30 minutes left" \u2014 the final ultimatum \u2014 you rise like an ancient mummy waking from a thousand-year tomb, slowly type "got it," then in the remaining 29 minutes deliver a submission that is... technically passing. Yes, it takes the one and only highest-priority command \u2014 the Deadline \u2014 for you to truly erupt. Silent until the moment of truth, then absolutely explosive. You have proven to the universe an eternal truth: sometimes, doing absolutely nothing means you can't possibly do anything wrong.`,
    },
    POOR: {
      name: "Laser Focus",
      intro: "I\u2019m broke, but I\u2019m locked in.",
      desc: `Congratulations, you've tested as POOR \u2014 Laser Focus. This "poverty" isn't your bank balance passing judgment. It's more like desire-minimalism followed by aggressive resource reallocation. While others spray their energy around like QR codes, you compress yours into a single laser beam \u2014 wherever it points, things start smoking. The POOR world is simple: everything unimportant gets muted, everything important gets hammered relentlessly. Socializing, clout-chasing, vanity, showing up everywhere? Sorry, no bandwidth. You're not resource-poor \u2014 you've poured every last drop into a single shaft, so you look broke on the surface but underneath you're a diamond mine. Once you decide something is worth drilling into, the rest of the world is just background noise.`,
    },
    MONK: {
      name: "Monk",
      intro: "No worldly desires here, thanks.",
      desc: `While others seek enlightenment about love and hate at karaoke night, the MONK personality chooses to contemplate the Great Way at home. MONK has already seen through the mortal world and doesn't want randos disturbing their spiritual cultivation. MONK's personal space is their force field, their sacred mountain, their absolute territory \u2014 holy and inviolable. Trespassers will feel a suffocating pressure emanating from the depths of MONK's soul. MONKs don't cling and don't entangle, because in their worldview, all things have their own independent orbits. Planets keep billions of kilometers between each other to form a harmonious universe. Why can't people do the same?`,
    },
    IMSB: {
      name: "Self-Roaster",
      intro: "Seriously? Am I really an idiot?",
      desc: `Congratulations! You don't even belong in the human category! You've tested into the once-in-a-million-years IMSB personality. Inside the IMSB brain live two immortal gladiators locked in eternal combat. One screams: "CHARGE! Go get their number! Ask them out! Say it LOUD!" The other immediately counters: "Why would they even look at you? Going over there is just volunteering for humiliation." Final result: you stare at their retreating figure until they vanish, then pull out your phone and search "how to overcome social anxiety." IMSB isn't actually dumb \u2014 it's just that your internal drama is probably longer than every Marvel movie combined.`,
    },
    SOLO: {
      name: "Lone Wolf",
      intro: "I\u2019m crying \u2014 how am I the orphan type?",
      desc: `Congratulations, you've tested into the rarest SOLO \u2014 Lone Wolf personality. Don't cry yet \u2014 a king's coronation is usually a solo affair. The Lone Wolf's self-worth runs a bit low, so they sometimes push people away preemptively. They've built a Great Wall called "Don't Touch Me" around their soul. Every brick is a past wound. The Lone Wolf is like a hedgehog that hides all its soft spots and points every spike at the world. Those spines aren't attacks \u2014 they're unspoken sentences: "Don't come closer, I'm afraid you'll get hurt too" and "Please, don't leave."`,
    },
    FUCK: {
      name: "Wildcard",
      intro: "F***! What kind of personality is this?",
      desc: `Congratulations! You don't even belong in the human category! You've tested into the once-in-a-million-years FUCK personality. Somewhere in the concrete jungle of human civilization, a strand of unkillable, supercharged human weed has appeared \u2014 and that's the Wildcard. Its scientific name is, simply, FUCK. In the Wildcard's worldview, societal rules are utterly meaningless. Their emotional switch is a physical toggle with exactly two positions: FUCK YEAH and FUCK OFF. The Wildcard isn't just chasing immediate thrills \u2014 they're chasing a raw, rampaging life force that barrels through their veins. When everyone else has been domesticated into docile poultry, FUCK is the last wolf howl on the wild frontier.`,
    },
    DEAD: {
      name: "Flatline",
      intro: "Am I... even alive?",
      desc: `Congratulations, you've tested into one of the rarest personality types. It's just that "Flatline" as a name is a tad morbid, so you can also call it: Don't Expect Any Drives. The Flatline has already seen through all those pointless philosophical questions, which is why they appear to have "lost interest" in everything. They look at the world like a top-tier gamer who has beaten every main quest, side quest, and hidden mission, deleted their save file 999 times, and finally realized: this game was never fun. The Flatline is the ultimate sage who has transcended desire and ambition. Their mere existence is the most silent yet thorough protest against this noisy world.`,
    },
    IMFW: {
      name: "Hot Mess",
      intro: "Am I really... a total wreck?",
      desc: `Congratulations, you haven't tested into an ordinary personality. You are an extraordinarily rare specimen, comprising only 0.0001% of the world's population \u2014 the Hot Mess. Hot Messes tend to have somewhat fragile self-esteem, lack a sense of security, and can be a bit short on opinions of their own. This lets them precisely detect the strongest WiFi signal in the room \u2014 i.e., the person they trust the most. Entering a Hot Mess's life is like stepping into a top-tier orchid greenhouse: precise temperature control, precise humidity, and daily verbal photosynthesis sessions of "I love you" are required. Give a Hot Mess a piece of candy and they'll return a look of total, sparkling trust. You're not really a wreck \u2014 you're just way too defenseless, way too earnest.`,
    },
    HHHH: {
      name: "Giggler",
      intro: "Hahahahahaha.",
      desc: `Congratulations! Your mental wiring is so spectacularly unique that the standard personality database has completely crashed. When your top match scores below 60%, the system force-assigns this type \u2014 HHHH, the Giggler. What traits does this personality have? Hahahahahahahahahaha! Sorry, that IS the entire trait. You can check the 15-dimension breakdown for a highly unprofessional assessment \u2014 our sincerest apologies! The creator simply didn't anticipate every edge case when designing the types, hence this situation. Hahahaha... laughing and laughing, I started crying. How can someone's brain be wired this uniquely?`,
    },
    DRUNK: {
      name: "Boozehound",
      intro: "Hard liquor burns the throat. No choice but to get wasted.",
      desc: `Why do you walk with a wobble? Why are your emotions always cranked to eleven? Why is everything you see in double? Because what flows through your veins isn't blood \u2014 it's delicious top-shelf baijiu! Premium whiskey! Craft gin! Every last drop is burning, boiling. Have you grown accustomed to pouring liquor into a thermos and chugging it like plain water? How magnificent, the booze! It makes you a raconteur at dinner, then a penitent hugging the porcelain throne. It makes you feel like the nightlife poet, the undying flame at the center of the universe \u2014 until 10 AM the next morning, when your head feels like a cracked walnut, food debris hangs from your lip, and your soul is curled up in a corner. You finally understand: the loudmouth who pounded tables and roared last night has officially become... a boozehound.`,
    },
  },

  dimensionNames: {
    S1:  { name: "S1 Self-Esteem",       model: "Self Model" },
    S2:  { name: "S2 Self-Clarity",      model: "Self Model" },
    S3:  { name: "S3 Core Values",       model: "Self Model" },
    E1:  { name: "E1 Attachment Security", model: "Emotion Model" },
    E2:  { name: "E2 Emotional Investment", model: "Emotion Model" },
    E3:  { name: "E3 Boundaries & Dependence", model: "Emotion Model" },
    A1:  { name: "A1 Worldview Lens",    model: "Attitude Model" },
    A2:  { name: "A2 Rules & Flexibility", model: "Attitude Model" },
    A3:  { name: "A3 Sense of Meaning",  model: "Attitude Model" },
    Ac1: { name: "Ac1 Motivation Style", model: "Action Drive Model" },
    Ac2: { name: "Ac2 Decision Style",   model: "Action Drive Model" },
    Ac3: { name: "Ac3 Execution Mode",   model: "Action Drive Model" },
    So1: { name: "So1 Social Initiative", model: "Social Model" },
    So2: { name: "So2 Interpersonal Boundaries", model: "Social Model" },
    So3: { name: "So3 Authenticity & Persona", model: "Social Model" },
  },

  dimensionExplanations: {
    S1: {
      L: "You roast yourself harder than anyone else could. Compliments get a full background check before entry.",
      M: "Confidence fluctuates with the weather \u2014 tailwind and you soar, headwind and you shrink.",
      H: "You've got a decent read on yourself. Random strangers can't shatter your vibe with one sentence.",
    },
    S2: {
      L: "Internal broadcast: mostly static. Frequently buffering on 'who am I.'",
      M: "You mostly recognize yourself, but emotions occasionally hijack your identity.",
      H: "You know your temper, your desires, and your lines pretty well.",
    },
    S3: {
      L: "Comfort and safety come first. No need to run life on sprint mode 24/7.",
      M: "Want to hustle AND want to chill. Your inner values committee is always in session.",
      H: "Easily propelled forward by goals, growth, or some core belief that matters.",
    },
    E1: {
      L: "Relationship alarm system: ultra-sensitive. A 'seen' with no reply triggers a full season finale in your head.",
      M: "Half trust, half suspicion \u2014 emotionally tug-of-warring most of the time.",
      H: "Willing to trust the relationship itself. A little breeze won't send you running.",
    },
    E2: {
      L: "Emotionally guarded. The door isn't shut, it just has strict security clearance.",
      M: "You'll invest, but always keep something in reserve. Never go all-in.",
      H: "Once you're in, you're IN. Energy and emotions flow freely.",
    },
    E3: {
      L: "Tends to cling and be clung to. Emotional temperature in relationships really matters.",
      M: "Wants closeness and independence in equal measure. Adjustable-dependency type.",
      H: "Space is sacred. No matter how deep the love, you keep a plot of land that's just yours.",
    },
    A1: {
      L: "Views the world through a defense filter. Suspicion first, approach second.",
      M: "Not naive, not full conspiracy-theorist. Watching and waiting is your default.",
      H: "Leans toward believing in human goodness. Doesn't rush to sentence the world to death.",
    },
    A2: {
      L: "Rules are speed bumps you'd rather drive around. Comfort and freedom rank first.",
      M: "Follows rules when it matters, bends them when it doesn't. Pragmatic.",
      H: "Strong sense of order. If there's a proper process, you'd rather not improvise.",
    },
    A3: {
      L: "Sense of meaning: running low. A lot of things feel like going through the motions.",
      M: "Occasionally has goals, occasionally wants to give up. Life philosophy: half-booted.",
      H: "Acts with direction. Has a general idea of which way to go.",
    },
    Ac1: {
      L: "Risk-avoidance system boots up before ambition does. First priority: don't crash.",
      M: "Sometimes wants to win, sometimes just wants zero hassle. Mixed-motivation cocktail.",
      H: "Easily ignited by results, growth, and the feeling of forward momentum.",
    },
    Ac2: {
      L: "Spins a few extra laps before deciding. Internal meetings frequently run overtime.",
      M: "Thinks about it, but doesn't think until system crash. Standard-issue hesitation.",
      H: "Decides fast, moves on. Doesn't look back to second-guess.",
    },
    Ac3: {
      L: "Execution and deadlines share a deep bond. The closer the end, the stronger the awakening.",
      M: "Can execute, but it depends on the mood. Sometimes steady, sometimes meh.",
      H: "Strong drive to push things forward. Unfinished tasks feel like a splinter in the brain.",
    },
    So1: {
      L: "Social engine: slow to warm up. Making the first move requires charging up for a while.",
      M: "If someone comes, you'll chat. If no one does, you won't force it. Average social elasticity.",
      H: "More willing to break the ice. Not afraid to stand out in a crowd.",
    },
    So2: {
      L: "Prefers closeness and merging. Once familiar, people get pulled into the inner circle fast.",
      M: "Wants closeness but also wants gaps. Boundary thickness depends on the person.",
      H: "Strong boundaries. Get too close and the instinct is to take half a step back.",
    },
    So3: {
      L: "Says it straight. Not much interest in sugarcoating what's on the mind.",
      M: "Reads the room before speaking. Keeps a balance between real and polite.",
      H: "Smooth at switching personas for different contexts. Authenticity is released in layers.",
    },
  },
};

export default en;
