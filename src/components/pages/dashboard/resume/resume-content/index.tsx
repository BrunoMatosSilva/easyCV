"use client"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { ResumeTemplate } from "./templeates"
import { TransformControls } from "./controls"
import { NavigationHeader } from "./header"
import { useFormContext } from "react-hook-form"

type ResumeContentProps = {
  title: string;
}

export const ResumeContent = ({ title }: ResumeContentProps) => {
  const { watch} = useFormContext();

  const data = watch() as ResumeData;

  return (
    <section className="overflow-hidden w-full h-full flex items-center justify-center relative bg-muted dark:bg-background">
      <TransformWrapper
      initialScale={0.5}
      minScale={0.4}
      centerOnInit
      centerZoomedOut
      limitToBounds={false}
      >
        <>
        <NavigationHeader title={title} />
        <TransformControls />
        <TransformComponent>
          <ResumeTemplate data={data} />
        </TransformComponent>
        </>
      </TransformWrapper>
    </section>
  )
}