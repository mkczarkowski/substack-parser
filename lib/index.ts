import 'dotenv/config'
import puppeteer from 'puppeteer'

async function start(): Promise<void> {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  })
  const page = await browser.newPage()

  await page.goto('https://substack.com/sign-in?redirect=%2F')
  await page.click('.substack-login__login-option')


  const emailInputHandle = await page.$('input[name="email"]')
  const passwordInputHandle = await page.$('input[name="password"]')
  await emailInputHandle?.type(process.env.SUBSTACK_LOGIN as string)
  await passwordInputHandle?.type(process.env.SUBSTACK_PASSWORD as string)

  await page.click('.substack-login__go-button')
  await page.waitForNavigation();


  const [button] = await page.$x("//button[contains(text(), 'Dashboard')]");

  if (button) {
    await button.click();
  }
}

void start()
