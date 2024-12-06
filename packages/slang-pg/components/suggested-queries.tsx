import { motion } from "framer-motion"
import { Button } from "./ui/button"

export const SuggestedQueries = ( {
  handleSuggestionClick,
}: {
  handleSuggestionClick: ( suggestion: string ) => void
} ) => {
  const suggestionQueries = [

    // Start of Selection
    {
      desktop: "Who is the most popular key figure?",
      mobile: "Gov't Hiding",
    },
    {
      desktop: "How many sightings have there been since the 1960s?",
      mobile: "Psych Impact",
    },
    {
      desktop: "What role Bob Lazar play in the advancement of advanced propulsion systems?",
      mobile: "Military Role",
    },
    {
      desktop: "What is the most famous event in the history of UFOs?",
      mobile: "Tech Advances",
    },

  ]

  return (
    <motion.div
      key="suggestions"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto"
    >
      <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
        Try these queries:
      </h2>
      <div className="flex flex-wrap gap-2">
        {suggestionQueries.map( ( suggestion, index ) => (
          <Button
            key={index}
            className={index > 5 ? "hidden sm:inline-block" : ""}
            type="button"
            variant="outline"
            onClick={() => handleSuggestionClick( suggestion.desktop )}
          >
            <span className="sm:hidden">{suggestion.mobile}</span>
            <span className="hidden sm:inline">{suggestion.desktop}</span>
          </Button>
        ) )}
      </div>
    </motion.div>
  )
}
