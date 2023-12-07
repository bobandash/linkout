import { FC } from 'react';
import ProfilePic from '../../../components/ProfilePic';
import DirectMessageProps from '../interface/DirectMessage';
import he from 'he';

interface MessageComponentProps {
  message: DirectMessageProps;
  hasMessageDetails: boolean;
  isNewDay: boolean;
}

interface TimeComponentProps {
  longDateFormatted: string;
}

const TimeComponent: FC<TimeComponentProps> = ({ longDateFormatted }) => {
  return (
    <div className="relative mt-1 text-center">
      <div className="absolute top-1/2 h-[2px] w-full bg-color_1"></div>
      <p className="relative z-10 mx-auto w-fit bg-color_3 px-2 text-lg xl:px-4 xl:text-xl">
        {longDateFormatted}
      </p>
    </div>
  );
};

const Message: FC<MessageComponentProps> = ({
  message,
  hasMessageDetails,
  isNewDay,
}) => {
  if (!hasMessageDetails) {
    return (
      <>
        {isNewDay && (
          <TimeComponent longDateFormatted={message.longDateFormatted} />
        )}
        <div className="grid grid-cols-mobile_message md:grid-cols-desktop_message">
          {message.image ? (
            <img
              className="col-start-2 mb-2 md:max-w-xs"
              src={`/api/${message.image}`}
              alt="message image"
            />
          ) : (
            <pre className="col-start-2 font-play text-lg xl:text-xl">
              {he.decode(message.content)}
            </pre>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {isNewDay && (
        <TimeComponent longDateFormatted={message.longDateFormatted} />
      )}
      <div className="mt-4 grid grid-cols-mobile_message md:grid-cols-desktop_message">
        <div className="flex">
          <ProfilePic
            image={message.sender.profile.profilePic}
            name={'profile pic'}
            size="small"
          />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex flex-row items-center gap-2">
            <h1 className="max-w-[10ch] overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold text-primary md:max-w-[24ch]  xl:text-xl">
              {he.decode(message.sender.profile.username)}
            </h1>
            <p className="text-sm text-gray xl:text-base">
              {message.dateFormatted}
            </p>
          </div>
          {message.content && (
            <pre className="font-play text-lg xl:text-xl">
              {he.decode(message.content)}
            </pre>
          )}
          {message.image && (
            <img
              className="mb-2 md:max-w-xs"
              src={`/api/${message.image}`}
              alt="message image"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
