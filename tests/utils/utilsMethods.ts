import { Locator, Page } from '@playwright/test';
import fs from 'fs/promises';

class Utils {
  private static EMAILS_FILE_PATH = "C:/Users/Admin/Documents/Playwright_v2/tests/utils/emails.txt";

  public static async saveEmail(email: string): Promise<void> {
    await fs.appendFile(Utils.EMAILS_FILE_PATH, email + '\n');
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

  static async elementExists(page: Page, locator: string): Promise<boolean> {
    const element = await page.$(locator);
    return !!element;
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





}

export default Utils;