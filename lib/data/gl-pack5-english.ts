/**
 * GL Variety Pack Test 5 - English Questions
 * Comprehension, vocabulary, spelling, grammar, and punctuation
 */

export type EnglishQuestionType =
  | 'comprehension'      // Reading comprehension
  | 'vocabulary'         // Word meanings
  | 'grammar'           // Grammar and word types
  | 'spelling'          // Find spelling mistakes
  | 'punctuation'       // Capitals and punctuation
  | 'cloze'             // Fill in the blank

export type EnglishQuestion = {
  id: string
  type: EnglishQuestionType
  passage?: string        // Reference to passage name
  lineReference?: string  // Line number reference if applicable
  question: string
  options: string[]
  answer: string          // The correct answer (A, B, C, D, E, or N for no mistake)
  explanation?: string
}

// ============================================================================
// PASSAGE 1: "The Day Alfie Learned to Fly"
// Questions 1-26
// ============================================================================

export const passage1Text = `The Day Alfie Learned to Fly

Alfie wasn't really a model pupil. He never received glowing school reports, despite his best intentions, and his clumsiness had often got him into trouble. On Tuesday, he had been sent to the headteacher for dropping his pet lizard into Mr Manley's yogurt. On Wednesday, he had been thrown out of the technology room for trying to balance frying pans on his head while Mrs Beavers was demonstrating how to make the perfect apple pie. The next day, however, he decided that he was going to impress his teachers by coming to school early.

OK, it was only two minutes early (he didn't want to overdo it), but he thought it was a fair effort nonetheless. Alfie sat at his desk and quickly felt himself growing bored. Perhaps it hadn't been such a good idea to arrive early. As he waited for the rest of the class to drip in, Alfie started humming a tune to himself. He then started flapping his arms up and down, casually, just as a way of keeping rhythm with his own tune.

And that's how Alfie discovered he could fly!

The chair creaked below him and angled backwards as his weight was lifted 20 or 30 centimetres into the air. Alfie was so astonished that he drew his arms protectively against his chest and, lacking propulsion, fell back down onto his chair. He sat very still for a moment and then extended his arms out to try again. However, before he could do anything, the door slammed open and his classmates streamed into the room. Alfie thought it best to postpone the experiment.

On Friday, Alfie went into his classroom early once more. This time he was a full half-hour early, which meant that he was going to miss most of his lunch break, but he decided it was worth it. He stood on his chair, bent his knees, extended his arms like the wings of a plane, and flapped them up and down. His entire body rose upwards until he had almost reached the ceiling. THWACK! His head bumped into the light with such force that he plummeted down and crashed into a display of African flags and maps. He spent the rest of the half-hour putting everything back into place.

When Mrs Buckley came in and asked how he had got that bruise on his forehead, Alfie told her that he had banged his head against the light. Predictably, he was thrown out of the class.

For the rest of term, Alfie always went into his classroom as early as he could. Within a couple of weeks, he had developed enough control to hover around the classroom without banging his head into the ceiling and walls. At the end of the month, he opened the window and, with his heart in his mouth, took the great leap. He found that flying outside was even easier than it was in the classroom and he quickly reached his house, bouncing from one icy rooftop to another. He saw his mother in the kitchen, but she was too busy to notice, and then he had to return to his class.

The weeks passed, and every time he flew, Alfie became more daring in his explorations. He soared out and over the city, side by side with the crows and the sparrows. He floated over gushing rivers and dodged stormy rain clouds. He reached the English Channel and crossed over into France, and he saw the great capitals of Europe – Paris, Rome and Berlin. He flew above an oil tanker, alongside seagulls, off the shores of the Atlantic and glided down until he could feel the froth spraying on his cheeks.

Unfortunately, one day he stayed out of school too long and as he stepped back onto the ledge of the window, he found his entire class staring at him. Mr Smart, Alfie's teacher, had eyes as wide as dinner plates.

'Alfie Armstrong!' he exclaimed. 'You can fly!'

'No, not really,' Alfie tried to excuse himself. 'I was just taking a look out here, off the window ledge ...'

'What are you talking about? You can fly, Alfie, you can fly!'

Immediately he assigned Alfie an extra essay on the history of flight. Word spread as fast as lightning, and soon Alfie was given lots of extra homework. He was asked to solve mathematical equations on flying and birds and the sky. His classmates also started using him for their little tasks. They sent him flying to fetch the ball when it was kicked over the playground fence or when it landed in the branches of some tree.

Days passed and eventually word reached Mr Varley, the headteacher, who decided to organise an event for television. The idea was to show the world how Alfie could fly and bring prestige to the school.

'But I don't want to go on TV,' protested Alfie. It was to no avail.

The big day finally came. Alfie stood on a trampoline in the playground and stared at the TV cameras, pupils and teachers, who were watching in anticipation. Alfie took a deep breath, flapped his arms and leapt into the air. It didn't work; he could no longer fly! Alfie fell, spraining his ankle. He grimaced in pain. The TV crew were furious and a great row erupted with the headteacher. All the teachers were very disappointed. For a few days afterwards, Alfie was on the receiving end of a number of angry remarks.

But things soon settled down, as they always do. Alfie's routine quickly returned to normal and he stopped going to school early. Once, however, he was slow clearing up his books and he found that he had been left alone in the classroom. He looked all around and then spread his arms and flapped them softly. He felt his body rising gently from the tiles on the floor, a few centimetres at most. Then it settled back down. Alfie hugged the discovery tightly and smiled inwardly as he left class.`

export const passage1Questions: EnglishQuestion[] = [
  // Comprehension Questions (Q1-18)
  {
    id: 'eng5-q1',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Why was Alfie often in trouble?',
    options: [
      'A. He arrived late for school.',
      'B. He could fly.',
      'C. He was clumsy.',
      'D. He got poor school reports.',
      'E. He bounced on the rooftops.'
    ],
    answer: 'C',
    explanation: 'The passage states "his clumsiness had often got him into trouble".'
  },
  {
    id: 'eng5-q2',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'At the start of the story, why did Alfie flap his arms?',
    options: [
      'A. To keep in rhythm',
      'B. To keep in tune',
      'C. He was hot',
      'D. To help him fly',
      'E. To be an aeroplane'
    ],
    answer: 'A',
    explanation: 'The passage says "flapping his arms up and down, casually, just as a way of keeping rhythm with his own tune".'
  },
  {
    id: 'eng5-q3',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'On which day did Alfie learn to fly?',
    options: [
      'A. Monday',
      'B. Tuesday',
      'C. Wednesday',
      'D. Thursday',
      'E. Friday'
    ],
    answer: 'D',
    explanation: 'Tuesday was the lizard incident, Wednesday the frying pans, "The next day" (Thursday) he came early and discovered he could fly.'
  },
  {
    id: 'eng5-q4',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'When Alfie first flew, why did he fall back down into the chair?',
    options: [
      'A. He hit his head on the light.',
      'B. He wasn\'t very good at flying.',
      'C. He stopped flapping his arms.',
      'D. He tripped over.',
      'E. The rest of the class came in.'
    ],
    answer: 'C',
    explanation: 'The passage says "he drew his arms protectively against his chest and, lacking propulsion, fell back down".'
  },
  {
    id: 'eng5-q5',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Why did Mrs Buckley send Alfie out of the classroom?',
    options: [
      'A. He banged his head on the light.',
      'B. He knocked over the flags and maps.',
      'C. She thought he had a headache.',
      'D. He put a lizard in her yogurt.',
      'E. She thought he was lying.'
    ],
    answer: 'B',
    explanation: 'After hitting the light, Alfie "crashed into a display of African flags and maps". When Mrs Buckley came in and Alfie explained, he was thrown out.'
  },
  {
    id: 'eng5-q6',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Why did Alfie keep coming to school early?',
    options: [
      'A. To impress his teachers',
      'B. To practise aeronautics',
      'C. To practise humming',
      'D. To keep out of trouble',
      'E. To make sure he wasn\'t late'
    ],
    answer: 'B',
    explanation: 'After discovering he could fly, Alfie came early to practise flying (aeronautics) in the empty classroom.'
  },
  {
    id: 'eng5-q7',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'How long did Alfie practise before taking his first flight outside?',
    options: [
      'A. A few minutes',
      'B. 3 or 4 hours',
      'C. A couple of days',
      'D. 3 or 4 weeks',
      'E. A couple of months'
    ],
    answer: 'D',
    explanation: '"Within a couple of weeks" he could hover, then "At the end of the month" he flew outside - about 3-4 weeks total.'
  },
  {
    id: 'eng5-q8',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Who is Mr Smart?',
    options: [
      'A. Alfie\'s class teacher',
      'B. The cookery teacher',
      'C. The headteacher',
      'D. The TV presenter',
      'E. Alfie\'s mother'
    ],
    answer: 'A',
    explanation: 'The passage states "Mr Smart, Alfie\'s teacher" when he sees Alfie return through the window.'
  },
  {
    id: 'eng5-q9',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'What was the weather like on Alfie\'s first flying trip outside?',
    options: [
      'A. Sunny',
      'B. Rainy',
      'C. Snowy',
      'D. Cloudy',
      'E. Stormy'
    ],
    answer: 'C',
    explanation: 'The passage mentions "bouncing from one icy rooftop to another" indicating snowy/icy weather.'
  },
  {
    id: 'eng5-q10',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Which of these two things did Alfie see on his flying trips?\n1. His house\n2. Blackbirds\n3. Cows\n4. London\n5. Paris',
    options: [
      'A. 1 and 2 only',
      'B. 1 and 3 only',
      'C. 4 and 5 only',
      'D. 1 and 4 only',
      'E. 1 and 5 only'
    ],
    answer: 'E',
    explanation: 'The passage mentions "he quickly reached his house" and "Paris, Rome and Berlin" but not London, blackbirds, or cows.'
  },
  {
    id: 'eng5-q11',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'When Alfie\'s school discovered that he could fly, which of the following is true?',
    options: [
      'A. Alfie became world famous.',
      'B. Alfie became rich.',
      'C. Alfie became very busy.',
      'D. Alfie got into trouble with his teachers.',
      'E. Alfie came top in maths.'
    ],
    answer: 'C',
    explanation: 'Alfie was given extra homework, essays, and his classmates used him for tasks - he became very busy.'
  },
  {
    id: 'eng5-q12',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Which of these tasks was Alfie NOT given?',
    options: [
      'A. Extra maths homework',
      'B. Extra English homework',
      'C. Extra history homework',
      'D. Fetching the ball from the rooftop',
      'E. Fetching the ball from the tree'
    ],
    answer: 'C',
    explanation: 'The passage mentions maths equations, an essay (English), fetching balls from fence and tree branches, but NOT history homework.'
  },
  {
    id: 'eng5-q13',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'How did Alfie feel about being filmed?',
    options: [
      'A. Unwilling',
      'B. Excited',
      'C. Proud',
      'D. Ecstatic',
      'E. Suspicious'
    ],
    answer: 'A',
    explanation: '"But I don\'t want to go on TV," protested Alfie" shows he was unwilling.'
  },
  {
    id: 'eng5-q14',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'line 102',
    question: 'Why did Alfie take a \'deep breath\' (line 102)?',
    options: [
      'A. To help him concentrate',
      'B. To give him more energy',
      'C. He was out of breath',
      'D. To help him fly',
      'E. To smell the fresh air'
    ],
    answer: 'A',
    explanation: 'Taking a deep breath before attempting something difficult helps with concentration and calms nerves.'
  },
  {
    id: 'eng5-q15',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'How do you think Alfie feels when he is about to fly in front of the TV crew?',
    options: [
      'A. Apathetic',
      'B. Apprehensive',
      'C. Arrogant',
      'D. Ravenous',
      'E. Relaxed'
    ],
    answer: 'B',
    explanation: 'Alfie didn\'t want to do it and the description of him taking a deep breath suggests he was apprehensive (anxious/worried).'
  },
  {
    id: 'eng5-q16',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Why were the TV crew furious?',
    options: [
      'A. Because the headteacher shouted at them',
      'B. Because Alfie fell on the cameras',
      'C. Because they had wasted their time',
      'D. Because Alfie was hurt',
      'E. Because they missed Alfie flying'
    ],
    answer: 'C',
    explanation: 'The TV crew came to film a flying boy but he couldn\'t fly - they wasted their time coming for nothing.'
  },
  {
    id: 'eng5-q17',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Which of the following newspaper headlines is most likely to have been printed?',
    options: [
      'A. Boy amazes school with flying skills',
      'B. Headteacher praises young flyer',
      'C. Girl sprains ankle in flying disaster',
      'D. Boy flies to Paris and Rome',
      'E. Armstrong flight is a flop'
    ],
    answer: 'A',
    explanation: 'Before the TV incident, word had spread about Alfie\'s flying - "Boy amazes school with flying skills" would be the likely headline.'
  },
  {
    id: 'eng5-q18',
    type: 'comprehension',
    passage: 'The Day Alfie Learned to Fly',
    question: 'Why do you think Alfie smiles at the end of the story?',
    options: [
      'A. He is going to be famous.',
      'B. He will be on television.',
      'C. He heard a joke.',
      'D. He has a secret.',
      'E. He will get into trouble because he can fly again.'
    ],
    answer: 'D',
    explanation: '"Alfie hugged the discovery tightly and smiled inwardly" - he smiles because he has a secret that he can still fly.'
  },

  // Vocabulary Questions (Q19-22)
  {
    id: 'eng5-q19',
    type: 'vocabulary',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'line 32',
    question: 'Which of these is closest in meaning to \'postpone\' (line 32)?',
    options: [
      'A. Start',
      'B. Delay',
      'C. Finish',
      'D. Continue',
      'E. Send'
    ],
    answer: 'B',
    explanation: 'Postpone means to delay or put off until later.'
  },
  {
    id: 'eng5-q20',
    type: 'vocabulary',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'lines 75-76',
    question: 'What is meant by the expression \'Mr Smart, Alfie\'s teacher, had eyes as wide as dinner plates\' (lines 75-76)?',
    options: [
      'A. Mr Smart\'s eyes were very big.',
      'B. Mr Smart\'s eyes looked like dinner plates.',
      'C. Mr Smart\'s eyes were shiny.',
      'D. Mr Smart\'s eyes were bigger than saucers.',
      'E. Mr Smart wanted his dinner.'
    ],
    answer: 'A',
    explanation: 'This simile means Mr Smart\'s eyes opened very wide in shock/amazement at seeing Alfie fly.'
  },
  {
    id: 'eng5-q21',
    type: 'vocabulary',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'line 95',
    question: 'Which of these is closest in meaning to \'prestige\' (line 95)?',
    options: [
      'A. Celebrities',
      'B. Scorn',
      'C. Fame',
      'D. Esteem',
      'E. Disgrace'
    ],
    answer: 'D',
    explanation: 'Prestige means respect, esteem, or high standing. While "fame" is close, "esteem" is the closest synonym.'
  },
  {
    id: 'eng5-q22',
    type: 'vocabulary',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'lines 101-102',
    question: 'Which of these is closest to the description \'watching in anticipation\' (lines 101-102)?',
    options: [
      'A. Eagerly waiting to see what will happen',
      'B. Enthusiastically looking at what has happened',
      'C. Impatiently waiting to see what will happen',
      'D. Patiently waiting to see what happens',
      'E. Watching nervously'
    ],
    answer: 'A',
    explanation: 'Watching in anticipation means eagerly waiting to see what will happen next.'
  },

  // Grammar Questions (Q23-26)
  {
    id: 'eng5-q23',
    type: 'grammar',
    passage: 'The Day Alfie Learned to Fly',
    question: 'What type of words are these?\n\nAlfie    Rome    Mrs Beavers    Thursday',
    options: [
      'A. Verbs',
      'B. Pronouns',
      'C. Common nouns',
      'D. Proper nouns',
      'E. Adjectives'
    ],
    answer: 'D',
    explanation: 'These are all proper nouns - names of specific people, places, and days.'
  },
  {
    id: 'eng5-q24',
    type: 'grammar',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'lines 83-84',
    question: '\'Word spread as fast as lightning\' (lines 83-84). Select one answer that best describes this quotation.',
    options: [
      'A. A phrase',
      'B. A description',
      'C. A simile',
      'D. A proverb',
      'E. A metaphor'
    ],
    answer: 'C',
    explanation: 'This is a simile - it compares two things using "as" (spread AS FAST AS lightning).'
  },
  {
    id: 'eng5-q25',
    type: 'grammar',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'lines 62-64',
    question: '\'He soared out and over the city, side by side with the crows and the sparrows\' (lines 62-64). Which of these words is a verb?',
    options: [
      'A. He',
      'B. Soared',
      'C. Out',
      'D. Over',
      'E. Sparrows'
    ],
    answer: 'B',
    explanation: 'Soared is the verb (action word) - it describes what Alfie did.'
  },
  {
    id: 'eng5-q26',
    type: 'grammar',
    passage: 'The Day Alfie Learned to Fly',
    lineReference: 'line 40',
    question: 'What type of word is \'THWACK\' (line 40)?',
    options: [
      'A. Homonym',
      'B. Metaphor',
      'C. Simile',
      'D. Onomatopoeia',
      'E. Acronym'
    ],
    answer: 'D',
    explanation: 'THWACK is onomatopoeia - a word that imitates the sound it describes.'
  }
]

// ============================================================================
// PASSAGE 2: "Party Time!" - Spelling mistakes
// Questions 27-34
// ============================================================================

export const passage2Questions: EnglishQuestion[] = [
  {
    id: 'eng5-q27',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'I would like you to come to my twelveth birthday party on Saturday. Everyone\'s going to meet',
    options: ['A. twelveth', 'B. birthday', 'C. Saturday', 'D. Everyone\'s', 'N. No mistake'],
    answer: 'A',
    explanation: 'twelveth should be "twelfth"'
  },
  {
    id: 'eng5-q28',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'at the leisure centre at 10. My party will start with a privite session in the pool. There\'ll be',
    options: ['A. privite', 'B. session', 'C. pool', 'D. There\'ll', 'N. No mistake'],
    answer: 'A',
    explanation: 'privite should be "private"'
  },
  {
    id: 'eng5-q29',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'giant inflatible toys and the wave machine should be working. If anyone is brave enough, there',
    options: ['A. inflatible', 'B. machine', 'C. working', 'D. enough', 'N. No mistake'],
    answer: 'A',
    explanation: 'inflatible should be "inflatable"'
  },
  {
    id: 'eng5-q30',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'might be a chance to jump off the high diving bored! My mum will treat us all to lunch at',
    options: ['A. chance', 'B. diving', 'C. bored', 'D. treat', 'N. No mistake'],
    answer: 'C',
    explanation: 'bored should be "board" (diving board)'
  },
  {
    id: 'eng5-q31',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'Franco\'s – a yummy Italian restaurant that\'s just openned nearby. They definitely serve some',
    options: ['A. yummy', 'B. openned', 'C. nearby', 'D. definitely', 'N. No mistake'],
    answer: 'B',
    explanation: 'openned should be "opened"'
  },
  {
    id: 'eng5-q32',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'vegetarian dishes, so Katy won\'t starve! My party will finish with a trip to the cinema to',
    options: ['A. vegetarian', 'B. starve', 'C. finish', 'D. cinema', 'N. No mistake'],
    answer: 'N',
    explanation: 'No spelling mistake on this line.'
  },
  {
    id: 'eng5-q33',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'see the sequel to the Astro Rangers movies (Mission to Mars). It\'s supposed to be briliant!',
    options: ['A. sequel', 'B. Rangers', 'C. briliant', 'D. supposed', 'N. No mistake'],
    answer: 'C',
    explanation: 'briliant should be "brilliant"'
  },
  {
    id: 'eng5-q34',
    type: 'spelling',
    passage: 'Party Time!',
    question: 'I am desparate to know if you can come, so please reply as soon as possible!',
    options: ['A. desparate', 'B. reply', 'C. soon', 'D. possible', 'N. No mistake'],
    answer: 'A',
    explanation: 'desparate should be "desperate"'
  }
]

// ============================================================================
// PASSAGE 3: "The Hole" - Grammar/Cloze
// Questions 35-42
// ============================================================================

export const passage3Questions: EnglishQuestion[] = [
  {
    id: 'eng5-q35',
    type: 'cloze',
    passage: 'The Hole',
    question: 'The residents of Canley Grange were shocked to discover a massive hole ___ the middle of Canley Park.',
    options: ['A. on', 'B. under', 'C. in', 'D. from', 'E. over'],
    answer: 'C',
    explanation: '"in the middle" is the correct preposition phrase.'
  },
  {
    id: 'eng5-q36',
    type: 'cloze',
    passage: 'The Hole',
    question: 'Nobody ___ when it appeared.',
    options: ['A. knew', 'B. new', 'C. knowed', 'D. known', 'E. has known'],
    answer: 'A',
    explanation: '"knew" is the correct past tense of "know".'
  },
  {
    id: 'eng5-q37',
    type: 'cloze',
    passage: 'The Hole',
    question: 'It definitely wasn\'t ___ when Bob Jenkins',
    options: ['A. they\'re', 'B. their', 'C. there\'s', 'D. there', 'E. then'],
    answer: 'D',
    explanation: '"there" is the correct word meaning "in that place".'
  },
  {
    id: 'eng5-q38',
    type: 'cloze',
    passage: 'The Hole',
    question: 'had ___ Bandit out for his evening walk',
    options: ['A. brought', 'B. brung', 'C. taked', 'D. took', 'E. taken'],
    answer: 'D',
    explanation: '"had took" is incorrect; the sentence structure requires "took" (simple past).'
  },
  {
    id: 'eng5-q39',
    type: 'cloze',
    passage: 'The Hole',
    question: 'last night. ___, Vikram was sure that everything was still normal this morning when he delivered the early morning',
    options: ['A. However,', 'B. Nevertheless,', 'C. Furthermore,', 'D. Because', 'E. Whereas,'],
    answer: 'A',
    explanation: '"However" is used to introduce a contrasting statement.'
  },
  {
    id: 'eng5-q40',
    type: 'cloze',
    passage: 'The Hole',
    question: 'papers. So when ___ it appear? Mrs Snape,',
    options: ['A. would', 'B. could', 'C. does', 'D. did', 'E. should'],
    answer: 'D',
    explanation: '"did" is the correct auxiliary verb for a past tense question.'
  },
  {
    id: 'eng5-q41',
    type: 'cloze',
    passage: 'The Hole',
    question: '___ husband was Detective Snape, quickly took charge.',
    options: ['A. who\'s', 'B. whose', 'C. who', 'D. whom', 'E. what'],
    answer: 'B',
    explanation: '"whose" is the possessive relative pronoun needed here.'
  },
  {
    id: 'eng5-q42',
    type: 'cloze',
    passage: 'The Hole',
    question: '\'___ must stay well back until the police arrive!\' she ordered.',
    options: ['A. \'All', 'B. \'Each', 'C. \'Everybody', 'D. \'No one', 'E. \'Nobody'],
    answer: 'C',
    explanation: '"Everybody" fits the context and is followed by "must stay".'
  }
]

// ============================================================================
// PASSAGE 4: "Oh, Yes, You Can!" - Punctuation/Capitals
// Questions 43-50
// ============================================================================

export const passage4Questions: EnglishQuestion[] = [
  {
    id: 'eng5-q43',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'Are you aged 10 to 14 years? Do you want to perform on stage? If your answers are yes, read on?',
    options: ['A. years?', 'B. stage?', 'C. answers', 'D. yes,', 'N. No mistake'],
    answer: 'N',
    explanation: 'No punctuation or capitalisation mistake on this line.'
  },
  {
    id: 'eng5-q44',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'Mardon Drama Club is looking for talented young people to join the cast of their next production;',
    options: ['A. Drama', 'B. talented', 'C. production;', 'D. their', 'N. No mistake'],
    answer: 'C',
    explanation: 'The semicolon should be a colon or comma before introducing "Snow White".'
  },
  {
    id: 'eng5-q45',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'Snow white. Some acting and dancing experience, although desirable, is not essential. Auditions',
    options: ['A. Snow white', 'B. acting', 'C. desirable,', 'D. essential.', 'N. No mistake'],
    answer: 'A',
    explanation: '"Snow white" should be "Snow White" - both words capitalised as a proper noun/title.'
  },
  {
    id: 'eng5-q46',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'will take place in Mardon Playhouse (Stage 1) next Saturday at 2 o\'clock. During the audition you will',
    options: ['A. Playhouse', 'B. (Stage 1)', 'C. Saturday', 'D. o\'clock.', 'N. No mistake'],
    answer: 'N',
    explanation: 'No punctuation or capitalisation mistake on this line.'
  },
  {
    id: 'eng5-q47',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'be asked to sing, dance, and act in small groups. You may also be selected to read a short piece',
    options: ['A. sing,', 'B. dance,', 'C. groups.', 'D. selected', 'N. No mistake'],
    answer: 'N',
    explanation: 'No punctuation or capitalisation mistake on this line.'
  },
  {
    id: 'eng5-q48',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'from the script, but no preparation is necessary. Successful performers\' will be notified during',
    options: ['A. script,', 'B. necessary.', 'C. performers\'', 'D. notified', 'N. No mistake'],
    answer: 'C',
    explanation: '"performers\'" should be "performers" - no apostrophe needed as it\'s a simple plural, not possessive.'
  },
  {
    id: 'eng5-q49',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'the following week. Bill Hartwell, the clubs director, says, \'The pantomime of Snow White is a',
    options: ['A. week.', 'B. clubs', 'C. director,', 'D. \'The', 'N. No mistake'],
    answer: 'B',
    explanation: '"clubs" should be "club\'s" - possessive form needed (the director of the club).'
  },
  {
    id: 'eng5-q50',
    type: 'punctuation',
    passage: 'Oh, Yes, You Can!',
    question: 'firm family favourite and this year\'s production is set to enchant everyone who comes to see it\'',
    options: ['A. favourite', 'B. year\'s', 'C. set', 'D. it\'', 'N. No mistake'],
    answer: 'N',
    explanation: 'No punctuation or capitalisation mistake on this line.'
  }
]

// ============================================================================
// Combined exports
// ============================================================================

export const glPack5EnglishQuestions = {
  passage1: passage1Questions,  // The Day Alfie Learned to Fly (Q1-26)
  passage2: passage2Questions,  // Party Time! - Spelling (Q27-34)
  passage3: passage3Questions,  // The Hole - Grammar (Q35-42)
  passage4: passage4Questions   // Oh, Yes, You Can! - Punctuation (Q43-50)
}

// Answer key for quick reference
export const glPack5EnglishAnswers = {
  // The Day Alfie Learned to Fly
  q1: 'C', q2: 'A', q3: 'D', q4: 'C', q5: 'B', q6: 'B', q7: 'D', q8: 'A',
  q9: 'C', q10: 'E', q11: 'C', q12: 'C', q13: 'A', q14: 'A', q15: 'B', q16: 'C',
  q17: 'A', q18: 'D', q19: 'B', q20: 'A', q21: 'D', q22: 'A', q23: 'D', q24: 'C',
  q25: 'B', q26: 'D',
  // Party Time!
  q27: 'A', q28: 'A', q29: 'A', q30: 'C', q31: 'B', q32: 'N', q33: 'C', q34: 'A',
  // The Hole
  q35: 'C', q36: 'A', q37: 'D', q38: 'D', q39: 'A', q40: 'D', q41: 'B', q42: 'C',
  // Oh, Yes, You Can!
  q43: 'N', q44: 'C', q45: 'A', q46: 'N', q47: 'N', q48: 'C', q49: 'B', q50: 'N'
}
