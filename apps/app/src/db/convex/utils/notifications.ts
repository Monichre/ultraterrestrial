import { internalAction } from "../_generated/server";
import { v } from "convex/values";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

interface NotificationData {
  type: "success" | "error" | "warning";
  title: string;
  description: string;
  details?: any;
}

export const sendDiscordNotification = internalAction({
  args: {
    type: v.string(),
    title: v.string(),
    description: v.string(),
    details: v.optional(v.any())
  },
  handler: async (ctx, { type, title, description, details }) => {
    if (!DISCORD_WEBHOOK_URL) {
      console.warn("Discord webhook URL not configured");
      return;
    }

    const color = {
      success: 0x00ff00, // Green
      error: 0xff0000,   // Red
      warning: 0xffff00  // Yellow
    }[type as keyof typeof color] || 0x0000ff;

    const embed = {
      title,
      description,
      color,
      timestamp: new Date().toISOString(),
      fields: details ? Object.entries(details).map(([name, value]) => ({
        name,
        value: JSON.stringify(value, null, 2),
        inline: false
      })) : []
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          embeds: [embed]
        })
      });

      if (!response.ok) {
        console.error("Failed to send Discord notification:", await response.text());
      }
    } catch (error) {
      console.error("Error sending Discord notification:", error);
    }
  }
});
