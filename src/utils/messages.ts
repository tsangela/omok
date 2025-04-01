const buttons = {
  enter: "Enter",
  next: "Next",
  play: "Play",
  rematch: "Rematch",
  return: "Go Home",
  start: "Start",
};

const help = {
  playerNicknameHelp: "Enter your MapleStory character name to retrieve your character image.",
  duplicatePlayerNickname: (nickname: string) => `Nickname \'${nickname}\' is already in use.`,
  missingPlayerNickname: 'Please enter a nickname.',
  missingPlayerPiece: 'Please select an omok piece.',
};

const icons = {
  nextIcon: "&#11166;",
};

const pages = {
  omokTitle: "omok",
  notFoundTitle: "OOPS!", // 400
  notFoundInfo: "Something went wrong...", // There's nothing to see here...
};

const profileCard = {
  points: "POINT",
  total: "TOTAL",
  won: "W",
  lost: "L",
  tied: "T",
};

const misc = {
  infoTooltip: (subject: string) => `Information about ${subject}`,
  player: (index: number) => `Player ${index}`,
  winner: (name: string) => `${name} won!`,
  wins: 'wins',
};

const Messages = {
  ...buttons,
  ...help,
  ...pages,
  ...profileCard,
  ...misc,
};

export default Messages;