import { type IconType } from 'react-icons';
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin
} from 'react-icons/ai';

export interface SocialNetwork {
  key: number;
  icon: IconType;
  href: string;
}

const socialNetworks: SocialNetwork[] = [
  {
    key: 1,
    icon: AiFillFacebook,
    href: 'https://www.facebook.com/alejandro.bedoyasanchez?mibextid=ZbWKwL'
  },
  {
    key: 2,
    icon: AiFillInstagram,
    href: 'https://www.instagram.com/dante05s/'
  },
  {
    key: 3,
    icon: AiFillLinkedin,
    href: 'https://www.linkedin.com/in/alejandrobedoyasanchez/'
  },
  {
    key: 4,
    icon: AiFillGithub,
    href: 'https://github.com/Dante05S'
  }
];

export default socialNetworks;
