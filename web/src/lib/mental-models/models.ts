// The ten Models. Content foundation: the Lead Consultant's "DCI Mental Models: ten
// Model pages, pilot draft 2". Wording is close to the draft; where it was changed
// the change is logged in web/docs/mental-models-draft1-review.md for human review.
//
// Voice rules for anything added here:
//  - A Model is a changeable pattern, never a diagnosis or a fixed identity.
//  - "May" and "can", not "will" or "are".
//  - No em dashes in visible copy.

import type { Model, ModelId } from './types';

export const MODELS: Record<ModelId, Model> = {
	champion: {
		id: 'champion',
		name: 'Champion',
		verb: 'I DO',
		signature: "If I don't do it, who will?",
		question: 'What needs doing, and who will do it?',
		firstMove: 'You take charge, make a plan and get people moving.',
		strength: 'You take responsibility and make things happen.',
		reaction: "You take on everyone's problems and find it hard to say no.",
		tooMuch: 'You may snap, burn out, then go quiet.',
		protecting:
			'Sometimes taking charge helps you avoid feeling helpless or letting people down.',
		blindSpot: 'Carrying everything leaves no room for anyone to help, or for you to rest.',
		response: 'Pick what is mine to carry and share the rest.',
		tinyStep: 'Hand one task to someone else today.',
		origin: {
			stage: 'The Family Mirror',
			ageNote: 'growing up among siblings',
			journalLetter: 'September',
			body: 'This is where you find your place in the family. It gives you the sense that you can be both capable and cared for. When responsibility arrived early, perhaps as the eldest or the one the adults leaned on, stepping up may have become how you stay safe and valued.',
			reflect: 'When did being the capable one start, and what would being looked after feel like?',
			youMayHaveHeard: 'Parentification. Here we say you stepped up early.'
		},
		learnFrom: {
			model: 'receiver',
			why: 'Receivers know how to ask clearly for what they need. You can learn that from them.',
			tryVerb: 'ASK FOR HELP',
			tryText: 'let someone share the load.'
		},
		canTeach: 'Getting people moving.',
		shareLine: "Being dependable shouldn't mean being responsible for everything.",
		insideReason: "Underneath, I'm making sure it gets done and nobody is let down.",
		pathways: {
			learn: {
				label: 'Open the Reflection Journal',
				href: '/toolkit#toolkit-products',
				why: 'The September letter is a gentle place to ask when being the capable one began.'
			},
			community: {
				label: 'Join a Conversation Clinic as a participant',
				href: '/clinics',
				why: 'Sit in the circle without running it. Being looked after is part of the practice.'
			},
			support: {
				label: 'Share the load with a real person',
				href: '/support',
				why: 'If carrying everything is wearing you down, DCI can point you to responsible support.'
			}
		}
	},

	angel: {
		id: 'angel',
		name: 'Angel',
		verb: 'I HELP',
		signature: "Tell me what's wrong. I'll help.",
		question: 'Who needs me right now?',
		firstMove: 'You notice who is struggling and show up for them.',
		strength: 'You are compassionate, and people feel safe around you.',
		reaction: 'You give more than you have and your own needs wait.',
		tooMuch: 'You may feel empty or resentful, then pull away from everyone.',
		protecting: 'Sometimes putting others first helps you feel safe, needed or connected.',
		blindSpot: 'Your own needs can go unnoticed, even by you, until you are empty.',
		response: 'Check what I need, then decide what I can give.',
		tinyStep: 'Before you help the next person, ask yourself: what do I need?',
		origin: {
			stage: 'Finding Your Voice',
			ageNote: '12 to 18 months',
			journalLetter: 'April',
			body: 'This is when you first say "no" and discover your own will. It gives you the sense that you can have needs and still be loved. When wanting things was met with sharp control, caring for others may have felt safer than asking for what you need.',
			reflect: 'When I put others first, what do I need that goes unsaid?'
		},
		learnFrom: {
			model: 'observer',
			why: 'Observers know how to pause and notice before reacting. You can learn that from them.',
			tryVerb: 'PROCESS',
			tryText: 'check in with yourself before the next person.'
		},
		canTeach: 'Showing up with care.',
		shareLine: 'You can love people without abandoning yourself.',
		insideReason: "Underneath, I'm making sure the people around me are okay.",
		pathways: {
			learn: {
				label: 'Try the Mood Tracker',
				href: '/toolkit#toolkit-products',
				why: 'A daily check-in on what you need, not only on what everyone else needs.'
			},
			community: {
				label: 'Join a Conversation Clinic as a participant',
				href: '/clinics',
				why: 'A room where you are the one being listened to, for a change.'
			},
			support: {
				label: 'Talk to someone about what you need',
				href: '/support',
				why: 'If you are running on empty, DCI can help you find responsible support.'
			}
		}
	},

	connector: {
		id: 'connector',
		name: 'Connector',
		verb: 'I FIND someone',
		signature: 'Have you talked to them yet?',
		question: 'Who can I bring in?',
		firstMove: 'You call people, bring them together and make others feel they belong.',
		strength: 'You build belonging, relationships and community.',
		reaction: 'You stay busy with other people so you do not sit with how you feel.',
		tooMuch: 'You may fill every hour with people, or cut off from everyone suddenly.',
		protecting: 'Sometimes keeping people close helps you avoid being alone with it.',
		blindSpot: 'Being surrounded by people is not always the same as being supported.',
		response: 'Sit with how I feel, then reach out about it.',
		tinyStep: 'Tell one person one thing you actually need.',
		origin: {
			stage: 'The Social Self',
			ageNote: '2.5 to 4 years',
			journalLetter: 'June',
			body: 'This is when you step into groups and learn whether you belong. It gives you your place among people. When belonging felt uncertain or came at a cost, you may have learned to build and keep connection constantly, so that you are always needed.',
			reflect: 'When did I last feel connected without having to organise it?'
		},
		learnFrom: {
			model: 'observer',
			why: 'Observers know how to pause and notice before reacting. You can learn that from them.',
			tryVerb: 'PROCESS',
			tryText: 'pause with how you feel before you reach for people.'
		},
		canTeach: 'Building a circle so no one carries it alone.',
		shareLine: 'You can belong to a community without being available to everyone all the time.',
		insideReason: "Underneath, I'm making sure I'm not alone with it.",
		pathways: {
			learn: {
				label: 'Open the Reflection Journal',
				href: '/toolkit#toolkit-products',
				why: 'The June letter asks about belonging, and what it costs to keep it.'
			},
			community: {
				label: 'Join a Conversation Clinic',
				href: '/clinics',
				why: 'A small group where you can sit with how you feel, instead of organising it.'
			},
			support: {
				label: 'Talk to someone about what you need',
				href: '/support',
				why: 'Being surrounded is not the same as being supported. DCI can help with the next step.'
			}
		}
	},

	sponsor: {
		id: 'sponsor',
		name: 'Sponsor',
		verb: 'I PROVIDE',
		signature: "Don't worry. I've got it covered.",
		question: 'What can I provide to fix this?',
		firstMove: 'You pay, arrange, fix and protect.',
		strength: 'You resource, protect and enable. People can count on you.',
		reaction: 'You try to solve feelings with money, gifts or work.',
		tooMuch: 'You work more, say less and feel distant, even to people close to you.',
		protecting:
			'Sometimes providing is how you show care when words feel harder, and how you keep people you love safe.',
		blindSpot: 'Providing can stand in for saying how you feel, so people may miss that you care.',
		response: 'Show up first, then decide what practical help is needed.',
		tinyStep: 'Give someone ten minutes of your time with no fixing.',
		origin: {
			stage: 'The Inherited Patterns',
			ageNote: 'passed down through generations',
			journalLetter: 'November',
			body: "We inherit our families' ways of handling stress and showing love. It gives you a picture of what care looks like. When love mostly showed up as providing, and feelings were rarely talked about, fixing things with money, effort or resources may have become how you show you care.",
			reflect: 'How do I show I care in ways that are not things I provide?'
		},
		learnFrom: {
			model: 'angel',
			why: 'Angels know how to show up with care. You can learn that from them.',
			tryVerb: 'HELP',
			tryText: 'give time and presence, not only things.'
		},
		canTeach: 'Reliable, practical help.',
		shareLine: 'Your presence is worth more than what you can provide.',
		insideReason: "Underneath, I'm making sure everyone is covered and safe.",
		pathways: {
			learn: {
				label: 'Play the DCI Card Game with someone close',
				href: '/toolkit#toolkit-products',
				why: 'Ten minutes of conversation with nothing to fix and nothing to pay for.'
			},
			community: {
				label: 'Give time with DCI Angels',
				href: '/volunteering',
				why: 'Your reliability is a gift. Pair it with your presence, not only your resources.'
			},
			support: {
				label: 'Talk to someone about how you are doing',
				href: '/support',
				why: 'Caring for everyone else is work. DCI can help you find support for you.'
			}
		}
	},

	navigator: {
		id: 'navigator',
		name: 'Navigator',
		verb: 'I FIND A WAY',
		signature: "I'll figure it out.",
		question: 'How do I get through this?',
		firstMove: 'You work it out, adapt and keep going.',
		strength: 'You are resourceful and solution-oriented.',
		reaction: 'You do it all alone and say "I\'m fine".',
		tooMuch: 'You shut people out, run on empty, then crash.',
		protecting:
			'Sometimes handling it yourself feels safer than depending on someone who may not show up.',
		blindSpot: '"I\'m fine" can end up convincing you too.',
		response: 'Let one person in.',
		tinyStep: "Let one person in on the problem. You don't need them to solve it.",
		origin: {
			stage: 'First Breath, First Bond',
			ageNote: 'birth to 6 months',
			journalLetter: 'February',
			body: 'This is when you learn whether help comes when you need it. It gives you trust. When help did not always come, you may have learned early to take care of yourself, and finding a way alone became second nature.',
			reflect: 'Who has shown up for me, and what made it hard to let them in?',
			youMayHaveHeard: 'Avoidant attachment: learning early to rely on yourself.'
		},
		learnFrom: {
			model: 'connector',
			why: 'Connectors know how to build a circle so no one carries it alone. You can learn that from them.',
			tryVerb: 'FIND someone',
			tryText: 'let someone into the problem.'
		},
		canTeach: 'Adapting when plans fall apart.',
		shareLine: 'Independence is a strength. Letting people in can be one too.',
		insideReason: "Underneath, I will find a way, and I'd rather do it alone.",
		pathways: {
			learn: {
				label: 'Try the Mood Tracker',
				href: '/toolkit#toolkit-products',
				why: 'Notice how you actually are, before the usual "I\'m fine".'
			},
			community: {
				label: 'Join a Conversation Clinic',
				href: '/clinics',
				why: 'A small, structured way to practise letting one person in.'
			},
			support: {
				label: 'Talk to someone you can lean on',
				href: '/support',
				why: "You don't need them to solve it. DCI can point you to someone who will listen."
			}
		}
	},

	intellectual: {
		id: 'intellectual',
		name: 'Intellectual',
		verb: 'I UNDERSTAND',
		signature: 'Let me understand what happened first.',
		question: 'Why is this happening?',
		firstMove: 'You read, research and ask why.',
		strength: 'You are curious and make sense of complexity.',
		reaction: 'You understand it perfectly and still feel the same.',
		tooMuch: 'You loop in your thoughts, find it hard to decide, and may feel numb.',
		protecting: 'Sometimes understanding first helps you feel less caught off guard.',
		blindSpot:
			'Understanding it can feel like dealing with it while the feeling is still there.',
		response: 'Name the feeling first, then think.',
		tinyStep: 'Finish this sentence out loud or on paper: "I feel ___."',
		origin: {
			stage: 'The Learning Self',
			ageNote: '4 to 6 years',
			journalLetter: 'July',
			body: 'This is when you learn how to learn, and what mistakes mean. It gives you confidence in your own mind. When being right or clever earned the praise, and mistakes and feelings felt less safe, understanding may have become safer than feeling.',
			reflect: 'When I explain what happened, what am I feeling underneath?'
		},
		learnFrom: {
			model: 'angel',
			why: 'Angels know how to show up with care. You can learn that from them.',
			tryVerb: 'HELP',
			tryText: 'bring the care you give others to yourself, and feel it, not only explain it.'
		},
		canTeach: 'Making sense of a confusing situation.',
		shareLine: 'Understanding a feeling and processing it are not always the same thing.',
		insideReason: 'Underneath, I need to understand why before I can feel okay.',
		pathways: {
			learn: {
				label: 'Open the Reflection Journal',
				href: '/toolkit#toolkit-products',
				why: 'Prompts that ask "I feel ___" before they ask "why".'
			},
			community: {
				label: 'Join a Conversation Clinic',
				href: '/clinics',
				why: 'Hear how other people feel, not only how they explain.'
			},
			support: {
				label: 'Talk to someone about how it feels',
				href: '/support',
				why: 'When thinking about it has stopped helping, a person can.'
			}
		}
	},

	observer: {
		id: 'observer',
		name: 'Observer',
		verb: 'I PROCESS',
		signature: 'Let me think about that.',
		question: 'Do I understand what is happening yet?',
		firstMove: 'You pause, think it through and notice patterns.',
		strength: 'You are reflective and you see what others miss.',
		reaction: 'You stay in watch mode while the problem stays where it is.',
		tooMuch:
			'You go silent and inward. From outside this can look like Drifting, but you are thinking, not lost.',
		protecting:
			'Sometimes waiting and thinking protects you from acting too soon and getting it wrong.',
		blindSpot: 'Waiting for clarity can become a way of not starting.',
		response: 'Take one small step now and adjust later.',
		tinyStep: 'Pick one small step and do it within the hour.',
		origin: {
			stage: 'The First Rattle',
			ageNote: 'before birth',
			journalLetter: 'January',
			body: 'This is the earliest stage in the Journal, about the calm or tension around a pregnancy and how settled we feel afterwards. When the early environment felt tense or unpredictable, watching first and moving later may have felt safer.',
			reflect: 'When I wait, what am I waiting for?'
		},
		learnFrom: {
			model: 'champion',
			why: 'Champions know how to get people moving. You can learn that from them.',
			tryVerb: 'DO',
			tryText: 'take one small action.'
		},
		canTeach: 'Pausing to notice before reacting.',
		shareLine: "You don't need complete clarity to take one small step.",
		insideReason: 'Underneath, I need to make sense of this before I act.',
		pathways: {
			learn: {
				label: 'Try the Mood Tracker',
				href: '/toolkit#toolkit-products',
				why: 'A small, daily action that turns noticing into doing.'
			},
			community: {
				label: 'Join a Conversation Clinic',
				href: '/clinics',
				why: 'Practise saying one thing out loud, with a trained Champion in the room.'
			},
			support: {
				label: 'Talk it through with someone',
				href: '/support',
				why: 'A second mind can help you find the first small step.'
			}
		}
	},

	receiver: {
		id: 'receiver',
		name: 'Receiver',
		verb: 'I ASK FOR HELP',
		signature: "I don't have to do this alone.",
		question: 'Who can I lean on?',
		firstMove: 'You say "I need help" and let people in.',
		strength: 'You are open to support, collaboration and care.',
		reaction: 'You are not sure what you need, or you lean on one person too much.',
		tooMuch: 'You keep reaching out, or feel nobody can help, then stop asking.',
		protecting: 'Sometimes reaching out is how you avoid carrying it alone.',
		blindSpot: 'Asking vaguely, or only one person, can leave you still unsupported.',
		response: 'Say what I need and from whom.',
		tinyStep: 'Name what you need: a listener, advice or a hand.',
		origin: {
			stage: 'The Big Feelings',
			ageNote: '18 months to 2.5 years',
			journalLetter: 'May',
			body: 'This is when feelings arrive faster than words. It gives you words for feelings and trust that someone will help. When help came unevenly, you may be unsure what to ask for, or lean hard on whoever shows up. When others often stepped in, you may have had less practice working out what you need and asking for it yourself.',
			reflect: 'When I ask, what makes it easier or harder to say what I need?',
			youMayHaveHeard: 'Being overparented or overprotected, when others often stepped in for you.'
		},
		learnFrom: {
			model: 'navigator',
			why: 'Navigators know how to adapt when plans fall apart. You can learn that from them.',
			tryVerb: 'FIND A WAY',
			tryText: 'name one step you can take yourself.'
		},
		canTeach: 'Asking clearly for what you need.',
		shareLine: 'Asking for support and finding your own next step can coexist.',
		insideReason: "Underneath, I'm looking for someone to lean on.",
		pathways: {
			learn: {
				label: 'Play the DCI Card Game',
				href: '/toolkit#toolkit-products',
				why: 'Prompts that help you practise saying what you need, and from whom.'
			},
			community: {
				label: 'Join a Conversation Clinic',
				href: '/clinics',
				why: 'Try asking in a room where asking is the point.'
			},
			support: {
				label: 'Spread your support wider',
				href: '/support',
				why: 'More than one person can hold this. DCI can help you find the right ones.'
			}
		}
	},

	drifter: {
		id: 'drifter',
		name: 'Drifter',
		// Pilot: test I GET STUCK, I HIDE and I WITHDRAW. See variants.ts.
		verb: 'I GET STUCK',
		signature: "Something's wrong. I just don't know where to start.",
		question: 'How do I even begin?',
		firstMove: 'You put things off, scroll, say "I\'m fine" and wait for it to pass.',
		strength:
			'You notice early that something is off. You do not always have the answer, and that is a real place to start.',
		reaction:
			'You hide, delay or go quiet: cancel plans and tell no one. Others may think you have lost interest.',
		tooMuch:
			'You may disappear: stop replying, avoid the thing entirely, feel stuck or numb.',
		protecting:
			'When something feels too hard to face, stepping back can offer temporary relief. Perhaps you fear getting it wrong, being judged or letting someone down. Your reason may be different.',
		blindSpot:
			'The relief is real, but the problem stays where it is and can get harder to approach.',
		response:
			'You do not need the whole plan. Make the problem smaller: one first step that feels possible.',
		tinyStep:
			'Complete this sentence: "I\'m finding it hard to start because ___." Then tell one trusted person, or choose one action that takes five minutes or less.',
		origin: {
			stage: 'The Dance of Attachment',
			ageNote: '6 to 12 months',
			journalLetter: 'March',
			body: 'This is when you learn whether it is safe to need people. It gives you a home base to explore from. When needing others did not feel safe, or no one was there, you may have learned that stepping back is safer than reaching out, and it can still feel that way when stress hits. When others often stepped in to do things for you, you may have had less practice starting things yourself.',
			reflect:
				'When something is difficult, what makes it easier or harder for me to let someone know?',
			youMayHaveHeard:
				'Avoidant attachment. Also being overparented or overprotected, when others often stepped in for you.'
		},
		learnFrom: {
			model: 'receiver',
			why: 'Receivers know how to ask clearly for what they need. You can learn that from them.',
			tryVerb: 'ASK FOR HELP',
			tryText: 'you do not need the whole plan to tell someone it is hard.'
		},
		canTeach: 'Noticing early that something is off.',
		shareLine: 'Being stuck is an experience, not your identity.',
		insideReason: 'Underneath, I do not know how to begin.',
		pathways: {
			learn: {
				label: 'Try the Mood Tracker',
				href: '/toolkit#toolkit-products',
				why: 'A one-minute daily check. Small enough to start.'
			},
			community: {
				label: 'Look at a Conversation Clinic',
				href: '/clinics',
				why: 'A small group with a trained Champion in the room. You decide how much to say.'
			},
			support: {
				label: 'Tell someone it is hard',
				href: '/support',
				why: 'You do not need the whole plan. Start here, with one sentence.'
			}
		}
	},

	advocate: {
		id: 'advocate',
		name: 'Advocate',
		verb: 'I TALK',
		signature: 'Someone needs to say something.',
		question: 'Who needs to hear this?',
		firstMove: 'You speak up, share what you have learned and rally people.',
		strength: 'You raise awareness, educate and mobilise others.',
		reaction: 'You talk about the cause instead of how it is affecting you.',
		tooMuch: 'You take on every cause, burn out, then go silent.',
		protecting:
			'Sometimes speaking up for a cause turns hurt into action and helps you feel less powerless.',
		blindSpot: 'Caring for the cause can mean your own hurt never gets a turn.',
		response: 'Say how it is affecting me too.',
		tinyStep: 'Say it about yourself: "This is affecting me because ___."',
		origin: {
			stage: 'The Moral Compass',
			ageNote: '6 to 7 years',
			journalLetter: 'August',
			body: 'This is when your sense of right and wrong takes shape. It gives you a sense of fairness and a voice for it. When your own hurt went unheard while the wrongs of the world felt urgent, speaking up for others may have become easier than speaking up for yourself.',
			reflect: 'What do I need to say about my own hurt, not only the cause?'
		},
		learnFrom: {
			model: 'observer',
			why: 'Observers know how to pause and notice before reacting. You can learn that from them.',
			tryVerb: 'PROCESS',
			tryText: 'say it about yourself, not only the cause.'
		},
		canTeach: 'Speaking up for what matters.',
		shareLine: 'You deserve the care you fight for other people to receive.',
		insideReason: "Underneath, I'm turning the hurt into something that needs to be said.",
		pathways: {
			learn: {
				label: 'Open the Reflection Journal',
				href: '/toolkit#toolkit-products',
				why: 'Prompts for saying "this is affecting me", not only "this is wrong".'
			},
			community: {
				label: 'Look at the Community Champion path',
				href: '/champions',
				why: 'Give your voice a team and a structure, so the cause does not run on your hurt alone.'
			},
			support: {
				label: 'Talk to someone about you',
				href: '/support',
				why: 'Your own hurt deserves a turn. DCI can point you to a responsible place for it.'
			}
		}
	}
};

export const MODEL_LIST: Model[] = Object.values(MODELS);

export function isModelId(value: string): value is ModelId {
	return Object.prototype.hasOwnProperty.call(MODELS, value);
}
