import React, { FunctionComponent } from "react";

type Props = {
  selectedTab: number;
  tabIndex: number;
};

export const TabContainer: FunctionComponent<Props> = ({
  selectedTab,
  tabIndex,
  children,
}) => {
  if (selectedTab !== tabIndex) return null;

  return <>{children}</>;
};
