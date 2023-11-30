import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faTiktok,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

interface SocialMediaIconProps {
  socialMedia: 'instagram' | 'tiktok' | 'facebook' | 'twitter';
  socialMediaLink: string;
}

const SocialMediaIcon: FC<SocialMediaIconProps> = ({
  socialMedia,
  socialMediaLink,
}) => {
  switch (socialMedia) {
    case 'instagram':
      return (
        <a href={`https://www.${socialMediaLink}`} target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      );
    case 'tiktok':
      return (
        <a href={`https://www.${socialMediaLink}`} target="_blank">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      );
    case 'facebook':
      return (
        <a href={`https://www.${socialMediaLink}`} target="_blank">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      );
    case 'twitter':
      return (
        <a href={`https://www.${socialMediaLink}`} target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      );
  }
};

export default SocialMediaIcon;
