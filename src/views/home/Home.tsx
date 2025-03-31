import Messages from "../../utils/messages";
import Path from "../../utils/path";
import { Page } from "../../components/page/Page";

export function Home() {
  return (
    <Page
      backgroundColor="#eeaaff"
      buttonLabel={Messages.play}
      buttonPath={Path.Game}
      title={Messages.omokTitle}
    />
  );
};
