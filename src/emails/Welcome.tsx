import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const WelcomeEmail = ({verificationLink}:{verificationLink:string}) => (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Img
              src={`https://avatars.githubusercontent.com/u/109875556?v=4`}
              width="49"
              height="49"
              style={{objectFit:"cover", objectPosition:"center"}}
              alt="welcomeImage"
            />
            <Hr style={hr} />
            <Text style={paragraph}>
               Hey there, Thanks for signing up with <strong>draft</strong> To complete the registration process and dive into the
              awesomeness that awaits, we need to verify your email. Please click
              the link below to confirm your email address
            </Text>
            <Button style={button} href={verificationLink}>
              Verify your email
            </Button>
          
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default WelcomeEmail;
  
  const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
  };
  
  const box = {
    padding: "0 48px",
  };
  
  const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
  };
  
  const paragraph = {
    color: "#525f7f",
  
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };
  
  const anchor = {
    color: "#556cd6",
  };
  
  const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
    padding: "10px",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
  };
  