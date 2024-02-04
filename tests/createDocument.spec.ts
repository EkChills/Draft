import {expect, test} from '@playwright/test'

test.describe('create document', () => {
  test('should create a document and be redirected to the document page', async({page}) => {
    await page.goto('http://localhost:3000/all-documents')
    
  await page.getByRole('button', { name: 'New' }).click();
  
  await page.goto('http://localhost:3000/all-documents/document/53cd965c-167f-427a-98a2-0cf3d00d7185');
  await expect(page.getByPlaceholder('Page Title')).toBeVisible();
  await expect(page.getByPlaceholder('Page Title')).toBeVisible();
  })
  test('it should type in the editor and save it', async({page}) => {
    await page.goto('http://localhost:3000/all-documents/document/53cd965c-167f-427a-98a2-0cf3d00d7185')
    await page.locator('#editor').getByRole('paragraph').click();
    await page.locator('div').filter({ hasText: /^start writing your document\.\.\.$/ }).locator('div').fill('how are you');
    await page.getByRole('button', { name: 'Save' }).click()
    await page.waitForTimeout(1000)
    await expect(page.getByText('how are you')).toBeVisible()
  })
})