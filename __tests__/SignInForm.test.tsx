import SignInForm from '@/components/SignInForm'
import { render, screen } from '@testing-library/react'
import { describe } from 'node:test'
import userEvent from '@testing-library/user-event'



jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push:() => null,
      refresh:() => null
    };
  },
}));


jest.mock("next/navigation", () => ({
  usePathname() {
    return "/signin";
  }
}));

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push:() => null,
      refresh:() => null
    };
  },
  usePathname() {
    return "/signin";
  }
}));





void describe('SignInForm', () => {
  it('should have input', async () => {
    render(<SignInForm />)
    const emailinput =   screen.getByLabelText('Email')
    await userEvent.type(emailinput, 'megafat142@gmail.com')
    expect(emailinput).toHaveValue('megafat142@gmail.com') // ASSERT

  })
    
})
