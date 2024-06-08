import * as fs from 'fs/promises'

export async function writeLogToFile(
  data: any,
  filePath: string
): Promise<void> {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    console.log('Graph data successfully written to', filePath)
  } catch (err) {
    console.error('Error writing to file', err)
  }
}
