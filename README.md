# UltraTerrestrial

**Tracking the State of Disclosure**
_Striving to document, explore and disseminate the past, present and future of the UFO topic and its bearing on humanity, the universe and our place within it._

![Example Image](./preview.jpeg)

# Initial Idea

How it started ...

![Charlie Day](apps/app/docs/charlie-day.gif)

and still how I feel. The state of disclosure is a moving

Essentially I was thinking it might be cool to build a "state of disclosure" application that provided engaging visual displays and interactions across the following general areas:

1. Major Historical UFO Event Chronology
    - Interactive 3D visualization of global UFO sightings
    - Timeline navigation and filtering capabilities
    - Detailed event documentation and analysis

2. Disclosure Status Dashboard
    - Real-time tracking of claims, hearings and news
    - Progress indicators and milestone tracking
    - Historical context and developments

3. Topic Analysis & Correlation Engine
    - Network visualization of connected topics
    - Pattern recognition and trend analysis
    - Machine learning-powered insight generation

4. Key Figures Database
    - Comprehensive profiles of notable individuals
    - Timeline of involvement and contributions
    - Network analysis of relationships and connections

5. Investigation Hub
    - Interactive evidence mapping and visualization
    - Collaborative research and analysis tools
    - Pattern recognition across disparate data points

6. Digital Archive
    - Searchable repository of documents and artifacts
    - Metadata tagging and cross-referencing
    - Chain of custody tracking

7. Open Questions Framework
    - Structured database of unresolved questions
    - Impact analysis and implications tracking
    - Progress monitoring and updates

8. Classified Locations Registry
    - Mapping of suspected facilities
    - Historical activity analysis
    - Geospatial correlation with events

9. Contractor Intelligence Database
    - Profiles of relevant organizations
    - Project and program tracking
    - Network analysis of relationships

## Formal Pitch

At its core, Ultraterrestrial is designed to chronicle major historical UFO events with stunning 3D visuals that map sightings across the globe. Picture an interactive world map where you can zoom in and out, explore sightings by location, and navigate through time using a dynamic slider that showcases how these phenomena have evolved over the decades. Heatmaps will highlight regions with high densities of sightings, and for those who love immersive experiences, augmented reality features will let you visualize historical sightings in your current surroundings.

Each event isn’t just a pinpoint on a map; it comes alive with detailed descriptions, eyewitness accounts, official reports, and multimedia elements like photos, videos, and audio recordings. Users can dive deep into geospatial data, view satellite imagery, and even add their own annotations, making the exploration both informative and interactive.

Keeping up with the latest developments is crucial, and Ultraterrestrial excels in status reporting on claims, hearings, news items, and events. A real-time dashboard offers an overview of recent developments, ongoing investigations, and upcoming events. Imagine visual timelines tracking the progression of key claims and hearings, complemented by a notification system that keeps you updated on specific topics or events you care about most.

One of the standout features is the Topic Tracker. This dynamic tool maps out interconnected topics using network graphs, highlighting trending subjects and organizing them into subtopics for easy navigation. Users can engage in discussions, participate in polls, and contribute their own insights, fostering a vibrant community of like-minded individuals.

No comprehensive platform would be complete without a Who’s Who roster, and Ultraterrestrial delivers with detailed profiles of key figures in the UFO disclosure space. From Bob Lazar to Jeremy Corbell, each profile includes biographies, contributions, claims, and multimedia content like interviews and documentaries. An interactive network map shows how these figures connect with each other, organizations, and major events, providing a clear picture of the landscape.

For those who crave deeper investigation, Ultraterrestrial offers an Investigative Hub. Think of it as a central place where you can follow complex threads weaving through various events, people, and evidence. Interactive diagrams and mind maps make it easy to visualize these connections, while in-depth case studies allow for thorough exploration of specific phenomena or incidents. Users can collaborate on investigations, contribute findings, and even participate in verifying information to ensure credibility.

The Library is another cornerstone of Ultraterrestrial, housing major documents, letters, artifacts, and evidence in a meticulously organized digital repository. With features like document scanning, OCR, and detailed metadata, users can easily search and access a wealth of information. Interactive exhibits and guided tours provide curated experiences, making the library both a resource and an educational tool.

Addressing the big questions is essential, and Ultraterrestrial presents an official list of “unanswered questions” along with their implications. These questions are categorized by themes such as technology, origin, and intent, and each one links to relevant people, places, and events. Users can track the progress of these questions, submit new ones, and vote on which should be prioritized, ensuring that the platform remains dynamic and responsive to community interests.

When it comes to the more mysterious aspects, Ultraterrestrial includes lists of suspected “black” bases and contractors involved in retrieving materials. Interactive maps provide detailed location data, while base profiles offer background information, theories, sightings, and photographic evidence. Contractor profiles document affiliations and evidence linking them to retrieved materials, complete with network mapping to show connections to various bases and events.

But Ultraterrestrial doesn’t stop at just providing information—it’s built to engage and empower its users. With community features like user accounts, profiles, forums, and user-generated content, the platform fosters a sense of belonging and collaboration. Users can upload their own sightings, participate in collaborative investigations, and contribute to the growing tapestry of ultraterrestrial knowledge.

Multimedia integration takes Ultraterrestrial to the next level, offering a rich video library with documentaries, interviews, and user-submitted footage. Exclusive podcasts and audio archives provide another layer of content, ensuring there’s always something new and engaging to explore.

Education is a key component, with interactive learning modules, quizzes, and expert webinars that help users deepen their understanding of UFO phenomena. Data analytics and insights offer trend analysis and predictive modeling, giving users a sophisticated toolset to interpret the vast amounts of data available.

Ultraterrestrial also emphasizes accessibility and inclusivity, supporting multiple languages and regional customization to reach a global audience. The platform is designed with accessibility in mind, featuring screen reader compatibility, keyboard navigation, and customizable UI options to ensure everyone can engage with the content comfortably.

Security and privacy are paramount. Ultraterrestrial employs robust data protection measures, giving users control over their information and offering anonymity options for those who prefer it. The platform is built on a scalable technical stack, ensuring it can handle large volumes of data and high traffic as the community grows.

To sustain its mission, Ultraterrestrial employs diverse monetization strategies, including a freemium model with premium subscriptions, donations, crowdfunding, and merchandise sales. Transparent financial practices and scalable infrastructure ensure the platform remains reliable and trustworthy.

Launching Ultraterrestrial involves strategic marketing and community-building efforts, leveraging social media campaigns, influencer partnerships, and content marketing to attract and retain users. Legal and ethical considerations are addressed through strict content moderation, intellectual property compliance, and adherence to data privacy regulations.

In summary, Ultraterrestrial is poised to become the leading platform in the UFO disclosure space, offering a rich, interactive, and comprehensive experience that not only informs but also engages and empowers its users. Whether you’re an avid enthusiast, a dedicated researcher, or just curious about the mysteries of the skies, Ultraterrestrial provides the tools and community to explore the fascinating world of ultraterrestrial phenomena.

## Tech Stack

NextJS
Xata
OpenAI
Anthropic
Tailwind
ThreeJS
React Three Fiber
Framer Motion

[Feature Roadmap](./apps/app/docs/roadmap.md)

[Agentic Research Methodology](./apps/app/docs/AgenticResearchMethodology.md)


```mermaid
flowchart TB
    subgraph Daily Processing
        CronTrigger["Daily Cron Trigger\n(NextJS/Cloudflare)"]
        
        subgraph Personnel Analysis
            PA1[Load Personnel Data]
            PA2[Calculate Network Centrality]
            PA3[Analyze Topic Coverage]
            PA4[Calculate Organization Impact]
            PA5[Compute Historical Contribution]
            PA6[Generate Authority Score]
            
            PA1 --> PA2
            PA2 --> PA3
            PA3 --> PA4
            PA4 --> PA5
            PA5 --> PA6
        end
        
        subgraph Case Analysis
            CA1[Load Case Data]
            CA2[Calculate Documentation Score]
            CA3[Analyze Expert Citations]
            CA4[Evaluate Physical Evidence]
            CA5[Cross-reference Lists]
            CA6[Generate Credibility Score]
            
            CA1 --> CA2
            CA2 --> CA3
            CA3 --> CA4
            CA4 --> CA5
            CA5 --> CA6
        end
        
        CronTrigger --> PA1
        CronTrigger --> CA1
        
        subgraph Score Updates
            SU1[Update Database]
            SU2[Cache Results]
            SU3[Trigger UI Updates]
            
            PA6 --> SU1
            CA6 --> SU1
            SU1 --> SU2
            SU2 --> SU3
        end
    end
    
    subgraph Data Sources
        DS1[(Personnel DB)]
        DS2[(Events DB)]
        DS3[(Organizations DB)]
        DS4[(Topics DB)]
        DS5[(Testimonies DB)]
        DS6[(Reference Lists)]
    end
    
    DS1 --> PA1
    DS2 --> CA1
    DS3 --> PA4
    DS4 --> PA3
    DS5 --> CA2
    DS6 --> CA5

```
