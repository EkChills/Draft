import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function WelcomeCard() {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold ">Welcome to Draft web app</h3>
          <p className="text-small text-default-500">Draft</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>👋 Hi there! thanks for trying out Draft!. Draft is a tool for capturing and sharing your thoughts</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
  ) }