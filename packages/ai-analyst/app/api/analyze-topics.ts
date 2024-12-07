import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import { Firecrawl } from 'firecrawl-js';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    // Step 1: Scrape the website
    const scrapeResult = await firecrawl.scrape(url);
    const websiteContent = scrapeResult.text;

    // Step 2: Analyze topics using Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      temperature: 0,
      system: "You are a helpful assistant that analyzes text and extracts main topics. Return only JSON.",
      messages: [{
        role: 'user',
        content: `Analyze the following text and identify the main topics. Return the result as a JSON object with topics as keys and their frequencies as values. Only include significant topics:

${websiteContent}`
      }],
    });

    const topics = JSON.parse(message.content[0].text);

    return res.status(200).json({ topics });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Failed to analyze topics' });
  }
}