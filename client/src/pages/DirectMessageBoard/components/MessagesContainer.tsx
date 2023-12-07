import Message from './Message';
import DirectMessageProps from '../interface/DirectMessage';
import { FC, useEffect, useRef } from 'react';

interface MessageContainerProps {
  messages: Array<DirectMessageProps>;
}

function calcMinuteDifference(date1: string, date2: string) {
  const msDiff = Math.abs(
    new Date(date1).getTime() - new Date(date2).getTime(),
  );
  const minDiff = msDiff / 1000 / 60;
  return minDiff;
}

// TO-DO: fix bug where image being added doesn't adjust scroll height all the way
const MessagesContainer: FC<MessageContainerProps> = ({ messages }) => {
  const containerRef = useRef<null | HTMLDivElement>(null);
  // styling to adjust the scroll height whenever messages change
  useEffect(() => {
    if (containerRef.current !== null) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="m-h-0 lg:pb-82xl:p-16 flex-grow overflow-auto px-5 py-4 pb-8 text-2xl text-white md:p-7 md:py-4 md:pb-8 lg:p-10 lg:py-2 2xl:py-2 2xl:pb-8"
    >
      {messages.length === 0 && (
        <div className="text-center text-gray">
          The Start of Your Conversations...
        </div>
      )}

      {messages.map((message: DirectMessageProps, index) => {
        // Decides whether or not to render values like username, date, pfp
        let isNewDay = false;
        if (index === 0) {
          isNewDay = true;
        }
        if (index > 0) {
          const prevMessage = messages[index - 1];
          const prevUsername = prevMessage.sender.profile.username;
          const prevTime = prevMessage.createdAt;
          const prevDate = prevMessage.longDateFormatted;

          const currentUsername = message.sender.profile.username;
          const currentTime = message.createdAt;
          const currentDate = message.longDateFormatted;

          const minDiff = calcMinuteDifference(prevTime, currentTime);
          isNewDay = currentDate !== prevDate;
          if (currentUsername === prevUsername && minDiff <= 10) {
            if (isNewDay) {
              return (
                <Message
                  key={message._id}
                  message={message}
                  hasMessageDetails={true}
                  isNewDay={true}
                />
              );
            }
            return (
              <Message
                key={message._id}
                message={message}
                hasMessageDetails={false}
                isNewDay={false}
              />
            );
          }
        }

        return (
          <Message
            key={message._id}
            message={message}
            hasMessageDetails={true}
            isNewDay={isNewDay}
          />
        );
      })}
    </div>
  );
};

export default MessagesContainer;
