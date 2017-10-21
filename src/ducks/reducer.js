import axios from 'axios'

const initialState = {
	searchMovies: [
	    {
	      "vote_count": 12368,
	      "id": 155,
	      "video": false,
	      "vote_average": 8.3,
	      "title": "The Dark Knight",
	      "popularity": 60.103299,
	      "poster_path": "/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg",
	      "original_language": "en",
	      "original_title": "The Dark Knight",
	      "genre_ids": [
	        18,
	        28,
	        80,
	        53
	      ],
	      "backdrop_path": "/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
	      "adult": false,
	      "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
	      "release_date": "2008-07-16"
	    },
	    {
	      "vote_count": 9221,
	      "id": 49026,
	      "video": false,
	      "vote_average": 7.6,
	      "title": "The Dark Knight Rises",
	      "popularity": 25.197302,
	      "poster_path": "/dEYnvnUfXrqvqeRSqvIEtmzhoA8.jpg",
	      "original_language": "en",
	      "original_title": "The Dark Knight Rises",
	      "genre_ids": [
	        28,
	        80,
	        18,
	        53
	      ],
	      "backdrop_path": "/3bgtUfKQKNi3nJsAB5URpP2wdRt.jpg",
	      "adult": false,
	      "overview": "Following the death of District Attorney Harvey Dent, Batman assumes responsibility for Dent's crimes to protect the late attorney's reputation and is subsequently hunted by the Gotham City Police Department. Eight years later, Batman encounters the mysterious Selina Kyle and the villainous Bane, a new terrorist leader who overwhelms Gotham's finest. The Dark Knight resurfaces to protect a city that has branded him an enemy.",
	      "release_date": "2012-07-16"
	    },
	    {
	      "vote_count": 424,
	      "id": 142061,
	      "video": false,
	      "vote_average": 7.9,
	      "title": "Batman: The Dark Knight Returns, Part 2",
	      "popularity": 11.167901,
	      "poster_path": "/wPeorCnD9MRR2S9Dzh4OpIgNLiv.jpg",
	      "original_language": "en",
	      "original_title": "Batman: The Dark Knight Returns, Part 2",
	      "genre_ids": [
	        28,
	        16
	      ],
	      "backdrop_path": "/ew0ouZ1MSxbNugPMgbOhuTrd3aA.jpg",
	      "adult": false,
	      "overview": "Batman has stopped the reign of terror that The Mutants had cast upon his city.  Now an old foe wants a reunion and the government wants The Man of Steel to put a stop to Batman.",
	      "release_date": "2013-01-18"
	    },
	    {
	      "vote_count": 407,
	      "id": 123025,
	      "video": false,
	      "vote_average": 7.7,
	      "title": "Batman: The Dark Knight Returns, Part 1",
	      "popularity": 10.540384,
	      "poster_path": "/mFPD2YsdaWAzjuxF7ItGmsEFpdY.jpg",
	      "original_language": "en",
	      "original_title": "Batman: The Dark Knight Returns, Part 1",
	      "genre_ids": [
	        28,
	        16
	      ],
	      "backdrop_path": "/a6pB1w4lwp0WeTRQk9Q2K1F9W34.jpg",
	      "adult": false,
	      "overview": "Batman has not been seen for ten years. A new breed of criminal ravages Gotham City, forcing 55-year-old Bruce Wayne back into the cape and cowl. But, does he still have what it takes to fight crime in a new era?",
	      "release_date": "2012-09-06"
	    },
	    {
	      "vote_count": 4,
	      "id": 257171,
	      "video": false,
	      "vote_average": 5.6,
	      "title": "KIBA: The Dark Knight Gaiden",
	      "popularity": 2.852949,
	      "poster_path": "/Agsn0T2VIVgyz4B4k6cwne3KnsH.jpg",
	      "original_language": "en",
	      "original_title": "呀〈KIBA〉 ～暗黒騎士鎧伝～",
	      "genre_ids": [
	        14,
	        28,
	        12
	      ],
	      "backdrop_path": "/3PraJZPbWR9qBtHlmNZfNlypPHn.jpg",
	      "adult": false,
	      "overview": "The spirit of Kiba the Dark Makai Knight influenced everything since the beginning. Though he called himself a Makai Knight, Kiba was no different to a Horror. Kiba's spirit resides inside what was once a grey colored Makai Armor that's filled with the dark knowledge of Makai Power. As Barago absorbed Horror after Horror, Kiba eventually deformed into an organically pure black armor with a cape. Kiba assumed full control over his host upon Meisha's defeat by Kouga.",
	      "release_date": "2011-09-07"
	    },
	    {
	      "vote_count": 17,
	      "id": 29751,
	      "video": false,
	      "vote_average": 8,
	      "title": "Batman Unmasked: The Psychology of the Dark Knight",
	      "popularity": 4.017934,
	      "poster_path": "/jjHu128XLARc2k4cJrblAvZe0HE.jpg",
	      "original_language": "en",
	      "original_title": "Batman Unmasked: The Psychology of the Dark Knight",
	      "genre_ids": [
	        99
	      ],
	      "backdrop_path": "/1oQLZa2FaTc7yXWku801S1LTOqO.jpg",
	      "adult": false,
	      "overview": "Delve into the world of Batman and the vigilante justice that he brought to the city of Gotham. Batman is a man who, after experiencing great tragedy, devotes his life to an ideal--but what happens when one man takes on the evil underworld alone? Examine why Batman is who he is--and explore how a boy scarred by tragedy becomes a symbol of hope to everyone else.",
	      "release_date": "2008-07-15"
	    },
	    {
	      "vote_count": 2,
	      "id": 72003,
	      "video": false,
	      "vote_average": 6.3,
	      "title": "The Dark Knight",
	      "popularity": 1.080702,
	      "poster_path": "/kyjTDE5vldkUpJGErAvqYY6J92M.jpg",
	      "original_language": "en",
	      "original_title": "The Dark Knight",
	      "genre_ids": [
	        28,
	        80,
	        18,
	        53
	      ],
	      "backdrop_path": "/sADyDpCJQvIlRMcdlsYc5raAqhD.jpg",
	      "adult": false,
	      "overview": "In a post-apocalyptic world ravaged by feuding warlords, a group of desperate soldiers hatch a plan to steal a Warlord's treasure and start a new life. Faced with the threat of a horrific death at the hands of the Warlord's executioners, the men escape into a desolate and forbidden land known only as the Shadowlands. Now the men must flee from the Warlord's vicious assassins while defending themselves from the terrifying creatures that inhabit the land.",
	      "release_date": "2011-07-11"
	    },
	    {
	      "vote_count": 0,
	      "id": 472027,
	      "video": false,
	      "vote_average": 0,
	      "title": "Batman: The Dark Knight Returns (Deluxe Edition)",
	      "popularity": 1.386095,
	      "poster_path": "/5wtf0fmaq4eBXVlQb4FaVMqf5Yb.jpg",
	      "original_language": "en",
	      "original_title": "Batman: The Dark Knight Returns (Deluxe Edition)",
	      "genre_ids": [
	        16,
	        28
	      ],
	      "backdrop_path": "/bUQGT4xJib43OrnpmNzgrGaLWJM.jpg",
	      "adult": false,
	      "overview": "Batman has not been seen for ten years. A new breed of criminal ravages Gotham City, forcing fifty-five-year-old Bruce Wayne back into the cape and cowl, but does he still have what it takes to fight crime in a new era?",
	      "release_date": "2013-10-08"
	    },
	    {
	      "vote_count": 3,
	      "id": 141559,
	      "video": false,
	      "vote_average": 5.8,
	      "title": "Legends of the Dark Knight: The History of Batman",
	      "popularity": 1.650679,
	      "poster_path": "/ijOIT8msWufRPp1OCVIPIaWgvwc.jpg",
	      "original_language": "nl",
	      "original_title": "Legends of the Dark Knight: The History of Batman",
	      "genre_ids": [
	        99
	      ],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "A brief history of the DC Comics character Batman, created by Bob Kane in 1939.",
	      "release_date": "2005-01-01"
	    },
	    {
	      "vote_count": 9,
	      "id": 243238,
	      "video": false,
	      "vote_average": 6.7,
	      "title": "The Fire Rises: The Creation and Impact of The Dark Knight Trilogy",
	      "popularity": 1.986745,
	      "poster_path": "/kVlpamukelm5HkZES50b6F61UfX.jpg",
	      "original_language": "en",
	      "original_title": "The Fire Rises: The Creation and Impact of The Dark Knight Trilogy",
	      "genre_ids": [
	        99
	      ],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "This feature-length documentary delves into the trilogy, opening with the inspiration and vision for the new Batman films and inching its way toward the Rises finale and the culmination of nearly a decade of creative blood, sweat and tears. Candid, thoughtful and extensive, and comprised of revealing behind-the-scenes footage, countless interviews, audition tapes (with Christian Bale and Cillian Murphy doning the cape and cowl), and a narrative grip and momentum all its own, it leaves no stone unturned.",
	      "release_date": "2013-09-24"
	    },
	    {
	      "vote_count": 3,
	      "id": 377531,
	      "video": false,
	      "vote_average": 10,
	      "title": "Batman: The Dark Knight's First Night",
	      "popularity": 1.241941,
	      "poster_path": "/4WrGDgDUnM5pRHZS9PVLJiE4D1p.jpg",
	      "original_language": "en",
	      "original_title": "Batman: The Dark Knight's First Night",
	      "genre_ids": [
	        16
	      ],
	      "backdrop_path": "/mWIsvElXLgzjYKrv3Yy3i4y1RxL.jpg",
	      "adult": false,
	      "overview": "\"Batman: The Dark Knight's First Night\" is the name given to the short two-minute pilot used by Bruce Timm and Eric Radomski to show Fox executives what they were planning to do with \"Batman: The Animated Series\".",
	      "release_date": "1991-01-12"
	    },
	    {
	      "vote_count": 0,
	      "id": 369661,
	      "video": false,
	      "vote_average": 0,
	      "title": "Masterpiece: Frank Miller's The Dark Knight Returns",
	      "popularity": 1.011765,
	      "poster_path": null,
	      "original_language": "en",
	      "original_title": "Masterpiece: Frank Miller's The Dark Knight Returns",
	      "genre_ids": [
	        99,
	        36
	      ],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "This is the master-crafted work of the legendary writer and artist Frank Miller. The film encapsulates, and celebrates the stunning achievement of Batman: the Dark Knight Returns, galvanizing the reason why this story ushered in the modern take of the dark and brooding protector of Gotham. This is the journey of Frank Miller, seeking the freedom that some authors only dream of in a lifetime. Narrated by Malcolm McDowell.",
	      "release_date": "2013-10-08"
	    },
	    {
	      "vote_count": 0,
	      "id": 458369,
	      "video": false,
	      "vote_average": 0,
	      "title": "The Dark Knight Returns: An Epic Fan Film",
	      "popularity": 1.06825,
	      "poster_path": null,
	      "original_language": "en",
	      "original_title": "The Dark Knight Returns: An Epic Fan Film",
	      "genre_ids": [],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "Adapted from Issue #1 of Frank Miller's seminal 1986 comic series, filmmaker Wyatt Weed (\"Shadowland,\" \"Four Color Eulogy\") offers his unofficial fan's take on the Batman mythos. Following the death of Robin at the hands of the Joker, Bruce Wayne (Weed) hung up the cowl and cape 10 years ago. But now Gotham City is in the grip of a violent crime wave, and the venerable 55-year-old billionaire has to decide if the time is right for the Caped Crusader's return. (This production is non-profit and is for entertainment purposes only. The production is in no way associated with DC Comics or Time Warner.)",
	      "release_date": ""
	    },
	    {
	      "vote_count": 0,
	      "id": 436269,
	      "video": true,
	      "vote_average": 0,
	      "title": "Batman - A sötét lovag - The Dark Knight",
	      "popularity": 1,
	      "poster_path": null,
	      "original_language": "hu",
	      "original_title": "Batman - A sötét lovag - The Dark Knight",
	      "genre_ids": [],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "",
	      "release_date": ""
	    },
	    {
	      "vote_count": 1,
	      "id": 204651,
	      "video": false,
	      "vote_average": 8,
	      "title": "Shadows of the Bat: The Cinematic Saga of the Dark Knight",
	      "popularity": 1.100753,
	      "poster_path": "/mOr6LQo8kgEpKihgjpO2uP2RUch.jpg",
	      "original_language": "en",
	      "original_title": "Shadows of the Bat: The Cinematic Saga of the Dark Knight",
	      "genre_ids": [
	        99
	      ],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "A six-part documentary primarily chronicling Warner Bros. Studios adaptations of the DC Comics character Batman, from 1989–1997. First premiered on the special features discs of the Batman Motion Picture Anthology DVD set.",
	      "release_date": "2005-10-18"
	    },
	    {
	      "vote_count": 1,
	      "id": 68131,
	      "video": false,
	      "vote_average": 9,
	      "title": "Shadows of the Bat: The Cinematic Saga of the Dark Knight: The Gathering Storm",
	      "popularity": 1.037647,
	      "poster_path": null,
	      "original_language": "en",
	      "original_title": "Shadows of the Bat: The Cinematic Saga of the Dark Knight: The Gathering Storm",
	      "genre_ids": [],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "2/6: An overview of the development of the film Batman (1989)",
	      "release_date": "2005-10-18"
	    },
	    {
	      "vote_count": 2,
	      "id": 405588,
	      "video": false,
	      "vote_average": 4.5,
	      "title": "Nightwing: The Darkest Knight",
	      "popularity": 1.148836,
	      "poster_path": "/wJriSTt6OhCM2kqkCtt0pjZgycU.jpg",
	      "original_language": "en",
	      "original_title": "Nightwing: The Darkest Knight",
	      "genre_ids": [],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "Nightwing returns home after a brief stint as the Green Lantern to find a close friend of his murdered. On the hunt for answers and justice, Nightwing steps beyond his normal boundaries of control until he is finally forced to the confront the person responsible for the horrific crime. Torn between loyalty and justice, Nightwing is forced into a fight he would never want to have, but is forced to in order to save his city.",
	      "release_date": "2015-01-11"
	    },
	    {
	      "vote_count": 0,
	      "id": 201735,
	      "video": false,
	      "vote_average": 0,
	      "title": "Sinbad: The Battle of the Dark Knights",
	      "popularity": 1.643454,
	      "poster_path": "/pXX6XWhgobCiFFSlLGlvSD6lvJZ.jpg",
	      "original_language": "en",
	      "original_title": "Sinbad: The Battle of the Dark Knights",
	      "genre_ids": [],
	      "backdrop_path": null,
	      "adult": false,
	      "overview": "A young boy is taught to use his imagination by his grandfather who casts him in a great adventure back in time. Using a magic coin, he enters the medieval world of Sinbad, who must rescue a beautiful princess from the clutches of an evil knight.",
	      "release_date": "1998-06-11"
	    },
	    {
	      "vote_count": 0,
	      "id": 465411,
	      "video": false,
	      "vote_average": 0,
	      "title": "Star Wars Knights of the Old Republic: Episode VI: Knights and the Darkness Pt. II",
	      "popularity": 1.080303,
	      "poster_path": null,
	      "original_language": "en",
	      "original_title": "Star Wars Knights of the Old Republic: Episode VI: Knights and the Darkness Pt. II",
	      "genre_ids": [
	        14,
	        28,
	        12,
	        878
	      ],
	      "backdrop_path": "/cThKoEghKIgmbTG7UvhaUX4VjJS.jpg",
	      "adult": false,
	      "overview": "Now paired with Logan Starr, the Exile has found the path she must walk. But can she do it?",
	      "release_date": "2017-01-28"
	    },
	    {
	      "vote_count": 0,
	      "id": 465409,
	      "video": false,
	      "vote_average": 0,
	      "title": "Star Wars Knights of the Old Republic: Episode VI: Knights and the Darkness Pt. I",
	      "popularity": 1.014965,
	      "poster_path": null,
	      "original_language": "en",
	      "original_title": "Star Wars Knights of the Old Republic: Episode VI: Knights and the Darkness Pt. I",
	      "genre_ids": [
	        12,
	        28
	      ],
	      "backdrop_path": "/6jDDQtzCHFZZT9q0SmYwdeJiII9.jpg",
	      "adult": false,
	      "overview": "Meetra Surik's journey has continued. The darkness in the galaxy grows stronger.  And old friends rise again.",
	      "release_date": "2014-04-26"
	    }
	  ],
	selectedMovie: null
}


export default function reducer(state=initialState, action) {
	switch(action.type) {
		default: 
			return state;
	}
}