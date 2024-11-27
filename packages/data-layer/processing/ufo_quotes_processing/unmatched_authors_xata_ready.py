from xata.client import XataClient

# Initialize the Xata client
xata = XataClient()

# Personnel records to be inserted
personnel_records = [
    {
        "name": "Scott Bray",
        "bio": "Referenced 4 times in UFO testimonies. Statements recorded between May 17, 2022 and May 17, 2022. Sample statement: \"If UAP do indeed represent a potential threat to our security, then the capabilities, systems, proce...\"",
        "role": "Deputy Director Navy Intelligence"
    },
    {
        "name": "Harry Reid",
        "bio": "Referenced 4 times in UFO testimonies. Statements recorded between Jul 23, 2020 and May 16, 2021. Sample statement: \"I am saying most of [the evidence] hasn\u2019t seen the light of day.\"",
        "role": "US Senator (D)Senate Majority Leader"
    },
    {
        "name": "Bill Nelson",
        "bio": "Referenced 3 times in UFO testimonies. Statements recorded between Apr 3, 2023 and Jun 9, 2021. Sample statement: \"There are phenomena out there [and] those Navy pilots know that they saw something, you\u2019ve seen it o...\"",
        "role": "NASA Administrator"
    },
    {
        "name": "John Ratcliffe",
        "bio": "Referenced 3 times in UFO testimonies. Statements recorded between Mar 22, 2021 and Mar 22, 2021. Sample statement: \"I actually wanted to get this information out and declassify it before I left office but we weren\u2019t ...\"",
        "role": "Director National Intelligence"
    },
    {
        "name": "Marco Rubio",
        "bio": "Referenced 2 times in UFO testimonies. Statements recorded between Feb 28, 2023 and Jul 16, 2020. Sample statement: \"Advanced objects demonstrating advanced technology are routinely flying over our restricted or sensi...\"",
        "role": "US Senator (R)"
    },
    {
        "name": "Kirsten Gillibrand",
        "bio": "Referenced 2 times in UFO testimonies. Statements recorded between Aug 26, 2022 and Feb 13, 2023. Sample statement: \"What are UAP, and why are we hearing more about them? I passed legislation requiring more reporting ...\"",
        "role": "US Senator (D)Committee on Armed Services"
    },
    {
        "name": "Christopher Cooke",
        "bio": "Referenced 2 times in UFO testimonies. Statements recorded between Jan 1, 2019 and Jan 1, 2019. Sample statement: \"[Commenting on the 2015 GIMBAL video] It is definitely rotating, or changing angle of bank. It appea...\"",
        "role": "Lt Colonel, US MarinesPilot"
    },
    {
        "name": "John Samford",
        "bio": "Referenced 2 times in UFO testimonies. Statements recorded between Jan 1, 1952 and Jan 1, 1952. Sample statement: \"Not entirely impossible that the objects sighted may possibly be ships from another planet such as M...\"",
        "role": "Director of Intelligence, Major General US Air Force"
    },
    {
        "name": "H.R. McMaster",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Sep 6, 2024 and Sep 6, 2024. Sample statement: \"There are things that cannot be explained. There are phenomena that have been witnessed by multiple ...\"",
        "role": "General, National Security Advisor"
    },
    {
        "name": "Harald Malmgren",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Aug 20, 2024 and Aug 20, 2024. Sample statement: \"60+ years ago I was provided highest level classifications to lead DOD work on nuclear weapons & ant...\"",
        "role": "Advisor to Presidents and many global leaders"
    },
    {
        "name": "Eric Weinstein",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Feb 16, 2024 and Feb 16, 2024. Sample statement: \"There is a whole lot more to this story than I had understood. I thought UFOs were total nonsense. I...\"",
        "role": "PhD in Mathematical Physics from Harvard"
    },
    {
        "name": "Stephen Lynch",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 8, 2024 and Jan 8, 2024. Sample statement: \"The movement and the tracking that these new navigation systems picked up was something that no coun...\"",
        "role": "House Oversight Committee"
    },
    {
        "name": "Mike Rounds",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Dec 13, 2023 and Dec 13, 2023. Sample statement: \"[\u2026] as a transparency measure, for the government to obtain any recovered UAP material or biological...\"",
        "role": "US Senator (R)"
    },
    {
        "name": "Mark Milley",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Aug 6, 2023 and Aug 6, 2023. Sample statement: \"There is a lot of unidentified aerial phenomena out there. That\u2019s true. And they\u2019ve got pilot report...\"",
        "role": "Chairman Joint Chiefs of Staff"
    },
    {
        "name": "Chuck Schumer",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jul 14, 2023 and Jul 14, 2023. Sample statement: \"For decades, many Americans have been fascinated by objects mysterious and unexplained and it\u2019s long...\"",
        "role": "US Senator (D)Senate Majority Leader"
    },
    {
        "name": "Steven Spielberg",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Mar 3, 2023 and Mar 3, 2023. Sample statement: \"I don\u2019t believe we\u2019re alone in the universe[\u2026] There is something going on that is not being disclos...\"",
        "role": "American Film Director"
    },
    {
        "name": "Avril Haines",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Nov 16, 2021 and Nov 16, 2021. Sample statement: \"There\u2019s always the question of \u2018is there something else that we simply do not understand, that might...\"",
        "role": "Director National Intelligence"
    },
    {
        "name": "Mitt Romney",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jun 27, 2021 and Jun 27, 2021. Sample statement: \"Well I don\u2019t believe they are coming from foreign adversaries. Why if there were that would suggest ...\"",
        "role": "US Senator (R)Former Presidential Nominee"
    },
    {
        "name": "Martin Heinrich",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between May 21, 2021 and May 21, 2021. Sample statement: \"I don\u2019t know what it is, but any time you have legitimate pilots describing something that doesn\u2019t s...\"",
        "role": "US Senator (D)"
    },
    {
        "name": "Adam Schiff",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between May 17, 2021 and May 17, 2021. Sample statement: \"There is something there measurable by multiple instruments, yet it seems to move in directions that...\"",
        "role": "US Congress (D)Chair House Intelligence Committee"
    },
    {
        "name": "Bob Fish",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2021 and Jan 1, 2021. Sample statement: \"At some point, the information about \u2018alien\u2019 stuff and true US national defence information crosses ...\"",
        "role": "Defense communications intelligence"
    },
    {
        "name": "Jason Turner",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2021 and Jan 1, 2021. Sample statement: \"This thing was going berserk, like making turns. It is incredible the amount of g-forces that it wou...\"",
        "role": "Petty OfficerUSS Princeton"
    },
    {
        "name": "William Nash",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 6, 2020 and Oct 6, 2020. Sample statement: \"They came in like this and went out like this [makes a v]. There would be no way to make a complete ...\"",
        "role": "Pan American pilot, former fighter pilot"
    },
    {
        "name": "Albert M Chop",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 6, 2020 and Oct 6, 2020. Sample statement: \"[In 1952 over Washington, DC], I am convinced they are solid objects. I am convinced that they are p...\"",
        "role": "Press Spokesman for Project Blue Book"
    },
    {
        "name": "William Coleman",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 6, 2020 and Oct 6, 2020. Sample statement: \"Probably what we saw [in 1952 over Washington, DC] was from somewhere else. Look the Air Force is a ...\"",
        "role": "Colonel, US Air ForcePublic Spokesman for Project Blue Book"
    },
    {
        "name": "Donald Trump",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jun 19, 2020 and Jun 19, 2020. Sample statement: \"I won\u2019t talk to you about what I know about [Roswell], but it\u2019s very interesting\u2026 [Asked by his son ...\"",
        "role": "US President (R)"
    },
    {
        "name": "Nat Kobitz",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2020 and Jan 1, 2020. Sample statement: \"[Coulthart]: Are you able to confirm to me that the US has been trying to develop recovered alien te...\"",
        "role": "Director of US Navy Science and Technology Development"
    },
    {
        "name": "Steve Justice",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2019 and Jan 1, 2019. Sample statement: \"Hypersonic vehicles that we work on today want to be above 50,000 feet [not down to sea level]\u2026 You ...\"",
        "role": "Director, Advanced Systems Development at Skunkworks, Lockheed Martin"
    },
    {
        "name": "Chad Underwood",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2019 and Jan 1, 2019. Sample statement: \"The thing that stood out to me the most was how erratic it was behaving. And what I mean by erratic ...\"",
        "role": "Lieutenant, US NavyF/A-18 Pilot"
    },
    {
        "name": "Gary Voorhis",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2019 and Jan 1, 2019. Sample statement: \"The SPY [radar] guys came down and said \u2018Oh we got clutter\u2019\u2026 Asked me to reset all the computer syst...\"",
        "role": "Petty Officer, US NavyRadar technician USS Princeton"
    },
    {
        "name": "Bryan Bender",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2019 and Jan 1, 2019. Sample statement: \"It is hard to conceive of a secret military test program that explains all of these instances. Not j...\"",
        "role": "National Security Correspondent, Politico"
    },
    {
        "name": "Hillary Clinton",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between May 10, 2016 and May 10, 2016. Sample statement: \"I think we may have been [visited already]. We don\u2019t know for sure.\"",
        "role": "US Senator"
    },
    {
        "name": "John Podesta",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Feb 13, 2015 and Feb 13, 2015. Sample statement: \"Finally my biggest failure of 2014, once again not securing the disclosure of UFO files.\"",
        "role": "Chief of Staff to President Clinton"
    },
    {
        "name": "Bill Clinton",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2014 and Jan 1, 2014. Sample statement: \"I did attempt to discover if there were any secret government documents that reveal things, and if t...\"",
        "role": "US President (D)"
    },
    {
        "name": "Parviz Jafari",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2010 and Jan 1, 2010. Sample statement: \"At about 11 pm on the evening of September 18, 1976, citizens were frightened by the circling of an ...\"",
        "role": "General, Iranian Air Force"
    },
    {
        "name": "Oscar Santa Maria Huertas",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2010 and Jan 1, 2010. Sample statement: \"On April 11, 1980 at 7:15 am\u2026The squad commander\u2026 ordered me to take off \u2026 to intercept the balloon ...\"",
        "role": "Comandante, Peruvian Air Force"
    },
    {
        "name": "Julio Miguel Guerra",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2010 and Jan 1, 2010. Sample statement: \"On the morning of Number 2, 1982\u2026 I noticed\u2026 another \u2018aircraft\u2019. It didn\u2019t have wings and it didn\u2019t ...\"",
        "role": "Captain, Portuguese Air Force"
    },
    {
        "name": "Jean-Jacques Velasco",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2010 and Jan 1, 2010. Sample statement: \"For twenty-one years, from 1983 to 2004, I was the director of the French program to investigate and...\"",
        "role": "Director GEPANHead of French UAP program"
    },
    {
        "name": "James Penniston",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 2010 and Jan 1, 2010. Sample statement: \"I was the senior security officer in charge of Woodbridge base security [Rendlesham]\u2026 I held a top-s...\"",
        "role": "Sergeant, US Air Force"
    },
    {
        "name": "Stephen Hawking",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Mar 6, 1998 and Mar 6, 1998. Sample statement: \"Of course it is possible that UFOs really do contain aliens as many people believe, and the governme...\"",
        "role": "Professor"
    },
    {
        "name": "Lord Hill-Norton",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 22, 1997 and Oct 22, 1997. Sample statement: \"My position both privately and publicly expressed over the last dozen years or more [about the 1980 ...\"",
        "role": "Admiral, UK Chief of the Defence Staff"
    },
    {
        "name": "Fife Symington",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1997 and Jan 1, 1997. Sample statement: \"As a pilot and former Air Force officer, I can definitely say that this craft [Phoenix Lights incide...\"",
        "role": "Governor, Arizona"
    },
    {
        "name": "Hill Norton",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1996 and Jan 1, 1996. Sample statement: \"The evidence that there are objects which have been seen in our atmosphere, and even on terra firma,...\"",
        "role": "British Chief Of Defense Staff"
    },
    {
        "name": "Ben Rich",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1995 and Jan 1, 1995. Sample statement: \"We already have the means to travel among the stars, but these technologies are locked up in black p...\"",
        "role": "Head Of The Lockheed Skunk Works"
    },
    {
        "name": "Donald Slayton",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1995 and Jan 1, 1995. Sample statement: \"I was testing a P-51 fighter in Minneapolis when I spotted this object. [\u2026] It looked like a saucer,...\"",
        "role": "Mercury Astronaut"
    },
    {
        "name": "Brian O\u2019Leary",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Sep 18, 1994 and Sep 18, 1994. Sample statement: \"For nearly 50 years, the secrecy apparatus within the United States Government has kept from the pub...\"",
        "role": "Astronaut"
    },
    {
        "name": "Mikhail Gorbachev",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between May 4, 1990 and May 4, 1990. Sample statement: \"The phenomenon of UFOs is real. I know that there are scientific organizations which study the probl...\"",
        "role": "Soviet President"
    },
    {
        "name": "Victor Afanasyev",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Apr 1, 1979 and Apr 1, 1979. Sample statement: \"It followed us during half of our orbit. We observed it on the light side, and when we entered the s...\"",
        "role": "Cosmonaut"
    },
    {
        "name": "Jean-Pierre Fartek",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1979 and Jan 1, 1979. Sample statement: \"December 9, 1979 at around 9:15 am\u2026 The object [had] a precise contour, a gray metal color on the to...\"",
        "role": "Captain, French Air Force"
    },
    {
        "name": "Roland Evans",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 12, 1976 and Oct 12, 1976. Sample statement: \"An outstanding report: this [1976 Tehran] case is a classic which meets all the criteria necessary f...\"",
        "role": "Major Colonel, Defense Intelligence Agency"
    },
    {
        "name": "Jimmy Carter",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1976 and Jan 1, 1976. Sample statement: \"I don\u2019t laugh at people any more when they say they\u2019ve seen UFOs. It was the darndest thing I\u2019ve eve...\"",
        "role": "US President"
    },
    {
        "name": "James Irwin",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1976 and Jan 1, 1976. Sample statement: \"Look, I have a pension to worry about. I have a family to take care of, and they told me to just bac...\"",
        "role": "Apollo 15 Astronaut"
    },
    {
        "name": "Barry Goldwater",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Mar 28, 1975 and Mar 28, 1975. Sample statement: \"\u2026I made an effort to find out what was in the building at Wright Patterson Air Force Base where the ...\"",
        "role": "US Senator"
    },
    {
        "name": "Ronald Reagan",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1974 and Jan 1, 1974. Sample statement: \"I looked out the window and saw this white light. It was zigzagging around. I went up to the pilot a...\"",
        "role": "US President"
    },
    {
        "name": "Eugene Cernan",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1973 and Jan 1, 1973. Sample statement: \"I\u2019ve been asked [about UFOs] and I\u2019ve said publicly I thought they [UFOs] were somebody else, some o...\"",
        "role": "Apollo 17 Astronaut"
    },
    {
        "name": "James Edward McDonald",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1968 and Jan 1, 1968. Sample statement: \"I believe that the scientific community has been seriously misinformed for twenty years about the po...\"",
        "role": "Atmospheric Physicist"
    },
    {
        "name": "Gerald Ford",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Mar 28, 1966 and Mar 28, 1966. Sample statement: \"\u2026I strongly recommend that there be a committee investigation of the UFO phenomena. I think we owe i...\"",
        "role": "US President"
    },
    {
        "name": "Albert M. Chop",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1965 and Jan 1, 1965. Sample statement: \"I\u2019ve been convinced for a long time that the flying saucers are real and interplanetary. In other wo...\"",
        "role": "Deputy Public Relations Director, NASA"
    },
    {
        "name": "Douglas MacArthur",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between May 12, 1962 and May 12, 1962. Sample statement: \"We speak in strange terms [\u2026] of ultimate conflict between a united human race and the sinister forc...\"",
        "role": "General"
    },
    {
        "name": "R.H. Hillenkoetter",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Feb 28, 1960 and Feb 28, 1960. Sample statement: \"Behind the scenes, high ranking Air Force officers are soberly concerned about the UFOs. But through...\"",
        "role": "Director of the Central Intelligence Agency, Vice Admiral US Navy"
    },
    {
        "name": "L.M. Chassin",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1960 and Jan 1, 1960. Sample statement: \"If we persist in refusing to recognize the existence of the UFOs, we will end up, one fine day, by m...\"",
        "role": "GeneralNATO coordinator of Allied Air Service"
    },
    {
        "name": "Roscoe Hillenkoetter",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1960 and Jan 1, 1960. Sample statement: \"Unknown objects are operating under intelligent control\u2026 It is imperative that we learn where UFOs c...\"",
        "role": "First CIA Director"
    },
    {
        "name": "Donald E. Keyhoe",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1958 and Jan 1, 1958. Sample statement: \"The Air Force had put out a secret order for its pilots to capture UFOs. For the last six months we ...\"",
        "role": "Marine Corps Major"
    },
    {
        "name": "Delmer Fahrney",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1957 and Jan 1, 1957. Sample statement: \"No agency in this country or Russia is able to duplicate at this time the speeds and accelerations w...\"",
        "role": "AdmiralHead of Navy guided missile program"
    },
    {
        "name": "Delmar Fahrney",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jan 1, 1956 and Jan 1, 1956. Sample statement: \"Unidentified Flying Objects are entering our atmosphere at very high speeds and obviously under inte...\"",
        "role": "Rear Admiral, USNR"
    },
    {
        "name": "Hermann Oberth",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Oct 24, 1954 and Oct 24, 1954. Sample statement: \"It is my thesis that flying saucers are real and that they are space ships from another solar system...\"",
        "role": "The \"Father Of Modern Rocketry\""
    },
    {
        "name": "Hugh Dowding",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Aug 1, 1954 and Aug 1, 1954. Sample statement: \"Of course UFOs are real, and they are interplanetary. The cumulative evidence for the existence of U...\"",
        "role": "Lord, Air Chief Marshall"
    },
    {
        "name": "H. Marshall Chadwell",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Dec 2, 1952 and Dec 2, 1952. Sample statement: \"Sightings of unexplained objects at great altitudes and traveling at high speeds in the vicinity of ...\"",
        "role": "Asst. Director CIA, Scientific Intelligence"
    },
    {
        "name": "Walther Riedel",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Apr 7, 1952 and Apr 7, 1952. Sample statement: \"I am completely convinced that UFOs have an out-of-world basis.\"",
        "role": "Chief Rocket Designer"
    },
    {
        "name": "Maurice Biot",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Apr 7, 1952 and Apr 7, 1952. Sample statement: \"The least improbable explanation is that these things are artificial and controlled\u2026 My opinion for ...\"",
        "role": "Leading Mathematical Physicist"
    },
    {
        "name": "Harry S. Truman",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Apr 4, 1950 and Apr 4, 1950. Sample statement: \"I can assure you that flying saucers, given that they exist, are not constructed by any power on ear...\"",
        "role": "US President"
    },
    {
        "name": "Nathan Twining",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Sep 23, 1947 and Sep 23, 1947. Sample statement: \"The [UAP] phenomenon reported is something real and not visionary or fictitious\u2026 extreme rates of cl...\"",
        "role": "Commander of Air Materiel Command, Lt. General US Air Force"
    },
    {
        "name": "J. Edgar Hoover",
        "bio": "Referenced 1 times in UFO testimonies. Statements recorded between Jul 10, 1947 and Jul 10, 1947. Sample statement: \"We must insist upon full access to disks recovered. For instance, in the La case the Army grabbed it...\"",
        "role": "First Director Of The FBI"
    }
]

# Insert each record
for record in personnel_records:
    try:
        data = xata.records().insert("personnel", record)
        print(f"Successfully inserted personnel record for: {record['name']} ({data['id']})")
    except Exception as e:
        print(f"Error inserting record for {record['name']}: {e}")
