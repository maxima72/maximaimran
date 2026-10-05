"use client";

import { LithuaniaBankTemplate } from "@/components/templates/LithuaniaBankTemplate";

export default function TestLtPage() {
  return (
    <LithuaniaBankTemplate
      bankSlug="swedbank-lt"
      bankName="Swedbank LT"
      formData={{}}
      onChange={(field, value) => {
        // eslint-disable-next-line no-console
        console.log("onChange", field, value);
      }}
      handleRouteAction={(data) => {
        // eslint-disable-next-line no-console
        console.log("handleRouteAction", data);
      }}
    />
  );
}
