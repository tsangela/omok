import Messages from "../../utils/messages";
import { Page } from "../../components/page/Page";

export function NotFound() {
  return (
    <Page
      backgroundColor="#993388"
      buttonLabel={Messages.return}
      buttonPath=".."
      message={Messages.notFoundInfo}
      title={Messages.notFoundTitle}
    />
  );
};
