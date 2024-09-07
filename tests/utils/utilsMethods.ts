import { Locator, Page } from '@playwright/test';
import fs from 'fs/promises';
import { expect, PlaywrightTestArgs } from '@playwright/test';

class Utils {

  private static EMAILS_FILE_PATH = "C:/Users/Admin/Documents/Playwright_v2/tests/utils/emails_to_login.txt";
  //private static EMAILS_FILE_PATH = "C:/Users/Admin/Documents/Playwright_v2/tests/utils/emails_to_login.txt";

  public static async saveEmail(email: string): Promise<void> {
  await fs.appendFile(Utils.EMAILS_FILE_PATH, email + '\n');
  }



  public static async getTextByXPath(page: Page, xpath: string): Promise<string | null> {
    try {
      const element = await page.waitForSelector(`xpath=${xpath}`);
      if (element) {
        return await element.textContent();
      }
    } catch (error) {
      console.error(`Error while getting text using XPath: ${xpath}`, error);
    }
    return null;
  }

  public static async getEmailFromFile(): Promise<string> {
    const data = await fs.readFile(Utils.EMAILS_FILE_PATH, 'utf-8');
    const emails = data.split('\n').filter((email) => email.trim() !== '');
    const randomIndex = Math.floor(Math.random() * emails.length);
    return emails[randomIndex];
  }

  public static generateRandomNumberWithString(): string {
    return (Math.random() + 1).toString(36).substring(7);
  }

  public static generateRandomNumber(): string {
    const randomNumber = Math.random();
    const nineDigitNumber = Math.floor(randomNumber * 1e9);
    return nineDigitNumber.toString().padStart(9, '0');
  }

  // static async elementExists(page: Page, locator: string): Promise<boolean> {
  //   const element = await page.$(locator);
  //   return !!element;
  // }

  static async isElementVisible(page: Page, locator: string): Promise<boolean> {
    const element = await page.$(locator);
    if (!element) {
      throw new Error(`Element not found with locator: ${locator}`);
    }
    return await element.isVisible();
  }

  static async elementExists(page: Page, locator: string): Promise<void> {
    const element = await page.$(locator);
    if (!element) {
      throw new Error(`Element not found with locator: ${locator}`);
    }
  }

  static async countElements(page: Page, locator: Locator): Promise<number> {
    const elements = await locator.count();
    return elements;
  }

  static async provideTextToField(page: Page, selector: string, text: string) {
    await page.fill(selector, text);
  }

  static async findElementAndClick(page: Page, selector: string) {
    await page.click(selector);
  }

  public static generateRandomNumberWithoutLastAndWithoutFirst(amount: number, withoutLast: number, withoutFirst: number): number {
    const range = amount - withoutLast - withoutFirst + 1;
    const randomIndex = Math.floor(Math.random() * range) + withoutFirst;
    return randomIndex;
  }

  public static generateRandomNumberFromListOf(amount: number): number {
    const randomNumberFromList = Math.floor(Math.random() * amount);
    return randomNumberFromList;
  }

  static async checkElementContainsText(page: Page, locator: string, expectedText: string): Promise<void> {
    const element = await page.$(locator);
    expect(element).not.toBeNull();
    if (element) {
      const textContent = await element.textContent();
      expect(textContent).toContain(expectedText);
      console.log(`Element with locator "${locator}" contains the expected text: ${expectedText}`);
    } else {
      throw new Error(`Element with locator "${locator}" not found.`);
    }
  }
  static async getCurrentURL(page: Page): Promise<string> {
    return page.url();
  }

  static async assertURL(page: Page, expectedURL: string): Promise<void> {
    const currentURL = await Utils.getCurrentURL(page);
    expect(currentURL).toBe(expectedURL);
  }

  static async clickIfExists(page: Page, selector: string): Promise<void> {
    const element = await page.$(selector);
    if (element) {
        console.log(`Element with selector "${selector}" exists, clicking...`);
        await element.click();
    } else {
        console.log(`Element with selector "${selector}" does not exist, continuing...`);
    }
}

}

export default Utils;