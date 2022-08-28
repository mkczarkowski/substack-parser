import puppeteer from 'puppeteer'

async function start (): Promise<void> {
  const browser = await puppeteer.launch({
    headless: false
  })
  const page = await browser.newPage()

  await page.goto('https://substack.com/sign-in?redirect=%2F')
}

void start()
