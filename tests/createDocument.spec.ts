import {expect, test} from '@playwright/test'

test.describe('create document', () => {
  test('should create a document and be redirected to the document page', async({page}) => {
    await page.goto('http://localhost:3000/all-documents')
    
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('Profile Actions').locator('span').nth(1).click();
  await page.waitForURL('http://localhost:3000/all-documents/document/22943d1d-cffe-4df6-b32b-36414193ce73')
  await page.goto('http://localhost:3000/all-documents/document/22943d1d-cffe-4df6-b32b-36414193ce73');
  await expect(page.getByPlaceholder('Page Title')).toBeVisible();
  await expect(page.getByPlaceholder('Page Title')).toHaveValue('untitled');
  })
})