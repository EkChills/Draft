import { expect, test } from "@playwright/test";

// Request context is reused by all tests in the file.
// let apiContext;

// test.beforeAll(async ({ playwright }) => {
//   apiContext = await playwright.request.newContext({
//     // All requests we send go to this API endpoint.
//     baseURL: 'http://localhost:3000',
//   });
// });

test("test", async ({ page}) => {
  await page.goto(`http://localhost:3000/signin`)
  await page.getByLabel('Email').fill('megafat142@gmail.com');
  await page.getByPlaceholder('Enter your password').fill('12345678');
  const submitButton =  page.getByTestId('sub')
  await expect(submitButton).toBeEnabled()
  await expect(submitButton).toBeInViewport()
  await submitButton.click()
      // Wait for the final URL to ensure that the cookies are actually set.
    
    await page.waitForURL('http://localhost:3000/more-info');
    await page.waitForURL('http://localhost:3000/all-documents')
    await page.goto('http://localhost:3000/all-documents')
    await expect(page.getByRole('navigation').getByText('All Documents')).toBeVisible()
  
});
