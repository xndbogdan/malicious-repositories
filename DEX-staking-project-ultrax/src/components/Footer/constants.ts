import { t } from "@lingui/macro";
import "./Footer.css";
import twitterIcon from "img/ic_twitter.svg";
import discordIcon from "img/ic_discord.svg";
import telegramIcon from "img/ic_telegram.svg";
import githubIcon from "img/ic_github.svg";
import substackIcon from "img/ic_substack.svg";

type Link = {
  label: string;
  link: string;
  external?: boolean;
  isAppLink?: boolean;
};

type SocialLink = {
  link: string;
  name: string;
  icon: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { link: "https://discord.com/invite/ymN38YefH9", name: "Discord", icon: discordIcon },
  { link: "https://github.com/utx-io", name: "Github", icon: githubIcon },
  { link: "https://t.me/UTX_IO", name: "Telegram", icon: telegramIcon },
  { link: "https://twitter.com/UTX_IO", name: "Twitter", icon: twitterIcon },
];
