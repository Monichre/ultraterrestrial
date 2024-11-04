import { StreamingTextResponse, streamText, streamObject } from 'ai'

import { openai as vercelAI } from '@ai-sdk/openai'
import OpenAI from "openai"

import zod from 'zod'

const openai = new OpenAI(
  {
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
    // apiKey: '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',
  }
)

const SystemPrompt = `
You are ChatGPT, an AI language model specialized in processing and analyzing webpage content. 
Your tasks are to extract and summarize the key information from provided from a webpage scrape in markdown for use in an AI embedding and vectorization pipeline.  Be sure generate relevant and specific tags for categorizing the content effectively.

**Instructions:**

1. **Summary:**
  - Thoroughly read the provided webpage content.
  - Identify and extract the most important details: date, location, key points, key sources,key personnel, key events, and key links.
  - Compose a clear and concise summary (3-5 sentences) that encapsulates the key information.

2. **Key Information Breakdown:**
  A. **Key Sources:**
    - Identify and extract the key sources of information referenced in the content
    - Extract the hyperlinks or urls to the key sources if possible
  B. **Key Personnel:**
    - Identify and extract the key personnel from the content.
    - Extract the hyperlinks or urls to the key sources if possible
  C. **Key Events:**
    - Identify and extract the key events from the content.
    - Extract the hyperlinks or urls to the key sources if possible


3. **Tags:**
   - Generate a list of 5-10 relevant and specific tags based on the content.
   - Ensure tags accurately represent the main topics, themes, and subjects covered in the content.
   - Tags should be suitable for categorization and easy retrieval.

**Output Format:**

Summary:
[Your concise summary here]

Key Sources:
[List of key sources]

Key Personnel:
[List of key personnel]

Key Events:
[List of key events]

Tags:
	•	Tag1
	•	Tag2
	•	Tag3
	•	…

`

const userPrompt = ( data: string ) => `
Please analyze the following webpage content and extract the key information including sources, personnel, events and related items, and then summarize the content and generate relevant tags for classification.
Ensure that your method is conducive to the AI embedding and vectorization pipeline to which content will be added.

**Webpage Content:**
${data}
`
export const runWithVercel = async ( { data }: any ) => {
  const model = vercelAI( 'gpt-4o' )
  const completion = await streamText( {
    model,
    system: SystemPrompt,
    messages: [
      { role: "user", content: userPrompt( data ) },
    ],
  } )
  return completion.toAIStreamResponse()
}
// app/api/chat/route.ts




export const summarize = async ( data: string ): Promise<{ summary: string; tags: string[] }> => {
  try {
    // Initiate the streaming completion
    const completion = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: "system", content: SystemPrompt },
          { role: "user", content: userPrompt( data ) },
        ],
        stream: true,
      },
    )

    console.log( "🚀 ~ file: summarize.ts:81 ~ summarize ~ completion:", completion )
    const chunks: any = []
    for await ( const chunk of completion ) {
      console.log( "🚀 ~ file: summarize.ts:81 ~ summarize ~ chunk:", chunk )
      chunks.push( chunk )
    }
    return chunks
    // return new Promise((resolve, reject) => {
    //   let fullResponse = "";

    //   completion.data.on("data", (chunk: Buffer) => {

    //     console.log("🚀 ~ file: summarize.ts:87 ~ completion.data.on ~ chunk:", chunk)

    //     const payloads = chunk.toString().split("\n\n");
    //     for (const payload of payloads) {
    //       if (payload.startsWith("data: ")) {
    //         const dataStr = payload.replace(/^data: /, "").trim();
    //         if (dataStr === "[DONE]") {
    //           // Parsing the full response once streaming is complete
    //           const summaryMatch = fullResponse.match(/\*\*Summary:\*\*\n([\s\S]*?)\n\n\*\*Tags:\*\*/);
    //           const tagsMatch = fullResponse.match(/\*\*Tags:\*\*\n([\s\S]*)/);

    //           const summary = summaryMatch ? summaryMatch[1].trim() : "";
    //           const tagsText = tagsMatch ? tagsMatch[1].trim() : "";
    //           const tags = tagsText
    //             .split("\n")
    //             .map((tag) => tag.replace(/^- /, "").trim())
    //             .filter((tag) => tag);

    //           resolve({ summary, tags });
    //         } else {
    //           try {
    //             const parsed = JSON.parse(dataStr);
    //             const content = parsed.choices[0].delta.content;
    //             if (content) {
    //               fullResponse += content;
    //               // Optionally, you can log the content in real-time
    //               // process.stdout.write(content);
    //             }
    //           } catch (error) {
    //             console.error("Error parsing stream chunk:", error);
    //           }
    //         }
    //       }
    //     }
    //   });

    //   completion.data.on("error", (err: any) => {
    //     reject(err);
    //   });
    // });
  } catch ( error ) {
    console.error( "Error during summarization:", error )
    throw error
  }
}

// 	const endpointUrl = 'https://api.langbase.com/beta/generate';
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
// 	};

// const response = await fetch('https://api.langbase.ai/v1/summarize', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${process.env.LANGBASE_API_KEY}`,
//   },
//   body: JSON.stringify({ data }),
// });

// 	const endpointUrl = 'https://api.langbase.com/beta/generate';
// 	const headers = {
// 		'Content-Type': 'application/json',
// 		Authorization: `Bearer ${process.env.NEXT_LB_PIPE_API_KEY}`
// 	};
