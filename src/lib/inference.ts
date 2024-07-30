export async function runCompletion(prompt: string) {
  const url = 'http://localhost:11434/api/generate' // URL of the local Ollama LLM API endpoint

  // Create the request payload
  const payload = {
    model: 'llama3.1',
    stream: false,
    prompt: prompt, // The text prompt you want to send to the model
    format: 'json',
    max_tokens: 150, // Optional parameter specifying the maximum number of tokens to generate
  }

  try {
    // Make the POST request to the API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    console.log(response)
    // Parse and return the JSON response
    const result = await response.json()
    return result
  } catch (error) {
    console.error('Error:', error)
    return null // or handle the error as needed
  }
}

export function generateTableFromObject(obj: any) {
  // Create the table and table header
  let table = '<table>'
  table += '<thead><tr><th>Key</th><th>Value</th></tr></thead>'
  table += '<tbody>'

  // Iterate over the object keys and add rows to the table
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let val = ''
      if (Array.isArray(obj[key])) {
        val = obj[key].reduce((acc, cur) => acc + JSON.stringify(cur) + '<br/>', '')
      } else {
        val = obj[key]
      }
      table += `<tr><td>${key}</td><td>${val}</td></tr>`
    }
  }

  // Close the table tags
  table += '</tbody></table>'

  // Return the generated table HTML
  return table
}

export function objectToMarkdown(obj: any, level = 0) {
  // const indent = '  '.repeat(level) // Indentation for nested levels
  const indent = ''
  let markdown = ''

  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      // Handle arrays
      for (const item of obj) {
        if (typeof item === 'object' && item !== null) {
          markdown += '1. ' + objectToMarkdown(item, level + 1)
        } else {
          markdown += `${indent}- ${item}\n`
        }
      }
    } else {
      // Handle objects
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          markdown += `${indent}## ${key}\n` // Use ## for headings
          markdown += objectToMarkdown(obj[key], level + 1)
        }
      }
    }
  } else {
    // Handle primitive values
    markdown += `${indent}${obj}\n`
  }

  return markdown
}
