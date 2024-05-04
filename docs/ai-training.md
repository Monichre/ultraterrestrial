# Automating data cleaning and formatting

Use AI to handle missing values, remove duplicates, standardise formats, and more.
ReportingUses

ChatGPTBeginnerfriendly
By automating data cleaning, you can save hours of manual time and effort to get accurate and complete data sets for future analysis and reporting.
In this tutorial, we'll show you how to leverage ChatGPT to automate your data cleaning.
Many of these actions can be performed within spreadsheets, but working with ChatGPT becomes powerful when you start asking for non-traditional data transformations.
Steps:
Upload your data file and ask ChatGPT to remove duplicates
Request blank rows be removed
Insert placeholder values in blank cells
Ask for values to be standardized with specific formatting
Label data based on defined rules
Once you complete this tutorial, you should check out our tutorial on how to analyse sales data with ChatGPT as a next step.
Upload your data file
Start by uploading your data file (e.g., CSV) to ChatGPT. Then, ask ChatGPT to remove any duplicate data. Provide a short description of what constitutes a duplicate in your data. In each step, ask ChatGPT to provide you a preview of the data transformation prior to having a new data file generated. This will save you time.
💡 Tip:Occasionally, ChatGPT will have an issue loading the data from the file you provided. In these cases, it will continue to re-run. If the issue persists, you can open a new chat window and re-upload your file.
Suggested prompt:
Here's my data file. Can you remove any duplicate data? Duplicates will have the same name. Please provide a preview before generating an updated data file.

If the preview looks good, instruct ChatGPT to proceed with generating the updated data file.

Request blanks rows be removed
To remove blank rows, instruct ChatGPT to remove them. Make sure to provide detail on what you consider a blank row and ask for a preview for confirmation.
💡 Tip:You do not need to re-upload your data file if you continue to work with ChatGPT in the same chat window. However, the context window can expire or timeout. If it does, you can re-upload the newest version of the data file or start a chat in a new window.
Suggested prompt:
Can you remove any blank rows? I consider any row with more than two columns blank to be a blank row. Please provide a preview before generating an updated data file.

If the preview looks good, instruct ChatGPT to proceed with generating the updated data file.

Insert placeholder values in blank cells
To insert placeholder values in blank cells, instruct ChatGPT to insert specific values for these cells. Make sure to provide detail on what you consider a blank cell, what value(s) you want inserted, and ask for a preview for confirmation.
Suggested prompt:
Can you insert the text “N/A” into any blank cells? I consider a blank cell any cell with NULL or NaN as a value. Please provide a preview before generating an updated data file.

Ask for values to be standardized with specific formatting
To standardize values with specific formatting, tell ChatGPT what columns you want formatted and how you want them formatted.
💡 Tip:If you have a specific example(s) within the dataset that is a good representation of what you want, provide this example to ChatGPT to ensure an accurate transformation.
Example prompt:
Two columns in my data file don’t have consistent or standardized formatting: Age and Income. For the Age column, can you update all cells to just be an integer? For instance, one Age value in the data file is “31.0 years”, I want this to be “31”. For the income column, can you reformat them all into USD?

Label data based on defined rules
To label data, provide clearly defined rules and column names for this new data. In this example, I’m going to have ChatGPT categorize anyone in my data set that is between the ages of 25-40 as a “Millennial”. I’m also going to instruct ChatGPT to categorize anyone with an income >$80K USD as a “Target Customer”.
Example prompt:
I want to create two new columns in my data set: Age Category and Customer Category. Can you create these two new columns and for any row with an Age between 25 - 40, set their Age Category to “Millennial”. For any row with an Income >$80K USD, set their Customer Category to “Target Customer”.

# Prepare Data for AI Training

What do we mean by data transformation and data types?

Training your AI model requires information. And that information can’t simply be an export of raw data or collection of files. Part of training your model is showing it how it should structure your data.

Data transformation is crucial because machine learning models require data to be in a consistent, numerical format to process it effectively. By transforming categorical and numerical variables into a standardized format, we ensure that the model can easily interpret and learn from the data, leading to better performance and more accurate predictions.

Data transformation is the process of turning abstract categories and numbers into systematized numerical values that a model can ingest, analyze, and understand. There are two data types we’ll focus on today: categorical and numerical.

Categorical variables

Countries, colours, and candy bar brands are categorical. When you can group these variables together, they’re a category variable. Another clue is that they’re often not represented by a number. Your data set might include a column with country data: singapore, united kingdom, canada, argentina. This is referred to as categorical data.

Numerical variables
You probably guessed this one already. Numerical variables refer to data that is represented by numbers. Think: speed, height, weight, temperature, and many others.

How to encode categorical variables

In order to input categorical data in your model, you need to encode it. Meaning, you need to create a system that represents category variables through numbers. There’s generally two approaches to this: label encoding and one-hot encoding.

Label encoding

Label encoding assigns a numerical value to each of the variables. Back to our country example: Afghanistan-1, Albania-2, Algeria-3, and so on. Each country is represented by a number so our list might look like this:

One-hot encoding

One-hot encoding is where each variable within a category, i.e. each country within the country category, has its own column. So columns would look more like this:

Keep in mind that one-hot encoding can lead to high dimensionality when there are many categories, which can impact model performance and increase computational costs.

There are trade-offs with each approach.

Use Label encoding when the categories have a clear ranking or order, like 'low', 'medium', 'high'. It's also a good choice when there are many categories and when using models that make decisions based on rules, such as decision trees.

Use One-hot encoding when dealing with categories that don't have a natural order, such as colors or types of cars. It works well when there aren't too many different categories and is ideal for models that treat each category separately.

How to encode numerical variables

Even though some of your data is already represented as numbers, you still need to encode it in a standardized scale. You might have the height (in cm) of a list of people: 180,165,191,138,136. Then you might also have that person’s local average temperature (in F): 48,76,90,28,78.

While these are both sets of numbers, the value of person 4’s height has nothing to do with the value of person 3’s local average temperature. There are two approaches to scaling the numerical variables: normalization and standardization.

Normalization

Normalization finds the minimum value and the maximum value in your data set and assigns them value 0 and value 1 respectively. Then all the other values fit in between. In the case of our list of heights, 136 is the lowest meaning it’s represented by 0. 191 is the highest value. So one of the middle heights, like 165 would be represented by 0.53.

The equation is:

Normalized value  =   (max−min)/(value−min)

Outliers can significantly impact normalization because they can dramatically extend the range between the minimum and maximum values, causing the majority of the data to be compressed into a smaller portion of the 0-1 scale. This can lead to a loss of information and reduced effectiveness of the normalization process.

Keep in mind, you’re not doing these calculations, ChatGPT will do them. In this tutorial, we’re simply getting informed about the different methods and trade-offs.

Standardization

Standardization works with a more traditional standard deviation model where values represent how many standard deviations each original data point is from the mean of the dataset. Using the same numbers as before, the 136 height is represented by -1.18 and 191 is represented by 1.32.

The equation is:

Standardized value  =  (standard deviation)/(value−mean)

One of the main challenges of normalization is that it’s sensitive to outliers. One extremely tall person or one extremely cold temperature and the data is skewed quite dramatically. For this reason, standardization is often the preferred method of encoding numerical data.

Writing your data transformation prompt for ChatGPT

The following is a prompt that was tested with numerous data sets. It reliably produced the desired outcome of (1) a recommendation, and (2) successful execution of the work.

Include the raw data as an attached excel file or CSV.

I have attached a spreadsheet containing various data attributes that I need to organize and preprocess for a machine learning project. The spreadsheet includes columns such as [example data]. I would like your help with the following tasks:Organizing into a table: Help me structure these attributes into a clear table format that is suitable for machine learning. This should include assigning appropriate headers and organizing data rows.Suggesting processing: Based on the variable types, provide recommendations on how to process the data, including whether to use label encoding or one-hot encoding for categorical data. And whether to use normalization or standardization to scale numerical variables.Once I have received your suggestions, I will decide and then ask you to execute the work.

Thank you, I agree with your recommendation. Please execute the work. During the processing, make a note of any data points or scenarios that you weren’t sure about. List them in bullet points at the end of your output.

You’ve now transformed your abstract categorical and numerical value into numbers your model will understand. Happy training!
