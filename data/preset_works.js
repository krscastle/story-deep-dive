export const PRESET_WORKS = {
  "the-tell-tale-heart": {
    id: "the-tell-tale-heart",
    title: "The Tell-Tale Heart",
    author: "Edgar Allan Poe",
    publicationYear: "1843",
    genre: "Gothic Horror / Psychological Fiction",
    setting: "An old, dimly lit house; 19th Century (Midnight to Dawn)",
    pov: "First-Person Unreliable Narrator (Dramatized Monologue)",
    conflictType: "Man vs. Self (Psychological Guilt vs. Delusion)",
    wordCount: 2093,
    estimatedReadTime: "9 min",
    tone: ["Macabre", "Frenetic", "Claustrophobic", "Obsessive"],
    isObscure: false,
    
    // TAB 1: Summary & Context
    summary: {
      beginning: "The narrator insists upon his sanity while confessing an uncontrollable obsession with an old man's pale, film-covered 'vulture eye.' For seven consecutive nights at midnight, the narrator stealthily sneaks into the old man's bedroom, planning his murder with cold, calculated patience.",
      middle: "On the eighth night, the old man awakens with a start. When a beam of light strikes the open 'Evil Eye,' the narrator hears the rapid, muffled beating of the old man's terrified heart. Overwhelmed with dread and fury, the narrator suffocates the old man under the heavy bed, dismembers the corpse in a bathtub, and hides the severed remains beneath three wooden floorboards.",
      end: "Three police officers arrive at 4 AM following a neighbor's report of a shriek. The narrator calmly invites them into the bedroom, placing his chair directly over the concealed body. However, a phantom ringing grows in his ears into a deafening heartbeat. Convinced the officers hear it and are mocking his agony, he frantically screams his confession and tears up the floorboards."
    },
    historicalContext: {
      authorBio: "Edgar Allan Poe (1809–1849) was an American writer, poet, and literary critic central to the American Romantic Movement and the pioneer of modern detective fiction and psychological horror.",
      literaryMovement: "American Romanticism & Gothic Transcendental Shadow: Poe rejected the optimism of Emersonian Transcendentalism, exploring the dark abyss of human consciousness, perversity, irrationality, and the fracture of human psyche.",
      historicalEra: "Published in 1843 in *The Pioneer*, a period of rapid urbanization, burgeoning medical interest in 'moral insanity' and monomania, and public fascination with criminal psychopathology."
    },
    compareAndConnect: [
      {
        title: "Crime and Punishment (Fyodor Dostoevsky)",
        type: "Literary Parallel",
        connection: "Both explore the psychological collapse of a murderer convinced of his intellectual superiority, whose suppressed conscience ultimately forces an unavoidable self-confession."
      },
      {
        title: "The Tell-Tale Meme / Modern Media ('Black Mirror' & 'The Tell-Tale Beat')",
        type: "Modern Media",
        connection: "Parallels episodes like 'Crocodile' where sensory echoes of guilt and paranoia trap the protagonist into unravelling despite successfully concealing physical evidence."
      },
      {
        title: "The Archetype of the Shadow & The Evil Eye",
        type: "Universal Archetype",
        connection: "The 'Evil Eye' is an ancient superstition representing hostile omniscience and cosmic surveillance, while the old man represents the narrator's own repressed shadow self."
      }
    ],

    // TAB 2: Annotated Text (Paragraphs with colored highlights & vocab tags)
    paragraphs: [
      {
        id: "p1",
        number: 1,
        text: "True!—nervous—very, very dreadfully nervous I had been and am; but why will you say that I am mad? The disease had sharpened my senses—not destroyed—not dulled them. Above all was the sense of hearing acute. I heard all things in the heaven and in the earth. I heard many things in hell. How, then, am I mad? Hearken! and observe how healthily—how calmly I can tell you the whole story.",
        annotations: [
          {
            category: "characters",
            phrase: "very, very dreadfully nervous I had been and am; but why will you say that I am mad?",
            note: "Establishes the quintessential unreliable narrator archetype. His frantic protestation of sanity immediately reveals severe psychological distress.",
            device: "Dramatic Irony / Apostrophe"
          },
          {
            category: "literary-devices",
            phrase: "I heard all things in the heaven and in the earth. I heard many things in hell.",
            note: "Hyperbolic sensory claim indicating auditory hallucinations (hyperacusis) that foreshadow the phantom heartbeat climax.",
            device: "Hyperbole & Foreshadowing"
          }
        ]
      },
      {
        id: "p2",
        number: 2,
        text: "It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me. He had never given me insult. For his gold I had no desire. I think it was his eye! yes, it was this! He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold; and so by degrees—very gradually—I made up my mind to take the life of the old man, and thus rid myself of the eye forever.",
        annotations: [
          {
            category: "plot",
            phrase: "I made up my mind to take the life of the old man, and thus rid myself of the eye forever.",
            note: "Inciting motive for the entire narrative. The murder is not committed for money or malice, but to escape the gaze of the 'Evil Eye.'",
            device: "Narrative Catalyst"
          },
          {
            category: "meaning-theme",
            phrase: "He had the eye of a vulture—a pale blue eye, with a film over it.",
            note: "The Vulture Eye symbolizes the watchful gaze of judgment, mortality, and the narrator's own subconscious horror of death and decay.",
            device: "Central Symbol / Metaphor"
          }
        ]
      },
      {
        id: "p3",
        number: 3,
        text: "Now this is the point. You fancy me mad. Madmen know nothing. But you should have seen me. You should have seen how wisely I proceeded—with what caution—with what foresight—with what dissimulation I went to work! I was never kinder to the old man than during the whole week before I killed him.",
        annotations: [
          {
            category: "literary-devices",
            phrase: "with what caution—with what foresight—with what dissimulation I went to work!",
            note: "Use of parallel syntax (anaphora) emphasizing his calculated methodology, confusing methodical execution with moral and psychological sanity.",
            device: "Anaphora & Structural Irony"
          }
        ]
      },
      {
        id: "p4",
        number: 4,
        text: "And every night, about midnight, I turned the latch of his door and opened it—oh so gently! And then, when I had made an opening sufficient for my head, I put in a dark lantern, all closed, closed, that no light might shine out, and then I thrust in my head. Oh, you would have laughed to see how cunningly I thrust it in! I moved it slowly—very, very slowly, so that I might not disturb the old man's sleep. It took me an hour to place my whole head within the opening so far that I could see him as he lay upon his bed. Ha!—would a madman have been so wise as this?",
        annotations: [
          {
            category: "setting-world",
            phrase: "every night, about midnight, I turned the latch of his door and opened it—oh so gently!",
            note: "The midnight threshold represents the liminal border between civilized daytime order and nocturnal, subconscious savagery.",
            device: "Liminal Atmospheric Setting"
          },
          {
            category: "characters",
            phrase: "It took me an hour to place my whole head within the opening",
            note: "Exhibits pathological obsessive-compulsive fixation; time stretches unnaturally in his warped subjective perception.",
            device: "Psychological Characterization"
          }
        ]
      },
      {
        id: "p5",
        number: 5,
        text: "And then, when my head was well in the room, I undid the lantern cautiously—oh, so cautiously—cautiously (for the hinges creaked)—I undid it just so much that a single thin ray fell upon the vulture eye. And this I did for seven long nights—every night just at midnight—but I found the eye always closed; and so it was impossible to do the work; for it was not the old man who vexed me, but his Evil Eye.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "for it was not the old man who vexed me, but his Evil Eye.",
            note: "Crucial psychological dissociation: the narrator separates the human being from the anatomical symbol of his terror.",
            device: "Synecdoche / Dissociation"
          }
        ]
      },
      {
        id: "p6",
        number: 6,
        text: "Upon the eighth night I was more than usually cautious in opening the door. A watch's minute hand moves more quickly than did mine. Never before that night had I felt the extent of my own powers—of my sagacity. I could scarcely contain my feelings of triumph. To think that there I was, opening the door, little by little, and he not even to dream of my secret deeds or thoughts. I fairly chuckled at the idea; and perhaps he heard me; for he moved on the bed suddenly, as if startled.",
        annotations: [
          {
            category: "plot",
            phrase: "Upon the eighth night I was more than usually cautious in opening the door.",
            note: "Shift from recurring habitual actions (7 nights) to the fateful specific night of climax and action.",
            device: "Plot Turning Point"
          },
          {
            category: "characters",
            phrase: "Never before that night had I felt the extent of my own powers—of my sagacity.",
            note: "Hubris and megalomania: the narrator revels in an illusion of god-like mastery over life and death.",
            device: "Hubris Motif"
          }
        ]
      },
      {
        id: "p7",
        number: 7,
        text: "Now you may think that I drew back—but no. His room was as black as pitch with the thick darkness, (for the shutters were close fastened, through fear of robbers,) and so I knew that he could not see the opening of the door, and I kept pushing it on steadily, steadily. I had my head in, and was about to open the lantern, when my thumb slipped upon the tin fastening, and the old man sprang up in bed, crying out—'Who's there?'",
        annotations: [
          {
            category: "setting-world",
            phrase: "His room was as black as pitch with the thick darkness, (for the shutters were close fastened, through fear of robbers,)",
            note: "The oppressive darkness reflects the claustrophobic tomb-like nature of the house and the irony of physical security failing against internal evil.",
            device: "Atmospheric Irony"
          }
        ]
      },
      {
        id: "p8",
        number: 8,
        text: "I kept quite still and said nothing. For a whole hour I did not move a muscle, and in the meantime I did not hear him lie down. He was still sitting up in the bed listening;—just as I have done, night after night, hearkening to the death watches in the wall.",
        annotations: [
          {
            category: "literary-devices",
            phrase: "hearkening to the death watches in the wall.",
            note: "Death-watch beetles make a clicking sound in wooden beams associated in folklore with impending death, prefiguring the heartbeat.",
            device: "Folkloric Omen & Auditory Motif"
          }
        ]
      },
      {
        id: "p9",
        number: 9,
        text: "Presently I heard a slight groan, and I knew it was the groan of mortal terror. It was not a groan of pain or of grief—oh, no!—it was the low stifled sound that arises from the bottom of the soul when overcharged with awe. I knew the sound well. Many a night, just at midnight, when all the world slept, it has welled up from my own bosom, deepening, with its dreadful echo, the terrors that distracted me. I say I knew it well. I knew what the old man felt, and pitied him, although I chuckled at heart.",
        annotations: [
          {
            category: "characters",
            phrase: "Many a night, just at midnight... it has welled up from my own bosom",
            note: "Demonstrates the psychological concept of the Doppelgänger: the narrator recognizes his own existential dread reflected inside his victim.",
            device: "Doppelgänger (The Double)"
          },
          {
            category: "meaning-theme",
            phrase: "I knew what the old man felt, and pitied him, although I chuckled at heart.",
            note: "The paradoxical fusion of sadism and empathy reveals profound psychic splitting.",
            device: "Psychic Ambivalence"
          }
        ]
      },
      {
        id: "p10",
        number: 10,
        text: "When I had waited a long time, very patiently, without hearing him lie down, I resolved to open a little—a very, very little crevice in the lantern. So I opened it—you cannot imagine how stealthily, stealthily—until, at length a single dim ray, like the thread of the spider, shot from out the crevice and fell full upon the vulture eye.",
        annotations: [
          {
            category: "literary-devices",
            phrase: "a single dim ray, like the thread of the spider, shot from out the crevice",
            note: "Spider imagery evokes predatory ensnarement, patience, and lethal entrapment.",
            device: "Predatory Simile"
          }
        ]
      },
      {
        id: "p11",
        number: 11,
        text: "It was open—wide, wide open—and I grew furious as I gazed upon it. I saw it with perfect distinctness—all a dull blue, with a hideous veil over it that chilled the very marrow in my bones; but I could see nothing else of the old man's face or person: for I had directed the ray as if by instinct, precisely upon the damned spot.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "precisely upon the damned spot.",
            note: "Allusion to Shakespeare's *Macbeth* ('Out, damned spot!'), reinforcing the irreversible stain of premeditated guilt.",
            device: "Literary Allusion"
          }
        ]
      },
      {
        id: "p12",
        number: 12,
        text: "And have I not told you that what you mistake for madness is but over-acuteness of the sense?—now, I say, there came to my ears a low, dull, quick sound, such as a watch makes when enveloped in cotton. I knew that sound well, too. It was the beating of the old man's heart. It increased my fury, as the beating of a drum stimulates the soldier into courage.",
        annotations: [
          {
            category: "plot",
            phrase: "there came to my ears a low, dull, quick sound, such as a watch makes when enveloped in cotton.",
            note: "The auditory turning point. The sound is biologically the narrator's own adrenaline-fueled pulse, projected outward.",
            device: "Sensory Projection & Simile"
          }
        ]
      },
      {
        id: "p13",
        number: 13,
        text: "The old man's hour had come! With a loud yell, I threw open the lantern and leaped into the room. He shrieked once—once only. In an instant I dragged him to the floor, and pulled the heavy bed over him. I then smiled gaily, to find the deed so far done. But, for many minutes, the heart beat on with a muffled sound. This, however, did not vex me; it would not be heard through the wall. At length it ceased. The old man was dead. I removed the bed and examined the corpse. Yes, he was stone, stone dead. I placed my hand upon the heart and held it there many minutes. There was no pulsation. He was stone dead. His eye would trouble me no more.",
        annotations: [
          {
            category: "plot",
            phrase: "With a loud yell, I threw open the lantern and leaped into the room. He shrieked once—once only.",
            note: "The narrative climax of physical violence. Executed with swift, brutal finality.",
            device: "Physical Climax"
          }
        ]
      },
      {
        id: "p14",
        number: 14,
        text: "If still you think me mad, you will think so no longer when I describe the wise precautions I took for the concealment of the body. The night waned, and I worked hastily, but in silence. First of all I dismembered the corpse. I cut off the head and the arms and the legs. I then took up three planks from the flooring of the chamber, and deposited all between the scantlings. I then replaced the boards so cleverly, so cunningly, that no human eye—not even his—could have detected any thing wrong. There was nothing to wash out—no stain of any kind—no blood-spot whatever. I had been too wary for that. A tub had caught all—ha! ha!",
        annotations: [
          {
            category: "characters",
            phrase: "First of all I dismembered the corpse. I cut off the head and the arms and the legs.",
            note: "Clinical, remorseless description of gruesome butchery contrasted with pride in tidiness, highlighting sociopathic compartmentalization.",
            device: "Gothic Macabre Realism"
          },
          {
            category: "setting-world",
            phrase: "three planks from the flooring of the chamber, and deposited all between the scantlings.",
            note: "The floorboards become a physical tomb within the home, symbolizing the burial of truth under a veneer of domestic normality.",
            device: "Architectural Symbolism"
          }
        ]
      },
      {
        id: "p15",
        number: 15,
        text: "When I had made an end of these labors, it was four o'clock—still dark as midnight. As the bell sounded the hour, there came a knocking at the street door. I went down to open it with a light heart,—for what had I now to fear? There entered three men, who introduced themselves, with great suavity, as officers of the police. A shriek had been heard by a neighbor during the night; suspicion of foul play had been aroused; information had been lodged at the police office, and they (the officers) had been deputed to search the premises.",
        annotations: [
          {
            category: "plot",
            phrase: "there came a knocking at the street door. I went down to open it with a light heart",
            note: "The arrival of external civil authority tests the narrator's psychological composure.",
            device: "Rising Action / Complication"
          }
        ]
      },
      {
        id: "p16",
        number: 16,
        text: "I smiled,—for what had I to fear? I bade the gentlemen welcome. The shriek, I said, was my own in a dream. The old man, I mentioned, was absent in the country. I took my visitors all over the house. I bade them search—search well. I led them, at length, to his chamber. I showed them his treasures, secure, undisturbed. In the enthusiasm of my confidence, I brought chairs into the room, and desired them here to rest from their fatigues, while I myself, in the wild audacity of my perfect triumph, placed my own seat upon the very spot beneath which reposed the corpse of the victim.",
        annotations: [
          {
            category: "characters",
            phrase: "in the wild audacity of my perfect triumph, placed my own seat upon the very spot beneath which reposed the corpse",
            note: "Extreme psychological hubris: sitting directly over the victim creates acute dramatic tension and dares fate.",
            device: "Dramatic Irony & Audacity Motif"
          }
        ]
      },
      {
        id: "p17",
        number: 17,
        text: "The officers were satisfied. My manner had convinced them. I was singularly at ease. They sat, and while I answered cheerily, they chatted of familiar things. But, ere long, I felt myself getting pale and wished them gone. My head ached, and I fancied a ringing in my ears: but still they sat and still chatted. The ringing became more distinct:—it continued and became more distinct: I talked more freely to get rid of the feeling: but it continued and gained definiteness—until, at length, I found that the noise was not within my ears.",
        annotations: [
          {
            category: "plot",
            phrase: "My head ached, and I fancied a ringing in my ears: but still they sat and still chatted.",
            note: "The somatic onset of internalized guilt manifesting as sensory torture.",
            device: "Psychosomatic Climax"
          }
        ]
      },
      {
        id: "p18",
        number: 18,
        text: "No doubt I now grew very pale;—but I talked more fluently, and with a heightened voice. Yet the sound increased—and what could I do? It was a low, dull, quick sound—much such a sound as a watch makes when enveloped in cotton. I gasped for breath—and yet the officers heard it not. I talked more quickly—more vehemently; but the noise steadily increased. I arose and argued about trifles, in a high key and with violent gesticulations; but the noise steadily increased. Why would they not be gone? I paced the floor to and fro with heavy strides, as if excited to fury by the observations of the men—but the noise steadily increased. Oh God! what could I do? I foamed—I raved—I swore! I swung the chair upon which I had been sitting, and grated it upon the boards, but the noise arose over all and continually increased. It grew louder—louder—louder! And still the men chatted pleasantly, and smiled. Was it possible they heard not? Almighty God!—no, no! They heard!—they suspected!—they knew!—they were making a mockery of my horror!—this I thought, and this I think. But anything was better than this agony! Anything was more tolerable than this derision! I could bear those hypocritical smiles no longer! I felt that I must scream or die! and now—again!—hark! louder! louder! louder! louder!",
        annotations: [
          {
            category: "literary-devices",
            phrase: "louder—louder—louder!",
            note: "Crescendo rhythm, rapid hyphens, and epizeuxis (repetition) mimic the racing pulse of cardiac panic.",
            device: "Epizeuxis & Rhythmic Pacing"
          },
          {
            category: "meaning-theme",
            phrase: "Was it possible they heard not? Almighty God!—no, no! They heard!—they suspected!—they knew!",
            note: "Paranoid projection: The narrator interprets their calm politeness as malicious mockery, unable to endure his own omniscient conscience.",
            device: "Psychological Projection"
          }
        ]
      },
      {
        id: "p19",
        number: 19,
        text: "'Villains!' I shrieked, 'dissemble no more! I admit the deed!—tear up the planks! here, here!—it is the beating of his hideous heart!'",
        annotations: [
          {
            category: "plot",
            phrase: "'Villains!' I shrieked, 'dissemble no more! I admit the deed!—tear up the planks! here, here!—it is the beating of his hideous heart!'",
            note: "The resolution and catastrophic confession. The true 'hideous heart' is his own unconquerable moral guilt.",
            device: "Climactic Catastrophe / Epiphany"
          }
        ]
      }
    ],

    vocabulary: [
      {
        word: "acute",
        pos: "adjective",
        definition: "Sharp, sensitive, or highly developed; keen in perception.",
        sentence: "Above all was the sense of hearing **acute**.",
        connotation: "Intense, heightened",
        etymology: "Latin *acutus* (sharp)"
      },
      {
        word: "hearken",
        pos: "verb",
        definition: "To listen attentively; to give heed to what is spoken.",
        sentence: "**Hearken**! and observe how healthily—how calmly I can tell you the whole story.",
        connotation: "Archaic, urgent command",
        etymology: "Old English *heorcnian*"
      },
      {
        word: "conceived",
        pos: "verb",
        definition: "Formed or originated in the mind; devised an idea.",
        sentence: "It is impossible to say how first the idea entered my brain; but once **conceived**, it haunted me day and night.",
        connotation: "Intellectual incubation",
        etymology: "Latin *concipere* (take in)"
      },
      {
        word: "dissimulation",
        pos: "noun",
        definition: "The concealment of one's thoughts, feelings, or character; deceit or hypocrisy.",
        sentence: "You should have seen how wisely I proceeded—with what caution—with what foresight—with what **dissimulation** I went to work!",
        connotation: "Duplicitous, sinister stealth",
        etymology: "Latin *dissimulare* (to disguise)"
      },
      {
        word: "cunningly",
        pos: "adverb",
        definition: "In a clever, deceitful, or ingenious manner.",
        sentence: "Oh, you would have laughed to see how **cunningly** I thrust it in!",
        connotation: "Sly, manipulative craftiness",
        etymology: "Middle English *cunnen* (to know)"
      },
      {
        word: "vexed",
        pos: "verb",
        definition: "Annoyed, frustrated, worried, or distressed intensely.",
        sentence: "for it was not the old man who **vexed** me, but his Evil Eye.",
        connotation: "Psychological irritation",
        etymology: "Latin *vexare* (shake, harass)"
      },
      {
        word: "sagacity",
        pos: "noun",
        definition: "Keen mental discernment, soundness of judgment, and wisdom.",
        sentence: "Never before that night had I felt the extent of my own powers—of my **sagacity**.",
        connotation: "Intellectual arrogance / wisdom",
        etymology: "Latin *sagax* (quick-witted)"
      },
      {
        word: "stifled",
        pos: "adjective",
        definition: "Muffled, suppressed, smothered, or restrained.",
        sentence: "it was the low **stifled** sound that arises from the bottom of the soul when overcharged with awe.",
        connotation: "Choked, suffocated terror",
        etymology: "Old French *estouffer*"
      },
      {
        word: "bosom",
        pos: "noun",
        definition: "The chest or breast; metaphorically, the seat of innermost emotions and secrets.",
        sentence: "Many a night, just at midnight, when all the world slept, it has welled up from my own **bosom**.",
        connotation: "Deep psychological interior",
        etymology: "Old English *bosm*"
      },
      {
        word: "crevice",
        pos: "noun",
        definition: "A narrow opening, fissure, or slit, especially in a rock or wall.",
        sentence: "until, at length a single dim ray, like the thread of the spider, shot from out the **crevice**.",
        connotation: "Precise, stealthy aperture",
        etymology: "Old French *crevasse*"
      },
      {
        word: "distinctness",
        pos: "noun",
        definition: "The quality of being unmistakable, clearly defined, or easily perceived.",
        sentence: "I saw it with perfect **distinctness**—all a dull blue, with a hideous veil over it.",
        connotation: "Lucid, eerie clarity",
        etymology: "Latin *distinctus*"
      },
      {
        word: "enveloped",
        pos: "verb",
        definition: "Wrapped up, covered, or surrounded completely.",
        sentence: "much such a sound as a watch makes when **enveloped** in cotton.",
        connotation: "Smothered, muffled containment",
        etymology: "Old French *enveloper*"
      },
      {
        word: "pulsation",
        pos: "noun",
        definition: "Rhythmical throbbing, vibration, or beating of the heart or arteries.",
        sentence: "There was no **pulsation**. He was stone dead.",
        connotation: "Biological sign of vitality",
        etymology: "Latin *pulsare* (to beat)"
      },
      {
        word: "waned",
        pos: "verb",
        definition: "Decreased in vigor, power, or extent; approached the end.",
        sentence: "The night **waned**, and I worked hastily, but in silence.",
        connotation: "Temporal decline, fading darkness",
        etymology: "Old English *wanian*"
      },
      {
        word: "scantlings",
        pos: "noun",
        definition: "Small timbers or wooden beams supporting a floor or ceiling.",
        sentence: "I then took up three planks from the flooring of the chamber, and deposited all between the **scantlings**.",
        connotation: "Architectural, structural concealment",
        etymology: "Old French *eschantillon*"
      },
      {
        word: "wary",
        pos: "adjective",
        definition: "Feeling or showing caution about possible dangers or problems.",
        sentence: "There was nothing to wash out... I had been too **wary** for that.",
        connotation: "Meticulous calculation",
        etymology: "Old English *wær*"
      },
      {
        word: "suavity",
        pos: "noun",
        definition: "The quality of being charming, smooth, polite, and sophisticated in manner.",
        sentence: "There entered three men, who introduced themselves, with great **suavity**, as officers of the police.",
        connotation: "Polished social grace",
        etymology: "Latin *suavis* (sweet, agreeable)"
      },
      {
        word: "deputed",
        pos: "verb",
        definition: "Appointed or assigned as a representative to perform a task.",
        sentence: "information had been lodged at the police office, and they (the officers) had been **deputed** to search the premises.",
        connotation: "Official legal sanction",
        etymology: "Latin *deputare*"
      },
      {
        word: "audacity",
        pos: "noun",
        definition: "A willingness to take bold, brazen, or insolent risks.",
        sentence: "while I myself, in the wild **audacity** of my perfect triumph, placed my own seat upon the very spot.",
        connotation: "Arrogant defiance of consequence",
        etymology: "Latin *audax* (bold)"
      },
      {
        word: "reposed",
        pos: "verb",
        definition: "Lay at rest or lay dead; situated peacefully.",
        sentence: "beneath which **reposed** the corpse of the victim.",
        connotation: "Euphemistic death, stillness",
        etymology: "Latin *reponere* (to put back)"
      },
      {
        word: "singularly",
        pos: "adverb",
        definition: "In a remarkable, exceptional, or unusual manner.",
        sentence: "The officers were satisfied... I was **singularly** at ease.",
        connotation: "Strangely, exceptionally",
        etymology: "Latin *singularis*"
      },
      {
        word: "vehemently",
        pos: "adverb",
        definition: "In a forceful, passionate, or intensely emotional manner.",
        sentence: "I talked more quickly—more **vehemently**; but the noise steadily increased.",
        connotation: "Frantic, desperate intensity",
        etymology: "Latin *vehemens* (impetuous)"
      },
      {
        word: "trifles",
        pos: "noun",
        definition: "Things of little value, importance, or consequence.",
        sentence: "I arose and argued about **trifles**, in a high key and with violent gesticulations.",
        connotation: "Superficial chatter",
        etymology: "Old French *trufle* (mockery)"
      },
      {
        word: "gesticulations",
        pos: "noun",
        definition: "Dramatic, energetic gestures used instead of or in emphasizing speech.",
        sentence: "in a high key and with violent **gesticulations**; but the noise steadily increased.",
        connotation: "Uncontrolled physical mania",
        etymology: "Latin *gesticulari*"
      },
      {
        word: "derision",
        pos: "noun",
        definition: "Contemptuous ridicule, scorn, or mockery.",
        sentence: "Anything was more tolerable than this **derision**!",
        connotation: "Stinging public contempt",
        etymology: "Latin *deridere* (to mock)"
      },
      {
        word: "hypocritical",
        pos: "adjective",
        definition: "Behaving in a way that suggests one has higher standards or more noble beliefs than is the case.",
        sentence: "I could bear those **hypocritical** smiles no longer!",
        connotation: "False friendliness masking malice",
        etymology: "Greek *hypokrites* (actor)"
      },
      {
        word: "dissemble",
        pos: "verb",
        definition: "To conceal one's true motives, feelings, or beliefs; pretend or disguise.",
        sentence: "'Villains!' I shrieked, '**dissemble** no more! I admit the deed!'",
        connotation: "Deceitful concealment of truth",
        etymology: "Latin *dissimulare*"
      },
      {
        word: "hideous",
        pos: "adjective",
        definition: "Ugly or disgusting to look at; extremely unpleasant or horrifying.",
        sentence: "it is the beating of his **hideous** heart!",
        connotation: "Grotesque, morally monstrous",
        etymology: "Old French *hideus*"
      },
      {
        word: "unperceived",
        pos: "adjective",
        definition: "Not noticed, observed, or detected by sensory awareness.",
        sentence: "to think that there I was, opening the door... **unperceived**.",
        connotation: "Stealthy invisibility",
        etymology: "Latin *percipere*"
      },
      {
        word: "foresight",
        pos: "noun",
        definition: "The ability to predict or the action of predicting what will happen or be needed in the future.",
        sentence: "with what caution—with what **foresight**—with what dissimulation I went to work!",
        connotation: "Prudent, sinister anticipation",
        etymology: "Old English *fore* + *sihth*"
      }
    ],

    storyMap: [
      {
        id: "node-1",
        stage: "Exposition",
        title: "The Obsession with the Vulture Eye",
        tension: 20,
        summary: "The unnamed narrator fiercely defends his sanity while revealing his irrational obsession with the old man's clouded, pale blue eye. He plots to extinguish the eye through murder.",
        quote: "He had the eye of a vulture—a pale blue eye, with a film over it. Whenever it fell upon me, my blood ran cold...",
        quoteLocation: "p2",
        analysis: "Establishes psychological instability and the single fixation driving the narrative trajectory."
      },
      {
        id: "node-2",
        stage: "Inciting Incident",
        title: "The Midnight Surveillance",
        tension: 45,
        summary: "For seven consecutive nights, the narrator silently sneaks into the old man's bedchamber at midnight, aiming a pencil-thin ray of light directly at the vulture eye, finding it stubbornly closed.",
        quote: "And this I did for seven long nights—every night just at midnight—but I found the eye always closed; and so it was impossible to do the work...",
        quoteLocation: "p5",
        analysis: "Illustrates the ritualistic, calculated discipline of the narrator's monomania."
      },
      {
        id: "node-3",
        stage: "Rising Action",
        title: "The Open Eye & The Muffled Heartbeat",
        tension: 75,
        summary: "On the eighth night, the old man stirs. A single beam illuminates the open eye, triggering fury. The narrator hears a muffled, accelerating beat—the old man's heart—amplifying his adrenaline.",
        quote: "there came to my ears a low, dull, quick sound, such as a watch makes when enveloped in cotton. I knew that sound well, too. It was the beating of the old man's heart.",
        quoteLocation: "p12",
        analysis: "Auditory projection transforms internal biological stress into an external catalyst for violent action."
      },
      {
        id: "node-4",
        stage: "Climax",
        title: "The Murder & Dismemberment",
        tension: 100,
        summary: "The narrator bursts into the room, drags the old man to the floor, and suffocates him with the heavy mattress. Afterward, he dismembers the body in a tub and buries the remains under the floorboards.",
        quote: "In an instant I dragged him to the floor, and pulled the heavy bed over him... First of all I dismembered the corpse. I cut off the head and the arms and the legs.",
        quoteLocation: "p13",
        analysis: "The visceral peak of physical violence, followed by grotesque surgical precision to eliminate physical traces."
      },
      {
        id: "node-5",
        stage: "Falling Action",
        title: "Police Interrogation & Growing Paranoia",
        tension: 85,
        summary: "Police officers arrive to investigate a scream. Confident and brazen, the narrator hosts them in the murder chamber, placing his chair right over the corpse. Soon, an inescapable ringing begins in his ears.",
        quote: "in the wild audacity of my perfect triumph, placed my own seat upon the very spot beneath which reposed the corpse of the victim... The ringing became more distinct...",
        quoteLocation: "p16",
        analysis: "Transition from external security and supreme hubris to internal psychological breakdown."
      },
      {
        id: "node-6",
        stage: "Resolution",
        title: "The Hysterical Confession",
        tension: 95,
        summary: "Convinced the police hear the phantom heartbeat and are mocking his suffering, the narrator snaps under the crescendo of guilt and shrieks his confession, ordering them to tear up the planks.",
        quote: "'Villains!' I shrieked, 'dissemble no more! I admit the deed!—tear up the planks! here, here!—it is the beating of his hideous heart!'",
        quoteLocation: "p19",
        analysis: "Conscience and paranoia overpower intellect, proving that the murderer's greatest adversary is his own mind."
      }
    ],

    deepDive: {
      "plot-conflict": {
        id: "plot-conflict",
        title: "Plot & Core Conflict",
        subtitle: "Internal Monomania vs. External Investigation",
        summary: "Poe crafts a masterclass in compressed narrative architecture where the primary conflict is not between murderer and victim, but between the narrator's intellect and his fractured subconscious.",
        keyPoints: [
          "**Man vs. Self:** The central battle is the narrator's desperate crusade to convince the reader (and himself) of his supreme sanity while his actions consistently prove severe psychosis.",
          "**Temporal Compression:** The narrative is tightly bounded across eight nights, focusing on midnight—the traditional witching hour of psychological vulnerability.",
          "**The Illusion of Perfect Crime:** Physical forensic perfection is utterly invalidated by psychological self-sabotage."
        ],
        pullQuotes: [
          {
            quote: "Object there was none. Passion there was none. I loved the old man. He had never wronged me.",
            significance: "Demonstrates the absence of rational criminal motive, emphasizing pure psychological compulsion."
          },
          {
            quote: "I smiled,—for what had I to fear? I bade the gentlemen welcome.",
            significance: "The false sense of triumph right before the irreversible cognitive unraveling."
          }
        ]
      },
      "characters": {
        id: "characters",
        title: "Characters & Psychology",
        subtitle: "The Unreliable Narrator & The Shadow Victim",
        summary: "The story features an intense dyad: the hyper-articulate, delusional narrator and the passive, vulnerable old man who functions as a psychological mirror.",
        keyPoints: [
          "**The Unreliable Narrator:** Suffers from severe sensory hypersensitivity (hyperacusis), monomania, and narcissism. He equates precision of action with sanity.",
          "**The Old Man:** Faceless and passive, he embodies fragile mortality and paternal vulnerability. His 'Evil Eye' represents cosmic scrutiny.",
          "**The Police Officers:** Impartial representatives of civic law whose cheerful pleasantness highlights the narrator's solipsistic nightmare."
        ],
        pullQuotes: [
          {
            quote: "I knew what the old man felt, and pitied him, although I chuckled at heart.",
            significance: "Reveals the narrator's dual nature: simultaneous projection of his own dread and sadistic detachment."
          }
        ]
      },
      "setting-pov": {
        id: "setting-pov",
        title: "Setting & Point of View",
        subtitle: "Gothic Claustrophobia & Dramatized Monologue",
        summary: "The setting is restricted to a suffocating domestic interior, mirroring the locked confines of the narrator's pathological mind.",
        keyPoints: [
          "**The Confining Interior:** Shutters fastened 'through fear of robbers' turn the bedroom into a private tomb where external light and salvation cannot penetrate.",
          "**First-Person Confessional POV:** Written in the immediate present-tense frame of a spoken confession, directly confronting the reader as an imagined interrogator.",
          "**The Midnight Motif:** Time operates cyclically until the eighth night, when chronological time yields to subjective auditory hallucination."
        ],
        pullQuotes: [
          {
            quote: "His room was as black as pitch with the thick darkness...",
            significance: "The physical darkness reflects moral blindness and existential isolation."
          }
        ]
      },
      "themes-symbols": {
        id: "themes-symbols",
        title: "Themes & Symbols",
        subtitle: "Guilt, The Vulture Eye, & The Ticking Watch",
        summary: "Poe weaves potent symbols that operate simultaneously on literal, psychological, and existential planes.",
        keyPoints: [
          "**The Vulture Eye:** Symbolizes the omniscient eye of God/Conscience and the inevitability of physical decay and death.",
          "**The Beating Heart / Watch in Cotton:** Symbol of mortal time ticking away and the somatic amplification of suppressed moral guilt.",
          "**The Floorboards:** The barrier between the conscious surface self and the buried subconscious atrocities underneath."
        ],
        pullQuotes: [
          {
            quote: "it is the beating of his hideous heart!",
            significance: "The final line transfers the narrator's own pulse to the victim, cementing the total collapse of reality testing."
          }
        ]
      },
      "devices-style": {
        id: "devices-style",
        title: "Literary Devices & Style",
        subtitle: "Rhythmic Crescendo, Irony, & Anaphora",
        summary: "Poe's prose mimics the erratic cadence of a cardiac rhythm, employing dashes, frantic exclamation, and repetition to induce anxiety in the reader.",
        keyPoints: [
          "**Epizeuxis & Repetition:** Words like 'louder! louder! louder!' and 'steadily, steadily' recreate auditory fixation.",
          "**Dramatic Irony:** The reader understands the narrator's escalating madness long before he confesses it.",
          "**Apostrophe & Direct Address:** Engaging the reader ('How, then, am I mad?') forces active complicity in the psychological interrogation."
        ],
        pullQuotes: [
          {
            quote: "Hearken! and observe how healthily—how calmly I can tell you the whole story.",
            significance: "The opening plea establishes dramatic irony, as frantic syntax immediately refutes the claim of calm health."
          }
        ]
      }
    },

    studyPrep: {
      essayAngles: [
        {
          prompt: "Analyze how Poe uses sensory imagery—specifically sound and sight—to depict the narrator's psychological disintegration.",
          thesisTemplate: "In 'The Tell-Tale Heart,' Edgar Allan Poe employs [sensory device] and [auditory motif] to demonstrate that the narrator's downfall is driven not by external forces, but by [psychological insight]."
        },
        {
          prompt: "Examine the role of the Doppelgänger (the Double) in the dynamic between the narrator and the old man.",
          thesisTemplate: "Rather than acting as two distinct entities, the narrator and the old man represent [aspect of psyche], meaning the murder is ultimately an act of [metaphorical self-destruction]."
        },
        {
          prompt: "Discuss the function of dramatic irony and the unreliable narrator archetype in creating suspense.",
          thesisTemplate: "By establishing an unreliable first-person narrator who equates [methodical planning] with [sanity], Poe generates profound dramatic irony that forces the reader to [thematic conclusion]."
        }
      ],
      criticalThinking: [
        {
          question: "Whose heartbeat does the narrator actually hear at the climax of the story, and what evidence supports this interpretation?",
          answer: "The narrator hears his own adrenaline-surging heartbeat. Medical science confirms that corpses with severed circulatory systems cannot beat. The sound accelerates precisely as the narrator's emotional panic rises, mirroring his internal physiological state rather than external reality."
        },
        {
          question: "Why does the narrator place his chair directly over the buried corpse when chatting with the police?",
          answer: "This act exemplifies supreme psychological hubris and subconscious self-sabotage. While consciously celebrating his triumph over the law, his subconscious mind sets the stage for an inevitable confession by placing him in intimate proximity to the physical evidence of his crime."
        },
        {
          question: "How does Poe establish the narrator as unreliable within the very first paragraph?",
          answer: "The narrator opens with frantic, erratic punctuation (dashes and exclamations), claims that 'disease' sharpened his hearing to perceive heaven and hell, and aggressively demands the reader explain why he is called mad—immediately demonstrating delusional thinking while arguing for his sanity."
        }
      ],
      quiz: [
        {
          id: "q1",
          question: "What physical feature of the old man specifically motivates the narrator's obsession to murder him?",
          options: [
            "His immense hidden gold inheritance",
            "A pale blue, film-covered 'vulture' eye",
            "A constant, mocking laugh at dinner",
            "His condescending aristocratic manners"
          ],
          correctIndex: 1,
          explanation: "The narrator explicitly states that he had no desire for gold or personal malice; he was solely fixated on destroying the old man's pale blue 'vulture eye.'"
        },
        {
          id: "q2",
          question: "How many nights does the narrator sneak into the old man's bedroom before committing the murder on the final night?",
          options: [
            "Three nights",
            "Seven nights",
            "Twelve nights",
            "Fourteen nights"
          ],
          correctIndex: 1,
          explanation: "The narrator repeats the midnight ritual for seven consecutive nights, finally carrying out the murder on the eighth night when the eye is open."
        },
        {
          id: "q3",
          question: "What simile does the narrator use to describe the sound of the beating heart?",
          options: [
            "Like a galloping horse in the night",
            "Like the ticking of an ancient grandfather clock",
            "Like a watch enveloped in cotton",
            "Like heavy thunder rattling the windowpanes"
          ],
          correctIndex: 2,
          explanation: "Poe writes that the sound was 'a low, dull, quick sound—much such a sound as a watch makes when enveloped in cotton.'"
        },
        {
          id: "q4",
          question: "Where does the narrator conceal the dismembered body parts?",
          options: [
            "In an iron chest buried in the garden",
            "Beneath three wooden planks in the bedroom floor",
            "Behind a newly plastered brick wall in the cellar",
            "Inside the mattress of the old man's bed"
          ],
          correctIndex: 1,
          explanation: "He takes up three floorboards in the chamber and deposits the severed remains between the scantlings before replacing the boards seamlessly."
        },
        {
          id: "q5",
          question: "Why do the police officers visit the house at 4:00 AM?",
          options: [
            "They saw the lantern shining through the open window",
            "A neighbor reported hearing a loud shriek during the night",
            "The old man had failed to attend a morning meeting",
            "They were routine night watchmen doing a perimeter check"
          ],
          correctIndex: 1,
          explanation: "A neighbor heard a scream and notified the police office, suspecting foul play, which prompted the three officers to search the premises."
        }
      ]
    }
  },

  "the-great-gatsby": {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publicationYear: "1925",
    genre: "Tragic Realism / Modernist Fiction",
    setting: "Long Island (West Egg & East Egg) and New York City; Summer 1922 (Jazz Age)",
    pov: "First-Person Peripheral Narrator (Nick Carraway)",
    conflictType: "Man vs. Society (The Corruption of the American Dream)",
    wordCount: 47094,
    estimatedReadTime: "3.5 hours",
    tone: ["Elegiac", "Cynical", "Lyrical", "Nostalgic"],
    isObscure: false,

    summary: {
      beginning: "In the summer of 1922, Midwestern bond salesman Nick Carraway rents a modest cottage in West Egg, Long Island, adjacent to the lavish marble mansion of the enigmatic millionaire Jay Gatsby. Nick visits his aristocratic cousin Daisy Buchanan and her domineering husband Tom in East Egg, discovering Tom's affair with Myrtle Wilson and the shallow vanity of high society.",
      middle: "Nick is invited to one of Gatsby's extravagant weekend parties and discovers Gatsby's true identity: a self-made man obsessively devoted to rekindling a lost romance with Daisy. Through Nick, Gatsby and Daisy reunite and begin a clandestine affair, with Gatsby futilely attempting to erase the past five years.",
      end: "A sweltering confrontation at the Plaza Hotel exposes Gatsby's criminal bootlegging ties. Driving Gatsby's yellow roadster home, Daisy accidentally strikes and kills Myrtle Wilson. Tom directs Myrtle's vengeful husband George to Gatsby's estate. George shoots Gatsby dead in his swimming pool before taking his own life. Disillusioned by the careless elite, Nick arranges Gatsby's lonely funeral and returns to the Midwest."
    },
    historicalContext: {
      authorBio: "F. Scott Fitzgerald (1896–1940) was a quintessential chronicler of the 'Lost Generation' and coined the term 'The Jazz Age' to describe the decade of economic prosperity and cultural rebellion following WWI.",
      literaryMovement: "Modernism & The Lost Generation: Characterized by disillusionment with traditional values, critique of industrial capitalism, and fragmented moral consciousness.",
      historicalEra: "Set in 1922 during Prohibition, the rise of organized crime bootlegging, the stock market boom, consumerism, and the clashes between 'Old Money' (inherited status) and 'New Money' (nouveau riche)."
    },
    compareAndConnect: [
      {
        title: "Succession (HBO TV Series)",
        type: "Modern Media",
        connection: "Parallels Tom and Daisy's insulated 'careless' elite cruelty—people who smash up things and retreat into their money, leaving others to clean up the wreckage."
      },
      {
        title: "The Myth of Icarus",
        type: "Universal Archetype",
        connection: "Gatsby's meteoric ascent and fatal pursuit of an idealized light (the green light / Daisy) mirrors Icarus flying too close to the sun on wings crafted of illusion."
      },
      {
        title: "Citizen Kane (Orson Welles)",
        type: "Cinematic Parallel",
        connection: "Both depict a wealthy, isolated magnate whose vast empire and enigmatic life are built around a nostalgic longing for a lost innocent past ('Rosebud' / Daisy's dock)."
      }
    ],

    paragraphs: [
      {
        id: "p1",
        number: 1,
        text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. 'Whenever you feel like criticizing any one,' he told me, 'just remember that all the people in this world haven't had the advantages that you've had.'",
        annotations: [
          {
            category: "characters",
            phrase: "Whenever you feel like criticizing any one... remember that all the people in this world haven't had the advantages that you've had.",
            note: "Establishes Nick Carraway's moral lens and his claimed tolerance, though his retrospective narration is laced with sharp judgment.",
            device: "Moral Framing & Character Introduction"
          }
        ]
      },
      {
        id: "p2",
        number: 2,
        text: "He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgements, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.",
        annotations: [
          {
            category: "literary-devices",
            phrase: "I'm inclined to reserve all judgements",
            note: "Structural irony: Nick claims to reserve judgment, yet the entire novel serves as an unsparing moral indictment of the Buchanans and the Jazz Age.",
            device: "Structural Irony"
          }
        ]
      },
      {
        id: "p3",
        number: 3,
        text: "If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the 'creative temperament'—it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again.",
        annotations: [
          {
            category: "characters",
            phrase: "an extraordinary gift for hope, a romantic readiness such as I have never found in any other person",
            note: "Defines Jay Gatsby's heroic yet tragic essence: an unwavering, transcendent capacity for romantic idealism.",
            device: "Character Idealization"
          },
          {
            category: "meaning-theme",
            phrase: "some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes",
            note: "Seismograph metaphor linking romantic hope with modern industrial precision and seismic vulnerability.",
            device: "Scientific Metaphor"
          }
        ]
      },
      {
        id: "p4",
        number: 4,
        text: "About halfway between West Egg and New York the motor road hastily joins the railroad and runs beside it for a quarter of a mile, so as to shrink away from a certain desolate area of land. This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens; where ashes take the forms of houses and chimneys and rising smoke and, finally, with a transcendent effort, of men who move dimly and already crumbling through the powdery air.",
        annotations: [
          {
            category: "setting-world",
            phrase: "This is a valley of ashes—a fantastic farm where ashes grow like wheat into ridges and hills and grotesque gardens",
            note: "The Valley of Ashes represents the industrial wasteland, moral decay, and impoverished underbelly produced by unrestrained capitalist luxury.",
            device: "Allegorical Setting"
          },
          {
            category: "meaning-theme",
            phrase: "where ashes take the forms of houses and chimneys and rising smoke and, finally... of men who move dimly and already crumbling",
            note: "The ash-men (like George Wilson) symbolize the hollowed-out working class consumed by the careless wealthy elite.",
            device: "Social Symbolism"
          }
        ]
      },
      {
        id: "p5",
        number: 5,
        text: "But above the gray land and the spasms of bleak dust which drift endlessly over it, you perceive, after a moment, the eyes of Doctor T. J. Eckleburg. The eyes of Doctor T. J. Eckleburg are blue and gigantic—their irises are one yard high. They look out of no face, but, instead, from a pair of enormous yellow spectacles which pass over a non-existent nose. Evidently some wild wag of an oculist set them there to fatten his practice in the borough of Queens, and then sank down himself into eternal blindness, or forgot them and moved away.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "The eyes of Doctor T. J. Eckleburg are blue and gigantic—their irises are one yard high. They look out of no face",
            note: "The faded billboard billboard represents the godless commercialism of 1920s America: a commercial spectacle substituting for divine judgment.",
            device: "Symbol of Lost Divinity"
          }
        ]
      },
      {
        id: "p6",
        number: 6,
        text: "He looked at her the way all women want to be looked at by a man, in an almost devotional gaze. But I could see that Daisy was not a person to him, but a golden statue, an embodiment of everything he had bled and schemed to attain.",
        annotations: [
          {
            category: "characters",
            phrase: "Daisy was not a person to him, but a golden statue, an embodiment of everything he had bled and schemed to attain.",
            note: "Exposes Gatsby's tragic error: he does not love the real Daisy, but the mythic avatar of wealth, class, and youth she represents.",
            device: "Objectification & Romantic Deification"
          }
        ]
      },
      {
        id: "p7",
        number: 7,
        text: "They were careless people, Tom and Daisy—they smashed up things and creatures and then retreated back into their money or their vast carelessness, or whatever it was that kept them together, and let other people clean up the mess they had made...",
        annotations: [
          {
            category: "characters",
            phrase: "They were careless people, Tom and Daisy—they smashed up things and creatures and then retreated back into their money",
            note: "The ultimate moral indictment of the aristocratic elite: their inherited wealth shields them from legal and emotional responsibility.",
            device: "Thematic Indictment"
          },
          {
            category: "meaning-theme",
            phrase: "retreated back into their money or their vast carelessness",
            note: "Encapsulates the sociopolitical critique of Old Money privilege in the Jazz Age.",
            device: "Class Critique"
          }
        ]
      },
      {
        id: "p8",
        number: 8,
        text: "Gatsby believed in the green light, the orgastic future that year by year recedes before us. It eluded us then, but that's no matter—to-morrow we will run faster, stretch out our arms farther... And one fine morning—— So we beat on, boats against the current, borne back ceaselessly into the past.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "Gatsby believed in the green light, the orgastic future that year by year recedes before us.",
            note: "The Green Light represents the unattainable American Dream: the universal human yearning for a future that is forever slipping away.",
            device: "Universal Metaphor"
          },
          {
            category: "literary-devices",
            phrase: "So we beat on, boats against the current, borne back ceaselessly into the past.",
            note: "One of American literature's most celebrated closing lines: alliterative cadence and maritime imagery evoking the eternal struggle against time.",
            device: "Lyrical Cadence & Paradox"
          }
        ]
      }
    ],

    vocabulary: [
      {
        word: "feign",
        pos: "verb",
        definition: "To pretend to be affected by a feeling, state, or injury.",
        sentence: "frequently I have **feigned** sleep, preoccupation, or a hostile levity.",
        connotation: "Deceptive pretense",
        etymology: "Old French *feindre*"
      },
      {
        word: "supercilious",
        pos: "adjective",
        definition: "Behaving or looking as though one thinks one is superior to others.",
        sentence: "Now he was a sturdy straw-haired man of thirty with a rather hard mouth and a **supercilious** manner.",
        connotation: "Arrogant, haughty disdain",
        etymology: "Latin *supercilium* (eyebrow)"
      },
      {
        word: "fractiousness",
        pos: "noun",
        definition: "The trait of being irritable, unruly, quarrelsome, or difficult to control.",
        sentence: "His speaking voice, a gruff husky tenor, added to the impression of **fractiousness** he conveyed.",
        connotation: "Belligerent unpredictability",
        etymology: "Latin *fractio*"
      },
      {
        word: "epigram",
        pos: "noun",
        definition: "A pithy, witty, and often paradoxical saying or remark.",
        sentence: "This isn't just an **epigram**—life is much more successfully looked at from a single window.",
        connotation: "Witty intellectual aphorism",
        etymology: "Greek *epigramma*"
      },
      {
        word: "prodigality",
        pos: "noun",
        definition: "Wasteful extravagance or lavish abundance in spending.",
        sentence: "Laughter is easier minute by minute, spilled with **prodigality**, tipped out at a cheerful word.",
        connotation: "Hedonistic excess",
        etymology: "Latin *prodigalitas*"
      },
      {
        word: "vacuous",
        pos: "adjective",
        definition: "Having or showing a lack of thought, intelligence, or substance; empty.",
        sentence: "happy, **vacuous** bursts of laughter rose toward the summer sky.",
        connotation: "Brainless superficiality",
        etymology: "Latin *vacuus* (empty)"
      },
      {
        word: "punctilious",
        pos: "adjective",
        definition: "Showing great attention to detail, correct behavior, or strict etiquette.",
        sentence: "This quality was continually breaking through his **punctilious** manner in the shape of restlessness.",
        connotation: "Meticulous, rigid formality",
        etymology: "Latin *punctum* (point)"
      },
      {
        word: "somnambulatory",
        pos: "adjective",
        definition: "Relating to or carried out while sleepwalking; trance-like.",
        sentence: "Gatsby took an arm of each of us and moved forward into the restaurant, whereupon Mr. Wolfsheim swallowed a new phrase in a **somnambulatory** abstraction.",
        connotation: "Dreamlike, disconnected",
        etymology: "Latin *somnus* (sleep) + *ambulare* (to walk)"
      },
      {
        word: "meretricious",
        pos: "adjective",
        definition: "Apparently attractive but having in reality no value or integrity; tawdry.",
        sentence: "He was a son of God... and he must be about His Father's business, the service of a vast, vulgar, and **meretricious** beauty.",
        connotation: "Gaudy, superficially alluring",
        etymology: "Latin *meretrix* (prostitute)"
      },
      {
        word: "turgid",
        pos: "adjective",
        definition: "Swollen and distended; or tediously pompous and bombastic in style.",
        sentence: "The none too savory ramifications by which Ella Kaye, the newspaper woman, played Madame de Maintenon to his weakness and sent him to sea in a yacht, were common knowledge to the **turgid** journalism of 1902.",
        connotation: "Inflated, sensationalized",
        etymology: "Latin *turgere* (to swell)"
      },
      {
        word: "dilatory",
        pos: "adjective",
        definition: "Slow to act; intended to cause delay or procrastinate.",
        sentence: "The **dilatory** limousine came rolling up the drive.",
        connotation: "Sluggish, dragging pace",
        etymology: "Latin *dilatorius*"
      },
      {
        word: "ineffable",
        pos: "adjective",
        definition: "Too great, extreme, or sacred to be expressed or described in words.",
        sentence: "A universe of **ineffable** gaudiness spun itself out in his brain while the clock ticked on.",
        connotation: "Transcendent, indescribable",
        etymology: "Latin *ineffabilis*"
      },
      {
        word: "garrulous",
        pos: "adjective",
        definition: "Excessively talkative, especially on trivial matters.",
        sentence: "some **garrulous** man telling over and over what had happened, until it became less and less real.",
        connotation: "Chattery, gossipy",
        etymology: "Latin *garrulus*"
      },
      {
        word: "redolent",
        pos: "adjective",
        definition: "Strongly reminiscent or suggestive of something; fragrant.",
        sentence: "There was a ripe mystery about it, a hint of bedrooms upstairs more beautiful and cool than other bedrooms, of gay and radiant activities happening, and of romances that were not musty and laid away already in lavender, but fresh and breathing and **redolent** of this year's shining motor cars.",
        connotation: "Evocative, perfumed aroma",
        etymology: "Latin *redolere*"
      },
      {
        word: "scrupulous",
        pos: "adjective",
        definition: "Diligent, thorough, and extremely attentive to details and moral principles.",
        sentence: "He's very **scrupulous** about women, Wolfshiem said.",
        connotation: "Principled, exact",
        etymology: "Latin *scrupulosus*"
      }
    ],

    storyMap: [
      {
        id: "node-1",
        stage: "Exposition",
        title: "Nick Arrives in West Egg & Meets the Buchanans",
        tension: 15,
        summary: "Nick Carraway moves to Long Island to work in bonds, living next to Gatsby's estate. He attends dinner at East Egg with Daisy, Tom, and Jordan Baker, observing aristocratic ennui and marital deceit.",
        quote: "I bought a dozen volumes on banking and credit and investment securities, and they stood on my shelf in red and gold like new money from the mint...",
        quoteLocation: "p1",
        analysis: "Establishes the contrasting social topography of East Egg (Old Money) and West Egg (New Money)."
      },
      {
        id: "node-2",
        stage: "Inciting Incident",
        title: "Gatsby's Parties & The Green Light",
        tension: 35,
        summary: "Nick observes Gatsby gazing across the bay at a green light on Daisy's dock. Nick is invited to Gatsby's lavish mansion party, meeting the elusive host.",
        quote: "He stretched out his arms toward the dark water in a curious way... nothing except a single green light, minute and far away...",
        quoteLocation: "p3",
        analysis: "Introduces Gatsby's monomaniacal devotion to his idealized romantic past."
      },
      {
        id: "node-3",
        stage: "Rising Action",
        title: "The Tea Reunion & Rekindled Affair",
        tension: 60,
        summary: "Nick arranges a reunion between Gatsby and Daisy at his cottage. After initial awkwardness, the lovers reconnect, and Daisy is overwhelmed by Gatsby's wealth.",
        quote: "They're such beautiful shirts, she sobbed, her voice muffled in the thick folds. It makes me sad because I've never seen such—such beautiful shirts before.",
        quoteLocation: "p6",
        analysis: "The collision of Gatsby's romantic dream with the material reality of Daisy's superficiality."
      },
      {
        id: "node-4",
        stage: "Climax",
        title: "The Plaza Hotel Showdown & Myrtle's Death",
        tension: 100,
        summary: "On the hottest day of summer, Tom confronts Gatsby at the Plaza Hotel, exposing his criminal bootlegging. Driving home, Daisy accidentally runs down Myrtle Wilson in Gatsby's car.",
        quote: "Tom flung open the door... 'She's dead,' he said. 'The car didn't stop.'",
        quoteLocation: "p7",
        analysis: "The catastrophic collision between social classes, shattering Gatsby's illusion of controlling time."
      },
      {
        id: "node-5",
        stage: "Falling Action",
        title: "Gatsby's Vigil & Murder in the Pool",
        tension: 70,
        summary: "Gatsby keeps a lonely night-vigil outside Daisy's house to protect her. The next day, Tom directs George Wilson to Gatsby's mansion; Wilson shoots Gatsby in his pool and commits suicide.",
        quote: "The touch of a cluster of leaves revolved it slowly, tracing, like the leg of transit, a thin red circle in the water.",
        quoteLocation: "p7",
        analysis: "The tragic sacrificial death of the romantic dreamer while the true culprits escape unpunished."
      },
      {
        id: "node-6",
        stage: "Resolution",
        title: "The Lonely Funeral & Boats Against the Current",
        tension: 40,
        summary: "Only Nick, Owl Eyes, and Gatsby's father attend the funeral. Disillusioned with the East Coast's moral corruption, Nick prepares to leave, reflecting on Gatsby's tragic dream.",
        quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
        quoteLocation: "p8",
        analysis: "Universalization of Gatsby's struggle as the eternal human pursuit of hope against the undertow of time."
      }
    ],

    deepDive: {
      "plot-conflict": {
        id: "plot-conflict",
        title: "Plot & Core Conflict",
        subtitle: "Class Rigidity vs. The Reinvention of Identity",
        summary: "Fitzgerald structures the novel around the insurmountable chasm between America's promise of upward social mobility and the brutal reality of entrenched class aristocracy.",
        keyPoints: [
          "**Old Money vs. New Money:** East Egg represents inherited social legitimacy, whereas West Egg represents gaudy, unaccepted wealth.",
          "**The Illusion of Repeating the Past:** Gatsby believes that through sheer willpower and wealth, history can be completely rewritten.",
          "**The Reckoning:** The car accident functions as the inevitable physical collision of these irreconcilable social strata."
        ],
        pullQuotes: [
          {
            quote: "'Can't repeat the past?' he cried incredulously. 'Why of course you can!'",
            significance: "The core philosophical delusion that leads directly to Gatsby's destruction."
          }
        ]
      },
      "characters": {
        id: "characters",
        title: "Characters & Social Castes",
        subtitle: "Dreamers, Cynics, and Careless Aristocrats",
        summary: "The characters embody distinct attitudes toward wealth, morality, and romantic illusion during the Roaring Twenties.",
        keyPoints: [
          "**Jay Gatsby (James Gatz):** The tragic romantic who invents himself out of nothing to win back his idealized love.",
          "**Daisy Buchanan:** The alluring siren whose voice is 'full of money'—charming, fragile, yet fundamentally cowardly and callous.",
          "**Tom Buchanan:** The brutal, racist embodiment of entrenched aristocratic privilege who uses wealth to avoid all consequences.",
          "**Nick Carraway:** The observant, compromised narrator who vacillates between attraction and revulsion toward Eastern wealth."
        ],
        pullQuotes: [
          {
            quote: "Her voice is full of money, he said suddenly. That was the inexhaustible charm that rose and fell in it...",
            significance: "Identifies Daisy's true essence: her appeal is inseparable from the power and insulation of wealth."
          }
        ]
      },
      "setting-pov": {
        id: "setting-pov",
        title: "Setting & Point of View",
        subtitle: "The Geography of Wealth & Peripheral Narration",
        summary: "Fitzgerald uses distinct geographical regions (East Egg, West Egg, the Valley of Ashes, New York City, and the Midwest) to chart moral geography.",
        keyPoints: [
          "**The Valley of Ashes:** A desolate industrial wasteland between Long Island and NYC, representing the human and environmental wreckage of industrial capitalism.",
          "**First-Person Retrospective POV:** Nick narrates the events after returning to the Midwest, casting a nostalgic, melancholic filter over the narrative.",
          "**The Sweltering Heat:** The climax at the Plaza Hotel takes place on the hottest day of summer, mirroring boiling emotional tensions."
        ],
        pullQuotes: [
          {
            quote: "I see now that this has been a story of the West, after all—Tom and Gatsby, Daisy and Jordan and I, were all Westerners...",
            significance: "Explores the psychological alienation of Western innocence corrupted by Eastern sophistication."
          }
        ]
      },
      "themes-symbols": {
        id: "themes-symbols",
        title: "Themes & Symbols",
        subtitle: "The Green Light, Eyes of Eckleburg, & Yellow Car",
        summary: "The novel is saturated with rich, recurring symbols that explore the decay of the American Dream and the commercialization of spirituality.",
        keyPoints: [
          "**The Green Light:** Yearning, hope, the American Dream, and the unbridgeable distance between human desire and reality.",
          "**The Eyes of Dr. T. J. Eckleburg:** An abandoned billboard that George Wilson mistakes for the judgmental gaze of God in a commercialized world.",
          "**The Yellow Car (Death Car):** Gatsby's ostentatious car represents gaudy New Money excess and becomes the weapon of destruction."
        ],
        pullQuotes: [
          {
            quote: "God sees everything, repeated Wilson. 'That's an advertisement,' Michaelis assured him.",
            significance: "The tragic substitution of empty commercial signage for transcendent spiritual meaning."
          }
        ]
      },
      "devices-style": {
        id: "devices-style",
        title: "Literary Devices & Style",
        subtitle: "Lyrical Modernism, Color Symbolism, & Irony",
        summary: "Fitzgerald's prose is celebrated for its lush musicality, rhythmic balance, and evocative color symbolism.",
        keyPoints: [
          "**Color Symbolism:** White (false innocence), Gold/Yellow (decay and corrupted wealth), Green (hope and money), Gray (barrenness of the ash valley).",
          "**Chiasmus & Cadence:** Lyrical, balanced sentences that evoke the jazz rhythms and elegiac sadness of the era.",
          "**Time Distortion:** Disrupted chronology through flashbacks (Gatsby's origins with Dan Cody and his 1917 romance in Louisville)."
        ],
        pullQuotes: [
          {
            quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
            significance: "Perfect synthesis of rhythm, alliteration, and thematic paradox."
          }
        ]
      }
    },

    studyPrep: {
      essayAngles: [
        {
          prompt: "How does Fitzgerald use the geography of Long Island and New York City to represent social hierarchy and moral decay?",
          thesisTemplate: "By juxtaposing the aristocratic East Egg against the nouveau-riche West Egg and the desolate Valley of Ashes, Fitzgerald illustrates that [geographic division] reflects [moral/class critique]."
        },
        {
          prompt: "Analyze the character of Daisy Buchanan: is she a victim of societal expectations or a willing participant in aristocratic cruelty?",
          thesisTemplate: "While Daisy Buchanan is constrained by [patriarchal wealth/societal norms], her ultimate decision to [retreat into wealth] proves that she is [interpretative claim]."
        },
        {
          prompt: "Evaluate the role of Jay Gatsby as the embodiment of the American Dream.",
          thesisTemplate: "Jay Gatsby's meteoric rise and tragic demise demonstrate that the American Dream is fundamentally corrupted by [materialism/class rigidity], transforming romantic aspiration into [tragic consequence]."
        }
      ],
      criticalThinking: [
        {
          question: "Why does Fitzgerald choose Nick Carraway, rather than Jay Gatsby, as the narrator of the novel?",
          answer: "Nick provides a vital middle ground: he is socially connected to East Egg through his cousin Daisy, yet shares Gatsby's Midwestern outsider perspective. His peripheral narration preserves Gatsby's enigmatic myth while providing a critical moral lens on the Jazz Age."
        },
        {
          question: "What is the symbolic significance of Gatsby's massive collection of unread books in his library ('Owl Eyes' scene)?",
          answer: "The library contains real, bona fide books with uncut pages. 'Owl Eyes' is stunned that Gatsby did not use fake cardboard spines; it proves Gatsby spent enormous wealth to build an authentic-looking façade of Old World education and culture, even if he never actually read them."
        },
        {
          question: "How does the final line of the novel encapsulate Fitzgerald's philosophical view of human existence?",
          answer: "'So we beat on, boats against the current, borne back ceaselessly into the past' suggests that human beings are defined by their persistent struggle to push forward into the future, yet are inevitably pulled backward by their history, memories, and nostalgia."
        }
      ],
      quiz: [
        {
          id: "q1",
          question: "What does the green light at the end of Daisy's dock symbolize for Jay Gatsby?",
          options: [
            "His desire to invest in green energy bonds in Wall Street",
            "His unattainable dream and yearning to rekindle the past with Daisy",
            "A navigation signal for his illegal bootlegging yachts",
            "His envy of Tom Buchanan's family pedigree"
          ],
          correctIndex: 1,
          explanation: "The green light represents Gatsby's intense romantic hope and the elusive, ideal future he yearns to recreate with Daisy."
        },
        {
          id: "q2",
          question: "What is the real identity and birth name of Jay Gatsby?",
          options: [
            "Meyer Wolfsheim",
            "James Gatz from North Dakota",
            "Dan Cody of Nevada",
            "Edward Carraway of Minnesota"
          ],
          correctIndex: 1,
          explanation: "Gatsby was born James Gatz to poor farm parents in North Dakota before creating his glamorous alter-ego at age seventeen."
        },
        {
          id: "q3",
          question: "Who is actually driving the yellow roadster that strikes and kills Myrtle Wilson?",
          options: [
            "Jay Gatsby",
            "Daisy Buchanan",
            "Tom Buchanan",
            "Nick Carraway"
          ],
          correctIndex: 1,
          explanation: "Daisy was driving the car to calm her nerves following the argument at the Plaza, though Gatsby takes the blame to protect her."
        },
        {
          id: "q4",
          question: "What do the giant eyes of Doctor T. J. Eckleburg look over?",
          options: [
            "The marble swimming pool at West Egg",
            "The Valley of Ashes industrial wasteland",
            "The Plaza Hotel penthouse suite",
            "The railway terminal at Grand Central"
          ],
          correctIndex: 1,
          explanation: "The faded billboard of Doctor T. J. Eckleburg stares out over the desolate, dusty Valley of Ashes."
        },
        {
          id: "q5",
          question: "Which of the following people actually attends Jay Gatsby's funeral?",
          options: [
            "Daisy Buchanan",
            "Meyer Wolfsheim",
            "The eccentric man with owl-eyed spectacles",
            "Jordan Baker"
          ],
          correctIndex: 2,
          explanation: "Aside from Nick, Gatsby's father Henry Gatz, and the servants, only 'Owl Eyes' attends the lonely funeral in the rain."
        }
      ]
    }
  },

  "the-yellow-wallpaper": {
    id: "the-yellow-wallpaper",
    title: "The Yellow Wallpaper",
    author: "Charlotte Perkins Gilman",
    publicationYear: "1892",
    genre: "Feminist Gothic / Psychological Realism",
    setting: "A rented colonial mansion (an upstairs nursery); Late 19th Century",
    pov: "First-Person Epistolary / Secret Journal",
    conflictType: "Man vs. Society (Patriarchal Medical Oppression vs. Female Autonomy)",
    wordCount: 6033,
    estimatedReadTime: "25 min",
    tone: ["Claustrophobic", "Feverish", "Subversive", "Ironic"],
    isObscure: false,

    summary: {
      beginning: "An unnamed woman suffering from postpartum depression is brought by her physician husband, John, to a secluded summer estate for a prescribed 'rest cure.' Forbidden from working, writing, or mental stimulation, she is confined to an upstairs former nursery with barred windows and decaying, repulsive yellow wallpaper.",
      middle: "As her sensory deprivation and boredom intensify, she becomes obsessed with the grotesque, swirling patterns of the yellow wallpaper. In her secret journal entries, she begins to perceive a faint sub-pattern behind the front design: a desperate woman creeping on all fours, shaking the wallpaper's bars to escape.",
      end: "Identifying completely with the trapped woman, the narrator locks herself inside the nursery on their final day and frantically tears down the wallpaper to liberate her alter-ego. When John forces the door open, he finds his wife crawling in circles along the wall and faints in shock, forcing her to crawl over his prostrate body on each circuit."
    },
    historicalContext: {
      authorBio: "Charlotte Perkins Gilman (1860–1935) was a prominent American feminist, sociologist, novelist, and poet who advocated for women's financial independence and psychiatric reform.",
      literaryMovement: "Feminist Realism / 19th-Century American Gothic: Critiquing Victorian gender roles, domestic entrapment, and medical paternalism.",
      historicalEra: "Published in 1892 as a direct rebuttal to Dr. Silas Weir Mitchell's famous 'rest cure' for female hysteria, which mandated complete isolation, bed rest, and suppression of intellectual activity."
    },
    compareAndConnect: [
      {
        title: "The Babadook & Black Swan",
        type: "Modern Psychological Horror",
        connection: "Parallels psychological horror narratives where domestic confinement and maternal/mental distress manifest as physical delusions."
      },
      {
        title: "The Madwoman in the Attic (Gilbert & Gubar)",
        type: "Literary Theory",
        connection: "The quintessential text exemplifying the 19th-century trope of female artistic rage and repressed intellect exploding into literal/metaphorical madness."
      },
      {
        title: "The Metaphor of the Panopticon",
        type: "Sociological Parallel",
        connection: "John's benevolent yet totalizing medical surveillance mirrors Foucault's Panopticon, where constant observation enforces obedience."
      }
    ],

    paragraphs: [
      {
        id: "p1",
        number: 1,
        text: "It is very seldom that mere ordinary people like John and myself secure ancestral halls for the summer. A colonial mansion, a hereditary estate, I would say a haunted house, and reach the height of romantic felicity—but that would be asking too much of fate!",
        annotations: [
          {
            category: "setting-world",
            phrase: "A colonial mansion, a hereditary estate, I would say a haunted house",
            note: "The gothic mansion setting represents traditional patriarchal inheritance and ancestral domestic confinement.",
            device: "Gothic Setting"
          }
        ]
      },
      {
        id: "p2",
        number: 2,
        text: "John is practical in the extreme. He has no patience with faith, an intense horror of superstition, and he scoffs openly at any talk of things not to be felt and seen and put down in figures. John is a physician, and perhaps—(I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind)—perhaps that is one reason I do not get well faster.",
        annotations: [
          {
            category: "characters",
            phrase: "John is practical in the extreme. He has no patience with faith, an intense horror of superstition",
            note: "Establishes John as the embodiment of rigid 19th-century scientific rationalism that dismisses emotional and creative intuition.",
            device: "Character Contrast"
          },
          {
            category: "meaning-theme",
            phrase: "perhaps that is one reason I do not get well faster. You see he does not believe I am sick!",
            note: "The core ideological conflict: medical gaslighting where the husband denies the validity of her lived psychological reality.",
            device: "Theme of Institutional Invalidation"
          }
        ]
      },
      {
        id: "p3",
        number: 3,
        text: "I am sitting by the window now, up in this abominable nursery, and there is nothing to hinder my writing as much as I please, save lack of strength. John is away all day, and even some nights when his cases are serious. I am glad my case is not serious! But these nervous troubles are dreadfully depressing.",
        annotations: [
          {
            category: "setting-world",
            phrase: "up in this abominable nursery",
            note: "Confining an adult intellectual woman to a nursery with barred windows infantilizes her and reinforces her complete powerlessness.",
            device: "Spatial Symbolism"
          }
        ]
      },
      {
        id: "p4",
        number: 4,
        text: "It is the strangest yellow, that wallpaper! It makes me think of all the yellow things I ever saw—not beautiful ones like buttercups, but old foul, bad yellow things. But there is something else about that paper—the smell! I noticed it the moment we came into the room, but with so much air and sun it was not bad. Now we have had a week of fog and rain, and whether the windows are open or not, the smell is here. It creeps all over the house. I find it hovering in the dining-room, skulking in the parlor, hiding in the hall, lying in wait for me on the stairs.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "It is the strangest yellow, that wallpaper! It makes me think of all the yellow things I ever saw... old foul, bad yellow things.",
            note: "The sickly yellow color symbolizes rot, mental decay, and the suffocating atmosphere of repressed Victorian domesticity.",
            device: "Sensory Symbolism"
          },
          {
            category: "literary-devices",
            phrase: "It creeps all over the house. I find it hovering in the dining-room, skulking in the parlor, hiding in the hall",
            note: "Personification of the odor gives the wallpaper predatory, malevolent agency, foreshadowing her mental engulfment.",
            device: "Personification & Anaphora"
          }
        ]
      },
      {
        id: "p5",
        number: 5,
        text: "The front pattern does move—and no wonder! The woman behind shakes it! Sometimes I think there are a great many women behind, and sometimes only one, and she crawls around fast, and her crawling shakes it all over. Then in the very bright spots she keeps still, and in the very shady spots she takes hold of the bars and shakes them hard. And she is all the time trying to climb through.",
        annotations: [
          {
            category: "plot",
            phrase: "The front pattern does move—and no wonder! The woman behind shakes it!",
            note: "The pivotal psychological projection: the narrator externalizes her own entrapment into the hallucinated woman behind the wallpaper's bars.",
            device: "Psychological Projection / Turning Point"
          },
          {
            category: "meaning-theme",
            phrase: "Sometimes I think there are a great many women behind... she takes hold of the bars and shakes them hard.",
            note: "Expands the individual woman's plight into a collective feminist metaphor for all Victorian women imprisoned by patriarchal society.",
            device: "Universal Allegory"
          }
        ]
      },
      {
        id: "p6",
        number: 6,
        text: "'I've got out at last,' said I, 'in spite of you and Jane. And I've pulled off most of the paper, so you can't put me back!' Now why should that man have fainted? But he did, and right across my path by the wall, so that I had to creep over him every time!",
        annotations: [
          {
            category: "plot",
            phrase: "'I've got out at last,' said I, 'in spite of you and Jane. And I've pulled off most of the paper, so you can't put me back!'",
            note: "The climax and subversive resolution. Liberation is achieved through total mental breakdown, shattering the husband's authority.",
            device: "Subversive Climax"
          },
          {
            category: "characters",
            phrase: "right across my path by the wall, so that I had to creep over him every time!",
            note: "A powerful final image of female triumph: the rationalist patriarch lies unconscious on the floor while the liberated woman crawls over him.",
            device: "Role Reversal & Visual Irony"
          }
        ]
      }
    ],

    vocabulary: [
      {
        word: "felicity",
        pos: "noun",
        definition: "Intense happiness, bliss, or the ability to find appropriate expression.",
        sentence: "I would say a haunted house, and reach the height of romantic **felicity**.",
        connotation: "Joyful romantic bliss",
        etymology: "Latin *felicitas*"
      },
      {
        word: "scoffs",
        pos: "verb",
        definition: "Speaks to someone or about something in a scornfully derisive or mocking way.",
        sentence: "he **scoffs** openly at any talk of things not to be felt and seen and put down in figures.",
        connotation: "Derisive dismissal",
        etymology: "Scandinavian origin"
      },
      {
        word: "congenial",
        pos: "adjective",
        definition: "Pleasant or agreeable because suited to one's taste or inclination.",
        sentence: "a really exciting occupation had much the same effect upon a **congenial** nature.",
        connotation: "Harmonious, suitable",
        etymology: "Latin *com* + *genialis*"
      },
      {
        word: "querulous",
        pos: "adjective",
        definition: "Complaining in a petulant, whining, or fretful manner.",
        sentence: "I don't sleep well at all, and I feel so fretful and **querulous**.",
        connotation: "Petulant irritation",
        etymology: "Latin *queri* (to complain)"
      },
      {
        word: "undulating",
        pos: "adjective",
        definition: "Moving with a smooth wavelike motion or undulating curve.",
        sentence: "the strange, **undulating** curves that seemed to mock the eye.",
        connotation: "Sinister serpentine wave",
        etymology: "Latin *undulare* (to wave)"
      },
      {
        word: "skulking",
        pos: "verb",
        definition: "Keep out of sight, typically with a sinister, cowardly, or furtive motive.",
        sentence: "I find it hovering in the dining-room, **skulking** in the parlor.",
        connotation: "Furtive stealth",
        etymology: "Scandinavian origin"
      },
      {
        word: "reproachful",
        pos: "adjective",
        definition: "Expressing disapproval, blame, or disappointment.",
        sentence: "I cried at his **reproachful** look, for I know how good he is to me.",
        connotation: "Accusatory, guilty",
        etymology: "Old French *reprochier*"
      },
      {
        word: "impertinence",
        pos: "noun",
        definition: "Lack of respect; insolence or rudeness.",
        sentence: "There is a recurrent spot where the pattern lolls like a broken neck and two bulbous eyes stare at you with a vicious **impertinence**.",
        connotation: "Insolent audacity",
        etymology: "Latin *impertinentia*"
      },
      {
        word: "interminable",
        pos: "adjective",
        definition: "Endless, unceasing, or tiresomely protracted.",
        sentence: "an **interminable** series of optical illusions that strained the vision.",
        connotation: "Agonizingly infinite",
        etymology: "Latin *interminabilis*"
      },
      {
        word: "florid",
        pos: "adjective",
        definition: "Elaborately or excessively intricate, ornate, or flowery.",
        sentence: "a dull **florid** arabesque reminding one of Romanesque fungus.",
        connotation: "Gaudy decorative excess",
        etymology: "Latin *flos* (flower)"
      }
    ],

    storyMap: [
      {
        id: "node-1",
        stage: "Exposition",
        title: "The Ancestral Estate & The Rest Cure",
        tension: 20,
        summary: "The narrator is moved into a remote colonial estate by her physician husband John to recover from 'temporary nervous depression' through complete isolation and inactivity.",
        quote: "John is a physician, and perhaps... perhaps that is one reason I do not get well faster. You see he does not believe I am sick!",
        quoteLocation: "p2",
        analysis: "Establishes the patriarchal medical hierarchy that silences female agency."
      },
      {
        id: "node-2",
        stage: "Inciting Incident",
        title: "Confinement to the Barred Nursery",
        tension: 40,
        summary: "Forbidden from writing, she is placed in an upstairs nursery with barred windows, a nailed-down bed, and torn, fungal yellow wallpaper.",
        quote: "It is stripped off—the paper—in great patches all around the head of my bed, about as far as I can reach...",
        quoteLocation: "p3",
        analysis: "The nursery space visually reinforces her infantilization and physical imprisonment."
      },
      {
        id: "node-3",
        stage: "Rising Action",
        title: "Fixation on the Wallpaper's Patterns",
        tension: 65,
        summary: "Deprived of social and intellectual stimulation, she spends weeks deciphering the wallpaper's intricate design, noticing an unsettling smell and optical distortions.",
        quote: "It makes me think of all the yellow things I ever saw... not beautiful ones like buttercups, but old foul, bad yellow things.",
        quoteLocation: "p4",
        analysis: "Sensory deprivation channels all cognitive energy into hallucination and obsessive analysis."
      },
      {
        id: "node-4",
        stage: "Climax",
        title: "The Sub-Pattern Woman & Barred Cage",
        tension: 85,
        summary: "The narrator detects a trapped woman crawling behind the wallpaper's front pattern, shaking the bars in an attempt to break free.",
        quote: "The front pattern does move—and no wonder! The woman behind shakes it!",
        quoteLocation: "p5",
        analysis: "The narrator's conscious mind fully merges with her repressed, entrapped shadow persona."
      },
      {
        id: "node-5",
        stage: "Falling Action",
        title: "Tearing Down the Wallpaper",
        tension: 95,
        summary: "On the final day before departure, she locks herself in the room, throws the key into the garden, and frantically shreds the wallpaper to liberate the trapped woman.",
        quote: "I peeled off all the paper I could reach standing on the floor... I want to astonish John!",
        quoteLocation: "p6",
        analysis: "A frantic, ecstatic act of physical rebellion against the domestic cage."
      },
      {
        id: "node-6",
        stage: "Resolution",
        title: "Total Liberation & Creeping Over John",
        tension: 100,
        summary: "John breaks down the door and faints upon seeing his wife crawling along the baseboards. She continues creeping continuously, stepping over his body on each loop.",
        quote: "'I've got out at last,' said I, 'in spite of you and Jane.' ... Now why should that man have fainted? But he did, and right across my path by the wall, so that I had to creep over him every time!",
        quoteLocation: "p6",
        analysis: "A stunning inversion of patriarchal dominance where madness becomes the only available avenue of true autonomy."
      }
    ],

    deepDive: {
      "plot-conflict": {
        id: "plot-conflict",
        title: "Plot & Core Conflict",
        subtitle: "The Rest Cure vs. The Female Intellect",
        summary: "The narrative chronicles how forced domestic passivity and medical infantilization dismantle a woman's psychological equilibrium.",
        keyPoints: [
          "**The Medical Trap:** The 'cure' (enforced idleness) is precisely what precipitates her mental breakdown.",
          "**Epistolary Secrecy:** Her journal is an act of defiance against her husband's prohibition on mental exertion.",
          "**The Final Insurrection:** Destroying the wallpaper is a physical rejection of domestic docility."
        ],
        pullQuotes: [
          {
            quote: "I would not say it to a living soul, of course, but this is dead paper and a great relief to my mind...",
            significance: "Writing serves as the last lifeline of intellectual survival."
          }
        ]
      },
      "characters": {
        id: "characters",
        title: "Characters & Gender Roles",
        subtitle: "The Paternal Physician & The Suppressed Artist",
        summary: "The dynamic between John and the narrator illustrates Victorian gender polarization and the medical authority exercised over women.",
        keyPoints: [
          "**The Narrator:** An imaginative, creative woman whose postpartum depression is worsened by isolation.",
          "**John:** Benevolent yet condescending, he treats his wife as a fragile child rather than an intellectual equal.",
          "**Jennie:** The compliant sister-in-law who embodies the idealized domestic housekeeper."
        ],
        pullQuotes: [
          {
            quote: "What is it, little girl? he said. Don't go walking about like that—you'll get cold.",
            significance: "Demonstrates John's paternalistic infantilization of his adult wife."
          }
        ]
      },
      "setting-pov": {
        id: "setting-pov",
        title: "Setting & Point of View",
        subtitle: "The Barred Nursery & Epistolary Unreliability",
        summary: "The nursery setting functions as a psychological pressure cooker, transforming domestic sanctuary into a prison cell.",
        keyPoints: [
          "**The Barred Nursery:** Rings in the wall, barred windows, and a bolted bed suggest the room was previously used for lunatic confinement.",
          "**First-Person Stream of Consciousness:** The narration grows increasingly fractured, fragmented, and feverish.",
          "**The Yellow Color:** Symbolizes decay, jaundice, and the toxic aura of Victorian domestic repression."
        ],
        pullQuotes: [
          {
            quote: "The windows are barred for little children, and there are rings and things in the walls.",
            significance: "Chilling architectural clues indicating the room's true history as an asylum chamber."
          }
        ]
      },
      "themes-symbols": {
        id: "themes-symbols",
        title: "Themes & Symbols",
        subtitle: "The Wallpaper, Creeping, & Medical Paternalism",
        summary: "The story is rich with multifaceted symbols of female oppression and the quest for autonomy.",
        keyPoints: [
          "**The Yellow Wallpaper:** Represents the complex, suffocating patriarchal social structure that traps women.",
          "**The Trapped Woman:** The narrator's subconscious alter-ego and a universal avatar for all suppressed women.",
          "**Creeping:** The furtive, subjugated posture of women forced to submit in a male-dominated world, transformed at the end into defiant movement."
        ],
        pullQuotes: [
          {
            quote: "I've pulled off most of the paper, so you can't put me back!",
            significance: "The declaration that once patriarchal illusions are shattered, true domestic re-imprisonment is impossible."
          }
        ]
      },
      "devices-style": {
        id: "devices-style",
        title: "Literary Devices & Style",
        subtitle: "Dramatic Irony, Personification, & Gothic Atmosphere",
        summary: "Gilman employs subtle dramatic irony and shifting syntax to depict the gradual erosion of the narrator's conscious inhibitions.",
        keyPoints: [
          "**Dramatic Irony:** The reader recognizes John's treatment is destroying her long before the narrator admits his incompetence.",
          "**Personification:** The wallpaper is given eyes, breath, smell, and malignant intentionality.",
          "**Pacing & Fragmentation:** Paragraph lengths shorten as the narrative hurtles toward its hysterical resolution."
        ],
        pullQuotes: [
          {
            quote: "There is a recurrent spot where the pattern lolls like a broken neck...",
            significance: "Violent anatomical imagery foreshadowing psychological strangulation."
          }
        ]
      }
    },

    studyPrep: {
      essayAngles: [
        {
          prompt: "Analyze the symbolism of the yellow wallpaper and how its visual transformation mirrors the narrator's psychological journey.",
          thesisTemplate: "In 'The Yellow Wallpaper,' Charlotte Perkins Gilman utilizes the grotesque aesthetics of the wallpaper to symbolize [patriarchal oppression], transforming the domestic decoration into a battleground where the protagonist achieves [ironic freedom] through [madness]."
        },
        {
          prompt: "Examine how Gilman critiques 19th-century medical practices, specifically the 'rest cure' prescribed by Dr. Silas Weir Mitchell.",
          thesisTemplate: "By depicting John's scientific rationalism as an instrument of control, Gilman demonstrates that the 'rest cure' functions not as a medical remedy, but as an institutional method to [suppress female intellect/autonomy]."
        }
      ],
      criticalThinking: [
        {
          question: "What is the symbolic significance of the husband, John, fainting at the story's conclusion?",
          answer: "In Victorian literature, fainting was a stereotypically female reaction associated with emotional frailty. When John faints and his wife creeps continuously over his body, Gilman creates a total inversion of patriarchal authority: the rational, dominant physician is incapacitated on the floor while the liberated woman commands the room."
        },
        {
          question: "How does the room's physical description imply it was once used for psychiatric confinement rather than just a nursery?",
          answer: "The room features heavy bars on the windows, rings bolted into the wall (for restraints), a heavy bedstead firmly nailed to the floor, and scratches gouged into the baseboards and plaster—all physical hallmarks of an asylum cell rather than an ordinary children's nursery."
        }
      ],
      quiz: [
        {
          id: "q1",
          question: "What is the profession of the narrator's husband, John?",
          options: [
            "An architect and colonial surveyor",
            "A physician of high standing",
            "A lawyer and district judge",
            "A university professor of literature"
          ],
          correctIndex: 1,
          explanation: "John is a respected physician whose strict medical authority dictates his wife's confining treatment."
        },
        {
          id: "q2",
          question: "What activity is the narrator strictly forbidden from doing during her 'rest cure'?",
          options: [
            "Walking in the garden",
            "Writing and intellectual work",
            "Taking daily naps in bed",
            "Eating heavy dinners"
          ],
          correctIndex: 1,
          explanation: "The core rule of the rest cure was total mental rest, strictly forbidding her from writing in her journal or engaging in intellectual activity."
        },
        {
          id: "q3",
          question: "What does the narrator perceive behind the front pattern of the wallpaper?",
          options: [
            "A hidden door leading to a secret attic",
            "A desperate woman creeping on all fours behind bars",
            "A swarm of insects eating through the plaster",
            "A reflection of the ancestral gardens outside"
          ],
          correctIndex: 1,
          explanation: "She sees a woman trapped behind the front pattern, shaking the bars and creeping around the room."
        },
        {
          id: "q4",
          question: "What does the narrator do on the final day before their scheduled departure?",
          options: [
            "She burns the house down with lamp oil",
            "She locks herself in the room and tears off the wallpaper",
            "She runs away through the orchard to the train station",
            "She writes a public letter to the medical board"
          ],
          correctIndex: 1,
          explanation: "She locks the door, throws the key into the garden path, and frantically tears down the wallpaper to free the woman."
        },
        {
          id: "q5",
          question: "What happens when John finally breaks open the door to the nursery?",
          options: [
            "He joins her in tearing down the paper",
            "He faints across the floor, and she creeps over him",
            "He calls the local police to restrain her",
            "He immediately apologizes for his treatment"
          ],
          correctIndex: 1,
          explanation: "Overcome with shock at her state, John collapses and faints onto the floor, and she crawls over his body on each circuit around the wall."
        }
      ]
    }
  },

  "the-gift-of-the-magi": {
    id: "the-gift-of-the-magi",
    title: "The Gift of the Magi",
    author: "O. Henry",
    publicationYear: "1905",
    genre: "Romantic Realism / Irony Fiction",
    setting: "New York City modest flat; Christmas Eve 1905",
    pov: "Third-Person Omniscient / Direct Address",
    conflictType: "Man vs. Society (Poverty vs. Selfless Love)",
    wordCount: 2061,
    estimatedReadTime: "8 min",
    tone: ["Warm", "Whimsical", "Tender", "Ironic"],
    isObscure: false,

    summary: {
      beginning: "On Christmas Eve in New York City, Della Young counts her meager savings—just one dollar and eighty-seven cents—despairing that she cannot afford a worthy Christmas present for her beloved husband, Jim. Della's most prized possession is her waist-length, shimmering brown hair, while Jim's pride is his gold heirloom pocket watch.",
      middle: "Determined to honor Jim, Della visits Madame Sofronie's hair shop and sells her magnificent hair for twenty dollars. With the money, she searches the shops of New York and purchases a sleek, elegant platinum watch chain for Jim's watch. She returns home, curls her remaining short hair, and anxiously waits for Jim to return from work.",
      end: "When Jim arrives home, he stares at Della in stunned disbelief. He presents his gift to her: a set of luxurious tortoiseshell combs with jeweled rims that Della had long admired in a Broadway window. Della then excitedly presents her platinum chain, only for Jim to smile and reveal that he sold his prized gold watch to buy her the combs. The narrator declares that of all who give and receive gifts, these two are the wisest—the true Magi."
    },
    historicalContext: {
      authorBio: "O. Henry (William Sydney Porter, 1862–1910) was a master of the American short story, renowned for his witty narration, vivid New York cityscapes, and iconic surprise twist endings.",
      literaryMovement: "American Romantic Realism & Urban Sentimentality: Blending the gritty economic hardships of urban wage-earners with sentimental idealism and moral warmth.",
      historicalEra: "Published in December 1905 in the *New York World*, reflecting the lives of working-class couples struggling to make ends meet during the Gilded Age in Manhattan."
    },
    compareAndConnect: [
      {
        title: "The Necklace (Guy de Maupassant)",
        type: "Literary Contrast",
        connection: "Maupassant uses situational irony to deliver a crushing blow of vanity and ruined lives, whereas O. Henry uses situational irony to elevate selfless devotion."
      },
      {
        title: "The Biblical Magi (Matthew 2:1-12)",
        type: "Universal Mythos",
        connection: "Parallels the wise men bearing gold, frankincense, and myrrh to the Christ child, reframing sacrificial love as the supreme human wisdom."
      }
    ],

    paragraphs: [
      {
        id: "p1",
        number: 1,
        text: "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies. Pennies saved one and two at a time by bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony that such close dealing implied. Three times Della counted it. One dollar and eighty-seven cents. And the next day would be Christmas.",
        annotations: [
          {
            category: "setting-world",
            phrase: "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies.",
            note: "The opening establishes the concrete, suffocating financial reality of working-class domestic life in early 20th-century New York.",
            device: "Economic Realism & Repetition"
          },
          {
            category: "characters",
            phrase: "bulldozing the grocer and the vegetable man and the butcher until one's cheeks burned with the silent imputation of parsimony",
            note: "Reveals Della's fierce determination and the social humiliation endured to scrape together holiday funds.",
            device: "Characterization through Action"
          }
        ]
      },
      {
        id: "p2",
        number: 2,
        text: "Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim's gold watch that had been his father's and his grandfather's. The other was Della's hair. Had the Queen of Sheba lived in the flat across the airshaft, Della would have let her hair hang out the window some day to dry just to depreciate Her Majesty's jewels and gifts. Had King Solomon been the janitor, with all his treasures piled up in the basement, Jim would have pulled out his watch every time he passed, just to see him pluck at his beard from envy.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "Had the Queen of Sheba lived in the flat across the airshaft... Had King Solomon been the janitor",
            note: "Playful hyperbole comparing their two humble possessions to royal biblical treasures, establishing their emotional value beyond currency.",
            device: "Biblical Allusion & Hyperbole"
          }
        ]
      },
      {
        id: "p3",
        number: 3,
        text: "So now Della's beautiful hair fell about her rippling and shining like a cascade of brown waters. It reached below her knee and made itself almost a garment for her. And then she did it up again nervously and quickly. Once she faltered for a minute and stood still while a tear or two splashed on the worn red carpet. On went her old brown jacket; on went her old brown hat. With a whirl of skirts and with the brilliant sparkle still in her eyes, she fluttered out the door and down the stairs to the street.",
        annotations: [
          {
            category: "plot",
            phrase: "With a whirl of skirts and with the brilliant sparkle still in her eyes, she fluttered out the door",
            note: "The inciting action: Della resolves to sacrifice her most precious physical asset out of love for Jim.",
            device: "Sacrificial Turning Point"
          }
        ]
      },
      {
        id: "p4",
        number: 4,
        text: "It was a platinum fob chain simple and chaste in design, properly proclaiming its value by substance alone and not by meretricious ornamentation—as all good things should do. It was even worthy of The Watch. As soon as she saw it she knew that it must be Jim's. It was like him. Quietness and value—the description applied to both.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "Quietness and value—the description applied to both.",
            note: "The platinum chain symbolizes Jim's intrinsic character: modest, unpretentious, enduring, and of genuine worth.",
            device: "Symbolic Alignment"
          }
        ]
      },
      {
        id: "p5",
        number: 5,
        text: "Jim stopped inside the door, as immovable as a setter at the scent of quail. His eyes were fixed upon Della, and there was an expression in them that she could not read, and it terrified her. It was not anger, nor surprise, nor disapproval, nor horror, nor any of the sentiments that she had been prepared for. He simply stared at her fixedly with that peculiar expression on his face.",
        annotations: [
          {
            category: "literary-devices",
            phrase: "as immovable as a setter at the scent of quail.",
            note: "Hunting simile highlighting Jim's frozen cognitive overload as his mind attempts to reconcile the missing hair with his gift.",
            device: "Simile & Suspense Building"
          }
        ]
      },
      {
        id: "p6",
        number: 6,
        text: "For there lay The Combs—the set of combs, side and back, that Della had worshipped for long in a Broadway window. Beautiful combs, pure tortoise shell, with jewelled rims—just the shade to wear in the beautiful vanished hair. ... 'Dell,' said he, 'let's put our Christmas presents away and keep 'em a while. They're too nice to use just at present. I sold the watch to get the money to buy your combs. And now suppose you put the chops on.'",
        annotations: [
          {
            category: "plot",
            phrase: "I sold the watch to get the money to buy your combs. And now suppose you put the chops on.",
            note: "The double situational irony twist: each partner has sacrificed their supreme treasure to purchase an accessory for the other's sacrificed treasure.",
            device: "Double Situational Irony"
          }
        ]
      },
      {
        id: "p7",
        number: 7,
        text: "The magi, as you know, were wise men—wonderfully wise men—who brought gifts to the Babe in the manger. They invented the art of giving Christmas presents. ... But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest. Of all who give and receive gifts, such as they are wisest. Everywhere they are wisest. They are the magi.",
        annotations: [
          {
            category: "meaning-theme",
            phrase: "of all who give gifts these two were the wisest... Everywhere they are wisest. They are the magi.",
            note: "The narrator's moral thesis: self-sacrificing love transcends material utility, rendering Della and Jim the true embodiment of spiritual wisdom.",
            device: "Philosophical Synthesis & Direct Address"
          }
        ]
      }
    ],

    vocabulary: [
      {
        word: "parsimony",
        pos: "noun",
        definition: "Extreme unwillingness to spend money or use resources; stinginess.",
        sentence: "silent imputation of **parsimony** that such close dealing implied.",
        connotation: "Miserly stinginess",
        etymology: "Latin *parcere* (to spare)"
      },
      {
        word: "instigation",
        pos: "noun",
        definition: "The action or process of inciting or provoking someone to do something.",
        sentence: "which instigates the moral reflection that life is made up of sobs, sniffles, and smiles.",
        connotation: "Provocation, catalyst",
        etymology: "Latin *instigare*"
      },
      {
        word: "depreciate",
        pos: "verb",
        definition: "Diminish in value or disparage the worth of something over time.",
        sentence: "Della would have let her hair hang out the window some day to dry just to **depreciate** Her Majesty's jewels.",
        connotation: "Reduce perceived value",
        etymology: "Latin *depretiare*"
      },
      {
        word: "meretricious",
        pos: "adjective",
        definition: "Apparently attractive but having in reality no value or integrity; gaudy.",
        sentence: "proclaiming its value by substance alone and not by **meretricious** ornamentation.",
        connotation: "Tawdry superficial shine",
        etymology: "Latin *meretrix*"
      },
      {
        word: "prudence",
        pos: "noun",
        definition: "The quality of being prudent; cautiousness, wisdom, and good judgment.",
        sentence: "When Della reached home her intoxication gave way a little to **prudence** and reason.",
        connotation: "Sensible, sober foresight",
        etymology: "Latin *prudentia*"
      },
      {
        word: "scrutiny",
        pos: "noun",
        definition: "Critical observation or close examination.",
        sentence: "For ten seconds let us regard with discreet **scrutiny** some inconsequential object in the other direction.",
        connotation: "Detailed inspection",
        etymology: "Latin *scrutari* (to search)"
      },
      {
        word: "mendicancy",
        pos: "noun",
        definition: "The practice of begging; the condition of being a beggar.",
        sentence: "In the vestibule below was a letter-box into which no letter would go, and an electric button from which no mortal finger could coax a ring. Also appertaining thereunto was a card bearing the name 'Mr. James Dillingham Young.' It did not go so far as to claim a **mendicancy** squad, but it was certainly on that track.",
        connotation: "Impoverished begging",
        etymology: "Latin *mendicans*"
      },
      {
        word: "fob",
        pos: "noun",
        definition: "A chain or ribbon attached to a pocket watch.",
        sentence: "It was a platinum **fob** chain simple and chaste in design.",
        connotation: "Classic watch accessory",
        etymology: "German *fuppe* (pocket)"
      },
      {
        word: "truant",
        pos: "adjective",
        definition: "Wandering away from duty; staying away without permission.",
        sentence: "which made her look wonderfully like a **truant** schoolboy.",
        connotation: "Mischievous runaway",
        etymology: "Old French *truant*"
      },
      {
        word: "coveted",
        pos: "adjective",
        definition: "Yearned for eagerly or greatly desired (especially something belonging to another).",
        sentence: "And now, they were hers, but the tresses that should have adorned the **coveted** adornments were gone.",
        connotation: "Preciously longed-for",
        etymology: "Latin *cupere* (to desire)"
      }
    ],

    storyMap: [
      {
        id: "node-1",
        stage: "Exposition",
        title: "Della's Poverty & The Two Treasures",
        tension: 15,
        summary: "Della has only $1.87 on Christmas Eve to buy Jim a present. The couple possesses two cherished items: Jim's heirloom gold watch and Della's waist-length brown hair.",
        quote: "One dollar and eighty-seven cents. That was all. ... And the next day would be Christmas.",
        quoteLocation: "p1",
        analysis: "Establishes the tender love between the young couple alongside their tight economic constraints."
      },
      {
        id: "node-2",
        stage: "Inciting Incident",
        title: "Selling the Hair for Twenty Dollars",
        tension: 40,
        summary: "Della visits Madame Sofronie's shop and impulsively cuts and sells her locks for $20 to fund Jim's gift.",
        quote: "'Give it to me quick,' said Della. ... And the next two hours tripped by on rosy wings.",
        quoteLocation: "p3",
        analysis: "The selfless sacrificial act that sets the plot and dramatic irony in motion."
      },
      {
        id: "node-3",
        stage: "Rising Action",
        title: "Purchasing the Platinum Watch Chain",
        tension: 60,
        summary: "Della searches Manhattan for the ideal present, buying an elegant platinum chain for Jim's pocket watch for $21.",
        quote: "Quietness and value—the description applied to both.",
        quoteLocation: "p4",
        analysis: "Della finds an object that perfectly embodies Jim's unassuming character."
      },
      {
        id: "node-4",
        stage: "Climax",
        title: "Jim Arrives & Presents the Combs",
        tension: 90,
        summary: "Jim enters their flat, frozen by Della's cropped hair. He hands her a package containing the expensive tortoiseshell combs she had long desired.",
        quote: "For there lay The Combs—the set of combs, side and back, that Della had worshipped for long in a Broadway window.",
        quoteLocation: "p6",
        analysis: "The reveal of Jim's gift creates immediate bittersweet irony before his own sacrifice is even spoken."
      },
      {
        id: "node-5",
        stage: "Falling Action",
        title: "The Watch Is Sold",
        tension: 70,
        summary: "Della excitedly gives Jim the platinum chain, only for Jim to reveal he sold his gold watch to afford the combs.",
        quote: "'Dell,' said he, 'let's put our Christmas presents away and keep 'em a while. They're too nice to use just at present. I sold the watch to get the money to buy your combs.'",
        quoteLocation: "p6",
        analysis: "The symmetry of sacrifice completes the double situational irony."
      },
      {
        id: "node-6",
        stage: "Resolution",
        title: "The Wisdom of the Magi",
        tension: 30,
        summary: "The narrator reflects that although their gifts are temporarily useless, Della and Jim are the wisest of all gift givers: they sacrificed their greatest worldly treasures out of pure devotion.",
        quote: "of all who give and receive gifts, such as they are wisest. Everywhere they are wisest. They are the magi.",
        quoteLocation: "p7",
        analysis: "Moral elevation of love and spiritual richness over material wealth."
      }
    ],

    deepDive: {
      "plot-conflict": {
        id: "plot-conflict",
        title: "Plot & Core Conflict",
        subtitle: "The Symmetrical Irony of Selfless Giving",
        summary: "O. Henry builds a pristine clockwork plot anchored on mutual secret sacrifice and the collision of complimentary desires.",
        keyPoints: [
          "**Double Situational Irony:** Both partners sell their own treasure to buy an accessory for the other's treasure.",
          "**Tightly Paced 24-Hour Frame:** The story unfolds entirely on Christmas Eve in a single modest Manhattan flat.",
          "**Material Loss vs. Spiritual Gain:** While the material gifts cannot be utilized, their emotional bond is magnified."
        ],
        pullQuotes: [
          {
            quote: "I sold the watch to get the money to buy your combs.",
            significance: "The line that resolves the narrative puzzle with emotional resonance."
          }
        ]
      },
      "characters": {
        id: "characters",
        title: "Characters & Relationship",
        subtitle: "Della & Jim Young",
        summary: "The couple embodies quiet working-class dignity, mutual respect, and unhesitating generosity.",
        keyPoints: [
          "**Della Young:** Emotional, vivacious, and resourceful, she values Jim's happiness far above her own physical appearance.",
          "**Jim Young:** Steady, hardworking, and gentle, he responds to adversity with humor and affection.",
          "**Madame Sofronie:** The cold, commercial foil whose hair shop commodifies human beauty."
        ],
        pullQuotes: [
          {
            quote: "Nobody could ever count my love for you.",
            significance: "Della expresses the central thesis that emotional wealth cannot be measured by monetary metrics."
          }
        ]
      },
      "setting-pov": {
        id: "setting-pov",
        title: "Setting & Point of View",
        subtitle: "Urban Poverty & Sentimental Omniscience",
        summary: "The eight-dollar flat in early 1900s New York provides a realistic working-class backdrop for an enduring fable.",
        keyPoints: [
          "**The Modest Flat:** The worn carpet, broken doorbell, and view of a gray cat on a gray fence highlight financial strain.",
          "**Conversational Narrator:** O. Henry speaks directly to the reader with warm wit, guiding the moral interpretation.",
          "**Christmas Eve:** The holiday setting accentuates the imperative of giving and fellowship."
        ],
        pullQuotes: [
          {
            quote: "life is made up of sobs, sniffles, and smiles, with sniffles predominating.",
            significance: "O. Henry's tender, slightly melancholic view of human existence."
          }
        ]
      },
      "themes-symbols": {
        id: "themes-symbols",
        title: "Themes & Symbols",
        subtitle: "The Watch, The Hair, & The Magi",
        summary: "Objects in the story carry profound symbolic weight regarding identity, family legacy, and sacrificial love.",
        keyPoints: [
          "**Della's Hair:** Symbol of youth, natural beauty, and feminine pride.",
          "**Jim's Gold Watch:** Symbol of patriarchal lineage, dignity, and generational honor.",
          "**The Magi:** Symbol of genuine wisdom that recognizes sacrificial love as the supreme human gift."
        ],
        pullQuotes: [
          {
            quote: "They are the magi.",
            significance: "The philosophical conclusion that elevates everyday working-class generosity to divine status."
          }
        ]
      },
      "devices-style": {
        id: "devices-style",
        title: "Literary Devices & Style",
        subtitle: "Situational Irony, Hyperbole, & Allusion",
        summary: "O. Henry's signature style blends playful exaggeration with sudden emotional clarity and structural symmetry.",
        keyPoints: [
          "**Situational Irony:** The core engine of the plot where expectations are delightfully reversed.",
          "**Biblical Allusions:** King Solomon and Queen of Sheba frame their humble flat with mythic stature.",
          "**Direct Address (Apostrophe):** Engaging the reader intimately to reflect on the meaning of wealth."
        ],
        pullQuotes: [
          {
            quote: "Had the Queen of Sheba lived in the flat across the airshaft...",
            significance: "Whimsical hyperbole that emphasizes the couple's pride in their gifts."
          }
        ]
      }
    },

    studyPrep: {
      essayAngles: [
        {
          prompt: "Examine how O. Henry uses situational irony to deliver a moral message about love and sacrifice.",
          thesisTemplate: "Through the symmetrical sacrifices of Della and Jim, O. Henry utilizes situational irony not for cynical disillusionment, but to demonstrate that [sacrificial love] possesses [greater value than material utility]."
        },
        {
          prompt: "Analyze the contrast between the story's gritty economic setting and its elevated biblical allusions.",
          thesisTemplate: "By juxtaposing the meager eight-dollar flat with allusions to King Solomon and the Magi, O. Henry elevates [working-class hardship] into [universal moral nobility]."
        }
      ],
      criticalThinking: [
        {
          question: "Why does the narrator refer to Jim and Della as 'the wisest' when they both bought useless gifts?",
          answer: "The narrator defines true wisdom not as cold economic efficiency, but as the willingness to sacrifice one's most treasured worldly possession solely to bring joy to someone else. Their gifts proved unconditional love, which outweighs any material practicality."
        },
        {
          question: "How does Della's attitude toward her hair evolve throughout the story?",
          answer: "Initially, her hair is her greatest vanity and treasure. However, when faced with her desire to honor Jim on Christmas, she sacrifices it quickly, shedding only a brief tear before marching resolutely to Madame Sofronie's shop."
        }
      ],
      quiz: [
        {
          id: "q1",
          question: "How much total money has Della saved at the opening of the story?",
          options: [
            "$20.00",
            "$1.87",
            "$8.00",
            "$12.50"
          ],
          correctIndex: 1,
          explanation: "Della counts exactly one dollar and eighty-seven cents, sixty cents of which is in pennies."
        },
        {
          id: "q2",
          question: "What gift does Della purchase for Jim with the money from selling her hair?",
          options: [
            "A platinum pocket watch fob chain",
            "A fine leather winter overcoat",
            "A gold-plated fountain pen",
            "A silk necktie from Broadway"
          ],
          correctIndex: 0,
          explanation: "Della buys a simple, elegant platinum fob chain for Jim's heirloom gold watch for $21.00."
        },
        {
          id: "q3",
          question: "What gift did Jim buy for Della?",
          options: [
            "A pair of diamond drop earrings",
            "A set of pure tortoiseshell combs with jeweled rims",
            "A luxurious velvet winter bonnet",
            "A gold locket containing his portrait"
          ],
          correctIndex: 1,
          explanation: "Jim bought the tortoiseshell combs with jeweled rims that Della had long admired in a store window."
        },
        {
          id: "q4",
          question: "How did Jim get the money to purchase Della's gift?",
          options: [
            "He received a holiday bonus from his employer",
            "He sold his family heirloom gold watch",
            "He took out a loan from a bank teller",
            "He sold his finest winter overcoat"
          ],
          correctIndex: 1,
          explanation: "Jim sold his most prized possession—his father's and grandfather's gold watch—to buy the combs for Della."
        },
        {
          id: "q5",
          question: "According to the story's narrator, who are the 'Magi'?",
          options: [
            "The wealthy bankers of Wall Street",
            "The wise men who give and receive gifts with selfless love",
            "The store merchants of Broadway",
            "The landlords who show mercy to young couples"
          ],
          correctIndex: 1,
          explanation: "The narrator explains that all who give and receive gifts out of selfless sacrifice and love are the true Magi."
        }
      ]
    }
  }
};

if (typeof window !== 'undefined') {
  window.PRESET_WORKS = PRESET_WORKS;
}
