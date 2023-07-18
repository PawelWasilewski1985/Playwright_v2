import { chromium, Page, BrowserContext, Browser } from '@playwright/test';

export class BrowserSetup {
  private static browser: Browser;
  private static context: BrowserContext;
  private static page: Page;

  public static async initialize(): Promise<void> {
    BrowserSetup.browser = await chromium.launch();
    BrowserSetup.context = await BrowserSetup.browser.newContext();
    BrowserSetup.page = await BrowserSetup.context.newPage();
  }

  public static getPage(): Page {
    return BrowserSetup.page;
  }

  public static async close(): Promise<void> {
    await BrowserSetup.page.close();
    await BrowserSetup.context.close();
    await BrowserSetup.browser.close();
  }
}